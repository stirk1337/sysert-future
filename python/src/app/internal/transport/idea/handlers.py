from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated

from app.gchat import generate_idea
from app.internal.models.idea import Idea, Tag
from app.kandinsky import api
from app.slang_filter import PymorphyProc
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import (
    IdeaGenerationSerializer,
    IdeaSerializer,
    TagSerializer,
    IdeaLikeSerializer,
)


@authentication_classes([TokenAuthentication])
class IdeaViewSet(generics.ListCreateAPIView):
    queryset = Idea.objects.all()
    serializer_class = IdeaSerializer

    def create(self, request, *args, **kwargs):
        try:
            if (
                PymorphyProc.test(request.data["title"]) > 0
                or PymorphyProc.test(request.data["description"]) > 0
            ):
                raise RuntimeError("Slang detected")
            # request.data["image"] = upload_image(request.data["image"])
            request.data["created_by"] = request.user.pk
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        return super(IdeaViewSet, self).create(request, *args, **kwargs)


@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
class IdeaLikeView(APIView):
    @swagger_auto_schema(
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                "idea_id": openapi.Schema(type=openapi.TYPE_NUMBER, description="idea"),
            },
        )
    )
    def post(self, request):
        user = request.user
        idea = Idea.objects.get(pk=request.data["idea_id"])
        data = {"user": user.id, "idea": idea.id}
        serializer = IdeaLikeSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TagViewSet(generics.ListAPIView):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer


class IdeaGenerationView(APIView):
    @swagger_auto_schema(
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                "like": openapi.Schema(type=openapi.TYPE_STRING, description="like"),
                "want": openapi.Schema(type=openapi.TYPE_STRING, description="want"),
                "can": openapi.Schema(type=openapi.TYPE_STRING, description="can"),
            },
        )
    )
    def post(self, request):
        serializer = IdeaGenerationSerializer(data=request.data)
        if serializer.is_valid():
            like = serializer.validated_data["like"]
            want = serializer.validated_data["want"]
            can = serializer.validated_data["can"]
            idea = generate_idea(like, want, can)
            return Response({"idea": idea}, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PictureGenerationView(APIView):
    @swagger_auto_schema(
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                "prompt": openapi.Schema(
                    type=openapi.TYPE_STRING, description="Описание"
                ),
            },
        )
    )
    def post(self, request):
        prompt = request.data.get("prompt")

        if not prompt:
            return Response(
                {"error": "Prompt is required"}, status=status.HTTP_400_BAD_REQUEST
            )

        request_id = api.generate(prompt)
        if request_id is None:
            return Response(
                {"error": "Failed to generate image"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

        image = api.check_generation(request_id)
        if image is None:
            return Response(
                {"error": "Failed to generate image"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

        return Response({"image": image}, status=status.HTTP_200_OK)
