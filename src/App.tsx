import { createTheme, CssBaseline, useMediaQuery } from "@mui/material";
import { ThemeProvider } from "@mui/system";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Bar from "./components/Bar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { User } from "./interfaces/UserInterfaces";
import Home from "./pages/Home";

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

      </Routes>
    </ThemeProvider>

  );
};

export default App;
