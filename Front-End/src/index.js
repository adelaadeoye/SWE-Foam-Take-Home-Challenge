import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Gallery from "./pages/Gallery";
import RequireAuth from "./component/RequireAuth";
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="signin" element={<SignIn />} />
          <Route
            path="gallery"
            element={
              <RequireAuth>
                <Gallery />
              </RequireAuth>
            }
          />
        </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
