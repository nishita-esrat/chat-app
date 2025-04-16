import React from "react";
import { Button, Box , Typography } from "@mui/material";


const Home = () => {
  return (
    <>
      <Box sx={{backgroundColor:"primary.main",p:2}}>
        <Button variant="contained">Themed Button</Button>
        <Button color="secondary">Themed Button</Button>
        <Typography variant="body1">
        texttttt?
      </Typography>
      </Box>
    </>
  );
};

export default Home;
