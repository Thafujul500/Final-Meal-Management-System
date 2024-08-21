import { Box } from "@mui/material";
import React from "react";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import SummarizeIcon from "@mui/icons-material/Summarize";
import Typography from "@mui/material/Typography";
import { NavLink } from "react-router-dom";

function Expand() {
  return (
    <div>
      <Box
        sx={{
          width: "180px",
          height: "100vh",
          backgroundColor: "gray",
          position: "absolute",
          display: "flex",
          flexDirection: "column",
          position: "fixed",
          top: "0px",
          left: "0px",
          backgroundColor: "#70c4bc",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <RestaurantIcon
            sx={{
              marginTop: "20px",
              marginLeft: "10px",
            }}
          />
          <Typography
            variant="h6"
            sx={{
              fontSize: "19px",
              marginTop: "20px",
              marginLeft: "10px",
              marginBottom: "13px",
            }}
          >
            Bite & Share{" "}
          </Typography>
        </Box>

        <NavLink to="/" style={{ textDecoration: "none", color: "black" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              color: "black",
              textDecoration: "none",
            }}
          >
            <DashboardIcon sx={{ marginTop: "15px", marginLeft: "10px" }} />
            <Typography
              variant="h6"
              className="text"
              sx={{
                fontSize: "19px",
                marginTop: "15px",
                marginBottom: "15px",
                marginLeft: "10px",
                color: "black",
                textDecoration: "none",
              }}
            >
              Dashboard{" "}
            </Typography>
          </Box>
        </NavLink>

        <NavLink
          to="/member"
          style={{ textDecoration: "none", color: "black" }}
        >
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <PeopleAltIcon sx={{ marginTop: "15px", marginLeft: "10px" }} />
            <Typography
              variant="h6"
              sx={{
                fontSize: "19px",
                marginTop: "15px",
                marginBottom: "15px",
                marginLeft: "10px",
              }}
            >
              Member{" "}
            </Typography>
          </Box>
        </NavLink>

        <NavLink
          to="/deposit"
          style={{ textDecoration: "none", color: "black" }}
        >
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <MonetizationOnIcon
              sx={{ marginTop: "15px", marginLeft: "10px" }}
            />
            <Typography
              variant="h6"
              sx={{
                fontSize: "19px",
                marginTop: "15px",
                marginBottom: "15px",
                marginLeft: "10px",
              }}
            >
              Deposit{" "}
            </Typography>
          </Box>
        </NavLink>

        <NavLink
          to="/market"
          style={{ textDecoration: "none", color: "black" }}
        >
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <LocalGroceryStoreIcon
              sx={{ marginTop: "15px", marginLeft: "10px" }}
            />
            <Typography
              variant="h6"
              sx={{
                fontSize: "19px",
                marginTop: "15px",
                marginBottom: "15px",
                marginLeft: "10px",
              }}
            >
              Market{" "}
            </Typography>
          </Box>
        </NavLink>

        <NavLink to="/meal" style={{ textDecoration: "none", color: "black" }}>
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <FastfoodIcon sx={{ marginTop: "15px", marginLeft: "10px" }} />
            <Typography
              variant="h6"
              sx={{
                fontSize: "19px",
                marginTop: "15px",
                marginBottom: "15px",
                marginLeft: "10px",
              }}
            >
              Meal{" "}
            </Typography>
          </Box>
        </NavLink>

        <NavLink
          to="/summary"
          style={{ textDecoration: "none", color: "black" }}
        >
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <SummarizeIcon sx={{ marginTop: "15px", marginLeft: "10px" }} />
            <Typography
              variant="h6"
              sx={{
                fontSize: "19px",
                marginTop: "15px",
                marginBottom: "15px",
                marginLeft: "10px",
              }}
            >
              Summary{" "}
            </Typography>
          </Box>
        </NavLink>
      </Box>
    </div>
  );
}

export default Expand;
