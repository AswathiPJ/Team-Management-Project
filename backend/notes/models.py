from django.db import models
from django.contrib.auth.models import User
from account.models import Profile

class Note(models.Model):
    user = models.ForeignKey(Profile, on_delete=models.CASCADE)
    content= models.TextField()
