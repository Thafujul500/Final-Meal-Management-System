import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useGetDashBoardQuery } from "../../../redux/service/dashboardService";
import PeopleIcon from "@mui/icons-material/People";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import RamenDiningIcon from "@mui/icons-material/RamenDining";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
function DashBoard() {
  const { data } = useGetDashBoardQuery();
  const value = data?.data;

  const cardStyles = {
    minWidth: 275,
    margin: 2,
    padding: 1,
    boxShadow: 5,
    borderRadius: 2,
    textAlign: "center",
  };

  const cards = [
    {
      title: "Total Active Member",
      value: value?.totalActiveMember,
      icon: <PeopleIcon fontSize="large" />,
      color: "#f8bbd0",
    },
    {
      title: "Total Inactive Member",
      value: value?.totalInActiveMember,
      icon: <PersonOffIcon fontSize="large" />,
      color: "#c5e1a5",
    },
    {
      title: "Total Positive Member",
      value: value?.totalPositiveMember,
      icon: <ThumbUpIcon fontSize="large" />,
      color: "#ffcc80",
    },
    {
      title: "Total Negative Member",
      value: value?.totalNegativeMember,
      icon: <ThumbDownIcon fontSize="large" />,
      color: "#80deea",
    },
    {
      title: "Total Deposit",
      value: value?.totalDeposit,
      icon: <AttachMoneyIcon fontSize="large" />,
      color: "#ffab91",
    },
    {
      title: "Total Cost",
      value: value?.totalCost,
      icon: <AccountBalanceIcon fontSize="large" />,
      color: "#e6ee9c",
    },
    {
      title: "Total Meal",
      value: value?.totalMeal?.toFixed(2),
      icon: <RamenDiningIcon fontSize="large" />,
      color: "#80cbc4",
    },
    {
      title: "Meal Rate",
      value: value?.mealRate?.toFixed(2),
      icon: <MonetizationOnIcon fontSize="large" />,
      color: "#bcaaa4",
    },
    {
      title: "Total Cash In Hand",
      value: value?.totalCashInHand,
      icon: <AccountBalanceWalletIcon fontSize="large" />,
      color: "#9fa8da",
    },
  ];

  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      <Grid container spacing={2}>
        {cards?.map((card, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                ...cardStyles,
                backgroundColor: cards[index].color,
              }}
            >
              <CardContent>
                {card?.icon}
                <Typography variant="h6" component="div" color="text.primary">
                  {card?.title}
                </Typography>
                <Typography
                  sx={{ mb: 1.5, fontSize: "20px" }}
                  color="text.secondary"
                >
                  {card?.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default DashBoard;
