from langchain.chat_models.gigachat import GigaChat
from django.conf import settings

chat = GigaChat(credentials=settings.GIGACHAT, verify_ssl_certs=False)


def generate_idea(like: str, want: str, can: str) -> str:
    prompt = (f'Напиши конкретную идею опираясь на цели устойчивового развития ООН (1 предложение) по развитию города '
              f'Сысерть, опираясь на следующие факты:'
              f'Мне нравится: {like}. Я хочу: {want}. Я умею: {can}')
    res = chat.invoke(prompt)
    return res.content
