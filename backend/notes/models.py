from django.db import models
from django.contrib.auth.models import User
from account.models import Profile

class Note(models.Model):
    userid = models.CharField(max_length=10)
    content= models.TextField()
