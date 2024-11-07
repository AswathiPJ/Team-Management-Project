from django.shortcuts import render
from .models import Meeting
from .serializers import MeetingSerializer
from rest_framework import viewsets
from django.db.models import Q

class MeetingViewSet(viewsets.ModelViewSet):
    queryset = Meeting.objects.all()
    serializer_class = MeetingSerializer

    def get_queryset(self):
        user_id = self.request.query_params.get('participant')
        if user_id:
            try:
                user_id = int(user_id)
                return Meeting.objects.filter(
                    Q(participants=user_id)
                )
            except ValueError:
                return Meeting.objects.none()
        return super().get_queryset()

    def perform_create(self, serializer):
        serializer.save(organizer=self.request.user)

