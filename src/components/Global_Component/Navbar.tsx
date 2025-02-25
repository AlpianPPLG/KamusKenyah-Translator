import React, { useState, useEffect } from "react";
import { Menu, X, ChevronDown, Search, Globe } from "lucide-react";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

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
      href: "#",
      hasDropdown: false,
    },
    {
      name: "About",
      href: "#",
      hasDropdown: true,
      dropdownItems: ["Our Story", "Team", "Careers"],
    },
    {
      name: "Feature",
      href: "#",
      hasDropdown: false,
    },
    {
      name: "Product",
      href: "#",
      hasDropdown: true,
      dropdownItems: ["Translation", "Dictionary", "Learning"],
    },
    {
      name: "Pricing",
      href: "#",
      hasDropdown: false,
    },
  ];

  return (
    <nav
      className={`fixed w-full top-0 left-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-lg" : "bg-white/80 backdrop-blur-md"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Search */}
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
                  className="w-64 pl-10 pr-4 py-1.5 rounded-full text-sm border border-gray-200 focus:outline-none focus:border-blue-500 transition-colors"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center justify-center flex-1">
            <div className="flex space-x-1">
              {navItems.map((item) => (
                <div key={item.name} className="relative group">
                  <button
                    onClick={() =>
                      item.hasDropdown && toggleDropdown(item.name)
                    }
                    className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 rounded-md hover:bg-gray-50 transition-colors duration-200"
                  >
                    {item.name}
                    {item.hasDropdown && (
                      <ChevronDown className="ml-1 h-4 w-4 transition-transform duration-200 transform group-hover:rotate-180" />
                    )}
                  </button>
                  {item.hasDropdown && (
                    <div
                      className={`absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 transition-all duration-200 ${
                        activeDropdown === item.name
                          ? "opacity-100 visible"
                          : "opacity-0 invisible"
                      }`}
                    >
                      <div className="py-1">
                        {item.dropdownItems?.map((dropdownItem) => (
                          <a
                            key={dropdownItem}
                            href="#"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          >
                            {dropdownItem}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Auth & Language */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 rounded-md hover:bg-gray-50">
              <Globe className="h-4 w-4" />
              <span>EN</span>
            </button>
            <a
              href="#"
              className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-50"
            >
              Login
            </a>
            <a
              href="#"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:shadow-md"
            >
              Sign Up
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <button className="p-2 text-gray-600 hover:text-gray-900 rounded-md">
              <Globe className="h-5 w-5" />
            </button>
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
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
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden bg-white border-t border-gray-200`}
      >
        <div className="px-4 pt-2 pb-3 space-y-1">
          {/* Search in mobile */}
          <div className="relative mt-3 mb-4">
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 rounded-md text-sm border border-gray-200 focus:outline-none focus:border-blue-500"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>

          {navItems.map((item) => (
            <div key={item.name}>
              <button
                onClick={() => item.hasDropdown && toggleDropdown(item.name)}
                className="w-full flex items-center justify-between px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md"
              >
                {item.name}
                {item.hasDropdown && (
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ${
                      activeDropdown === item.name ? "rotate-180" : ""
                    }`}
                  />
                )}
              </button>
              {item.hasDropdown && (
                <div
                  className={`pl-4 ${
                    activeDropdown === item.name ? "block" : "hidden"
                  }`}
                >
                  {item.dropdownItems?.map((dropdownItem) => (
                    <a
                      key={dropdownItem}
                      href="#"
                      className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md"
                    >
                      {dropdownItem}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className="border-t border-gray-200 pt-4 pb-3">
            <a
              href="#"
              className="block text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-base font-medium hover:bg-gray-50"
            >
              Login
            </a>
            <a
              href="#"
              className="block mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 px-3 py-2 rounded-md text-base font-medium text-center"
            >
              Sign Up
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
