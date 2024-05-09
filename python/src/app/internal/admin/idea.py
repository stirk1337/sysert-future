from django.contrib import admin
from django.contrib.admin import ModelAdmin

from app.internal.models.idea import Idea, Tag, IdeaTag


class IdeaTagInline(admin.TabularInline):
    model = IdeaTag


@admin.register(Idea)
class IdeaAdmin(admin.ModelAdmin):
    inlines = [
        IdeaTagInline,
    ]
    exclude = ('tags',)  # Exclude tags field as it's managed through the inline

    def tags_list(self, obj):
        return ", ".join([tag.title for tag in obj.tags.all()])
    tags_list.short_description = "Tags"


@admin.register(Tag)
class TagAdmin(ModelAdmin):
    pass
