import { createTheme } from "@mui/material/styles";
import { palette } from "./palette";
import { typography } from "./typography";

const theme = (mode) =>
  createTheme({
    palette: palette(mode),
    typography: typography,
  });

export default theme;
