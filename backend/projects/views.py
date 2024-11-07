from django.shortcuts import render
from rest_framework import viewsets
from . import models,serializers
from django.db.models import Q
from teams.models import Team
from account.models import Profile
from rest_framework.decorators import action
from tasks.models import Task
from tasks.serializers import TaskSerializer
from rest_framework.response import Response

class ProjectViewSet(viewsets.ModelViewSet):
    queryset = models.Project.objects.all()
    serializer_class = serializers.ProjectSerializer

    def get_queryset(self):
        user_id = self.request.query_params.get('user')
        print(user_id)
        if user_id:
            user_id = int(user_id)
            user=Profile.objects.filter(id=user_id)
            user_teams=Team.objects.filter(members__in=user)
            return models.Project.objects.filter(team__in=user_teams)
        else:
            return models.Project.objects.all()
        
    
    # @action(detail=False, methods=['get'])
    # def tasks(self, request, *args, **kwargs):
    #     projects = self.get_queryset()
    #     print(projects)
    #     tasks = Task.objects.filter(project__in=projects)
    #     serializer = TaskSerializer(tasks, many=True)
    #     return Response(serializer.data)

class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

    def get_queryset(self):
        project_id = self.request.query_params.get('project')
        if project_id:
                return Task.objects.filter(project=project_id)
        return Team.objects.none()