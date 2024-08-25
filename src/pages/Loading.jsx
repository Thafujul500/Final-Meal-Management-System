import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

function Loading() {
  return (
    <div>
      {" "}
      <Box
        sx={{ display: "flex", justifyContent: "center", marginTop: "40px" }}
      >
        <CircularProgress />
      </Box>
    </div>
  );
}

export default Loading;
