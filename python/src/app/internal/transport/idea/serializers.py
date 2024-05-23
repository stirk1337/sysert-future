from app.internal.models.idea import Idea, Tag
from rest_framework import serializers


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = "__all__"


class IdeaSerializer(serializers.ModelSerializer):
    tags = serializers.ListField(
        child=serializers.IntegerField(), write_only=True, required=True
    )
    active_tags = serializers.ReadOnlyField(source='get_tags')

    class Meta:
        model = Idea
        fields = ('id', 'title', 'description', 'image', 'tags', 'active_tags')


class IdeaGenerationSerializer(serializers.Serializer):
    like = serializers.CharField(max_length=500, default="Green spaces")
    want = serializers.CharField(max_length=500, default="Reduce traffic congestion")
    can = serializers.CharField(
        max_length=500, default="Implement smart traffic management systems"
    )


class PictureGenerationSerializer(serializers.Serializer):
    prompt = serializers.CharField(max_length=500, default="Green football ball")
