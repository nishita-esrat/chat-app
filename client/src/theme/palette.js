export const palette = (mode) => ({
  mode,
  primary: { main: mode === "light" ? "#F0F8FF" : "#121212" },
  secondary: {
    light: "#f6e9f0",
    main: "#d786b0",
    dark: "#cd678f",
    contrastText: "#890b44",
  },
  text: {
    primary: mode === "light" ? "#0c0c0d" : "#ffffff",
    secondary: "#99989f",
    muted: "#5a5564",
  },
});
