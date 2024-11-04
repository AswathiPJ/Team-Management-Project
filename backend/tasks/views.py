from rest_framework import viewsets
from rest_framework.exceptions import PermissionDenied
from . import models, serializers


class TaskViewSet(viewsets.ModelViewSet):
    queryset = models.Task.objects.all()
    serializer_class = serializers.TaskSerializer

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

    def perform_update(self, serializer):
        task = self.get_object()
        user = self.request.user
        if task.can_change_status(user):
            serializer.save()
        else:
            raise PermissionDenied("You don't have permission to update this task status.")
