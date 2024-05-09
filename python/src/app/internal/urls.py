from django.urls import path, include
from rest_framework.routers import DefaultRouter

from app.internal.transport.idea.handlers import IdeaViewSet, TagViewSet, IdeaGenerationView, PictureGenerationView


urlpatterns = [
    path('tag/', TagViewSet.as_view(), name='tag'),
    path('idea/', IdeaViewSet.as_view(), name='idea'),
    path('generate_idea/', IdeaGenerationView.as_view(), name='generate_idea'),
    path('generate_picture/', PictureGenerationView.as_view(), name='generate_picture'),
]
