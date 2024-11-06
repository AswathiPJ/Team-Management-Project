from django.contrib import admin
from .models import Team

# Register your models here.


@admin.register(Team)
class TeamAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "description",
        "manager",
        "created_on",
        "get_assigned_users"
        
    )
    
    list_filter = ("manager", "created_on")
    
    search_fields = ("manager",)
    
    date_hierarchy = "created_on"
    
    def get_assigned_users(self, obj):
        return ", ".join([u.username for u in obj.members.all()])
    get_assigned_users.short_description = "Members"

