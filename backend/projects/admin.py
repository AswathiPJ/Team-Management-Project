from django.contrib import admin
from . import models


@admin.register(models.Project)
class TaskAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "description",
        "team",
        "start_date",
        "end_date"
    )
    
    list_filter = ("name", "team", "end_date")
    
    search_fields = ("name", "description")
    
    date_hierarchy = "end_date"


