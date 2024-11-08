from django.shortcuts import render
from rest_framework import viewsets
from . import models,serializers
from account.models import Profile

class NoteViewSet(viewsets.ModelViewSet):
    queryset = models.Note.objects.all()
    serializer_class = serializers.NoteSerializer

    def get_queryset(self):
        user_id = self.request.query_params.get('user')
        if user_id:
            return models.Note.objects.filter(userid=user_id)
        return models.Note.objects.all()
        
   

