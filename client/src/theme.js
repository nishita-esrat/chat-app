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
    fontFamily: `'Poppins', 'Roboto', 'Helvetica', 'Arial', sans-serif`,
  },
});

export default theme;
