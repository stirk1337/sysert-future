from rest_framework import generics

from app.internal.models.history import History
from app.internal.transport.history.serializers import HistorySerializer


class HistoryViewSet(generics.ListAPIView):
    queryset = History.objects.all()
    serializer_class = HistorySerializer
