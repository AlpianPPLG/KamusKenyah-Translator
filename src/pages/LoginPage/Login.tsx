import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Lock, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Please fill in all fields.");
      return;
    }
    // Add your login logic here (e.g., API call)
    console.log("Logging in with:", { username, password });
    setError("");
    navigate("/"); // Redirect to home after login (adjust as needed)
  };

  const handleSignUpClick = () => {
    navigate("/signup");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl opacity-30"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-72 h-72 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl opacity-30"
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="relative z-10 w-full max-w-md p-6 md:p-8 bg-white rounded-[20px] shadow-lg border border-gray-200 mx-auto"
      >
        <motion.button
          onClick={() => navigate(-1)}
          whileHover={{ scale: 1.1, rotate: -5 }}
          whileTap={{ scale: 0.9 }}
          className="absolute top-4 left-4 p-2 text-blue-600 hover:text-blue-700 rounded-full bg-blue-100 transition-all duration-300"
        >
          <ArrowLeft className="w-5 h-5" />
        </motion.button>

        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Log In
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username Input */}
          <div className="relative">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            >
              <User className="w-5 h-5" />
            </motion.div>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="w-full pl-10 pr-4 py-2 md:py-3 rounded-[15px] border border-gray-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 text-gray-700 placeholder-gray-400"
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            >
              <Lock className="w-5 h-5" />
            </motion.div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full pl-10 pr-4 py-2 md:py-3 rounded-[15px] border border-gray-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 text-gray-700 placeholder-gray-400"
            />
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-sm text-center"
            >
              {error}
            </motion.p>
          )}

          {/* Forgot Password */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-center"
          >
            <a
              href="#"
              className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors duration-300"
            >
              You forgot your password?
            </a>
          </motion.div>

          {/* Login Button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05, backgroundColor: "#2563eb" }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-blue-600 text-white py-2 md:py-3 rounded-[15px] font-medium hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Log In
          </motion.button>
        </form>

        {/* Sign Up Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-center mt-4"
        >
          <p className="text-gray-600 text-sm">
            You do not have an account?{" "}
            <motion.button
              onClick={handleSignUpClick}
              whileHover={{ scale: 1.05, color: "#4f46e5" }}
              whileTap={{ scale: 0.95 }}
              className="text-blue-600 font-medium hover:text-blue-700 transition-colors duration-300"
            >
              Sign Up
            </motion.button>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;
