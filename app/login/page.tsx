"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Link,
  Grid,
  Avatar,
  Button,
  Container,
  TextField,
  Typography,
  CssBaseline,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { signIn } from "../api/realState/realState";
import CommonAlert from "@/shared/alert";

interface IError {
  code: string;
}

const SignIn = () => {
  const Router = useRouter();
  const [info, setInfo] = React.useState<{
    messageType: string;
    message: string;
  }>();
  const [signupFormDetails, setSignupFormDetails] = React.useState({
    email: "",
    password: "",
  });
  const { email, password } = signupFormDetails;

  const handleSubmit = async (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    event.preventDefault();
    console.log({ signupFormDetails });
    const { result, error } = await signIn(email, password);
    const { code } = error as IError;
    console.log({ result, error });
    const user = result?.user;
    if (user && user?.emailVerified) {
      Router.push("/dashboard");
    } else {
      if (error && code === "auth/email-already-in-use") {
        setInfo({
          messageType: "error",
          message:
            "Email already in user, Please try signing in using different email address.",
        });
      } else {
        setInfo({
          messageType: "success",
          message: `Email varification is missing. please verify your email first.`,
        });
      }
    }
  };

  const handleChange = (
    field: string,
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | any>
  ) => {
    console.log({ field, event });
    if (field === "confirmation") {
      setSignupFormDetails({
        ...signupFormDetails,
        [`${field}`]: event.target.checked,
      });
    } else {
      setSignupFormDetails({
        ...signupFormDetails,
        [`${field}`]: event.target.value,
      });
    }
  };

  return (
    // <ThemeProvider theme={defaultTheme}>
    <>
      {/* <CssBaseline /> */}
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {info?.message && (
          <CommonAlert
            severityType={info?.messageType}
            content={info?.message}
          />
        )}
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box component="form" noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={email}
                onChange={(event) => handleChange("email", event)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={password}
                onChange={(event) => handleChange("password", event)}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={(
              e: React.MouseEvent<HTMLAnchorElement, MouseEvent> | any
            ) => handleSubmit(e)}
          >
            Sign In
          </Button>
        </Box>
      </Box>
      <div style={{ marginTop: "450px" }}></div>
    </>
    // </ThemeProvider>
  );
};

export default SignIn;
