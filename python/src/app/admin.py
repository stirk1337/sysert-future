from django.contrib import admin

from app.internal.admin.admin_user import AdminUserAdmin  # noqa
from app.internal.admin.idea import IdeaAdmin, TagAdmin  # noqa

admin.site.site_title = "Sysert-future"
admin.site.site_header = "Sysert-future"
