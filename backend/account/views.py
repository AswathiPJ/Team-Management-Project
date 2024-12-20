from . import serializers
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import viewsets
from .models import Profile
from .serializers import ProfileSerializer
from rest_framework.decorators import action
from rest_framework.response import Response
from teams.models import Team


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = serializers.CustomTokenObtainPairSerializer

class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class= ProfileSerializer

    def get_queryset(self):
        queryset = Profile.objects.all()
        profile_id = self.request.query_params.get('user')
        user_id = self.request.query_params.get('id')
        if user_id:
            queryset = queryset.filter(id=user_id)
        elif profile_id:
            profile_id=int(profile_id)
            profile = Profile.objects.get(id=profile_id)
            teams = Team.objects.filter(members=profile)
            return Profile.objects.filter(teams__in=teams).exclude(id=profile_id).distinct()
        else:
            return Profile.objects.all()
        return queryset




