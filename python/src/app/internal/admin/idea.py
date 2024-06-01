from app.internal.models.idea import Idea, IdeaTag, Tag, IdeaLike
from django.contrib import admin
from django.contrib.admin import ModelAdmin
from django.utils.html import format_html


class IdeaTagInline(admin.TabularInline):
    model = IdeaTag


class IdeaLikeInline(admin.TabularInline):
    model = IdeaLike


@admin.register(Idea)
class IdeaAdmin(admin.ModelAdmin):
    inlines = [IdeaTagInline, IdeaLikeInline]
    exclude = ("tags",)

    def tags_list(self, obj):
        return ", ".join([tag.title for tag in obj.tags.all()])

    tags_list.short_description = "Теги"

    def image_tag(self, obj):
        return format_html(f'<img src="{obj.image} height=500" width=200/>')

    image_tag.short_description = "Картинка"

    def likes_len(self, obj):
        return len(obj.likes.all())

    likes_len.short_description = "Количество лайков"

    list_display = [
        "pk",
        "title",
        "description",
        "image",
        "tags_list",
        "image_tag",
        "created_by",
        "likes_len",
    ]
    search_fields = [
        "pk",
        "title",
        "description",
        "image",
        "tags_list",
        "image_tag",
        "created_by",
        "likes_len",
    ]


@admin.register(Tag)
class TagAdmin(ModelAdmin):
    list_display = ["pk", "title"]
    search_fields = ["pk", "title"]
