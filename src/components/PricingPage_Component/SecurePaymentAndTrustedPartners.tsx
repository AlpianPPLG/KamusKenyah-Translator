"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Lock, CheckCircle, Star } from "react-feather";

const SecurePaymentAndTrustedPartners = () => {
  const [activeTab, setActiveTab] = useState("payment");
  const [hoveredMethod, setHoveredMethod] = useState<number | null>(null); // Ubah ini
  const [activeSecurityFeature, setActiveSecurityFeature] = useState(0);
  const [countdown, setCountdown] = useState(30);
  const [isAnimated, setIsAnimated] = useState(false);

  const securityFeatures = [
    {
      icon: <Lock className="h-6 w-6 text-indigo-500" />,
      title: "Advanced Encryption",
      description:
        "We use the latest encryption technologies to protect your data.",
    },
    {
      icon: <Lock className="h-6 w-6 text-indigo-500" />,
      title: "Two-Factor Authentication",
      description:
        "Add an extra layer of security with two-factor authentication.",
    },
    {
      icon: <Lock className="h-6 w-6 text-indigo-500" />,
      title: "Fraud Monitoring",
      description: "Our systems actively monitor for fraudulent activity.",
    },
  ];

  const paymentMethods = [
    {
      id: 1,
      name: "Visa",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/1200px-Visa_Inc._logo.svg.png",
      popular: true,
    },
    {
      id: 2,
      name: "Mastercard",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1200px-Mastercard-logo.svg.png",
      popular: true,
    },
    {
      id: 3,
      name: "PayPal",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Paypal_Logo_Icon_2014.svg/1200px-Paypal_Logo_Icon_2014.svg.png",
      popular: true,
    },
    {
      id: 4,
      name: "American Express",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/American_Express_logo.svg/1200px-American_Express_logo.svg.png",
    },
    {
      id: 5,
      name: "Discover",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Discover_Card_logo.svg/1200px-Discover_Card_logo.svg.png",
    },
    {
      id: 6,
      name: "Apple Pay",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_Pay_logo.svg/1200px-Apple_Pay_logo.svg.png",
    },
    {
      id: 7,
      name: "Google Pay",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Google_Pay_Logo.svg/1200px-Google_Pay_Logo.svg.png",
    },
    {
      id: 8,
      name: "Venmo",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Venmo_logo.svg/1200px-Venmo_logo.svg.png",
    },
  ];

  const partners = [
    {
      id: 1,
      name: "Google",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1200px-Google_%22G%22_Logo.svg.png",
      category: "Technology",
    },
    {
      id: 2,
      name: "Microsoft",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/1200px-Microsoft_logo.svg.png",
      category: "Technology",
    },
    {
      id: 3,
      name: "Amazon",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1200px-Amazon_logo.svg.png",
      category: "E-commerce",
    },
    {
      id: 4,
      name: "Salesforce",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Salesforce_logo.svg/1200px-Salesforce_logo.svg.png",
      category: "CRM",
    },
    {
      id: 5,
      name: "IBM",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IBM_logo.svg/1200px-IBM_logo.svg.png",
      category: "Technology",
    },
    {
      id: 6,
      name: "Oracle",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Oracle_logo.svg/1200px-Oracle_logo.svg.png",
      category: "Technology",
    },
  ];

  const testimonials = [
    {
      rating: 5,
      quote:
        "I feel so much safer knowing my payments are secure with this service.",
      author: "Alice Johnson",
      company: "ABC Corp",
      avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    },
    {
      rating: 4,
      quote:
        "The payment process is seamless and I trust their security measures.",
      author: "Bob Williams",
      company: "XYZ Inc",
      avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    },
    {
      rating: 5,
      quote:
        "I've never had any issues with payments, and I appreciate the peace of mind.",
      author: "Charlie Brown",
      company: "123 Ltd",
      avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    },
  ];

  const trustIndicators = [
    {
      icon: <CheckCircle className="h-5 w-5 text-green-400" />,
      text: "ISO 27001 Certified",
    },
    {
      icon: <CheckCircle className="h-5 w-5 text-green-400" />,
      text: "GDPR Compliant",
    },
    {
      icon: <CheckCircle className="h-5 w-5 text-green-400" />,
      text: "Regular Security Audits",
    },
  ];

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const pulseAnimation = {
    initial: { opacity: 0.5 },
    animate: {
      opacity: 1,
      transition: {
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse",
      },
    },
  };

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

  return (
    <section className="py-12 bg-gray-50">
      <motion.div
        className="text-center mb-16 max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={isAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="inline-flex items-center justify-center mb-4 px-4 py-1.5 rounded-full bg-indigo-100 text-indigo-800 font-medium text-sm"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={
            isAnimated ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
          }
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
          implement industry-leading security measures to keep your transactions
          safe.
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
          <span className="font-medium text-indigo-600 mr-1">{countdown}</span>{" "}
          seconds until our next security scan
          <motion.div
            className="ml-2 h-2 w-2 bg-green-500 rounded-full"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
          />
        </div>
      </motion.div>

      {activeTab === "payment" && (
        <motion.div
          initial="hidden"
          animate={isAnimated ? "visible" : "hidden"}
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
                        activeSecurityFeature === index && isAnimated
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
                  animate={
                    isAnimated ? pulseAnimation.animate : pulseAnimation.initial
                  }
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
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.5, delay: method.id * 0.1 }}
              >
                {method.popular && (
                  <motion.div
                    className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs px-2 py-0.5 rounded-full"
                    initial={{ scale: 0 }}
                    animate={isAnimated ? { scale: 1 } : { scale: 0 }}
                    transition={{ delay: 0.3, type: "spring" }}
                  >
                    Popular
                  </motion.div>
                )}
                <div className="h-12 flex items-center justify-center mb-3">
                  <img
                    src={method.logo || "/placeholder.svg"}
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

      {activeTab === "partners" && (
        <motion.div
          initial="hidden"
          animate={isAnimated ? "visible" : "hidden"}
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
                  Our translation services are trusted by enterprises worldwide
                  for their accuracy, security, and reliability.
                </motion.p>

                <motion.div className="space-y-4" variants={containerVariants}>
                  {trustIndicators.map((indicator, idx) => (
                    <motion.div
                      key={idx}
                      className="flex items-center"
                      variants={itemVariants}
                      initial={{ opacity: 0, x: -20 }}
                      animate={
                        isAnimated
                          ? { opacity: 1, x: 0 }
                          : { opacity: 0, x: -20 }
                      }
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
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
                      initial={{ opacity: 0, y: 20 }}
                      animate={
                        isAnimated
                          ? { opacity: 1, y: 0 }
                          : { opacity: 0, y: 20 }
                      }
                      transition={{ duration: 0.5, delay: partner.id * 0.1 }}
                    >
                      <div className="h-12 flex items-center justify-center mb-3">
                        <img
                          src={partner.logo || "/placeholder.svg"}
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
                  initial={{ opacity: 0, y: 20 }}
                  animate={
                    isAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                  }
                  transition={{ duration: 0.5, delay: 0.3 + idx * 0.1 }}
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
                      src={testimonial.avatar || "/placeholder.svg"}
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

      <motion.div
        className="mt-16 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={isAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <h3 className="text-lg font-semibold text-gray-700 mb-6">
          Secured & Certified By
        </h3>
        <div className="flex flex-wrap justify-center items-center gap-8">
          <img
            className={`h-12 transition-all duration-300 ${
              isAnimated
                ? "grayscale opacity-70 hover:grayscale-0 hover:opacity-100"
                : "grayscale opacity-30"
            }`}
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/McAfee_Logo_2017.svg/1200px-McAfee_Logo_2017.svg.png"
            alt="McAfee Secure"
          />
          <img
            className={`h-8 transition-all duration-300 ${
              isAnimated
                ? "grayscale opacity-70 hover:grayscale-0 hover:opacity-100"
                : "grayscale opacity-30"
            }`}
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Norton_Secured_Seal.svg/1200px-Norton_Secured_Seal.svg.png"
            alt="Norton Secured"
          />
          <img
            className={`h-10 transition-all duration-300 ${
              isAnimated
                ? "grayscale opacity-70 hover:grayscale-0 hover:opacity-100"
                : "grayscale opacity-30"
            }`}
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/PCI_Compliant.svg/1200px-PCI_Compliant.svg.png"
            alt="PCI Compliant"
          />
          <img
            className={`h-12 transition-all duration-300 ${
              isAnimated
                ? "grayscale opacity-70 hover:grayscale-0 hover:opacity-100"
                : "grayscale opacity-30"
            }`}
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Comodo_Certification_Authority_logo.svg/1200px-Comodo_Certification_Authority_logo.svg.png"
            alt="Comodo Secure"
          />
          <img
            className={`h-12 transition-all duration-300 ${
              isAnimated
                ? "grayscale opacity-70 hover:grayscale-0 hover:opacity-100"
                : "grayscale opacity-30"
            }`}
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Thawte.svg/1200px-Thawte.svg.png"
            alt="Thawte Secure"
          />
        </div>
      </motion.div>

      <motion.div
        className="mt-16 max-w-3xl mx-auto text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={isAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ delay: 0.7, duration: 0.6 }}
      >
        <motion.div
          className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 shadow-xl"
          initial={{ scale: 0.9 }}
          animate={isAnimated ? { scale: 1 } : { scale: 0.9 }}
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
    </section>
  );
};

export default SecurePaymentAndTrustedPartners;
