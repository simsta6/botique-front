import { AccountCircle } from "@mui/icons-material";
import { IconButton, Menu, MenuItem } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { User } from "../interfaces/UserInterfaces";
import { logout } from "../services/UserServices";

interface Props {
  user: User | undefined;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
}

const Bar = ({user, setUser}: Props): JSX.Element => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOnAdminZone = () => {
    handleClose();
    navigate("/admin");
  };

  const handleOnSellerZone = () => {
    handleClose();
    navigate("/seller");
  };

  const handleLogout = () => {
    handleClose();
    logout();
    setUser(undefined);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Link sx={{ flexGrow: 1 }} color="inherit" component={RouterLink} to="/" underline="none">
            <Typography variant="h6" component="div">
                Botique
            </Typography>
          </Link>
          {user ? (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                {/* TODO: chart list as dropdown */}
                <MenuItem onClick={handleClose}>Chart</MenuItem> 
                {user.role === "admin" && <MenuItem onClick={handleOnAdminZone}>Admin Zone</MenuItem>}
                {user.role === "seller" && <MenuItem onClick={handleOnSellerZone}>Seller Zone</MenuItem>}
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          ) :
            <> 
              <Button color="inherit" component={RouterLink} to="/login">Login</Button>
              <Button color="inherit" component={RouterLink} to="/register">Register</Button>
            </>
          }

        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Bar;
