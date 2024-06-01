from app.internal.admin.admin_user import AdminUserAdmin  # noqa
from app.internal.admin.idea import IdeaAdmin, TagAdmin  # noqa
from app.internal.admin.site_configuration import SiteConfiguration  # noqa
from app.internal.admin.slang import SlangAdmin  # noqa
from app.internal.admin.success_detector import SuccessDetectorAdmin, TestItemAdmin  # noqa
from django.contrib import admin

admin.site.site_title = "Sysert-future"
admin.site.site_header = "Sysert-future"
