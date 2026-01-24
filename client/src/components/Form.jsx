import React, { useState } from "react";
import { Typography, IconButton, InputAdornment, Link } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import ChatIcon from "@mui/icons-material/Chat";
import {
  PageWrapper,
  Header,
  LogoLink,
  FormCard,
  ForgotLink,
  LoginButton,
  Footer,
  FooterText,
  StyledTextField,
  ThemeMode,
} from "../styles/form";
import Mode from "./Mode";

const Form = ({
  fields,
  buttonText,
  showForgot = false,
  forgotHref = "/",
  title,
  subtitle,
  question,
  linkText,
  linkHref,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <PageWrapper>
      {/* Header Section */}
      <Header>
        <LogoLink href="/" underline="none">
          <ChatIcon color="secondary" fontSize="large" />
          <Typography variant="h4" color="text.primary">
            Chatvia
          </Typography>
        </LogoLink>

        <Typography variant="h6" color="text.primary">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {subtitle}
        </Typography>
      </Header>

      {/* Login Form */}
      <FormCard>
        {fields &&
          fields.map((field) => (
            <StyledTextField
              label={field.label}
              type={
                field.type === "password" && showPassword ? "text" : field.type
              }
              fullWidth
              margin="normal"
              {...(field?.togglePassword
                ? {
                    slotProps: {
                      input: {
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={togglePasswordVisibility}
                              edge="end"
                              color="secondary"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      },
                    },
                  }
                : {})}
            />
          ))}
        {showForgot && (
          <ForgotLink href={forgotHref} variant="body2">
            Forgot password?
          </ForgotLink>
        )}

        <LoginButton variant="outlined" fullWidth type="submit">
          {buttonText}
        </LoginButton>
      </FormCard>

      {/* footer section */}
      <Footer variant="body2">
        <Typography>
          {question}
          <Link href={linkHref} color="secondary" ml={1}>
            {linkText}
          </Link>
        </Typography>
        <FooterText>© 2026 Chatvia. Crafted with by Nishita's brand</FooterText>
      </Footer>
      <ThemeMode>
        <Mode />
      </ThemeMode>
    </PageWrapper>
  );
};

export default Form;
