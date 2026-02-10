export const palette = (mode) => ({
  mode,
  primary: {
    light: mode === "light" ? "#fff0fc45" : "#14171e",
    main: mode === "light" ? "#f4f1f4" : "#0f1115",
    dark: mode === "light" ? "#fdedfc7d" : "#0a0b0f",
  },
  secondary: {
    light: "#ffe4ed",
    main: "#d786b0",
    dark: "#cd678f",
    contrastText: "#890b44",
  },
  text: {
    primary: mode === "light" ? "#0c0c0d" : "#ffffff",
    secondary: "#99989f",
    muted: "#5a5564",
    hover: "#d786b014",
  },
});
