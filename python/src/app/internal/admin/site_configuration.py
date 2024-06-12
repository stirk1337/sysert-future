from django.contrib import admin
from django.contrib.admin import ModelAdmin

from ..models.site_configuration import SiteConfiguration


@admin.register(SiteConfiguration)
class SiteConfigurationAdmin(ModelAdmin):
    list_display = ["gigachat_prompt", "history", "success_detector", "idea_view", "idea_generate"]


try:
    config = SiteConfiguration.get_solo()
except:
    pass
