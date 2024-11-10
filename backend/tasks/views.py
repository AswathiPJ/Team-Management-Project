from rest_framework import viewsets
from django.db.models import Q
from . import models, serializers


class TaskViewSet(viewsets.ModelViewSet):
    queryset = models.Task.objects.all()
    serializer_class = serializers.TaskSerializer

    def get_queryset(self):
        user_id = self.request.query_params.get('assigned_to')
        if user_id:
            try:
                user_id = int(user_id)
                return models.Task.objects.filter(
                    Q(assigned_to=user_id)
                )
            except ValueError:
                return models.Task.objects.none()
        return super().get_queryset()

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)
