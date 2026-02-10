import { styled } from "@mui/material/styles";
import { Box } from "@mui/material"; 



export const SideContainer = styled(Box)(({ theme }) => ({
  minWidth: 320,
  height: "100vh",
  display: "flex",
  flexDirection: "column",

  backgroundColor: theme.palette.primary.light,
  borderRight: `1px solid ${theme.palette.divider}`,

  padding: theme.spacing(2),
  overflowY: "auto",
}));
