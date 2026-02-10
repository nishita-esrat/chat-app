import { Avatar, Typography, IconButton, Box, Tooltip } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { FriendCard, FriendInfo, acceptBtn, rejectBtn } from "../styles/friend";


const FriendRequestItem = () => {
  const onAccept = () => {};
  const onReject = () => {};
  return (
    <FriendCard>
      <FriendInfo>
        <Avatar src="" />
        <Typography variant="body1" color="secondary">
          yash
        </Typography>
      </FriendInfo>

      <Box display="flex" gap={1}>
        <Tooltip title="Accept">
          <IconButton sx={acceptBtn} onClick={onAccept} >
            <CheckCircleOutlineIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Reject">
          <IconButton sx={rejectBtn} onClick={onReject}>
            <CancelOutlinedIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </FriendCard>
  );
};

export default FriendRequestItem;
