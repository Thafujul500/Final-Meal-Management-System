import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

function Loading({ size }) {
  return (
    <div>
      {" "}
      <Box
        sx={{ display: "flex", justifyContent: "center", marginTop: "40px" }}
      >
        <CircularProgress size={size} />
      </Box>
    </div>
  );
}

export default Loading;
