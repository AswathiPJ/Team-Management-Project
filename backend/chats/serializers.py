from rest_framework import serializers
from .models import Chat, Message
from django.contrib.auth.models import User
from teams.models import Team

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

class ChatSerializer(serializers.ModelSerializer):
    team= serializers.PrimaryKeyRelatedField(queryset=Team.objects.all(), write_only=True)

    class Meta:
        model = Chat
        fields = ['id', 'name', 'slug', 'team']

class MessageSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    chat= serializers.PrimaryKeyRelatedField(queryset=Chat.objects.all(), write_only=True)

    class Meta:
        model = Message
        fields = ['id', 'user', 'content', 'chat', 'created_on']

    def create(self, validated_data):
        return Message.objects.create(**validated_data)
