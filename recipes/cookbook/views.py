from django.shortcuts import render
from django.http import HttpResponse
from .models import User, Ingredient, Recipe, Comment
from rest_framework import viewsets
from .serializers import UserSerializer, IngredientSerializer, RecipeSerializer, CommentSerializer

def index(request):
    return HttpResponse("siema")

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class IngredientViewSet(viewsets.ModelViewSet):
    queryset = Ingredient.objects.all()
    serializer_class = IngredientSerializer

class RecipeViewSet(viewsets.ModelViewSet):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer

class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer