import React from "react";
import SideHeader from "./SideHeader";
import { Box } from "@mui/material";
import { SideContainer } from "../styles/sideContainer";
import FriendRequestItem from "./FriendRequestItem";

const Friend = () => {
  return (
    <>
      <SideContainer>
        <SideHeader title="Friend request" />
        <FriendRequestItem />
        <FriendRequestItem />
        <FriendRequestItem />
        <FriendRequestItem /> 
        <FriendRequestItem /> 
        <FriendRequestItem />
        <FriendRequestItem /> 
        <FriendRequestItem /> 
        <FriendRequestItem />
        <FriendRequestItem /> 
        <FriendRequestItem /> 
        <FriendRequestItem />
      </SideContainer>
    </>
  );
};

export default Friend;
