from django.urls import path
from rest_framework.routers import DefaultRouter
from todo.views import TodoViewSet


router = DefaultRouter()
router.register("todos", TodoViewSet, basename="todo")



urlpatterns = router.urls