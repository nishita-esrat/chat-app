import React from "react";
import Form from "../components/Form";

const loginFields = [
  { name: "email", label: "Email", type: "email" },
  {
    name: "password",
    label: "Password",
    type: "password",
    togglePassword: true,
  },
];

const Login = () => {
  return (
    <Form
      fields={loginFields}
      buttonText="Login"
      showForgot={true}
      forgotHref="/"
      title="Sign in"
      subtitle="Sign in to continue to Chatvia."
      question="Don't have an account?"
      linkText="Signup now"
      linkHref="/sign-up"
    ></Form>
  );
};

export default Login;
