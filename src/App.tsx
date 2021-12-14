import { createTheme, CssBaseline, useMediaQuery } from "@mui/material";
import { ThemeProvider } from "@mui/system";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Bar from "./components/Bar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { User } from "./interfaces/UserInterfaces";
import Home from "./pages/Home";
import Item from "./pages/Item";
import ReviewForm from "./pages/ReviewForm";
import AdminZone from "./pages/AdminZone";
import SellerZone from "./pages/SellerZone";
import AddSeller from "./pages/AddSeller";
import NewItemForm from "./pages/NewItemForm";
import "./styles/Scrollbar.scss";

export const setUser = (user: User | undefined): void => {
  user ? localStorage.setItem("user", JSON.stringify(user)) : localStorage.removeItem("user");
};

export const getUser = (): User | undefined => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : undefined;
};

const App = (): JSX.Element => {
  const [ user, setUser ] = React.useState<User | undefined>(getUser());

  React.useEffect(() => setUser(user), [user]);

  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Bar {...{user, setUser}}/>
      <Routes>
      
        <Route path="/" element={<Home />}/>

        <Route path="/login" element={<Login {...{setUser}}/>} />

        <Route path="/register" element={<Register {...{setUser}}/>} />

        <Route path="/items/:id" element={<Item {...{user}}/>} />

        <Route path="/items/:id/reviews" element={<ReviewForm />} />

        <Route path="/items/:id/reviews/:reviewId" element={<ReviewForm />} />

        <Route path="/admin" element={<AdminZone />} />

        <Route path="/seller" element={<SellerZone />} />

        <Route path="/post-seller" element={<AddSeller />} />

        <Route path="/items" element={<NewItemForm />} />

      </Routes>
    </ThemeProvider>

  );
};

export default App;
