from app.internal.models.success_detector import (
    SuccessDetector,
    SuccessDetectorTestItem,
    TestItem,
)
from django.contrib import admin
from django.contrib.admin import ModelAdmin


class SuccessDetectorItemInline(admin.TabularInline):
    model = SuccessDetectorTestItem


@admin.register(SuccessDetector)
class SuccessDetectorAdmin(admin.ModelAdmin):
    inlines = [
        SuccessDetectorItemInline,
    ]

    def test_items_list(self, obj):
        return ", ".join([item.title for item in obj.items.all()])

    test_items_list.short_description = "Шаги"

    list_display = ["pk", "title", "description", "test_items_list"]
    search_fields = ["pk", "title", "description"]


@admin.register(TestItem)
class TestItemAdmin(ModelAdmin):
    search_fields = [
        "pk",
        "title",
        "description",
        "is_test",
        "answer1",
        "answer2",
        "answer3",
        "after_test",
    ]
    list_filter = ["is_test"]
    list_display = [
        "pk",
        "title",
        "description",
        "is_test",
        "answer1",
        "answer2",
        "answer3",
        "after_test",
    ]
