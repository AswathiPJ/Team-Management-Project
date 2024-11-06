from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Chat, Message
from .serializers import ChatSerializer, MessageSerializer

class ChatViewSet(viewsets.ModelViewSet):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer

    @action(detail=True, methods=['get'])
    def room(self, request, pk=None):
        chat = self.get_object()
        messages = Message.objects.filter(chat=chat).select_related('user')
        message_serializer = MessageSerializer(messages, many=True)
        return Response({
            'room_name': chat.name,
            'slug': chat.slug,
            'messages': message_serializer.data
        })
    
    @action(detail=True, methods=['post'])
    def messages(self, request, pk=None):
        chat = self.get_object()
        data = request.data.copy()
        data['chat'] = chat.id 
        data['user'] = request.user.id 

        serializer = MessageSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
