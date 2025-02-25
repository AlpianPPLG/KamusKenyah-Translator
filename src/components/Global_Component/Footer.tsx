import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ArrowRight,
  Globe,
  Send,
} from "lucide-react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "Product",
      links: [
        { name: "Translation", href: "#" },
        { name: "Dictionary", href: "#" },
        { name: "Learning", href: "#" },
        { name: "Mobile App", href: "#" },
        { name: "API Access", href: "#" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "#" },
        { name: "Team", href: "#" },
        { name: "Careers", href: "#" },
        { name: "Press Kit", href: "#" },
        { name: "Contact", href: "#" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Blog", href: "#" },
        { name: "Documentation", href: "#" },
        { name: "Community Forum", href: "#" },
        { name: "FAQs", href: "#" },
        { name: "Support Center", href: "#" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Terms of Service", href: "#" },
        { name: "Privacy Policy", href: "#" },
        { name: "Cookie Policy", href: "#" },
        { name: "Data Processing", href: "#" },
        { name: "Accessibility", href: "#" },
      ],
    },
  ];

  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white">
      {/* Top Section with Newsletter */}
      <div className="border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-2">Join our newsletter</h3>
              <p className="text-gray-300 mb-4">
                Stay updated with the latest features, language updates, and
                educational resources.
              </p>
            </div>
            <div>
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-grow">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-lg transition-all duration-200 flex items-center justify-center">
                  Subscribe
                  <Send className="ml-2 h-4 w-4" />
                </button>
              </div>
              <p className="text-xs text-gray-400 mt-2">
                By subscribing, you agree to our Privacy Policy and consent to
                receive updates.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                KamusKenyah
              </span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Bridging cultures through language. KamusKenyah is dedicated to
              preserving and promoting the Kenyah language through modern
              digital tools.
            </p>
            <div className="space-y-3">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-blue-400 mr-3 mt-0.5 flex-shrink-0" />
                <p className="text-gray-300">
                  123 Language Street, Translation Tower, Digital City, 98765
                </p>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-blue-400 mr-3 flex-shrink-0" />
                <p className="text-gray-300">+1 (234) 567-8901</p>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-blue-400 mr-3 flex-shrink-0" />
                <p className="text-gray-300">contact@kamuskenyah.com</p>
              </div>
            </div>
            <div className="mt-6">
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-800 hover:bg-blue-600 flex items-center justify-center transition-colors duration-200"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-800 hover:bg-blue-600 flex items-center justify-center transition-colors duration-200"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-800 hover:bg-blue-600 flex items-center justify-center transition-colors duration-200"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-800 hover:bg-blue-600 flex items-center justify-center transition-colors duration-200"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Links Sections */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="text-lg font-semibold mb-4 text-white">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center group"
                    >
                      <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* App Download and Language Selector */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
            <a
                href="#"
                className="flex items-center justify-center px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-700 transition-colors duration-200"
              >
                <svg
                  className="h-6 w-6 mr-2"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M20.55,10.26l-6.25-3.61c-0.58-0.34-1.17-0.37-1.66-0.08L5.38,10.26c-0.44,0.25-0.7,0.67-0.7,1.12c0,0.45,0.26,0.87,0.7,1.12l1.5,0.86v3.85c0,0.33,0.17,0.63,0.44,0.8C7.59,18.17,8.53,18.64,12,18.64s4.41-0.47,4.68-0.63c0.27-0.17,0.44-0.47,0.44-0.8v-3.85l1.5-0.86c0.44-0.25,0.7-0.67,0.7-1.12C21.25,10.93,20.99,10.51,20.55,10.26z" />
                </svg>
                <div>
                  <div className="text-xs">GET IT ON</div>
                  <div className="text-sm font-semibold">Google Play</div>
                </div>
              </a>
              <a
                href="#"
                className="flex items-center justify-center px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-700 transition-colors duration-200"
              >
                <svg
                  className="h-6 w-6 mr-2"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M17.05,20.25a1,1,0,0,1-.5-.13l-4.55-2.64-4.55,2.64a1,1,0,0,1-1-.08,1,1,0,0,1-.46-.92V4.38A1,1,0,0,1,7,3.38H17.05a1,1,0,0,1,1,1V19.12a1,1,0,0,1-.46.92A1,1,0,0,1,17.05,20.25ZM12,15.88a1,1,0,0,1,.5.13l3.55,2.06V4.38H8V18.07l3.55-2.06A1,1,0,0,1,12,15.88Z" />
                </svg>
                <div>
                  <div className="text-xs">Download on the</div>
                  <div className="text-sm font-semibold">App Store</div>
                </div>
              </a>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-end items-center gap-4">
              <div className="flex items-center">
                <Globe className="h-5 w-5 mr-2 text-blue-400" />
                <select className="bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="en">English</option>
                  <option value="id">Bahasa Indonesia</option>
                  <option value="my">Bahasa Malaysia</option>
                  <option value="kn">Kenyah</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-400 text-center md:text-left mb-4 md:mb-0">
              © {currentYear} KamusKenyah. All rights reserved.
            </div>
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-gray-400">
              <a
                href="#"
                className="hover:text-white transition-colors duration-200"
              >
                Terms
              </a>
              <a
                href="#"
                className="hover:text-white transition-colors duration-200"
              >
                Privacy
              </a>
              <a
                href="#"
                className="hover:text-white transition-colors duration-200"
              >
                Cookies
              </a>
              <a
                href="#"
                className="hover:text-white transition-colors duration-200"
              >
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
