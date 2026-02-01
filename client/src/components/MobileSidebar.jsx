import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import Avatar from "@mui/material/Avatar";

const MobileSidebar = ({ value, setActiveView }) => (
  <Paper
    elevation={3}
    sx={{
      position: "fixed",
      bottom: 0,
      right: 0,
      width: "100vw",
      zIndex: 1300,
    }}
  >
    <BottomNavigation
      value={value}
      onChange={(_e, newValue) => setActiveView(newValue)}
      showLabels
      sx={{
        justifyContent: "space-between",
        bgcolor: "primary.main",
        "& .MuiBottomNavigationAction-root": {
          color: "secondary.main",
        },
        "& .MuiBottomNavigationAction-root.Mui-selected": {
          color: "secondary.main",
          bgcolor: "secondary.light",
        },
      }}
    >
      <BottomNavigationAction
        label="Chats"
        value="list"
        icon={<ChatIcon />}
        color="secondary.main "
      />
      <BottomNavigationAction
        label="Friends"
        value="friends"
        icon={<PeopleOutlineIcon />}
      />
      <BottomNavigationAction
        label="Notifications"
        value="chat"
        icon={<NotificationsNoneIcon />}
      />
      <BottomNavigationAction
        label="Profile"
        value="me"
        icon={<Avatar sx={{ width: 22, height: 22 }} />}
      />
    </BottomNavigation>
  </Paper>
);
export default MobileSidebar;
