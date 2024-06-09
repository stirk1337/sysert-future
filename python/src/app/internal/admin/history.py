from app.internal.models.history import History
from django.contrib import admin


@admin.register(History)
class HistoryAdmin(admin.ModelAdmin):
    list_display = ["pk", "title", "description", "date", "image_url"]
    search_fields = ["pk", "title", "description", "date", "image_url"]
