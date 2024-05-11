from app.internal.transport.idea.handlers import (IdeaGenerationView,
                                                  IdeaViewSet,
                                                  PictureGenerationView,
                                                  TagViewSet)
from django.urls import path

urlpatterns = [
    path("tag/", TagViewSet.as_view(), name="tag"),
    path("idea/", IdeaViewSet.as_view(), name="idea"),
    path("generate_idea/", IdeaGenerationView.as_view(), name="generate_idea"),
    path("generate_picture/", PictureGenerationView.as_view(), name="generate_picture"),
]
