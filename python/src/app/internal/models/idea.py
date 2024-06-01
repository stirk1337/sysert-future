from typing import List

from django.db import models


class Idea(models.Model):
    title = models.CharField(max_length=500, verbose_name="Заголовок")
    description = models.CharField(max_length=500, verbose_name="Описание")
    image = models.CharField(max_length=1000, verbose_name="Картинка", default="")
    tags = models.ManyToManyField("Tag", through="IdeaTag", verbose_name="Теги")
    created_by = models.ForeignKey(
        "AdminUser",
        on_delete=models.CASCADE,
        verbose_name="Создатель",
        blank=True,
        default=None,
        null=True,
        related_name="created_by",
    )
    likes = models.ManyToManyField(
        "AdminUser", through="IdeaLike", verbose_name="Лайки", related_name="likes"
    )

    @property
    def get_tags(self) -> List["Tag"]:
        if len(self.tags.all()) > 0:
            return [tag.id for tag in self.tags.all()]
        else:
            return []

    @property
    def get_likes_count(self) -> int:
        return len(self.likes.all())

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "Идея"
        verbose_name_plural = "Идеи"


class Tag(models.Model):
    title = models.CharField(max_length=100, verbose_name="Название")

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "Тег"
        verbose_name_plural = "Теги"


class IdeaTag(models.Model):
    idea = models.ForeignKey(Idea, on_delete=models.CASCADE, verbose_name="Идея")
    tag = models.ForeignKey(Tag, on_delete=models.CASCADE, verbose_name="Тег")

    def __str__(self):
        return f"{self.idea.title} - {self.tag.title}"

    class Meta:
        verbose_name = "Тег идее"
        verbose_name_plural = "Теги идей"


class IdeaLike(models.Model):
    idea = models.ForeignKey(
        Idea, on_delete=models.CASCADE, verbose_name="Идея", unique=True
    )
    user = models.ForeignKey(
        "AdminUser", on_delete=models.CASCADE, verbose_name="Лайк", unique=True
    )

    class Meta:
        verbose_name = "Лайк идее"
        verbose_name_plural = "Лайки идей"
