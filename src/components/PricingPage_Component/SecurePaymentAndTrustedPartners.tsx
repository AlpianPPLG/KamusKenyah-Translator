import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  CreditCard,
  Lock,
  Globe,
  CheckCircle,
  Star,
  Award,
  TrendingUp,
  Users,
  ThumbsUp,
} from "lucide-react";

interface PaymentMethod {
  id: number;
  name: string;
  logo: string;
  popular: boolean;
}

interface Partner {
  id: number;
  name: string;
  logo: string;
  category: string;
}

const SecurePaymentAndTrustedPartners: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"payment" | "partners">("payment");
  const [hoveredMethod, setHoveredMethod] = useState<number | null>(null);
  const [activeSecurityFeature, setActiveSecurityFeature] = useState(0);
  const [countdown, setCountdown] = useState(30);
  const [isAnimated, setIsAnimated] = useState(false);

  // Payment methods
  const paymentMethods: PaymentMethod[] = [
    {
      id: 1,
      name: "Visa",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png",
      popular: true,
    },
    {
      id: 2,
      name: "Mastercard",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png",
      popular: true,
    },
    {
      id: 3,
      name: "American Express",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/American_Express_logo_%282018%29.svg/1200px-American_Express_logo_%282018%29.svg.png",
      popular: false,
    },
    {
      id: 4,
      name: "PayPal",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/1200px-PayPal.svg.png",
      popular: true,
    },
    {
      id: 5,
      name: "Apple Pay",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Apple_Pay_logo.svg/1200px-Apple_Pay_logo.svg.png",
      popular: false,
    },
    {
      id: 6,
      name: "Google Pay",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Google_Pay_Logo.svg/512px-Google_Pay_Logo.svg.png",
      popular: false,
    },
    {
      id: 7,
      name: "Alipay",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Alipay_logo.svg/1200px-Alipay_logo.svg.png",
      popular: false,
    },
    {
      id: 8,
      name: "UnionPay",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/UnionPay_logo.svg/1200px-UnionPay_logo.svg.png",
      popular: false,
    },
  ];

  // Partners
  const partners: Partner[] = [
    {
      id: 1,
      name: "Microsoft",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/1200px-Microsoft_logo.svg.png",
      category: "Technology",
    },
    {
      id: 2,
      name: "IBM",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IBM_logo.svg/1200px-IBM_logo.svg.png",
      category: "Technology",
    },
    {
      id: 3,
      name: "Accenture",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Accenture.svg/1200px-Accenture.svg.png",
      category: "Consulting",
    },
    {
      id: 4,
      name: "Deloitte",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Deloitte.svg/1200px-Deloitte.svg.png",
      category: "Consulting",
    },
    {
      id: 5,
      name: "Amazon",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1200px-Amazon_logo.svg.png",
      category: "E-commerce",
    },
    {
      id: 6,
      name: "Salesforce",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Salesforce.com_logo.svg/1200px-Salesforce.com_logo.svg.png",
      category: "CRM",
    },
  ];

  // Security features
  const securityFeatures = [
    {
      title: "Advanced Encryption",
      description:
        "All transactions are protected with military-grade 256-bit AES encryption",
      icon: <ShieldCheck className="h-10 w-10 text-purple-500" />,
    },
    {
      title: "PCI DSS Compliance",
      description:
        "We adhere to the strictest payment card industry data security standards",
      icon: <CreditCard className="h-10 w-10 text-blue-500" />,
    },
    {
      title: "Fraud Detection",
      description:
        "Real-time monitoring and AI-powered fraud prevention system",
      icon: <Lock className="h-10 w-10 text-red-500" />,
    },
    {
      title: "Global Compliance",
      description: "We follow GDPR, CCPA, and local regulations worldwide",
      icon: <Globe className="h-10 w-10 text-green-500" />,
    },
  ];

  // Testimonials
  const testimonials = [
    {
      quote:
        "The payment process is seamless and incredibly secure. I've been using this service for all my translation needs.",
      author: "Sarah Johnson",
      company: "Global Marketing Inc.",
      avatar: "https://randomuser.me/api/portraits/women/32.jpg",
      rating: 5,
    },
    {
      quote:
        "I was initially concerned about using an online payment system, but their security measures completely put me at ease.",
      author: "David Chen",
      company: "Tech Solutions Ltd.",
      avatar: "https://randomuser.me/api/portraits/men/44.jpg",
      rating: 5,
    },
    {
      quote:
        "Our company uses their enterprise plan, and the payment flexibility and security are unmatched in the industry.",
      author: "Maria Rodriguez",
      company: "International Exports",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
      rating: 4,
    },
  ];

  // Trust indicators
  const trustIndicators = [
    {
      text: "10+ Years in Business",
      icon: <Award className="h-5 w-5 text-yellow-500" />,
    },
    {
      text: "99.9% Uptime",
      icon: <TrendingUp className="h-5 w-5 text-green-500" />,
    },
    {
      text: "10,000+ Customers",
      icon: <Users className="h-5 w-5 text-blue-500" />,
    },
    {
      text: "4.9/5 Rating",
      icon: <ThumbsUp className="h-5 w-5 text-purple-500" />,
    },
  ];

  useEffect(() => {
    // Initialize animation
    setTimeout(() => {
      setIsAnimated(true);
    }, 300);

    // Rotate through security features
    const featureInterval = setInterval(() => {
      setActiveSecurityFeature((prev) => (prev + 1) % securityFeatures.length);
    }, 4000);

    // Countdown timer
    const countdownInterval = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 30));
    }, 1000);

    return () => {
      clearInterval(featureInterval);
      clearInterval(countdownInterval);
    };
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const pulseAnimation = {
    initial: { scale: 1 },
    animate: {
      scale: [1, 1.02, 1],
      transition: { duration: 2, repeat: Infinity },
    },
  };

  return (
    <section className="relative overflow-hidden py-16 md:py-24 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMzYgMzRjMC0yLjItMS44LTQtNC00cy00IDEuOC00IDQgMS44IDQgNCA0IDQtMS44IDQtNHoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9Ii4wNSIvPjxwYXRoIGQ9Ik02MCAzMGMwLTEuMS0uOS0yLTItMnMtMiAuOS0yIDIgLjkgMiAyIDIgMi0uOSAyLTJ6IiBzdHJva2U9IiNmZmYiIHN0cm9rZS1vcGFjaXR5PSIuMDUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC01OCAtMjgpIi8+PHBhdGggZD0iTTIwIDEwYzAtMS4xLS45LTItMi0ycy0yIC45LTIgMiAuOSAyIDIgMiAyLS45IDItMnoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9Ii4wNSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE4IC04KSIvPjwvZz48L3N2Zz4=')] opacity-20"></div>

      {/* Decorative circles */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-blob"></div>
      <div className="absolute bottom-20 right-10 w-64 h-64 bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-blob animation-delay-2000"></div>
      <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-blob animation-delay-4000"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <motion.div
          className="text-center mb-16 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center justify-center mb-4 px-4 py-1.5 rounded-full bg-indigo-100 text-indigo-800 font-medium text-sm"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Lock className="h-4 w-4 mr-2" />
            100% Secure Payments
          </motion.div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Secure Payment Options &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
              Trusted Partners
            </span>
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            We partner with the world's most trusted payment providers and
            implement industry-leading security measures to keep your
            transactions safe.
          </p>

          {/* Tab navigation */}
          <div className="flex justify-center space-x-4 mb-2">
            <button
              onClick={() => setActiveTab("payment")}
              className={`px-5 py-2.5 rounded-lg font-medium transition-all duration-300 ${
                activeTab === "payment"
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-300/30"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Payment Methods
            </button>
            <button
              onClick={() => setActiveTab("partners")}
              className={`px-5 py-2.5 rounded-lg font-medium transition-all duration-300 ${
                activeTab === "partners"
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-300/30"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Trusted Partners
            </button>
          </div>

          {/* Countdown timer */}
          <div className="inline-flex items-center justify-center mt-2 text-sm text-gray-500">
            <span className="font-medium text-indigo-600 mr-1">
              {countdown}
            </span>{" "}
            seconds until our next security scan
            <motion.div
              className="ml-2 h-2 w-2 bg-green-500 rounded-full"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </motion.div>

        {/* Payment Methods Tab */}
        {activeTab === "payment" && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="mb-16"
          >
            {/* Security features carousel */}
            <div className="bg-white rounded-2xl shadow-xl p-6 mb-12 overflow-hidden relative">
              <div className="absolute top-0 right-0 bg-gradient-to-bl from-indigo-100 to-transparent w-32 h-32 rounded-bl-full"></div>

              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">
                    Bank-Level Security Features
                  </h3>

                  <div className="space-y-4">
                    {securityFeatures.map((feature, index) => (
                      <motion.div
                        key={index}
                        className={`flex p-4 rounded-lg transition-all duration-300 ${
                          activeSecurityFeature === index
                            ? "bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100"
                            : "hover:bg-gray-50"
                        }`}
                        variants={itemVariants}
                        animate={
                          activeSecurityFeature === index
                            ? { scale: 1.02 }
                            : { scale: 1 }
                        }
                        transition={{ duration: 0.3 }}
                      >
                        <div className="mr-4 mt-1">{feature.icon}</div>
                        <div>
                          <h4 className="font-semibold text-gray-900">
                            {feature.title}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {feature.description}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="relative">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl opacity-20"
                    animate={pulseAnimation.animate}
                    initial={pulseAnimation.initial}
                  />
                  <div className="relative bg-white backdrop-blur-sm bg-opacity-60 rounded-xl p-6 border border-purple-100 shadow-lg">
                    <div className="flex justify-between items-center mb-6">
                      <div className="flex">
                        <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      </div>
                      <div className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600">
                        secure.payments.example.com
                      </div>
                    </div>

                    <div className="border-b border-gray-200 pb-4 mb-4">
                      <div className="bg-gray-100 h-2 w-2/3 rounded mb-2"></div>
                      <div className="bg-gray-100 h-2 w-1/2 rounded"></div>
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className="h-10 bg-gray-100 rounded w-full"></div>
                      <div className="h-10 bg-gray-100 rounded w-full"></div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="h-10 bg-gray-100 rounded"></div>
                        <div className="h-10 bg-gray-100 rounded"></div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Lock className="h-4 w-4 text-green-500 mr-2" />
                        <span className="text-xs text-green-600 font-medium">
                          Encrypted Connection
                        </span>
                      </div>
                      <motion.button
                        className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Submit Payment
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment methods grid */}
            <motion.div
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6"
              variants={containerVariants}
            >
              {paymentMethods.map((method) => (
                <motion.div
                  key={method.id}
                  className="relative bg-white rounded-xl shadow-sm border border-gray-200 p-4 transition-all duration-300 hover:shadow-md"
                  variants={itemVariants}
                  onMouseEnter={() => setHoveredMethod(method.id)}
                  onMouseLeave={() => setHoveredMethod(null)}
                  whileHover={{ y: -5 }}
                >
                  {method.popular && (
                    <motion.div
                      className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs px-2 py-0.5 rounded-full"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3, type: "spring" }}
                    >
                      Popular
                    </motion.div>
                  )}
                  <div className="h-12 flex items-center justify-center mb-3">
                    <img
                      src={method.logo}
                      alt={method.name}
                      className="h-full object-contain max-w-full"
                    />
                  </div>
                  <p className="text-center text-sm font-medium text-gray-700">
                    {method.name}
                  </p>

                  {hoveredMethod === method.id && (
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center bg-indigo-600 bg-opacity-90 rounded-xl"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="text-white text-center p-2">
                        <CheckCircle className="h-6 w-6 mx-auto mb-1" />
                        <p className="text-xs font-medium">Accepted</p>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}

        {/* Trusted Partners Tab */}
        {activeTab === "partners" && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-12">
              <div className="grid md:grid-cols-2">
                <div className="p-8 bg-gradient-to-br from-indigo-600 to-purple-700 text-white">
                  <motion.h3
                    className="text-2xl font-bold mb-4"
                    variants={itemVariants}
                  >
                    Why Leading Companies Choose Us
                  </motion.h3>
                  <motion.p
                    className="text-indigo-100 mb-6"
                    variants={itemVariants}
                  >
                    Our translation services are trusted by enterprises
                    worldwide for their accuracy, security, and reliability.
                  </motion.p>

                  <motion.div
                    className="space-y-4"
                    variants={containerVariants}
                  >
                    {trustIndicators.map((indicator, idx) => (
                      <motion.div
                        key={idx}
                        className="flex items-center"
                        variants={itemVariants}
                      >
                        <div className="mr-3 p-1 bg-white bg-opacity-20 rounded-full">
                          {indicator.icon}
                        </div>
                        <span>{indicator.text}</span>
                      </motion.div>
                    ))}
                  </motion.div>

                  <motion.button
                    className="mt-8 bg-white text-indigo-600 px-6 py-2.5 rounded-lg font-medium inline-flex items-center transition-colors hover:bg-indigo-50"
                    variants={itemVariants}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Star className="h-4 w-4 mr-2" />
                    Join Our Partners
                  </motion.button>
                </div>

                <div className="p-8">
                  <motion.h3
                    className="text-xl font-bold text-gray-800 mb-6"
                    variants={itemVariants}
                  >
                    Our Global Partners
                  </motion.h3>

                  <motion.div
                    className="grid grid-cols-2 sm:grid-cols-3 gap-6"
                    variants={containerVariants}
                  >
                    {partners.map((partner) => (
                      <motion.div
                        key={partner.id}
                        className="flex flex-col items-center p-4 border border-gray-100 rounded-lg hover:shadow-md transition-shadow"
                        variants={itemVariants}
                        whileHover={{ y: -5 }}
                      >
                        <div className="h-12 flex items-center justify-center mb-3">
                          <img
                            src={partner.logo}
                            alt={partner.name}
                            className="h-full object-contain"
                          />
                        </div>
                        <p className="text-sm font-medium text-gray-700 text-center">
                          {partner.name}
                        </p>
                        <span className="text-xs text-gray-500">
                          {partner.category}
                        </span>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Testimonials */}
            <motion.div className="mb-8" variants={containerVariants}>
              <motion.h3
                className="text-center text-xl font-bold text-gray-800 mb-8"
                variants={itemVariants}
              >
                What Our Customers Say About Our Payment Security
              </motion.h3>

              <div className="grid md:grid-cols-3 gap-6">
                {testimonials.map((testimonial, idx) => (
                  <motion.div
                    key={idx}
                    className="bg-white p-6 rounded-xl shadow-md border border-gray-100"
                    variants={itemVariants}
                    whileHover={{ y: -5 }}
                  >
                    <div className="flex items-center mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < testimonial.rating
                              ? "text-yellow-500 fill-yellow-500"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-gray-700 mb-4 italic">
                      "{testimonial.quote}"
                    </p>
                    <div className="flex items-center">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.author}
                        className="w-10 h-10 rounded-full mr-3"
                      />
                      <div>
                        <p className="font-medium text-gray-900">
                          {testimonial.author}
                        </p>
                        <p className="text-sm text-gray-500">
                          {testimonial.company}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Security certification badges */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <h3 className="text-lg font-semibold text-gray-700 mb-6">
            Secured & Certified By
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-8">
            <img
              className="h-12 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/McAfee_Logo_2017.svg/1200px-McAfee_Logo_2017.svg.png"
              alt="McAfee Secure"
            />
            <img
              className="h-8 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Norton_Secured_Seal.svg/1200px-Norton_Secured_Seal.svg.png"
              alt="Norton Secured"
            />
            <img
              className="h-10 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/PCI_Compliant.svg/1200px-PCI_Compliant.svg.png"
              alt="PCI Compliant"
            />
            <img
              className="h-12 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Comodo_Certification_Authority_logo.svg/1200px-Comodo_Certification_Authority_logo.svg.png"
              alt="Comodo Secure"
            />
            <img
              className="h-12 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Thawte.svg/1200px-Thawte.svg.png"
              alt="Thawte Secure"
            />
          </div>
        </motion.div>

        {/* Final CTA */}
        <motion.div
          className="mt-16 max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <motion.div
            className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 shadow-xl"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.8, type: "spring" }}
          >
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to Experience Secure Translation Services?
            </h3>
            <p className="text-indigo-100 mb-6">
              Join thousands of satisfied customers who trust our secure payment
              systems
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <motion.button
                className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-medium hover:bg-opacity-90 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Start Free Trial
              </motion.button>
              <motion.button
                className="px-8 py-3 rounded-lg font-medium bg-transparent border border-white text-white hover:bg-white hover:bg-opacity-10 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                View Payment Plans
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default SecurePaymentAndTrustedPartners;
