import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Alert, Avatar, Box, Button, Container, CssBaseline, Grid, Link, TextField, Typography } from "@mui/material";
import emailValidator from "email-validator";
import * as React from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { login } from "../services/UserServices";
import { User, UserLoginData } from "../interfaces/UserInterfaces";
import { loginSchema } from "../schemas/UserSchema";

const getFormattedData = (data: FormData): UserLoginData | undefined => {
  const email = data.get("email")?.toString();
  const password = data.get("password")?.toString();

  const isDataValid = email && password;

  return isDataValid ? { email, password }: undefined;
};

interface Props {
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
}

export default function Login({setUser}: Props): JSX.Element {
  
  const [isValidEmail, setIsValidEmail] = React.useState(true);
  const [isRequestSent, setIsRequestSent] = React.useState(false);
  const [responseMessage, setResponseMessage] = React.useState<string>();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = getFormattedData(new FormData(event.currentTarget));
    loginSchema.validate(data)
      .then(async data => {
        setIsRequestSent(true);
        const response = await login(data);
        if (response.status === "Failed" && typeof response.data === "string") {
          setResponseMessage(response.data);
        } else if (response.status === "Success" && typeof response.data !== "string") {
          navigate("/", { replace: true });
          setUser(response.data);   
        }
        setIsRequestSent(false);
      })
      .catch(err => err.errors && setResponseMessage (err.errors.join()));
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
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(e => setIsValidEmail(emailValidator.validate(e.target.value)))}
          />
          {
            !isValidEmail && <Alert severity="error" onClose={() => setIsValidEmail(true)}>Invalid Email</Alert>
          }
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
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
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link to="/register" variant="body2" component={RouterLink}>
                Don't have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}