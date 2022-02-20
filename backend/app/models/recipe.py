from tortoise import fields
from tortoise.contrib.pydantic import pydantic_model_creator
from tortoise.models import Model


class Recipe(Model):
    id = fields.IntField(pk=True)
    name = fields.TextField()
    user = fields.ForeignKeyField("models.UserModel")
    created = fields.DatetimeField(auto_now=True)
    modified = fields.DatetimeField(auto_now=True)
    ingredients = fields.TextField()
    images = fields.JSONField(default={})
    text = fields.TextField()

    def __str__(self):
        return self.name

    class Meta:
        table = "recipes"


RecipeCreate = pydantic_model_creator(Recipe, exclude=("created", "modified", "id"))

RecipeRead = pydantic_model_creator(Recipe)
