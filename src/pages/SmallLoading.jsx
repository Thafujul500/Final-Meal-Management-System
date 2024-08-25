import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

function SmallLoading() {
  return (
    <Box sx={{ display: "flex" }}>
      <CircularProgress size={24} sx={{ marginLeft: "5px", color: "white" }} />{" "}
    </Box>
  );
}

export default SmallLoading;
