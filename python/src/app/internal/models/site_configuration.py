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

    def __unicode__(self):
        return "Настройки сайта"

    class Meta:
        verbose_name = "Настройки сайта"
        verbose_name_plural = "Настройки сайта"
