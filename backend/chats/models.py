from django.db import models
from django.contrib.auth.models import User
from teams.models import Team

class Chat(models.Model):
    name = models.CharField(max_length=20)
    slug = models.SlugField(max_length=100)
    team= models.ForeignKey(Team, on_delete=models.CASCADE)


    def __str__(self):
        return "Chat : "+ self.name + " | Id : " + self.slug
    

class Message(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    chat = models.ForeignKey(Chat, on_delete=models.CASCADE)
    created_on = models.DateTimeField(auto_now_add=True)


    def __str__(self):
        return "Message :- "+ self.content
