import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: { main: "#F0F8FF" },
    secondary: {
      light: "#f6e9f0",
      main: "#d786b0",
      dark: "#cd678f",
      contrastText: "#890b44",
    },
  },
  typography: {
    fontFamily: `"Winky Rough", sans-serif`,
    body1: {
      fontWeight: 300,
    },
    button: {
      fontWeight: 600,
      textTransform: "lowercase",
    },
  },
});

export default theme;
