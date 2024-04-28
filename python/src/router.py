from fastapi import APIRouter

from src import gchat

from src.kandinsky import api

router = APIRouter()


@router.get('/generate_idea')
async def generate_idea(like: str, want: str, can: str):
    idea = await gchat.generate_idea(like, want, can)
    return idea


@router.get('/generate_picture')
async def get_base64_image(prompt: str):
    uuid = api.generate(prompt)
    images = await api.wait_for_generation(uuid)
    return images[0]
