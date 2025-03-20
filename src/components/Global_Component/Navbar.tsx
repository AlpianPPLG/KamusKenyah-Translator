import React, { useState, useEffect } from "react";
import { Menu, X, ChevronDown, Search, Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { BsFlagFill } from "react-icons/bs";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("ID");
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const navItems = [
    {
      name: "Home",
      href: "/", // Ubah menjadi "/home"
      hasDropdown: false,
    },
    {
      name: "About",
      href: "/about", // Pastikan "/about"
      hasDropdown: true,
      dropdownItems: ["Our Story", "Team", "Careers"],
    },
    {
      name: "Features",
      href: "/feature", // Pastikan "/feature"
      hasDropdown: false,
    },
    {
      name: "Products",
      href: "/product",
      hasDropdown: true,
      dropdownItems: ["Translation", "Dictionary", "Learning"],
    },
    {
      name: "Pricing",
      href: "/pricing",
      hasDropdown: false,
    },
  ];

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleSignUpClick = () => {
    navigate("/signup");
  };

  const handleLanguageChange = (lang: string) => {
    setSelectedLanguage(lang);
    setActiveDropdown(null);
  };

  return (
    <nav
      className={`fixed w-full top-0 left-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-lg" : "bg-white/80 backdrop-blur-md"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and search bar */}
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                KamusKenyah
              </span>
            </div>
            <div className="hidden lg:flex items-center">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-64 pl-10 pr-4 py-1.5 rounded-full text-sm border border-gray-200 focus:outline-none focus:border-blue-500 transition-colors duration-300"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Navigation links */}
          <div className="hidden md:flex items-center justify-center flex-1">
            <div className="flex space-x-1">
              {navItems.map((item) => (
                <div key={item.name} className="relative group">
                  <div className="flex items-center">
                    {/* Link tanpa dropdown */}
                    <a
                      href={item.href}
                      onClick={(e) => {
                        if (!item.hasDropdown) {
                          e.preventDefault();
                          navigate(item.href); // Gunakan navigate untuk item tanpa dropdown
                        }
                      }}
                      className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 rounded-md hover:bg-gray-50 transition-colors duration-300"
                    >
                      {item.name}
                    </a>
                    {/* Panah untuk dropdown */}
                    {item.hasDropdown && (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          toggleDropdown(item.name);
                        }}
                        className="ml-1 p-1 text-gray-600 hover:text-gray-900 rounded-md hover:bg-gray-50 transition-colors duration-300"
                      >
                        <ChevronDown className="h-4 w-4 transition-transform duration-300 transform -translate-x-px group-hover:rotate-180" />
                      </button>
                    )}
                  </div>
                  {/* Dropdown menu */}
                  {item.hasDropdown && activeDropdown === item.name && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className={`absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5`}
                    >
                      <div className="py-1">
                        {item.dropdownItems?.map((dropdownItem) => (
                          <a
                            key={dropdownItem}
                            href={dropdownItem === "Team" ? "#ourteam" : "#"}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-300"
                          >
                            {dropdownItem}
                          </a>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Language dropdown */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative group">
              <button
                onClick={() => toggleDropdown("language")}
                className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50 transition-colors duration-300"
              >
                <Globe className="h-4 w-4" />
                <span>{selectedLanguage === "ID" ? "ID" : "EN"}</span>
                <ChevronDown className="ml-1 h-4 w-4 transition-transform duration-300 transform group-hover:rotate-180" />
              </button>
              {activeDropdown === "language" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                >
                  <div className="py-1">
                    {["ID", "EN"].map((lang) => (
                      <button
                        key={lang}
                        onClick={() => handleLanguageChange(lang)}
                        className="w-full flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-300"
                      >
                        <span>
                          {lang === "ID" ? "🇮🇩 Bahasa Indonesia" : "🇬🇧 English"}
                        </span>
                        {selectedLanguage === lang && (
                          <BsFlagFill className="text-green-500 h-4 w-4" />
                        )}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            <button
              onClick={handleLoginClick}
              className="text-gray-600 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300"
            >
              Login
            </button>
            <motion.button
              onClick={handleSignUpClick}
              whileHover={{ scale: 1.1, backgroundColor: "#4f46e5" }}
              whileTap={{ scale: 0.9 }}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:shadow-md"
            >
              Sign Up
            </motion.button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <div className="relative">
              <button
                onClick={() => toggleDropdown("language")}
                className="flex items-center space-x-1 text-gray-600 px-2 py-2 rounded-md"
              >
                <Globe className="h-5 w-5" />
                <span>{selectedLanguage === "ID" ? "ID" : "EN"}</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              {activeDropdown === "language" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="absolute right-2 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                >
                  <div className="py-1">
                    {["ID", "EN"].map((lang) => (
                      <button
                        key={lang}
                        onClick={() => handleLanguageChange(lang)}
                        className="w-full flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-md transition-colors duration-300"
                      >
                        <span>
                          {lang === "ID" ? "🇮🇩 Bahasa Indonesia" : "🇬🇧 English"}
                        </span>
                        {selectedLanguage === lang && (
                          <BsFlagFill className="text-green-500 h-4 w-4" />
                        )}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-all duration-300"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="md:hidden overflow-hidden bg-white border-t border-gray-200"
      >
        <div className="px-4 pt-2 pb-3 space-y-1">
          {/* Search input */}
          <div className="relative mt-3 mb-4">
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 rounded-md text-sm border border-gray-200 focus:outline-none focus:border-blue-500 transition-colors duration-300"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>

          {navItems.map((item) => (
            <div key={item.name}>
              <div className="flex items-center">
                <button
                  onClick={() => {
                    if (!item.hasDropdown) {
                      navigate(item.href); // Navigasi langsung untuk item tanpa dropdown
                    }
                  }}
                  className="w-full flex items-center justify-between px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors duration-300"
                >
                  {item.name}
                </button>
                {item.hasDropdown && (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      toggleDropdown(item.name);
                    }}
                    className="p-1 text-gray-600 hover:text-gray-900 rounded-md hover:bg-gray-50 transition-colors duration-300"
                  >
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-300 ${
                        activeDropdown === item.name ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                )}
              </div>
              {item.hasDropdown && activeDropdown === item.name && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: "auto",
                    opacity: 1,
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="pl-4"
                >
                  {item.dropdownItems?.map((dropdownItem) => (
                    <a
                      key={dropdownItem}
                      href="#"
                      className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors duration-300"
                    >
                      {dropdownItem}
                    </a>
                  ))}
                </motion.div>
              )}
            </div>
          ))}
          <div className="border-t border-gray-200 pt-4 pb-3">
            <motion.button
              onClick={handleLoginClick}
              whileHover={{ scale: 1.05, backgroundColor: "#2563eb" }}
              whileTap={{ scale: 0.95 }}
              className="block w-full text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-base font-medium hover:bg-gray-50 transition-all duration-300"
            >
              Login
            </motion.button>
            <motion.button
              onClick={handleSignUpClick}
              whileHover={{ scale: 1.1, backgroundColor: "#4f46e5" }}
              whileTap={{ scale: 0.9 }}
              className="block mt-2 w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 px-3 py-2 rounded-md text-base font-medium text-center transition-all duration-300 hover:shadow-md"
            >
              Sign Up
            </motion.button>
          </div>
        </div>
      </motion.div>
    </nav>
  );
};

export default Navbar;
