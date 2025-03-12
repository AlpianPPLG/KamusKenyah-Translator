"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle,
  ChevronRight,
  Star,
  DollarSign,
  Users,
  Globe,
} from "lucide-react";

// Custom utility function
const classNames = (...classes: (string | boolean | undefined)[]) => {
  return classes.filter(Boolean).join(" ");
};

// Custom Badge component
const Badge: React.FC<{
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "outline";
}> = ({ children, className = "", variant = "default" }) => {
  const baseStyles =
    "inline-flex items-center rounded-full text-xs font-medium";
  const variantStyles = {
    default: "bg-blue-100 text-blue-600 hover:bg-blue-200 px-3 py-1.5",
    outline:
      "bg-white/80 backdrop-blur-sm border border-blue-200 px-3 py-1.5 text-blue-600",
  };

  return (
    <span className={`${baseStyles} ${variantStyles[variant]} ${className}`}>
      {children}
    </span>
  );
};

// Custom Button component
const Button: React.FC<{
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "outline";
  size?: "default" | "sm" | "lg";
  onClick?: () => void;
}> = ({
  children,
  className = "",
  variant = "default",
  size = "default",
  onClick,
}) => {
  const baseStyles =
    "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 disabled:opacity-50 disabled:pointer-events-none";
  const variantStyles = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    outline: "border border-blue-200 bg-white text-blue-600 hover:bg-blue-50",
  };
  const sizeStyles = {
    default: "h-10 px-4 py-2",
    sm: "h-9 px-3",
    lg: "h-12 px-6 text-base",
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

const PricingHero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-gray-50 pt-24 pb-16 md:py-32">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/3 left-1/4 h-64 w-64 rounded-full bg-blue-500/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/3 h-96 w-96 rounded-full bg-purple-500/10 blur-[100px]" />
      </div>

      {/* Floating Badges */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="absolute top-20 right-10 md:right-20 hidden md:block"
      >
        <Badge variant="outline" className="flex items-center gap-1 text-sm">
          <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
          <span>4.9/5 Rating</span>
        </Badge>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="absolute top-32 left-10 md:left-20 hidden md:block"
      >
        <Badge variant="outline" className="flex items-center gap-1 text-sm">
          <Users className="h-3.5 w-3.5 text-blue-600" />
          <span>10K+ Users</span>
        </Badge>
      </motion.div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          {/* Left Column - Text Content */}
          <motion.div variants={itemVariants} className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <motion.div variants={itemVariants}>
                <Badge className="text-sm">Flexible Pricing Plans</Badge>
              </motion.div>
              <motion.h1
                variants={itemVariants}
                className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900"
              >
                Unlock the Full Power of{" "}
                <span className="text-blue-600">KamusKenyah</span>
              </motion.h1>
              <motion.p
                variants={itemVariants}
                className="text-lg md:text-xl text-gray-600 max-w-xl"
              >
                Choose a plan that fits your needs and dive deeper into the
                Kenyah language with premium features, offline access, and
                exclusive cultural content.
              </motion.p>
            </div>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button size="lg" className="gap-2">
                Get Started
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="gap-2">
                Compare Plans
              </Button>
            </motion.div>

            {/* Key Benefits */}
            <motion.div
              variants={itemVariants}
              className="pt-6 border-t border-gray-200"
            >
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Why Go Premium?
              </h3>
              <div className="space-y-4">
                {[
                  {
                    title: "Unlimited Access",
                    desc: "Explore all 10,000+ words and phrases",
                    icon: <Globe className="h-5 w-5" />,
                  },
                  {
                    title: "Exclusive Content",
                    desc: "Cultural insights and advanced lessons",
                    icon: <Star className="h-5 w-5" />,
                  },
                  {
                    title: "Priority Support",
                    desc: "Get help whenever you need it",
                    icon: <Users className="h-5 w-5" />,
                  },
                ].map((benefit, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 * idx, duration: 0.3 }}
                    className="flex items-start gap-3"
                  >
                    <div className="flex-shrink-0 p-2 rounded-full bg-blue-100 text-blue-600">
                      {benefit.icon}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {benefit.title}
                      </h4>
                      <p className="text-sm text-gray-600">{benefit.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Pricing Preview */}
          <motion.div variants={itemVariants} className="relative">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  name: "Basic",
                  price: "Free",
                  features: [
                    "5,000+ words",
                    "Basic audio pronunciations",
                    "Online access",
                  ],
                  cta: "Start Learning",
                  color: "gray",
                },
                {
                  name: "Premium",
                  price: "$4.99",
                  period: "/month",
                  features: [
                    "10,000+ words",
                    "Full audio library",
                    "Offline access",
                    "Cultural insights",
                  ],
                  cta: "Get Premium",
                  color: "blue",
                  popular: true,
                },
              ].map((plan, idx) => (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 * idx, duration: 0.4 }}
                  className={classNames(
                    "relative p-6 bg-white rounded-xl shadow-lg border",
                    plan.popular ? "border-blue-600" : "border-gray-200",
                    "hover:shadow-xl transition-shadow duration-300"
                  )}
                >
                  {plan.popular && (
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      Most Popular
                    </Badge>
                  )}
                  <h3
                    className={classNames(
                      "text-xl font-semibold",
                      plan.color === "blue" ? "text-blue-600" : "text-gray-900"
                    )}
                  >
                    {plan.name}
                  </h3>
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-gray-900">
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className="text-sm text-gray-600">
                        {plan.period}
                      </span>
                    )}
                  </div>
                  <ul className="mt-4 space-y-3">
                    {plan.features.map((feature, fIdx) => (
                      <li
                        key={fIdx}
                        className="flex items-center gap-2 text-gray-600"
                      >
                        <CheckCircle
                          className={classNames(
                            "h-4 w-4",
                            plan.color === "blue"
                              ? "text-blue-600"
                              : "text-gray-500"
                          )}
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button
                    variant={plan.color === "blue" ? "default" : "outline"}
                    className="w-full mt-6"
                  >
                    {plan.cta}
                  </Button>
                </motion.div>
              ))}
            </div>

            {/* Decorative Element */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="absolute -bottom-6 -right-6 bg-white shadow-lg rounded-2xl p-4 border border-gray-200 hidden md:block"
            >
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-green-500" />
                <span className="text-sm font-medium text-gray-900">
                  30-Day Money Back Guarantee
                </span>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="mt-16 pt-8 border-t border-gray-200 text-center"
        >
          <h3 className="text-sm font-medium text-gray-500 mb-6">
            TRUSTED BY LANGUAGE LEARNERS WORLDWIDE
          </h3>
          <div className="flex flex-wrap justify-center gap-8 md:gap-12 opacity-70">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-8 w-24 bg-gray-300/30 rounded-md"></div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingHero;
