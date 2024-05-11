from django.contrib import admin
from django.contrib.admin import ModelAdmin
from django.utils.html import format_html

from app.internal.models.idea import Idea, Tag, IdeaTag


class IdeaTagInline(admin.TabularInline):
    model = IdeaTag


@admin.register(Idea)
class IdeaAdmin(admin.ModelAdmin):
    inlines = [
        IdeaTagInline,
    ]
    exclude = ('tags',)

    def tags_list(self, obj):
        return ", ".join([tag.title for tag in obj.tags.all()])

    tags_list.short_description = "Теги"

    def image_tag(self, obj):
        return format_html(f'<img src="{obj.image} height=500" width=200/>')

    image_tag.short_description = 'Картинка'

    list_display = ["pk", "title", "description", "image", "tags_list", "image_tag"]


@admin.register(Tag)
class TagAdmin(ModelAdmin):
    list_display = ["pk", "title"]
