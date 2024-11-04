from django.shortcuts import render
from .models import Meeting
from .serializers import MeetingSerializer
from rest_framework import viewsets

class MeetingViewSet(viewsets.ModelViewSet):
    queryset = Meeting.objects.all()
    serializer_class = MeetingSerializer

    def perform_create(self, serializer):
        serializer.save(organizer=self.request.user)

