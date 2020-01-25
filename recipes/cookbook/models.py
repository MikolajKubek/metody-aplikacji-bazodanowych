from django.db import models

class User(models.Model):
    login = models.CharField(max_length=200, unique=True)
    password = models.CharField(max_length=200)
    token = models.CharField(max_length=100, null=True, blank=True)

    def __str__(self):
        return self.login

class Ingredient(models.Model):
    name = models.CharField(max_length=200, unique=True)
    fats = models.FloatField(default=0)
    carbohydrates = models.FloatField(default=0)
    proteins = models.FloatField(default=0)

    def __str__(self):
        return self.name

class Recipe(models.Model):
    title = models.CharField(max_length=100, unique=True)
    description = models.CharField(max_length=200)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    ingredients = models.ManyToManyField(Ingredient)

    def __str__(self):
        return self.title

class Comment(models.Model):
    content = models.CharField(max_length=200)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.author}: {self.content}"
