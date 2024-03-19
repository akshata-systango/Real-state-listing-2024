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
  const [signupFormDetails, setSignupFormDetails] = React.useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    phone: "",
    confirmation: false,
  });
  const { first_name, last_name, email, password, confirmation, phone } =
    signupFormDetails;

  const handleSubmit = (
    event: React.SyntheticEvent<HTMLFormElement, SubmitEvent>
  ) => {
    event.preventDefault();
    console.log({ signupFormDetails });
  };

  const handleChange = (
    field: string,
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="phone"
                label="Phone"
                name="phone"
                value={phone}
                onChange={(event) => handleChange("phone", event)}
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
            onClick={handleSubmit}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
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
