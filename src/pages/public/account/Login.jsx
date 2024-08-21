import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../../redux/service/auth/authService";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

function Login() {
  const [login, { data }] = useLoginMutation();
  const navigate = useNavigate();

  const defaultValue = {
    mobile: "01710303309",
    password: "MMS12345",
  };

  const Schema = yup
    .object({
      mobile: yup.string().required("Mobile is required"),
      password: yup.string().required("Password is required"),
    })
    .required();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(Schema),
    defaultValues: defaultValue,
    mode: "all",
  });

  const onSubmit = (value) => {
    console.log(value);
    login(value);
  };

  useEffect(() => {
    if (data?.data?.token) {
      localStorage.setItem("token", data?.data?.token);
      navigate("/");
    }
  }, [data, navigate]);

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "#e0f7fa",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            height: "auto",
            width: "90%",
            maxWidth: "400px",
            backgroundColor: "#ffffff",
            border: "2px solid #00acc1",
            padding: "30px",
            borderRadius: "15px",
            boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography
            variant="h5"
            component="h2"
            sx={{
              marginBottom: "20px",
              fontWeight: "bold",
              color: "#00695c",
            }}
          >
            Welcome to Bite & Share
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Controller
              name="mobile"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Phone Number"
                  variant="outlined"
                  type="text"
                  fullWidth
                  margin="normal"
                  {...field}
                  error={!!errors.mobile}
                  helperText={errors.mobile ? errors.mobile.message : ""}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "10px",
                      backgroundColor: "#e0f2f1",
                    },
                    "& .MuiInputLabel-root": {
                      color: "#004d40",
                    },
                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                      {
                        borderColor: "#00796b",
                      },
                  }}
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Password"
                  variant="outlined"
                  type="password"
                  fullWidth
                  margin="normal"
                  {...field}
                  error={!!errors.password}
                  helperText={errors.password ? errors.password.message : ""}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "10px",
                      backgroundColor: "#ffecb3",
                    },
                    "& .MuiInputLabel-root": {
                      color: "#f57f17",
                    },
                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                      {
                        borderColor: "#f9a825",
                      },
                  }}
                />
              )}
            />

            <Button
              variant="contained"
              color="secondary"
              type="submit"
              fullWidth
              sx={{
                marginTop: "20px",
                padding: "10px",
                borderRadius: "10px",
                backgroundColor: "#556B2F",
                "&:hover": {
                  backgroundColor: "#808080",
                },
                color: "#ffffff",
              }}
            >
              Submit
            </Button>
          </form>
        </Box>
      </Box>
    </div>
  );
}

export default Login;
