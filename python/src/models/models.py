from typing import Annotated, List, Literal, Union

from pydantic import BaseModel, Field, field_validator


def parse_string_to_list(v: Union[str, List[float]]) -> List[float]:
    if isinstance(v, str):
        try:
            print([float(x.strip()) for x in v.split(",") if x.strip() != ""])
            return [float(x.strip()) for x in v.split(",") if x.strip() != ""]
        except Exception:
            raise ValueError("Invalid format: must be comma-separated numbers")
    elif isinstance(v, list):
        if not all(isinstance(n, (int, float)) for n in v):
            raise ValueError("All elements must be numbers")
        return v
    else:
        raise TypeError("numbers must be a string or a list of floats")


class NumberList(BaseModel):
    numbers: List[float]

    @field_validator("numbers", mode="before")
    @classmethod
    def validate_numbers(cls, v):
        return parse_string_to_list(v)


class BernoulliType(BaseModel):
    distribution_type: Literal["bernoulli"]
    numbers: List[float]
    size: int
    randomState: bool

    @field_validator("numbers", mode="before")
    @classmethod
    def validate_numbers(cls, v):
        return parse_string_to_list(v)


class BinomialType(BaseModel):
    distribution_type: Literal["binomial"]
    numbers: List[float]
    size: int
    nTrails: int

    @field_validator("numbers", mode="before")
    @classmethod
    def validate_numbers(cls, v):
        return parse_string_to_list(v)


class NormalType(BaseModel):
    distribution_type: Literal["normal"]
    average: float
    size: int
    std: float
    bins: int
    density: bool


DistributionType = Annotated[
    Union[BernoulliType, BinomialType, NormalType],
    Field(discriminator="distribution_type"),
]
