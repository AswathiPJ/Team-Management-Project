from django.shortcuts import render
from rest_framework import viewsets
from . import models,serializers
from django.db.models import Q
from teams.models import Team
from account.models import Profile

class ProjectViewSet(viewsets.ModelViewSet):
    queryset = models.Project.objects.all()
    serializer_class = serializers.ProjectSerializer

    def get_queryset(self):
        user_id = self.request.query_params.get('user')
        print(user_id)
        if user_id:
            try:
                user_id = int(user_id)
                user=Profile.objects.filter(id=user_id)
                user_teams=Team.objects.filter(members__in=user)
            except ValueError:
                return Team.objects.none()
        return models.Project.objects.filter(team__in=user_teams)
