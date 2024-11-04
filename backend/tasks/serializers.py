from rest_framework import serializers
from django.contrib.auth.models import User
from . import models


class TaskSerializer(serializers.ModelSerializer):
    assigned_to = serializers.PrimaryKeyRelatedField(
        many=True, queryset=User.objects.all())
    created_by = serializers.ReadOnlyField(source='created_by.username')

    class Meta:
        model = models.Task
        fields = '__all__'
