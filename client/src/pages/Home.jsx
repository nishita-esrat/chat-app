import React from "react";
import { Button, Box } from "@mui/material";

const Home = () => {
  return (
    <>
      <Box sx={{backgroundColor:"primary.main",p:2}}>
        <Button variant="contained">Themed Button</Button>
        <Button color="secondary" variant="contained">Themed Button</Button>
      </Box>
    </>
  );
};

export default Home;
