from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProjectViewSet,TaskViewSet

router = DefaultRouter()
router.register(r'projects/users', ProjectViewSet)
router.register(r'projects/tasks', TaskViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
