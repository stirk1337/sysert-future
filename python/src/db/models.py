from typing import List

from sqlalchemy import Integer, String, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from src.db.db import Base


class Idea(Base):
    __tablename__ = "idea"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    title: Mapped[str] = mapped_column(String(length=100), nullable=False)
    description: Mapped[str] = mapped_column(String(length=100), nullable=False)
    image_url: Mapped[str] = mapped_column(String(length=1000), nullable=False)
    tags: Mapped[List["Tag"]] = (
        relationship(secondary='idea_tags', back_populates='ideas'))


class Tag(Base):
    __tablename__ = "tag"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    title: Mapped[str] = mapped_column(String(length=100), nullable=False)
    ideas: Mapped[List["Idea"]] = (
        relationship(secondary='idea_tags', back_populates='tags'))


class IdeaTags(Base):
    __tablename__ = 'idea_tags'

    idea_id: Mapped[int] = mapped_column(
        ForeignKey('idea.id', ondelete='CASCADE'), primary_key=True
    )
    tag_id: Mapped[int] = mapped_column(
        ForeignKey('tag.id', ondelete='CASCADE'), primary_key=True
    )
