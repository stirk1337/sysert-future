from app.internal.models.idea import Idea


def add_or_remove_like(idea_id: int, user):
    idea = Idea.objects.get(id=idea_id)
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
