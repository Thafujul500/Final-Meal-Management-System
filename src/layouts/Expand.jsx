import { Box } from "@mui/material";
import React from "react";
import {
  Restaurant as RestaurantIcon,
  Dashboard as DashboardIcon,
  PeopleAlt as PeopleAltIcon,
  MonetizationOn as MonetizationOnIcon,
  LocalGroceryStore as LocalGroceryStoreIcon,
  Fastfood as FastfoodIcon,
  Summarize as SummarizeIcon,
} from "@mui/icons-material";
import Typography from "@mui/material/Typography";
import { NavLink } from "react-router-dom";

const menuItems = [
  { label: "Dashboard", icon: <DashboardIcon />, path: "/" },
  { label: "Member", icon: <PeopleAltIcon />, path: "/member" },
  { label: "Deposit", icon: <MonetizationOnIcon />, path: "/deposit" },
  { label: "Market", icon: <LocalGroceryStoreIcon />, path: "/market" },
  { label: "Meal", icon: <FastfoodIcon />, path: "/meal" },
  { label: "Summary", icon: <SummarizeIcon />, path: "/summary" },
];

function Expand() {
  return (
    <Box
      sx={{
        width: "180px",
        height: "100vh",
        backgroundColor: "#70c4bc",
        position: "fixed",
        top: "0px",
        left: "0px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          padding: "20px 10px",
        }}
      >
        <RestaurantIcon />
        <Typography
          variant="h6"
          sx={{
            fontSize: "19px",
            marginLeft: "10px",
          }}
        >
          Bite & Share
        </Typography>
      </Box>

      {/* Menu Items */}
      {menuItems.map((item, index) => (
        <NavLink
          key={index}
          to={item.path}
          style={{
            textDecoration: "none",
            color: "black",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              padding: "15px 10px",
              "&:hover": {
                backgroundColor: "#5ba8a0",
              },
            }}
          >
            {item.icon}
            <Typography
              variant="h6"
              sx={{
                fontSize: "19px",
                marginLeft: "10px",
              }}
            >
              {item.label}
            </Typography>
          </Box>
        </NavLink>
      ))}
    </Box>
  );
}

export default Expand;
