from app.internal.transport.auth.handlers import (
    SaveCookieView,
    CurrentUserInfoView,
    TelegramAuthView,
)
from app.internal.transport.history.handlers import HistoryViewSet
from app.internal.transport.idea.handlers import (
    IdeaGenerationView,
    IdeaViewSet,
    PictureGenerationView,
    TagViewSet,
    IdeaLikeView,
)
from django.urls import path

from app.internal.transport.site_configuration.handlers import SiteConfViewSet
from app.internal.transport.success_detector.handlers import SuccessDetectorViewSet

from rest_framework.authtoken import views

urlpatterns = [
    path(
        "api-token-auth/telegram_auth/",
        TelegramAuthView.as_view(),
        name="telegram_auth",
    ),
    path(
        "api-token-auth/get_current_user_info/",
        CurrentUserInfoView.as_view(),
        name="get_current_user_info",
    ),
    path("api-token-auth/obtain_auth_token/", views.obtain_auth_token),
    path("api-token-auth/save_cookie/", SaveCookieView.as_view(), name="save_cookie"),

    path("history/", HistoryViewSet.as_view(), name="history"),

    path("tag/", TagViewSet.as_view(), name="tag"),
    path("idea/", IdeaViewSet.as_view(), name="idea"),
    path("idea/like/", IdeaLikeView.as_view(), name="idea_like"),

    path(
        "success_detector/", SuccessDetectorViewSet.as_view(), name="success_detector"
    ),

    path("generate/idea/", IdeaGenerationView.as_view(), name="generate_idea"),
    path("generate/picture/", PictureGenerationView.as_view(), name="generate_picture"),

    path("get_site_conf/", SiteConfViewSet.as_view(), name="site_configuration")
]
