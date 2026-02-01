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
  const [activeView, setActiveView] = useState("list");

  return (
    <Box
      height="100vh"
      display="flex"
      flexDirection={isMobile ? "column" : "row"}
    >
      {/* laptop view */}
      {!isMobile && (
        <>
          <Sidebar setActiveView={setActiveView} value={activeView} />
          {activeView === "list" && <ChatList />}
          {activeView === "notifications" && <Settings />}
          {activeView === "friends" && <Settings />}
          {activeView === "me" && <Settings />}
          <ChatWindow />
        </>
      )}
      {/* mobile view */}
      {isMobile && (
        <>
          <Box flex={1}>
            {activeView === "list" && <ChatList />}
            {activeView === "chat" && <ChatWindow />}
            {activeView === "notifications" && <Settings />}
            {activeView === "friends" && <Settings />}
            {activeView === "me" && <Settings />}
          </Box>

          <MobileSidebar value={activeView} setActiveView={setActiveView} />
        </>
      )}
    </Box>
  );
};

export default Home;
