from sqlalchemy import Table, Column, ForeignKey
from .base import Base


user_palette_association_table = Table(
    "association_table",
    Base.metadata,
    Column("user_id", ForeignKey("user.id"), primary_key=True),
    Column("palette_id", ForeignKey("palette.id"), primary_key=True),
)
