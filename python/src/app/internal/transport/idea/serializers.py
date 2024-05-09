from rest_framework import serializers

from app.internal.models.idea import Tag, Idea


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = '__all__'


class TagIdeaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ('pk', )


class IdeaSerializer(serializers.ModelSerializer):
    tags = serializers.ListField(
        child=serializers.IntegerField(),
        write_only=True,
        required=True
    )

    class Meta:
        model = Idea
        fields = '__all__'


class IdeaGenerationSerializer(serializers.Serializer):
    like = serializers.CharField(max_length=100, default="Green spaces")
    want = serializers.CharField(max_length=100, default="Reduce traffic congestion")
    can = serializers.CharField(max_length=100, default="Implement smart traffic management systems")


class PictureGenerationSerializer(serializers.Serializer):
    prompt = serializers.CharField(max_length=500, default="Green football ball")
