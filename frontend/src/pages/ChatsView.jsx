import React, { useState } from 'react'
import { TopBar } from '../components/Dashboard/TopBar';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { apiClient, fetchMessages, sendMessage } from '../api';
import { useNavigate } from "react-router-dom";

function ChatsView() {
    const userId = useSelector((state) => state.auth.userid);
    const [chats,setChats] = useState([])
    
    const navigate = useNavigate();
  
    useEffect(() => {
        // console.log("fh")
        // fetchChats().then(data => {
        //     setChats(data);
        // });
        const fetchChats = async () => {
            try {
              const response = await apiClient.get(`/chats/?user=${userId}`);
              setChats(response.data)
            } catch (error) {
              console.error('Error fetching chats:', error);
              throw error;
            }
          };
          fetchChats()
    }, [userId] );  
  
    const handleChatView = (chatId) => {
        // slug =String(slug)
      navigate(`/chat/${chatId}`)
    };
  
    return (
      <div className="bg-white rounded-lg pb-4 shadow">
        <TopBar />
        {chats.map((chat) => (
          <div key={chat.id} className="m-4 border-2 cursor-pointer" onClick={() => handleChatView(chat.id)}>
            <p>{chat.name}</p>
            <p>{chat.team}</p>
          </div>
        ))}
      </div>
    );
}

export default ChatsView