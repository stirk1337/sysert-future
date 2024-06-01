from rest_framework import serializers

from app.internal.models.success_detector import TestItem, SuccessDetector


class TestItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestItem
        fields = "__all__"


class SuccessDetectorSerializer(serializers.ModelSerializer):
    items = TestItemSerializer(many=True, read_only=True)

    class Meta:
        model = SuccessDetector
        fields = ("id", "title", "description", "items")
