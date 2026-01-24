import React from "react";
import Form from "../components/Form";

const registrationFields = [
  { name: "name", label: "Name", type: "text" },
  { name: "email", label: "Email", type: "email" },
  {
    name: "password",
    label: "Password",
    type: "password",
    togglePassword: true,
  },
];

const Registration = () => {
  return (
    <Form
      fields={registrationFields}
      buttonText="register"
      showForgot={false}
      forgotHref="/"
      title="Sign up"
      subtitle="Get your Chatvia account now."
      question="Already have an account ?"
      linkText="Signin now"
      linkHref="/sign-in"
    ></Form>
  );
};

export default Registration;
