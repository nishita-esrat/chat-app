import React from "react";
import { Outlet } from "react-router";
import  ThemeModeProvider  from "./context/ThemeModeContext";

const App = () => {
  return (
    <>
      <ThemeModeProvider>
        <Outlet />
      </ThemeModeProvider>
    </>
  );
};

export default App;
