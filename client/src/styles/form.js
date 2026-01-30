import { styled } from "@mui/material/styles";
import { Box, Paper, Button, Link, Typography, TextField } from "@mui/material";

/* Page wrapper */
export const PageWrapper = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  backgroundColor: theme.palette.primary.main,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: theme.spacing(5),
  padding: theme.spacing(5, 0),
}));

/* Header container */
export const Header = styled(Box)(() => ({
  textAlign: "center",
}));

/* Logo link */
export const LogoLink = styled(Link)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: theme.spacing(1),
  marginBottom: theme.spacing(2),
}));

/* Login card */
export const FormCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  width: 360,
}));

/* Forgot password link */
export const ForgotLink = styled(Link)(({ theme }) => ({
  display: "block",
  textAlign: "right",
  marginTop: theme.spacing(1),
  color: theme.palette.text.secondary,
  textDecoration: "underline",
}));

/* Login button */
export const LoginButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  borderColor: theme.palette.secondary.main,
  color: theme.palette.secondary.main,

  "&:hover": {
    backgroundColor: theme.palette.secondary.light,
  },
}));

/* Footer */
export const Footer = styled(Box)(({ theme }) => ({
  textAlign: "center",
  color: theme.palette.text.muted,
}));

export const FooterText = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(1),
}));

// input text field
export const StyledTextField = styled(TextField)(({ theme }) => ({
  /* input text */
  "& .MuiInputBase-input": {
    color: theme.palette.text.secondary,
  },

  /* label */
  "& .MuiInputLabel-root": {
    color: theme.palette.text.secondary,
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: theme.palette.text.secondary,
  },

  /* hover border */
  "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.secondary.main,
  },

  /* focused border */
  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.text.secondary,
  },
}));

// theme mode
export const ThemeMode = styled(Box)(({theme})=>({
  position: "fixed",
  top: theme.spacing(2),
  right: theme.spacing(2),
  zIndex: 1300,
}))

