from rest_framework import serializers
from django.contrib.auth.models import User
from . import models
from account.serializers import ProfileSerializer
from account.models import Profile


class TaskSerializer(serializers.ModelSerializer):
    assigned_to = serializers.PrimaryKeyRelatedField(many=True, queryset=Profile.objects.all())
    created_by = serializers.PrimaryKeyRelatedField(queryset=Profile.objects.all())

    def to_representation(self, instance):
        data = super().to_representation(instance)
        project_id = instance.project.id if instance.project else None
        project_title = instance.project.name if instance.project else None
        data['project'] = {
            'id': project_id,
            'title': project_title
        }

        # userid = instance.assigned_to.id if instance.assigned_to else None
        # username = instance.assigned_to.username if instance.assigned_to else None
        # data['assigned_to'] = {
        #     'id': userid,
        #     'username':username
        # }

        profile_serializer = ProfileSerializer(instance.assigned_to, many=True)
        data['assigned_to'] = profile_serializer.data

        return data

    class Meta:
        model = models.Task
        fields = ['id', 'title', 'description', 'project', 'assigned_to', 'created_by',
                  'status', 'priority', 'due_date', 'created_at', 'updated_at']
        
        read_only_fields = ['created_by', 'created_at', 'updated_at']
