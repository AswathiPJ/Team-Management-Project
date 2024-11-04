from .models import Meeting
from rest_framework import serializers
from django.contrib.auth.models import User

class MeetingSerializer(serializers.ModelSerializer):
    participants = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), many=True)
    organizer = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())

    class Meta:
        model = Meeting
        fields = '__all__'
