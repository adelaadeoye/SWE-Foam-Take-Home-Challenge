// import logo from "./logo.svg";
import React from "react";
import { Button, } from "@mui/material";
import "./App.css";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider,styled } from "@mui/material/styles";
import { purple } from '@mui/material/colors';
import { Link,  } from "react-router-dom";

function App() {
  const theme = createTheme();

 const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    '&:hover': {
      backgroundColor: purple[700],
    },
    width: "250px",
    fontSize:"1.8em"
  }));
  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          sx={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1644691568805-fd9a88e0f057?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY0NTg3NzAxNA&ixlib=rb-1.2.1&q=80&w=1080)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
            alignItems: "center",
            justifyContent: "center",
            alignContent: "center",
            display: "flex",
            flexDirection: "column",
            color: "white",
          }}
        >
          <Grid sx={{alignItems: "center",
            justifyContent: "center",
            alignContent: "center",
            display: "flex",
            flexDirection: "column",}}
            container
            maxWidth={700}
           
          >
            <h1
              style={{
                textAlign: "center",
                justifyContent: "center",
                display: "flex",
                alignItems: "center",
                alignContent:"center",
                // backgroundColor: "white",
                width: "100%"
              }}
            >
              SWE Foam Take Home Challenge
            </h1>
            <p style={{ textAlign: "center" }}>
              Here at Culture, we run all kinds of experiments for our clients.
              These experiments run inside of reactors and can go for any amount
              of time. This makes it tough to monitor them around the clock for
              any problems. One of the common problems is that a reactor may
              start “foaming”. This is where foam starts to build up towards the
              top of the reactor and there is a risk of it spilling over. In
              these cases we may need to add an anti-foaming agent to preserve
              the run.
            </p>
            <h1 style={{ textAlign: "center" }}>
              We want to create a classification system with you
            </h1>
            <Link to={localStorage.getItem("login")===true?"/signin":"/gallery"} style={{ textDecoration:"none"}}>
            <ColorButton>Get Started</ColorButton>
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default App;
