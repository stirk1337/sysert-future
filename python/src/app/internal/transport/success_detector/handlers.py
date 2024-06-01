from rest_framework import generics

from app.internal.models.success_detector import SuccessDetector
from app.internal.transport.success_detector.serializers import (
    SuccessDetectorSerializer,
)


class SuccessDetectorViewSet(generics.ListAPIView):
    queryset = SuccessDetector.objects.all()
    serializer_class = SuccessDetectorSerializer
