from django.db import models
from django.contrib.auth.models import User
from account.models import Profile

class Note(models.Model):
    userid = models.CharField(max_length=10)
    content= models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.content
