import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
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
  Star,
  Award,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";

// Interface untuk link navigasi
interface NavLink {
  name: string;
  href: string;
}

// Interface untuk grup navigasi
interface NavGroup {
  title: string;
  links: NavLink[];
}

// Interface untuk testimonial singkat
interface Testimonial {
  name: string;
  content: string;
  rating: number;
}

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks: NavGroup[] = [
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
        { name: "Terms of Service", href: "/terms" },
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Cookie Policy", href: "/cookies" },
        { name: "Data Processing", href: "#" },
        { name: "Accessibility", href: "#" },
      ],
    },
  ];

  // Data kontak
  const contactInfo = [
    {
      icon: <Mail className="w-5 h-5" />,
      detail: "support@kamuskenyah.com",
      href: "mailto:support@kamuskenyah.com",
    },
    {
      icon: <Phone className="w-5 h-5" />,
      detail: "+62 123 456 7890",
      href: "tel:+621234567890",
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      detail: "123 Language Street, Translation Tower, Digital City, 98765",
      href: "#",
    },
  ];

  // Data media sosial
  const socialLinks = [
    { icon: <Facebook className="w-6 h-6" />, href: "#facebook" },
    { icon: <Twitter className="w-6 h-6" />, href: "#twitter" },
    { icon: <Instagram className="w-6 h-6" />, href: "#instagram" },
    { icon: <Linkedin className="w-6 h-6" />, href: "#linkedin" },
  ];

  // Testimonial singkat untuk layar besar
  const testimonials: Testimonial[] = [
    {
      name: "Sarah Putri",
      content:
        "KamusKenyah benar-benar membantu melestarikan bahasa Dayak Kenyah!",
      rating: 5,
    },
    {
      name: "Budi Santoso",
      content: "Fitur terjemahan cepat dan akurat, sangat direkomendasikan!",
      rating: 4,
    },
  ];

  const [isHovered, setIsHovered] = useState(false);

  // UseEffect untuk efek samping (contoh penggunaan, bisa diubah sesuai konteks)
  useEffect(() => {
    if (isHovered) {
      console.log("Hovered!");
    }
    // Gunakan index untuk animasi atau logika tambahan
    const interval = setInterval(() => {
      footerLinks.forEach((group, index) => {
        console.log(`Group ${index + 1}: ${group.title}`);
      });
    }, 5000); // Log setiap 5 detik untuk debugging/animasi
    return () => clearInterval(interval);
  }, [isHovered]);

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
                <button
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-lg transition-all duration-200 flex items-center justify-center"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2 lg:col-span-2 space-y-6">
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
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.detail}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex items-start"
                >
                  <div className="text-blue-400 mr-3 mt-0.5 flex-shrink-0">
                    {info.icon}
                  </div>
                  <a
                    href={info.href}
                    className="text-gray-300 hover:text-white transition-colors duration-300"
                  >
                    {info.detail}
                  </a>
                </motion.div>
              ))}
            </div>
            <div className="mt-6">
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.href}
                    href={social.href}
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="w-10 h-10 rounded-full bg-gray-800 hover:bg-blue-600 flex items-center justify-center transition-colors duration-200"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          {/* Product, Company, Resources */}
          {footerLinks.slice(0, 3).map((section, index) => (
            <div key={section.title} className="space-y-4">
              <h4 className="text-lg font-semibold mb-4 text-white">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={link.name}>
                    <motion.a
                      href={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.6,
                        delay: index * 0.1 + linkIndex * 0.05,
                      }}
                      className="text-gray-300 hover:text-white flex items-center group transition-colors duration-300"
                    >
                      <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                      {link.name}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Legal (Kembali ke Posisi Semula di Kolom Terakhir) */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold mb-4 text-white">Legal</h4>
            <ul className="space-y-2">
              {footerLinks[3].links.map((link, linkIndex) => (
                <li key={link.name}>
                  <motion.a
                    href={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.6,
                      delay: 3 * 0.1 + linkIndex * 0.05, // Delay berdasarkan posisi "Legal" di indeks 3
                    }}
                    className="text-gray-300 hover:text-white flex items-center group transition-colors duration-300"
                  >
                    <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    {link.name}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          {/* Testimonial Singkat (Hanya di Layar Besar, sebelah kanan Legal) */}
          <div className="hidden lg:block space-y-6">
            <h4 className="text-lg font-semibold text-white mb-2">
              Testimony Singkat
            </h4>
            <div className="space-y-4">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-gray-800 p-4 rounded-lg"
                >
                  <div className="flex items-center mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                  <p className="text-gray-300 text-sm italic">
                    "{testimonial.content}"
                  </p>
                  <p className="text-gray-200 text-sm mt-2 font-medium">
                    - {testimonial.name}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* App Download, Awards, and Language Selector */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            {/* App Download */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
              <a
                href="#"
                className="flex items-center justify-center px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-700 transition-colors duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  width="24"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="#ffffff"
                    d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"
                  />
                </svg>
                <div className="ml-2">
                  <div className="text-xs text-gray-300">GET IT ON</div>
                  <div className="text-sm font-semibold text-white">
                    Google Play
                  </div>
                </div>
              </a>
              <a
                href="#"
                className="flex items-center justify-center px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-700 transition-colors duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="28"
                  width="21"
                  viewBox="0 0 384 512"
                >
                  <path
                    fill="#ffffff"
                    d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"
                  />
                </svg>

                <div className="ml-2">
                  <div className="text-xs text-gray-300">Download on the</div>
                  <div className="text-sm font-semibold text-white">
                    App Store
                  </div>
                </div>
              </a>
            </div>

            {/* Awards/Badges (Laptop View) */}
            <div className="hidden md:flex items-center justify-center space-x-4">
              <motion.div
                whileHover={{ scale: 1.05, rotate: 5 }}
                className="bg-gradient-to-r from-yellow-500 to-orange-500 p-2 rounded-lg shadow-md"
              >
                <Award className="w-8 h-8 text-white" />
                <p className="text-xs text-white text-center">
                  Best Language App 2024
                </p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05, rotate: 5 }}
                className="bg-gradient-to-r from-green-500 to-emerald-500 p-2 rounded-lg shadow-md"
              >
                <Users className="w-8 h-8 text-white" />
                <p className="text-xs text-white text-center">
                  Top Community Choice
                </p>
              </motion.div>
            </div>

            {/* Language Selector */}
            <div className="flex justify-center md:justify-end items-center">
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
              <Link
                to="/terms"
                className="hover:text-white transition-colors duration-200"
              >
                Terms
              </Link>
              <Link
                to="/privacy"
                className="hover:text-white transition-colors duration-200"
              >
                Privacy
              </Link>
              <Link
                to="/cookies"
                className="hover:text-white transition-colors duration-200"
              >
                Cookies
              </Link>
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
