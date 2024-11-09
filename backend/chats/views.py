from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Chat, Message
from .serializers import ChatSerializer, MessageSerializer
from django.shortcuts import get_object_or_404
from account.models import Profile
from teams.models import Team

class ChatViewSet(viewsets.ModelViewSet):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer

    def get_queryset(self):
        print("enterd")
        user_id = self.request.query_params.get('user')
        if not user_id:
            print("no object")
            return Chat.objects.none()

        profile = get_object_or_404(Profile,id=user_id)
        teams = Team.objects.filter(members=profile)
        print("team",teams)
        return Chat.objects.filter(team__in=teams)
    
        
class MessageViewSet(viewsets.ModelViewSet):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer

    @action(detail=True, methods=['get'])
    def room(self, request, pk=None):
        chat = get_object_or_404(Chat, pk=pk)
        print(chat)
        messages = Message.objects.filter(chat=chat)
        message_serializer = MessageSerializer(messages, many=True)
        print(message_serializer.data)
        return Response({
            'room_name': chat.name,
            'slug': chat.id,
            'messages': message_serializer.data
        })

    @action(detail=True, methods=['post'])
    def messages(self, request, pk=None):
        chat = get_object_or_404(Chat, pk=pk)
        data = request.data.copy()
        data['chat'] = chat.id 
        data['user'] = request.user.id 

        serializer = MessageSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

    # @action(detail=True, methods=['get'])
    # def room(self, request, pk=None):
    #     chat = self.get_object()
    #     print("chat",chat)
    #     messages = Message.objects.filter(chat=chat).select_related('user')
    #     message_serializer = MessageSerializer(messages, many=True)
    #     return Response({
    #         'room_name': chat.name,
    #         'slug': chat.team.id,
    #         'messages': message_serializer.data
    #     })
    
    # @action(detail=True, methods=['post'])
    # def messages(self, request, pk=None):
    #     chat = self.get_object()
    #     data = request.data.copy()
    #     data['chat'] = chat.id 
    #     data['user'] = request.user.id 

    #     serializer = MessageSerializer(data=data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data, status=status.HTTP_201_CREATED)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
