from langchain.chat_models.gigachat import GigaChat

from config import settings

chat = GigaChat(credentials=settings.gigachat, verify_ssl_certs=False)


async def generate_idea(like: str, want: str, can: str) -> str:
    prompt = (f'Напиши конкретную идею (1 предложение) по развитию города Сысерть, опираясь на следующие факты: '
              f'Мне нравится: {like}. Я хочу: {want}. Я умею: {can}')
    res = await chat.ainvoke(prompt)
    return res.content
