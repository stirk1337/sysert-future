from django.db import models
from solo.models import SingletonModel


class SiteConfiguration(SingletonModel):
    gigachat_prompt = models.CharField(
        max_length=255,
        default="Напиши конкретную идею по развитию города Сысерть (1 "
                "предложение),"
                "опираясь на следующие факты: Мне нравится: {"
                "}. Я хочу: {}. Я умею: {}",
        verbose_name="Запрос для Gigachat",
    )
    history = models.BooleanField(verbose_name="История (речка)", default=True)
    success_detector = models.BooleanField(verbose_name="Детектор успеха", default=True)
    idea_view = models.BooleanField(verbose_name="Биржа идей", default=True)
    idea_generate = models.BooleanField(verbose_name="Генератор идей", default=True)

    def __unicode__(self):
        return "Настройки сайта"

    class Meta:
        verbose_name = "Настройки сайта"
        verbose_name_plural = "Настройки сайта"
