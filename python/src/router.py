from fastapi import APIRouter

from src import gchat

router = APIRouter()


@router.get('/generate_idea')
async def generate_idea(like: str, want: str, can: str):
    idea = await gchat.generate_idea(like, want, can)
    return idea


@router.get('/generate_picture')
async def generate_picture():
    pass
