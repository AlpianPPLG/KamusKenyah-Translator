import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../pages/HomePage/Home";
import SecondPage from "../pages/TranslatorAppPage/SecondPage";
import Login from "../pages/LoginPage/Login";
import SignUp from "../pages/SignUpPage/SignUp";

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/second-page" element={<SecondPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
