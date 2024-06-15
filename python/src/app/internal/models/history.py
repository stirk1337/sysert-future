from ckeditor.fields import RichTextField
from django.db import models


class History(models.Model):
    title = models.CharField(max_length=500, verbose_name="Заголовок")
    description = RichTextField(verbose_name="Описание")
    date = models.CharField(max_length=500, verbose_name="Дата")
    image_url = RichTextField(verbose_name="Картинка")

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "Блок истории"
        verbose_name_plural = "Блоки истории"


