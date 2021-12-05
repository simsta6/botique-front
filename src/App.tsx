import { Route, Routes } from "react-router-dom";
import { createTheme, CssBaseline, useMediaQuery } from "@mui/material";
import { ThemeProvider } from "@mui/system";
import React from "react";
import Bar from "./components/Bar";
import Login from "./components/Login";
import Register from "./components/Register";

const App = (): JSX.Element => {

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
      <Bar />
      <Routes>
        <Route path="/" />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

      </Routes>
    </ThemeProvider>

  );
};

export default App;
