from typing import List
from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column, relationship
from .db import db
from .asociations import user_palette_association_table


class Palette(db.Model):
    __tablename__ = 'palette'

    id: Mapped[int] = mapped_column(primary_key=True)
    colors: Mapped[str] = mapped_column(String(75))
    users = relationship(
        "User",
        secondary=user_palette_association_table,
        back_populates="palettes"
    )

    def __repr__(self) -> str:
        return f"Palette(id={self.id!r}, colors:{self.colors}"
