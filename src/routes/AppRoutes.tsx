import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../pages/HomePage/Home";
import SecondPage from "../pages/TranslatorAppPage/SecondPage";
import Login from "../pages/LoginPage/Login";
import SignUp from "../pages/SignUpPage/SignUp";
import About from "../pages/AboutPage/About";
import Feature from "../pages/FeaturePage/Feature";
import Product from "../pages/ProductPage/Product";
import Pricing from "../pages/PricingPage/Pricing";

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/feature" element={<Feature />} />
        <Route path="/product" element={<Product />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/second-page" element={<SecondPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
