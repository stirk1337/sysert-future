from typing import List

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from src.db.models import Idea, Tag
from src.imgbb import upload_image


class DatabaseOperations:
    def __init__(self, db_session: AsyncSession):
        self.db_session = db_session

    async def get_all_ideas(self) -> List[Idea]:
        ideas = await self.db_session.scalars(
            select(Idea).options(selectinload(Idea.tags))
        )
        return list(ideas)

    async def create_idea(self, title: str,
                          description: str,
                          image_url: str,
                          tags: List[Tag]) -> Idea:
        url = await upload_image(image_url)
        idea = Idea(title=title, description=description, image_url=url, tags=tags)
        self.db_session.add(idea)
        await self.db_session.commit()
        return idea

    async def get_all_tags(self) -> List[Tag]:
        tags = await self.db_session.scalars(
            select(Tag)
        )
        return list(tags)

    async def get_tags_by_name(self, tags: List[str]) -> List[Tag] | None:
        tags = await self.db_session.scalars(
            select(Tag)
            .filter(Tag.title.in_(tags))
        )
        return list(tags)
