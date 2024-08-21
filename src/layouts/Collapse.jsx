import { Box } from "@mui/material";
import React from "react";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import SummarizeIcon from "@mui/icons-material/Summarize";
import { NavLink } from "react-router-dom";

function Collapse() {
  return (
    <div>
      <Box
        sx={{
          width: "70px",
          height: "100vh",
          backgroundColor: "gray",
          position: "static",
          left: "0px",
          display: "flex",
          flexDirection: "column",
          position: "fixed",
          top: "0px",
          backgroundColor: "#70c4bc",
        }}
      >
        <RestaurantIcon
          sx={{
            marginTop: "20px",
            marginBottom: "18px",
            marginLeft: "18px",
          }}
        />
        <NavLink to="/" style={{ textDecoration: "none", color: "black" }}>
          <DashboardIcon
            sx={{
              marginTop: "18px",
              marginBottom: "18px",
              marginLeft: "18px",
            }}
          />
        </NavLink>
        <NavLink
          to="/member"
          style={{ textDecoration: "none", color: "black" }}
        >
          <PeopleAltIcon
            sx={{
              marginTop: "18px",
              marginBottom: "18px",
              marginLeft: "18px",
            }}
          />
        </NavLink>

        <NavLink
          to="/deposit"
          style={{ textDecoration: "none", color: "black" }}
        >
          <MonetizationOnIcon
            sx={{
              marginTop: "18px",
              marginBottom: "18px",
              marginLeft: "18px",
            }}
          />
        </NavLink>
        <NavLink
          to="/market"
          style={{ textDecoration: "none", color: "black" }}
        >
          <LocalGroceryStoreIcon
            sx={{
              marginTop: "18px",
              marginBottom: "18px",
              marginLeft: "18px",
            }}
          />
        </NavLink>
        <NavLink to="/meal" style={{ textDecoration: "none", color: "black" }}>
          <FastfoodIcon
            sx={{
              marginTop: "18px",
              marginBottom: "18px",
              marginLeft: "18px",
            }}
          />
        </NavLink>
        <NavLink
          to="/summary"
          style={{ textDecoration: "none", color: "black" }}
        >
          <SummarizeIcon
            sx={{
              marginTop: "18px",
              marginBottom: "18px",
              marginLeft: "18px",
            }}
          />
        </NavLink>
      </Box>
    </div>
  );
}

export default Collapse;
