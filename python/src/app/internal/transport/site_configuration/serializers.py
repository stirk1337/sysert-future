from rest_framework import serializers

from app.internal.models.site_configuration import SiteConfiguration


class SiteConfSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteConfiguration
        fields = ("history", "success_detector", "idea_view", "idea_generate")
