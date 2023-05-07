import React from "react";
import { ChatState } from "../Context/ChatProvider";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import { Box } from "@chakra-ui/layout";
import MyChats from "../components/miscellaneous/MyChats";
import ChatBox from "../components/ChatBox";
import { useState, useEffect } from "react";

import axios from "axios";

function ChatPage() {
  const { user } = ChatState();
  const [fetchAgain, setFetchAgain] = useState(false);
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:3000/api/chats/${user._id}`
        );
        setChats(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (user) {
      fetchChats();
    }
  }, [fetchAgain, user]);

  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <Box
        style={{ display: "flex" }}
        d="flex"
        justifyContent="space-between"
        w="100%"
        h="91.5vh"
        p="10px"
      >
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Box>
    </div>
  );
}

export default ChatPage;
