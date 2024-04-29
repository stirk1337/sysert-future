from typing import AsyncGenerator

from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import declarative_base, sessionmaker

from config import settings as s

Base = declarative_base()

DATABASE_URL = (
    f"postgresql+asyncpg://"
    f"{s.postgres_user}:{s.postgres_password}@{s.postgres_host}:{s.postgres_port}/{s.postgres_db}"
)


engine = create_async_engine(DATABASE_URL)
async_session_maker = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)


async def get_async_session() -> AsyncGenerator[AsyncSession, None]:
    async with async_session_maker() as session:
        yield session
