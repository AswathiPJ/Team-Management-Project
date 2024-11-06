from django.contrib import admin
from . import models

@admin.register(models.Task)
class TaskAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "status",
        "priority",
        "project",
        "due_date",
        "created_by",
        "get_assigned_users"
    )
    
    list_filter = ("status", "priority", "created_by")
    
    search_fields = ("title", "description","project")
    
    date_hierarchy = "due_date"
    
    def get_assigned_users(self, obj):
        return ", ".join([u.user.username for u in obj.assigned_to.all()])
    get_assigned_users.short_description = "Assigned Users"
