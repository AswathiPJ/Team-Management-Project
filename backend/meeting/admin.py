from django.contrib import admin
from .models import Meeting


@admin.register(Meeting)
class MeetingAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "status",
        "date",
        "start_time",
        "duration",
        "organizer",
        "get_participants"
    )
    
    list_filter = ("status", "organizer", "date")
    
    search_fields = ("title", "description")
    
    date_hierarchy = "date"
    
    def get_participants(self, obj):
        return ", ".join([u.username for u in obj.participants.all()])
    get_participants.short_description = "Participants"
