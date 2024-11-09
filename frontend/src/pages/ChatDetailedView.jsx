import { TopBar } from "../components/Dashboard/TopBar";
import React, { useEffect, useState, useRef } from "react";
import { fetchMessages, sendMessage } from "../api";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Button,
  TextField,
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

function ChatDetailedView() {
  const { slug } = useParams();
  console.log("slug", slug);
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const chatboxRef = useRef(null);
  const chatSocket = useRef(null);

  const username = useSelector((state) => state.auth.username);
  const userid = useSelector((state) => state.auth.userid);

  useEffect(() => {
    fetchMessages(slug).then((data) => {
      setMessages(data.messages);
    });

    chatSocket.current = new WebSocket(`ws://localhost:8000/ws/${slug}/`);
    console.log(slug);

    chatSocket.current.onopen = function (e) {
      console.log("The connection was setup successfully!");
    };

    chatSocket.current.onclose = function (e) {
      console.log("Something unexpected happened!");
    };

    chatSocket.current.onmessage = function (e) {
      const data = JSON.parse(e.data);
      const message = {
        user: { username:data.username,id:data.userid},
        content: data.message,
        id: new Date().getTime(), // Temporary ID, could be replaced with actual ID from server
      };
      console.log(message)
      setMessages((prevMessages) => [...prevMessages, message]);
      scrollToBottom();
    };

    return () => {
      chatSocket.current.close();
    };
  }, [slug]);

  const scrollToBottom = () => {
    chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
  };

  const handleSendMessage = () => {
    if (newMessage.length === 0) {
      alert("Add some input first!");
      return;
    }
    const messageData = {
      message: newMessage,
      userid:userid,
      username: username,
      room_name: slug,
    };

    chatSocket.current.send(JSON.stringify(messageData));
    setNewMessage("");
  };

  return (
    <div className="bg-white rounded-lg pb-4 shadow">
      <TopBar />
      <Container>
        <Typography variant="h4">Chat Room</Typography>
        <div
          className="jumbotron"
          id="chatbox"
          ref={chatboxRef}
          style={{
            padding: "4px 2px",
            maxHeight: "300px",
            overflowY: "scroll",
          }}
        >
          <List>
            {messages.map((message) => (
              <>
                {console.log(userid)}
                <ListItem key={message.id}>
                  <ListItemText
                    primary={message.user.username + ": " + message.content}
                    className={
                      message.user.id === userid ? "text-right" : "text-left"
                    }
                  />
                </ListItem>
              </>
            ))}
          </List>
        </div>
        <TextField
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Enter text here"
          fullWidth
          onKeyUp={(e) => {
            if (e.keyCode === 13) {
              e.preventDefault();
              handleSendMessage();
            }
          }}
        />
        <Button onClick={handleSendMessage} variant="contained" color="primary">
          Send
        </Button>
      </Container>
    </div>
  );
}

export default ChatDetailedView;
