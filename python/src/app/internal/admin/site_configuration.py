from django.contrib import admin
from django.contrib.admin import ModelAdmin

from ..models.site_configuration import SiteConfiguration


@admin.register(SiteConfiguration)
class SiteConfigurationAdmin(ModelAdmin):
    list_display = ["gigachat_prompt"]


try:
    config = SiteConfiguration.get_solo()
except:
    pass
