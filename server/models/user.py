from typing import List
from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column, relationship
from .db import db
from .asociations import user_palette_association_table


class User(db.Model):
    __tablename__ = "user"

    id: Mapped[int] = mapped_column(primary_key=True)
    username: Mapped[str] = mapped_column(String(25))
    palettes = relationship(
        "Palette",
        secondary=user_palette_association_table,
        back_populates="users"
    )

    def __repr__(self) -> str:
        return f"User(id{self.id!r}, name={self.username!r}"
