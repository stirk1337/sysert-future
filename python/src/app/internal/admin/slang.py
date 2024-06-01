from app.internal.models.slang import Slang
from django.contrib import admin


@admin.register(Slang)
class SlangAdmin(admin.ModelAdmin):
    list_display = ["pk", "word"]
    search_fields = ["pk", "word"]
