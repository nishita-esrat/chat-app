import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

export const navButtonStyle = (active) => ({
  transition: "background-color 0.5s ease",
  color: "secondary.main",
  bgcolor: active ? "secondary.light" : "transparent",
  "&:hover": {
    bgcolor: active ? "secondary.light" : "text.hover",
  },
});

export const Container = styled(Box)(({ theme }) => ({
  width: 80,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(2, 0),
  backgroundColor: theme.palette.primary.main,
  boxShadow: theme.shadows[6],
}));
