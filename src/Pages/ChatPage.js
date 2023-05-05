import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";

function ChatPage() {
  const [chats, setChats] = useState([]);
  const fetchChats = async () => {
    const data = await axios.get("http://localhost:3000/");
    setChats(data.data);
    console.log(data);
  };

  useEffect(() => {
    fetchChats();
  }, []);
  return (
    <div>
      {chats.map((chat) => (
        <div key={chat._id}>{chat.chatName}</div>
      ))}
    </div>
  );
}

export default ChatPage;
