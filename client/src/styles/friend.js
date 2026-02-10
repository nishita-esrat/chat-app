import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

export const FriendCard = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",

  padding: theme.spacing(1.5),
  margin: theme.spacing(1, 0),
  borderRadius: theme.spacing(1.5),
  backgroundColor: theme.palette.background.paper,

  boxShadow: theme.shadows[1],

  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));

export const FriendInfo = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: 12,
});

export const acceptBtn = {
  color: "secondary.main",
  transition: "0.2s",
  "&:hover": {
    transform: "scale(1.1)",
  },
};

export const rejectBtn = {
  color: "text.muted",
  transition: "0.2s",
  "&:hover": {
    transform: "scale(1.1)",
  },
};
