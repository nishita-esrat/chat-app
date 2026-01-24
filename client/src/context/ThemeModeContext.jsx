import { createContext, useContext, useMemo, useState } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "../theme";

const ThemeModeContext = createContext();

export const useThemeMode = () => useContext(ThemeModeContext);

const ThemeModeProvider = ({ children }) => {
  const [mode, setMode] = useState("light");

  const toggleTheme = () =>
    setMode((prev) => (prev === "light" ? "dark" : "light"));

  const muiTheme = useMemo(() => theme(mode), [mode]);

  return (
    <ThemeModeContext.Provider value={{ mode, toggleTheme }}>
      <ThemeProvider theme={muiTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
};
export default ThemeModeProvider;
