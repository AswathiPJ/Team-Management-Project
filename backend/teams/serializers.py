from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Team
from account.models import Profile

class TeamSerializer(serializers.ModelSerializer):
    manager = serializers.PrimaryKeyRelatedField(read_only=True)
    members = serializers.PrimaryKeyRelatedField(queryset=Profile.objects.all(),many=True)

    class Meta:
        model = Team
        fields = '__all__'