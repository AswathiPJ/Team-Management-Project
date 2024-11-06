from django.contrib import admin
from .models import Chat,Message

# Register your models here.
admin.site.register(Message)


@admin.register(Chat)
class ChatAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "team"
    )
    
    list_filter = ("team",)
    
    search_fields = ("team",)
    