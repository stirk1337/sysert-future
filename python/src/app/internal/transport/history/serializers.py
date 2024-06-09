from rest_framework import serializers

from app.internal.models.history import History


class HistorySerializer(serializers.ModelSerializer):

    class Meta:
        model = History
        fields = ("id", "title", "description", "date", "image_url")
