from typing import Any

from app.internal.models.admin_user import AdminUser


def create_user(
    telegram_id: int, username: str, first_name: str, last_name: str, photo_url: str
) -> AdminUser:
    return AdminUser.objects.get_or_create(
        id=telegram_id,
        first_name=first_name,
        last_name=last_name,
        defaults={"username": username},
        photo_url=photo_url,
    )


def get_user_by_parameter(parameter: str, value: Any) -> AdminUser | None:
    return AdminUser.objects.filter(**{parameter: value}).first()


def save_cookie_for_user(user: AdminUser, cookie: dict):
    print(user.cookie)
    print("COOKIE", cookie)
    user.cookie = cookie
    print(user.cookie)
    user.save()
