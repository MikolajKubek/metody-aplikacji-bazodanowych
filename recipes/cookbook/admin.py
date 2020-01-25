from django.contrib import admin

from .models import User, Recipe, Ingredient, Comment
# Register your models here.
admin.site.register([User, Recipe, Ingredient, Comment])