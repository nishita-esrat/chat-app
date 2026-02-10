import React from "react";
import { Box, Typography, TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SideHeader = ({ title }) => {
  return (
    <Box display="flex" flexDirection="column" gap={2} marginBottom={2}>
      <Typography variant="body1" color="secondary">
        {title}
      </Typography>
      <TextField
        label="Search users"
        id="standard-start-adornment"
        color="secondary"
        sx={{
          width: "100%",

          /* typed text */
          "& .MuiInputBase-input": {
            color: "secondary.main",
          },

          /* label */
          "& .MuiInputLabel-root": {
            color: "secondary.main",
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "secondary.main",
          },

          /* underline */
          "& .MuiInput-underline:before": {
            borderBottomColor: "secondary.main",
          },

          /* hover */
          "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
            borderBottomColor: "secondary.main",
          },

          "& .MuiInput-underline:after": {
            borderBottomColor: "secondary.main",
          },
        }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="secondary" />
              </InputAdornment>
            ),
          },
        }}
        variant="standard"
      />
    </Box>
  );
};

export default SideHeader;
