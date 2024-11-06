from django.db import models
from django.contrib.auth.models import User

class Team(models.Model):
    name = models.CharField(max_length=50)
    description = models.TextField(blank=True, null=True)
    manager = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='managed_teams')
    created_on = models.DateTimeField(auto_now_add=True)
    members = models.ManyToManyField(User, related_name='teams')
    


    def __str__(self):
        return f"Team: {self.name}"

