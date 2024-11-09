import json
from channels.generic.websocket import AsyncWebsocketConsumer
from asgiref.sync import sync_to_async

from .models import Chat,Message,User
from account.models import Profile

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_slug']
        self.roomGroupName = 'chat_%s' % self.room_name
        
        await self.channel_layer.group_add(
            self.roomGroupName,
            self.channel_name
        )
        await self.accept()
        
    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.roomGroupName,
            self.channel_name
        )
        
    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json["message"]
        username = text_data_json["username"]
        room_name = text_data_json["room_name"]
        userid = text_data_json["userid"]
        
        await self.save_message(message, username, room_name,userid)     

        await self.channel_layer.group_send(
            self.roomGroupName, {
                "type": "sendMessage",
                "message": message,
                "username": username,
                "room_name": room_name,
                "userid" :userid,
            }
        )
        
    async def sendMessage(self, event):
        message = event["message"]
        username = event["username"]
        userid = event["userid"]
        await self.send(text_data=json.dumps({"message": message, "username": username, "userid":userid}))
    
    @sync_to_async
    def save_message(self, message, username, room_name,userid):
        print(username,room_name,"----------------------")
        profile=Profile.objects.get(id=userid)
        print(room_name)
        chat=Chat.objects.get(id=room_name)
        print("chat",)
        Message.objects.create(user=profile,chat=chat,content=message)
