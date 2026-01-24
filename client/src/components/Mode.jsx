import React from "react";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useThemeMode } from "../context/ThemeModeContext";
import IconButton from "@mui/material/IconButton";

const Mode = () => {
  const { mode, toggleTheme } = useThemeMode();
  return (
    <IconButton onClick={toggleTheme} color="secondary">
      {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
    </IconButton>
  );
};

export default Mode;
