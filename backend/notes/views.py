from django.shortcuts import render
from rest_framework import viewsets
from . import models,serializers

class NoteViewSet(viewsets.ModelViewSet):
    queryset = models.Note.objects.all()
    serializer_class = serializers.NoteSerializer
