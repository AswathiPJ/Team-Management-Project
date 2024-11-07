from .models import Meeting
from rest_framework import serializers
from django.contrib.auth.models import User

class MeetingSerializer(serializers.ModelSerializer):
    participants = serializers.PrimaryKeyRelatedField(many=True,read_only=True)
    organizer = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Meeting
        fields = '__all__'
