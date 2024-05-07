from typing import List

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession

from src import gchat
from src.db.db import get_async_session
from src.db.db_operations import DatabaseOperations
from src.kandinsky import api
from src.imgbb import upload_image

router = APIRouter()


@router.get('/generate_idea')
async def generate_idea(like: str, want: str, can: str) -> str:
    idea = await gchat.generate_idea(like, want, can)
    return idea


@router.get('/generate_picture')
async def get_base64_image(prompt: str) -> str:
    uuid = api.generate(prompt)
    images = await api.wait_for_generation(uuid)
    return images[0]


class IdeaIn(BaseModel):
    title: str
    description: str
    image_base64: str
    tags: List[str]


class IdeaOut(BaseModel):
    title: str
    description: str
    image_url: str
    tags: List[str]


@router.get('/get_tags')
async def get_all_tags(session: AsyncSession = Depends(get_async_session)) -> List[str]:
    db = DatabaseOperations(session)
    tags = await db.get_all_tags()
    return [str(tag.title) for tag in tags]


@router.post('/create_idea')
async def create_idea(model: IdeaIn,
                      session: AsyncSession = Depends(get_async_session)) -> IdeaOut:
    db = DatabaseOperations(session)
    tags = await db.get_tags_by_name(model.tags)
    if len(tags) != len(model.tags):
        raise HTTPException(status_code=500, detail="Can't parse tags")
    try:
        image_url = await upload_image(model.image_base64)
    except Exception as e:
        raise HTTPException(status_code=500, detail="Cant upload image" + str(e))
    idea = await db.create_idea(model.title, model.description, image_url, tags)
    return IdeaOut(title=idea.title, description=idea.description, image_url=idea.image_url, tags=model.tags)


@router.get('/get_ideas')
async def get_all_ideas(session: AsyncSession = Depends(get_async_session)) -> List[IdeaOut]:
    db = DatabaseOperations(session)
    ideas = await db.get_all_ideas()
    return [
        IdeaOut(title=idea.title, description=idea.description, image_url=idea.image_url,
                tags=[str(tag.title) for tag in idea.tags])
        for idea in ideas
    ]
