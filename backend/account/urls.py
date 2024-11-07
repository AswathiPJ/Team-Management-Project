from django.urls import path,include
from . import views
from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework.routers import DefaultRouter

router= DefaultRouter()
router.register(r'profiles/team-members',views.ProfileViewSet)

urlpatterns = [
    path('',include(router.urls)),
    path('api/token/', views.CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
