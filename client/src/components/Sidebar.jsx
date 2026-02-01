import { Box } from "@mui/material";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import Link from "@mui/material/Link";
import ChatIcon from "@mui/icons-material/Chat";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import LogoutIcon from "@mui/icons-material/Logout";
import Avatar from "@mui/material/Avatar";
import Mode from "./Mode";
import SidebarButton from "./SidebarButton";
import { Container } from "../styles/sidebar";

const Sidebar = ({ setActiveView, value }) => (
  <Container>
    <Box>
      <Link href="/" underline="none">
        <ChatIcon color="secondary" />
      </Link>
    </Box>
    <Box display="flex" flexDirection="column" gap={1}>
      <SidebarButton
        title="Chats"
        active={value === "list"}
        onClick={() => setActiveView("list")}
      >
        <ChatBubbleOutlineOutlinedIcon />
      </SidebarButton>
      <SidebarButton
        title="Friends"
        active={value === "friends"}
        onClick={() => setActiveView("friends")}
      >
        <PeopleOutlineIcon />
      </SidebarButton>
      <SidebarButton
        title="Notifications"
        active={value === "notifications"}
        onClick={() => setActiveView("notifications")}
      >
        <NotificationsNoneIcon />
      </SidebarButton>
    </Box>
    <Box display="flex" flexDirection="column" gap={1}>
      <Mode />
      <SidebarButton
        title="Profile"
        active={value === "me"}
        onClick={() => setActiveView("me")}
      >
        <Avatar src="/broken-image.jpg" sx={{ width: 24, height: 24 }} />
      </SidebarButton>
      <SidebarButton title="Logout" onClick={() => console.log("logout")}>
        <LogoutIcon />
      </SidebarButton>
    </Box>
  </Container>
);

export default Sidebar;
