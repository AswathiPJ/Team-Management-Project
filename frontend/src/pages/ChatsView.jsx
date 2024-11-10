import { TopBar } from "../components/Dashboard/TopBar";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { apiClient } from "../api";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

function ChatsView() {
  const userId = useSelector((state) => state.auth.userid);
  const [chats, setChats] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await apiClient.get(`/chats/?user=${userId}`);
        setChats(response.data);
        console.log(response.data)
      } catch (error) {
        console.error("Error fetching chats:", error);
        throw error;
      }
    };
    fetchChats();
  }, [userId]);

  const handleChatView = (chatId) => {
    navigate(`/chat/${chatId}`);
  };

  return (
    <div className="bg-white rounded-lg pb-4 shadow">
      <TopBar />
      <div className="grid grid-cols-3 gap-4 p-4">
        {chats.map((chat) => (
          <CardComponent key={chat.id} chat={chat} onClick={() => handleChatView(chat.id)} />
        ))}
      </div>
    </div>
  );
}

const CardComponent = ({ chat, onClick }) => {
  return (
    <div onClick={onClick} className="card bg-base-100 w-72 shadow-xl cursor-pointer">
      <div className="card-body p-4">
        <p className="card-title">
          {chat.name}
        </p>
        <p>{chat.team}</p>
      </div>
    </div>
  );
};

export default ChatsView;

CardComponent.propTypes = {
  chat: PropTypes.object,
  onClick: PropTypes.func
};
