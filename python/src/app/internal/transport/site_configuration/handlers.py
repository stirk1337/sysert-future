from rest_framework import generics

from app.internal.models.site_configuration import SiteConfiguration
from app.internal.transport.site_configuration.serializers import SiteConfSerializer


class SiteConfViewSet(generics.ListAPIView):
    queryset = SiteConfiguration.objects.all()
    serializer_class = SiteConfSerializer
