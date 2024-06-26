"use client";
import * as React from "react";
import {
  Box,
  Link,
  Grid,
  Avatar,
  Button,
  Checkbox,
  Container,
  TextField,
  Typography,
  CssBaseline,
  FormControlLabel,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { signUp } from "../api/realState/realState";
import { useRouter } from "next/navigation";
import CommonAlert from "@/shared/alert";

interface IError {
  code: string;
}
const Copyright = (props: any) => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Real-Estate
      </Link>{" "}
      {new Date().getFullYear()}
    </Typography>
  );
};

const SignUp = () => {
  const Router = useRouter();
  const [info, setInfo] = React.useState<{
    messageType: string;
    message: string;
  }>();
  const [signupFormDetails, setSignupFormDetails] = React.useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmation: false,
  });
  const { first_name, last_name, email, password, confirmation } =
    signupFormDetails;

  const handleSubmit = async (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    event.preventDefault();
    const { result, error } = await signUp(email, password);
    const { code } = error as IError;
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
          message: `You registered an account on Ghar-Dekho, before being able to use your account you need to verify your email first.`,
        });
      }
    }

    console.log({ result, error });
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
    <Container component="main" maxWidth="xs">
      <CssBaseline />

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
          Sign up
        </Typography>
        <Box component="form" noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                autoFocus
                id="firstName"
                name="firstName"
                label="First Name"
                value={first_name}
                onChange={(event) => handleChange("first_name", event)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                name="lastName"
                label="Last Name"
                value={last_name}
                onChange={(event) => handleChange("last_name", event)}
              />
            </Grid>
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
            {/* <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="phone"
                label="Phone"
                name="phone"
                value={phone}
                onChange={(event) => handleChange("phone", event)}
              />
            </Grid> */}
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
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                    value="allowExtraEmails"
                    onChange={(event) => handleChange("confirmation", event)}
                  />
                }
                label="I want to receive inspiration, marketing promotions and updates via email."
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
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 30 }} />
    </Container>
    // </ThemeProvider>
  );
};

export default SignUp;
