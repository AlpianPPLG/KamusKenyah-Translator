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
import Error from "../pages/ErrorPage/Error";
import Terms from "../pages/TermsPage/Terms";
import Privacy from "../pages/PrivacyPage/Privacy";
import Cookies from "../pages/CookiesPage/Cookies";
import Site from "../pages/SitemapPage/Site";
import LearnMorePageContainer from "../pages/LearnMorePage/LearnMorePage_Component/LearnMorePageContainer";

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
        <Route path="/error" element={<Error />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/cookies" element={<Cookies />} />
        <Route path="/sitemap" element={<Site />} />
        <Route path="/learnmore" element={<LearnMorePageContainer />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
