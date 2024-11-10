from rest_framework import serializers
from .models import Chat, Message
from django.contrib.auth.models import User
from teams.models import Team
from account.models import Profile

class ProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username')

    class Meta:
        model = Profile
        fields =['id','username']

class ChatSerializer(serializers.ModelSerializer):
    team = serializers.StringRelatedField()

    class Meta:
        model = Chat
        fields = ['id', 'name', 'team']

class MessageSerializer(serializers.ModelSerializer):
    user = ProfileSerializer()
    chat= serializers.PrimaryKeyRelatedField(queryset=Chat.objects.all(), write_only=True)

    class Meta:
        model = Message
        fields = ['id', 'user', 'content', 'chat', 'created_on']

    def create(self, validated_data):
        return Message.objects.create(**validated_data)
