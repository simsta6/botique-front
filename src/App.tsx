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

const App = (): JSX.Element => {
  const [ user, setUser ] = React.useState<User>();

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
      
        <Route path="/" element={<Home {...{user}}/>}/>

        <Route path="/login" element={<Login {...{setUser}}/>} />

        <Route path="/register" element={<Register {...{setUser}}/>} />

        <Route path="/items/:id" element={<Item {...{user}}/>} />

        <Route path="/items/:id/reviews" element={<ReviewForm />} />

        <Route path="/items/:id/reviews/:reviewId" element={<ReviewForm />} />

        <Route path="/admin" element={<AdminZone {...{user}}/>} />

        <Route path="/seller" element={<SellerZone {...{user}}/>} />

      </Routes>
    </ThemeProvider>

  );
};

export default App;
