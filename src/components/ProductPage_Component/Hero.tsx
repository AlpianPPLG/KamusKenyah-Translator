"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle,
  ChevronRight,
  Download,
  Globe,
  Sparkles,
  Star,
} from "lucide-react";

// Custom utility function to replace cn
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
    default: "bg-primary/10 text-primary hover:bg-primary/20 px-3 py-1.5",
    outline:
      "bg-background/80 backdrop-blur-sm border border-primary/20 px-3 py-1.5",
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
    "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 disabled:opacity-50 disabled:pointer-events-none";

  const variantStyles = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    outline:
      "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
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

const ProductFeatures = [
  {
    id: 1,
    title: "Comprehensive Dictionary",
    description:
      "Over 10,000+ Kenyah words with detailed translations and examples",
    icon: <Globe className="h-5 w-5" />,
  },
  {
    id: 2,
    title: "Audio Pronunciations",
    description: "Listen to native speakers pronounce each word correctly",
    icon: <Sparkles className="h-5 w-5" />,
  },
  {
    id: 3,
    title: "Offline Access",
    description: "Full functionality without internet connection",
    icon: <Download className="h-5 w-5" />,
  },
];

const ProductHero = () => {
  const [activeFeature, setActiveFeature] = useState(1);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev % ProductFeatures.length) + 1);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden bg-white pt-24 pb-16 md:py-32">
      {/* Decorative elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-blue-500/5 blur-3xl" />
        <div className="absolute bottom-1/3 right-1/3 h-96 w-96 rounded-full bg-purple-500/10 blur-[100px]" />
      </div>

      {/* Floating badges */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="absolute top-20 right-10 md:right-20 hidden md:block"
      >
        <Badge variant="outline" className="flex items-center gap-1 text-sm">
          <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
          <span>4.9/5 User Rating</span>
        </Badge>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="absolute top-32 left-10 md:left-20 hidden md:block"
      >
        <Badge variant="outline" className="flex items-center gap-1 text-sm">
          <Download className="h-3.5 w-3.5 text-blue-500" />
          <span>10K+ Downloads</span>
        </Badge>
      </motion.div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Left column - Text content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -20 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-6"
          >
            <div className="flex flex-col gap-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <Badge className="px-3 py-1.5 text-sm">
                  New Version 2.0 Released
                </Badge>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-90"
              >
                Kamus
                <span className="text-blue-600 dark:text-blue-500">Kenyah</span>
                <span className="block mt-2">Dictionary App</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="text-lg md:text-xl text-gray-900 max-w-xl"
              >
                Preserve and learn the Kenyah language with our comprehensive
                digital dictionary. Access thousands of words, phrases, and
                cultural insights.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button size="lg" className="gap-2 text-base">
                Download Now
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
              <Button size="lg" variant="outline" className="gap-2 text-base">
                Explore Features
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="pt-6 mt-4 border-t border-gray-200 dark:border-gray-800"
            >
              <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-white">
                Key Features
              </h3>
              <div className="space-y-4">
                {ProductFeatures.map((feature) => (
                  <motion.div
                    key={feature.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: activeFeature === feature.id ? 1.02 : 1,
                      backgroundColor:
                        activeFeature === feature.id
                          ? "rgba(59, 130, 246, 0.1)"
                          : "transparent",
                    }}
                    transition={{
                      delay: 0.7 + feature.id * 0.1,
                      duration: 0.3,
                    }}
                    className={classNames(
                      "flex items-start gap-3 p-3 rounded-lg transition-all duration-300",
                      activeFeature === feature.id
                        ? "bg-blue-500/10 border-blue-500/20"
                        : ""
                    )}
                    onMouseEnter={() => setActiveFeature(feature.id)}
                  >
                    <div
                      className={classNames(
                        "flex-shrink-0 p-2 rounded-full",
                        activeFeature === feature.id
                          ? "bg-blue-500/20 text-blue-600 dark:text-blue-500"
                          : "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400"
                      )}
                    >
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 ">
                        {feature.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right column - Product showcase */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] md:aspect-square lg:aspect-[4/5] w-full max-w-md mx-auto">
              {/* Phone frame */}
              <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-100 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-[40px] border-8 border-gray-900/10 dark:border-white/10 shadow-2xl overflow-hidden">
                {/* App screenshot */}
                <div className="absolute inset-0 bg-white dark:bg-gray-900">
                  {/* App header */}
                  <div className="h-14 bg-blue-600 flex items-center justify-center">
                    <h3 className="text-white font-medium">KamusKenyah</h3>
                  </div>

                  {/* App content */}
                  <div className="p-4 space-y-4">
                    {/* Search bar */}
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3 flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-blue-500/70"></div>
                      <div className="h-2 w-3/4 bg-blue-500/20 rounded-full"></div>
                    </div>

                    {/* Dictionary entries */}
                    {[1, 2, 3, 4].map((item) => (
                      <motion.div
                        key={item}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 + item * 0.1, duration: 0.3 }}
                        className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="h-3 w-24 bg-blue-500/40 rounded-full mb-2"></div>
                            <div className="h-2 w-32 bg-gray-400/30 dark:bg-gray-500/30 rounded-full"></div>
                          </div>
                          <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center">
                            <div className="w-3 h-3 rounded-full bg-blue-500/70"></div>
                          </div>
                        </div>
                        <div className="mt-3 space-y-1">
                          <div className="h-2 w-full bg-gray-300/50 dark:bg-gray-600/50 rounded-full"></div>
                          <div className="h-2 w-5/6 bg-gray-300/50 dark:bg-gray-600/50 rounded-full"></div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="absolute -top-6 -right-6 bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-4 border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    Offline Ready
                  </span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                className="absolute -bottom-4 -left-4 bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-3 border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-1">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className={`w-6 h-6 rounded-full border-2 border-white dark:border-gray-800 bg-blue-500/20`}
                      ></div>
                    ))}
                  </div>
                  <span className="text-xs font-medium text-gray-900 dark:text-white">
                    10k+ Users
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Background decorative elements */}
            <div className="absolute -z-10 inset-0 overflow-hidden">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] bg-[radial-gradient(circle,rgba(59,130,246,0.08)_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_at_center,white_20%,transparent_75%)]"></div>
            </div>
          </motion.div>
        </div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.5 }}
          className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800"
        >
          <div className="text-center mb-6">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              TRUSTED BY LANGUAGE ENTHUSIASTS WORLDWIDE
            </h3>
          </div>
          <div className="flex flex-wrap justify-center gap-8 md:gap-12 opacity-70">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="h-8 w-24 bg-gray-300/30 dark:bg-gray-700/30 rounded-md"
              ></div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductHero;
