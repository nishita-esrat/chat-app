import React, { useState } from "react";
import { Box, useTheme, useMediaQuery } from "@mui/material";
import Sidebar from "../components/Sidebar";
import MobileSidebar from "../components/MobileSidebar";
import ChatList from "../components/ChatList";
import ChatWindow from "../components/ChatWindow";
import Settings from "../components/Settings";

const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [activeView, setActiveView] = useState(isMobile ? "chat" : "list");

  return (
    <Box
      height="100vh"
      display="flex"
      flexDirection={isMobile ? "column" : "row"}
    >
      {!isMobile && (
        <>
          <Sidebar setActiveView={setActiveView} />
          {activeView === "list" && <ChatList />}
          {activeView === "settings" && <Settings />}
          <ChatWindow />
        </>
      )}
      {isMobile && (
        <>
          <Box flex={1}>
            {activeView === "list" && <ChatList />}
            {activeView === "chat" && <ChatWindow />}
            {activeView === "settings" && <Settings />}
          </Box>

          <MobileSidebar value={activeView} setActiveView={setActiveView} />
        </>
      )}
    </Box>
  );
};

export default Home;
