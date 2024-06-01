from typing import Any

from app.internal.models.admin_user import AdminUser
from app.internal.models.idea import Idea


def get_idea_by_parameter(parameter: str, value: Any) -> AdminUser | None:
    return Idea.objects.filter(**{parameter: value}).first()


def add_or_remove_like(idea: Idea, user: AdminUser):
    if user in idea.likes.all():
        idea.likes.remove(user)
    else:
        idea.likes.add(user)


def save_idea(title: str, description: str, image: str, created_by, tags):
    idea = Idea(
        title=title,
        description=description,
        image=image,
        created_by=created_by,
        tags=tags,
    )
    idea.save()
