from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import ChatViewSet

router = DefaultRouter()
router.register(r'chats', ChatViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
