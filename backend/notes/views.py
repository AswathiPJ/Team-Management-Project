from django.shortcuts import render
from rest_framework import viewsets
from . import models,serializers
from account.models import Profile

class NoteViewSet(viewsets.ModelViewSet):
    queryset = models.Note.objects.all()
    serializer_class = serializers.NoteSerializer

    # def get_queryset(self):
    #     user_id = self.request.query_params.get('user')
    #     print(user_id)
    #     if user_id:
    #         user_id = int(user_id)
    #         user=Profile.objects.filter(id=user_id)
    #         return models.Note.objects.filter(user=user)
        
    # def get_object(self):
    #     queryset = self.get_queryset()
    #     obj = queryset.filter(pk=self.kwargs['pk']).first()
    #     if obj is None:
    #         return None
    #     return obj
