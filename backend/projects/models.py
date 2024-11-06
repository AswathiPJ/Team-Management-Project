from django.db import models
from teams.models import Team

class Project(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='projects')
    start_date = models.DateField()
    end_date = models.DateField()
