from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.ext.hybrid import hybrid_property

from .asociations import user_palette_association_table
from config import db, f_bcrypt


class User(db.Model):
    __tablename__ = "user"

    id: Mapped[int] = mapped_column(primary_key=True)
    username: Mapped[str] = mapped_column(String(50), unique=True, nullable=False)
    _password_hash: Mapped[str] = mapped_column((String(50)))
    palettes = relationship(
        "Palette",
        secondary=user_palette_association_table,
        back_populates="users"
    )

    @hybrid_property
    def password_hash(self):
        raise Exception('Cannot View Password Hash')

    @password_hash.setter
    def password_hash(self, password):
        self._password_hash = f_bcrypt.generate_password_hash(password)

    def authenticate(self, password):
        return f_bcrypt.check_password_hash(self._password_hash, password)

    def __repr__(self) -> str:
        return f"User(id{self.id!r}, name={self.username!r}"
