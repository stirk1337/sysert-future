from ckeditor.fields import RichTextField
from django.db import models


class SuccessDetector(models.Model):
    title = models.CharField(max_length=500, verbose_name="Заголовок")
    description = models.CharField(max_length=500, verbose_name="Описание")
    items = models.ManyToManyField(
        "TestItem", through="SuccessDetectorTestItem", verbose_name="Шаг"
    )

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "Блок детектора успеха"
        verbose_name_plural = "Блоки детектора успеха"


class TestItem(models.Model):
    title = models.CharField(max_length=500, verbose_name="Заголовок")
    description = RichTextField(verbose_name="Описание")
    is_test = models.BooleanField(default=False, verbose_name="Это тест?")
    answer1 = models.CharField(
        max_length=100,
        verbose_name="Правильный ответ",
        null=True,
        default=None,
        blank=True,
    )
    answer2 = models.CharField(
        max_length=100,
        verbose_name="Неправильный ответ",
        null=True,
        default=None,
        blank=True,
    )
    answer3 = models.CharField(
        max_length=100,
        verbose_name="Неправильный ответ",
        null=True,
        default=None,
        blank=True,
    )
    after_test = models.CharField(
        max_length=500,
        verbose_name="Текст после теста",
        null=True,
        default=None,
        blank=True,
    )

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "Шаг детектора успеха"
        verbose_name_plural = "Шаги детектора успеха"


class SuccessDetectorTestItem(models.Model):
    success_detector = models.ForeignKey(
        SuccessDetector, on_delete=models.CASCADE, verbose_name="Блок детектора успеха"
    )
    test_item = models.ForeignKey(
        TestItem, on_delete=models.CASCADE, verbose_name="Шаг детектора успеха"
    )

    def __str__(self):
        return f"{self.success_detector.title} - {self.test_item.title}"

    class Meta:
        verbose_name = "Шаг для детектора успеха"
        verbose_name_plural = "Шаги для детектора успеха"
