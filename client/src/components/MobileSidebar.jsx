import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import Chat from "@mui/icons-material/Chat";
import Settings from "@mui/icons-material/Settings";

const MobileSidebar = ({ value, setActiveView }) => (
  <Paper
    elevation={3}
    sx={{
      position: "fixed",
      bottom: 0,
      right: 0,
      width: "100vw",
      bgcolor: "background.paper",
      zIndex: 1300,
    }}
  >
    <BottomNavigation
      value={value}
      onChange={(e, newValue) => setActiveView(newValue)}
      showLabels
    >
      <BottomNavigationAction label="Chats" value="list" icon={<Chat />} />
      <BottomNavigationAction label="Chat" value="chat" icon={<Chat />} />
      <BottomNavigationAction
        label="Settings"
        value="settings"
        icon={<Settings />}
      />
    </BottomNavigation>
  </Paper>
);
export default MobileSidebar;
