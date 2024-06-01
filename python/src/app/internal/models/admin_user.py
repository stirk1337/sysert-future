from django.contrib.auth.models import AbstractUser
from django.db import models


class AdminUser(AbstractUser):
    first_name = models.CharField(
        null=True, blank=True, max_length=100, verbose_name="Имя"
    )
    last_name = models.CharField(
        null=True, blank=True, max_length=100, verbose_name="Фамилия"
    )
    photo_url = models.CharField(
        null=True, blank=True, max_length=10000, verbose_name="Ссылка на аватарку"
    )
    cookie = models.JSONField(
        default="{}", null=True, blank=True, verbose_name="Сохранение прогресса"
    )
