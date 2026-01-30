import { Box, IconButton } from "@mui/material";
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import Settings from "@mui/icons-material/Settings";
import Link from "@mui/material/Link";
import ChatIcon from "@mui/icons-material/Chat";

const Sidebar = ({ setActiveView }) => (
  <Box
    width={80}
    display="flex"
    flexDirection="column"
    alignItems="center"
    justifyContent={"space-between"}
    py={2}
    borderRight="1px solid"
    borderColor="divider"
    color="secondary"
  >
    <Box  >
      <Link href="/" underline="none">
      <ChatIcon color="secondary"/>
      </Link>
    </Box>
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap={1}
    >
      <IconButton color="secondary" onClick={() => setActiveView("list")}>
        <ChatBubbleOutlineOutlinedIcon />
      </IconButton>
      <IconButton color="secondary" onClick={() => setActiveView("settings")}>
        <Settings />
      </IconButton>
    </Box>
    <Box></Box>
  </Box>
);

export default Sidebar;
