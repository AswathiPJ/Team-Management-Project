import { TopBar } from "../components/Dashboard/TopBar";
import { useEffect, useState, useRef } from "react";
import { fetchMessages } from "../api";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

function ChatDetailedView() {
  const { slug } = useParams();
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
        user: { username: data.username, id: data.userid },
        content: data.message,
        id: new Date().getTime(),
      };
      console.log(message);
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    return () => {
      chatSocket.current.close();
    };
  }, [slug]);

  const scrollToBottom = () => {
    chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight + 16;
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages])

  const handleSendMessage = () => {
    if (newMessage.length === 0) {
      alert("Add some input first!");
      return;
    }
    const messageData = {
      message: newMessage,
      userid: userid,
      username: username,
      room_name: slug,
    };

    chatSocket.current.send(JSON.stringify(messageData));
    setNewMessage("");
  };

  return (
    <div className="bg-white rounded-lg pb-4 shadow">
      <TopBar />
      <div className="m-4">
        <div
          id="chatbox"
          ref={chatboxRef}
          className="max-h-96 overflow-y-scroll"
        >
          {messages.map((message) => (
            <ChatBubble
              key={message.id}
              sender={message.user.username}
              content={message.content}
              className={
                message.user.username === username ? "chat-end" : "chat-start"
              }
            />
          ))}
        </div>
        <input
          type="text"
          onChange={(e) => setNewMessage(e.target.value)}
          value={newMessage}
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs"
        />
        <button
          onClick={handleSendMessage}
          className="btn btn-primary rounded-lg m-4"
        >
          Send
        </button>
      </div>
    </div>
  );
}

const ChatBubble = ({ className, sender, content }) => {
  return (
    <div className={`chat ${className}`}>
      <div className="chat-header">
        {sender}
        <time className="text-xs opacity-50 pl-2">2 hours ago</time>
      </div>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            alt="user profile image"
            src={`https://ui-avatars.com/api/?background=random&name=${sender}`}
          />
        </div>
      </div>
      <div className="chat-bubble">{content}</div>
    </div>
  );
};

export default ChatDetailedView;

ChatBubble.propTypes = {
  className: PropTypes.string,
  sender: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};
