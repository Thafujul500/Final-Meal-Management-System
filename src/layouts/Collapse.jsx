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

const navItems = [
  { to: "/", icon: <DashboardIcon />, label: "Dashboard" },
  { to: "/member", icon: <PeopleAltIcon />, label: "Members" },
  { to: "/deposit", icon: <MonetizationOnIcon />, label: "Deposit" },
  { to: "/market", icon: <LocalGroceryStoreIcon />, label: "Market" },
  { to: "/meal", icon: <FastfoodIcon />, label: "Meal" },
  { to: "/summary", icon: <SummarizeIcon />, label: "Summary" },
];

function Collapse() {
  return (
    <Box
      sx={{
        width: "70px",
        height: "100vh",
        position: "fixed",
        top: "0px",
        left: "0px",
        backgroundColor: "#70c4bc",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <RestaurantIcon
        sx={{
          marginTop: "20px",
          marginBottom: "18px",
          marginLeft: "18px",
        }}
      />
      {navItems.map((item, index) => (
        <NavLink
          key={index}
          to={item.to}
          style={{ textDecoration: "none", color: "black" }}
        >
          {React.cloneElement(item.icon, {
            sx: {
              marginTop: "18px",
              marginBottom: "18px",
              marginLeft: "18px",
            },
          })}
        </NavLink>
      ))}
    </Box>
  );
}

export default Collapse;
