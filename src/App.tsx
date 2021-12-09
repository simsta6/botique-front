import { createTheme, CssBaseline, useMediaQuery } from "@mui/material";
import { ThemeProvider } from "@mui/system";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Bar from "./components/Bar";
import Login from "./components/Login";
import Register from "./components/Register";
import { User } from "./utils/interfaces";

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
        <Route path="/" />

        <Route path="/login" element={<Login setUser={setUser}/>} />

        <Route path="/register" element={<Register/>} />

      </Routes>
    </ThemeProvider>

  );
};

export default App;
