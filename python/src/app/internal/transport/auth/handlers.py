import hashlib
import hmac
import time

from django.conf import settings
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token
from rest_framework import status
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from app.internal.services.user_service import (
    create_user,
    save_cookie_for_user,
)
from app.internal.transport.auth.serializers import (
    CookieSerializer,
    UserSerializer,
    TelegramAuthSerializer,
)


@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
class CurrentUserInfoView(APIView):
    def get(self, request):
        user = request.user
        user_data = UserSerializer(user).data
        return Response(user_data, status=status.HTTP_200_OK)


@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
class SaveCookieView(APIView):
    @swagger_auto_schema(
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                "cookie": openapi.Schema(
                    type=openapi.TYPE_OBJECT, description="cookie"
                ),
            },
        )
    )
    def post(self, request):
        serializer = CookieSerializer(data=request.data)
        if serializer.is_valid():
            cookie_json = serializer.validated_data["cookie"]
            save_cookie_for_user(request.user, cookie_json)
            return Response(
                {"detail": "Cookie успешно сохранён."}, status=status.HTTP_200_OK
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TelegramAuthView(APIView):
    @swagger_auto_schema(
        query_serializer=TelegramAuthSerializer,
    )
    def get(self, request):
        serializer = TelegramAuthSerializer(data=request.GET)
        if serializer.is_valid():
            auth_data = serializer.validated_data
            hash_value = auth_data.pop("hash")

            data_check_arr = [f"{key}={value}" for key, value in auth_data.items()]
            data_check_arr.sort()
            data_check_string = "\n".join(data_check_arr)

            secret_key = hashlib.sha256(settings.TELEGRAM_BOT_TOKEN.encode()).digest()
            calculated_hash = hmac.new(
                secret_key, data_check_string.encode(), hashlib.sha256
            ).hexdigest()

            if calculated_hash != hash_value:
                return Response(
                    {"status": "Данные не из Телеграм."},
                    status=status.HTTP_403_FORBIDDEN,
                )

            if (time.time() - auth_data["auth_date"]) > 86400:
                return Response(
                    {"status": "Данные просрочены."}, status=status.HTTP_403_FORBIDDEN
                )

            user, _ = create_user(
                auth_data["id"],
                auth_data.get('username', auth_data['id']),
                auth_data.get('first_name', ''),
                auth_data.get('last_name', ''),
                auth_data.get('photo_url', None),
            )

            token, _ = Token.objects.get_or_create(user=user)

            return Response({"token": token.key})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
