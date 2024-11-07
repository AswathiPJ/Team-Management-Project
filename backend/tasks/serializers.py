from rest_framework import serializers
from django.contrib.auth.models import User
from . import models


class TaskSerializer(serializers.ModelSerializer):
    assigned_to = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    created_by = serializers.ReadOnlyField(source='created_by.user.username')

    def to_representation(self, instance):
        data = super().to_representation(instance)
        project_id = instance.project.id if instance.project else None
        project_title = instance.project.name if instance.project else None
        data['project'] = {
            'id': project_id,
            'title': project_title
        }
        return data

    class Meta:
        model = models.Task
        fields = ['id', 'title', 'description', 'project', 'assigned_to', 'created_by',
                  'status', 'priority', 'due_date', 'created_at', 'updated_at']
        
        read_only_fields = ['created_by', 'created_at', 'updated_at']
