from rest_framework import serializers
from .models import Project
from teams.models import Team

class ProjectSerializer(serializers.ModelSerializer):
    team = serializers.PrimaryKeyRelatedField(queryset=Team.objects.all())
    
    class Meta:
        model = Project
        fields = "__all__"