from rest_framework import viewsets
from django.db.models import Q
from . import models, serializers


# class TaskViewSet(viewsets.ModelViewSet):
#     queryset = models.Task.objects.all()
#     serializer_class = serializers.TaskSerializer

#     def get_queryset(self):
#         user_id = self.request.query_params.get('assigned_to')
#         if user_id:
#             try:
#                 user_id = int(user_id)
#                 return models.Task.objects.filter(
#                     Q(assigned_to=user_id)
#                 )
#             except ValueError:
#                 return models.Task.objects.none()
#         return super().get_queryset()

class TaskViewSet(viewsets.ModelViewSet):
    queryset = models.Task.objects.all()
    serializer_class = serializers.TaskSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        
        assigned_to = self.request.query_params.get('assigned_to')
        created_by = self.request.query_params.get('created_by')
        
        if assigned_to:
            try:
                assigned_to = int(assigned_to)
                queryset = queryset.filter(
                    Q(assigned_to=assigned_to)
                )
            except ValueError:
                queryset = queryset.none()

        if created_by:
            try:
                created_by = int(created_by)
                queryset = queryset.filter(
                    created_by=created_by
                )
            except ValueError:
                queryset = queryset.none()
        
        return queryset


