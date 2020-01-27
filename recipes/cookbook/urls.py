from django.urls import path, include
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'ingredients', views.IngredientViewSet)
router.register(r'recipes', views.RecipeViewSet)
router.register(r'comments', views.CommentViewSet)
router.register(r'recipeingredients', views.RecipeIngredientAssociativeViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('/api/', include('rest_framework.urls', namespace='rest_framework'))
]