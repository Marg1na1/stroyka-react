from datetime import datetime
from typing import Optional

from pydantic import BaseModel, Field


class ReviewCreate(BaseModel):
    avatar: Optional[str]
    content: str
    created_at: Optional[datetime] = Field(alias='createdAt')
    name: str

    class Config:
        allow_population_by_field_name = True
        validate_assignment = True
