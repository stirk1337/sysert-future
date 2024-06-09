from rest_framework import serializers

from app.internal.models.admin_user import AdminUser


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = AdminUser
        fields = ["id", "username", "first_name", "last_name", "photo_url", "cookie"]


class CookieSerializer(serializers.Serializer):
    cookie = serializers.DictField()


class TelegramAuthSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    first_name = serializers.CharField(max_length=150, required=False)
    last_name = serializers.CharField(max_length=150, allow_blank=True, required=False)
    username = serializers.CharField(max_length=150, allow_blank=True, required=False)
    photo_url = serializers.URLField(allow_blank=True, required=False)
    auth_date = serializers.IntegerField()
    hash = serializers.CharField(max_length=100)
