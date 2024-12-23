from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import ChatViewSet,MessageViewSet

router = DefaultRouter()
router.register(r'chats', ChatViewSet)
router.register(r'chat',MessageViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
