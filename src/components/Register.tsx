import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Alert, Avatar, Box, Button, Container, CssBaseline, Grid, Link, TextField, Typography } from "@mui/material";
import emailValidator from "email-validator";
import * as React from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { register } from "../services/UserServices";
import { User } from "../utils/interfaces";

interface Props {
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
}

export default function SignUp({setUser}: Props): JSX.Element {
  const [isRequestSent, setIsRequestSent] = React.useState(false);
  const [responseMessage, setResponseMessage] = React.useState<string>();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const first_name = data.get("first_name")?.toString();
    const last_name = data.get("last_name")?.toString();
    const email = data.get("email")?.toString();
    const password = data.get("password")?.toString();
    if (first_name && last_name && email && password) {
      if (emailValidator.validate(email)) {
        setIsRequestSent(true);
        const response = await register({ first_name, last_name, email, password });
        if (response.status === "Failed" && typeof response.data === "string") {
          setResponseMessage(response.data);
        } else if (response.status === "Success" && typeof response.data !== "string") {
          navigate("/", { replace: true });
          setUser(response.data);   
        }
        setIsRequestSent(false);
      } else {
        setResponseMessage("Invalid email");
      }
    } else {
      setResponseMessage("All fields are required");
    }
  };

  return (
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
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="first_name"
                required
                fullWidth
                id="first_name"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="last_name"
                label="Last Name"
                name="last_name"
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
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
                autoComplete="new-password"
              />
            </Grid>
          </Grid>
          {
            responseMessage && 
            <Alert severity="error" onClose={() => {
              setResponseMessage("");
            }}>{ responseMessage }</Alert>
          }
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isRequestSent}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/login" variant="body2" component={RouterLink}>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}