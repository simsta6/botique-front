import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link as RouterLink } from "react-router-dom";
import Link from "@mui/material/Link";

const Bar = (): JSX.Element => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Link sx={{ flexGrow: 1 }} color="inherit" component={RouterLink} to="/" underline="none">
            <Typography variant="h6" component="div">
                Botique
            </Typography>
          </Link>
          <Button color="inherit" component={RouterLink} to="/login">Login</Button>
          <Button color="inherit" component={RouterLink} to="/register">Register</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Bar;
