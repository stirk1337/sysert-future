from app.internal.models.admin_user import AdminUser
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin


@admin.register(AdminUser)
class AdminUserAdmin(UserAdmin):
    list_display = UserAdmin.list_display + ("cookie", "photo_url")
    fieldsets = UserAdmin.fieldsets + (
        (
            None,
            {
                "fields": ("cookie", "photo_url"),
            },
        ),
    )
