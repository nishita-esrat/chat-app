import Tooltip from "@mui/material/Tooltip";
import { IconButton } from "@mui/material";
import { navButtonStyle } from "../styles/sidebar";
const SidebarButton = ({ title, active = false, onClick, children }) => (
  <Tooltip
    title={title}
    placement="right"
    slotProps={{
      tooltip: {
        sx: {
          bgcolor: "text.primary",
          color: "text.secondary",
          fontSize: 12,
        },
      },

    }}
  >
    <IconButton onClick={onClick} sx={navButtonStyle(active)}>
      {children}
    </IconButton>
  </Tooltip>
);

export default SidebarButton;
