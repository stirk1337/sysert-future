from app.internal.models.idea import Idea, Tag
from rest_framework import serializers


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = "__all__"


class TagIdeaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ("pk",)


class IdeaSerializer(serializers.ModelSerializer):
    tags = TagSerializer(read_only=True, many=True)

    class Meta:
        model = Idea
        fields = ('pk', 'title', 'description', 'image', 'tags')


class IdeaGenerationSerializer(serializers.Serializer):
    like = serializers.CharField(max_length=500, default="Green spaces")
    want = serializers.CharField(max_length=500, default="Reduce traffic congestion")
    can = serializers.CharField(
        max_length=500, default="Implement smart traffic management systems"
    )


class PictureGenerationSerializer(serializers.Serializer):
    prompt = serializers.CharField(max_length=500, default="Green football ball")
