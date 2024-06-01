from app.internal.models.site_configuration import SiteConfiguration
from django.conf import settings
from langchain.chat_models.gigachat import GigaChat

chat = GigaChat(credentials=settings.GIGACHAT, verify_ssl_certs=False)


def generate_idea(like: str, want: str, can: str) -> dict[str, str]:
    config = SiteConfiguration.objects.get()
    prompt = config.gigachat_prompt.format(like, want, can)
    description = chat.invoke(prompt).content
    title: str = chat.invoke(
        f"Сгенерируй заголовок (макс 3-4 слова) по описанию: {description}"
    ).content
    title = title.replace('"', "")
    return {"title": title, "description": description}
