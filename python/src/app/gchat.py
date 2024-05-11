from app.internal.models.site_configuration import SiteConfiguration
from django.conf import settings
from langchain.chat_models.gigachat import GigaChat

chat = GigaChat(credentials=settings.GIGACHAT, verify_ssl_certs=False)


def generate_idea(like: str, want: str, can: str) -> str:
    config = SiteConfiguration.objects.get()
    prompt = config.gigachat_prompt.format(like, want, can)
    res = chat.invoke(prompt)
    return res.content
