import React from "react";
import TextField from "@mui/material/TextField";

export const GlobalFilter = ({ filter, setFilter }) => {
  return (
    <span>
      <TextField
        id="standard-search"
        label="Search field"
        type="search"
        variant="standard"
        value={filter || ""}
        onChange={(e) => setFilter(e.target.value)}
      />
    </span>
  );
};
