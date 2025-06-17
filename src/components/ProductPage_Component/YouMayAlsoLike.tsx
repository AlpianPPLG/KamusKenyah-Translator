import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Crown,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Star,
  Globe,
  BookOpen,
  Brain,
  Headphones,
  Volume2,
  MessageSquare,
  Zap,
  Download,
  Lock,
  ChevronRight,
  Gift,
} from "lucide-react";

interface Product {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  price: string;
  features: string[];
  badge?: string;
  color: string;
  isPopular?: boolean;
}

const products: Product[] = [
  {
    id: "premium-dict",
    title: "Premium Dictionary",
    description: "Advanced features for serious language learners",
    icon: <BookOpen className="w-6 h-6" />,
    price: "$9.99/mo",
    features: [
      "Unlimited word lookups",
      "Audio pronunciations",
      "Example sentences",
      "Cultural notes",
    ],
    badge: "Most Popular",
    color: "from-blue-600 to-indigo-600",
    isPopular: true,
  },
  {
    id: "ai-tutor",
    title: "AI Language Tutor",
    description: "Personal AI-powered language learning assistant",
    icon: <Brain className="w-6 h-6" />,
    price: "$14.99/mo",
    features: [
      "Personalized lessons",
      "Conversation practice",
      "Progress tracking",
      "Custom study plans",
    ],
    color: "from-purple-600 to-pink-600",
  },
  {
    id: "audio-course",
    title: "Audio Course Bundle",
    description: "Comprehensive audio lessons by native speakers",
    icon: <Headphones className="w-6 h-6" />,
    price: "$19.99",
    features: [
      "50+ audio lessons",
      "Downloadable content",
      "Practice exercises",
      "Progress certificates",
    ],
    color: "from-amber-500 to-orange-600",
  },
  {
    id: "pro-translator",
    title: "Professional Translator",
    description: "Advanced translation tools for professionals",
    icon: <Globe className="w-6 h-6" />,
    price: "$24.99/mo",
    features: [
      "Batch translation",
      "API access",
      "Custom glossary",
      "Priority support",
    ],
    color: "from-green-600 to-teal-600",
  },
  {
    id: "community-plus",
    title: "Community Plus",
    description: "Enhanced community features and networking",
    icon: <MessageSquare className="w-6 h-6" />,
    price: "$7.99/mo",
    features: [
      "Private groups",
      "Direct messaging",
      "Event hosting",
      "Resource sharing",
    ],
    color: "from-rose-600 to-pink-600",
  },
];

const features = [
  {
    icon: <Volume2 className="w-6 h-6" />,
    title: "Audio Pronunciation",
    description: "Native speaker recordings for perfect pronunciation",
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Instant Translation",
    description: "Real-time translation with high accuracy",
  },
  {
    icon: <Download className="w-6 h-6" />,
    title: "Offline Access",
    description: "Access all features without internet connection",
  },
  {
    icon: <Gift className="w-6 h-6" />,
    title: "Special Offers",
    description: "Exclusive discounts and premium features",
  },
];

const YouMayAlsoLike: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showRating, setShowRating] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Track visible products based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        const container = scrollContainerRef.current;
        const cardWidth = container.children[0].clientWidth + 32;
        const scrollPosition = container.scrollLeft;
        const newActiveIndex = Math.round(scrollPosition / cardWidth);
        setActiveIndex(newActiveIndex);
      }
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, []);

  const scrollToNext = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = container.children[0].clientWidth + 32; // width + gap
      container.scrollBy({ left: cardWidth, behavior: "smooth" });
      setActiveIndex((prev) => (prev + 1) % products.length);
    }
  };

  const scrollToPrev = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = container.children[0].clientWidth + 32; // width + gap
      container.scrollBy({ left: -cardWidth, behavior: "smooth" });
      setActiveIndex((prev) => (prev - 1 + products.length) % products.length);
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 text-blue-600 mb-4"
          >
            <Crown className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">Premium Features</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-6"
          >
            Enhance Your{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Learning Experience
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Discover our premium features and additional products to accelerate
            your Dayak Kenyah language learning journey
          </motion.p>
        </div>

        {/* Product Carousel */}
        <div className="relative mb-20">
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto gap-8 pb-8 snap-x snap-mandatory hide-scrollbar"
          >
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="min-w-[300px] sm:min-w-[350px] flex-shrink-0 snap-center"
              >
                <div
                  className={`h-full bg-white rounded-2xl border-2 ${
                    product.isPopular
                      ? "border-blue-500 shadow-lg"
                      : "border-gray-200"
                  } p-6 relative group hover:border-blue-200 transition-all duration-300`}
                >
                  {product.badge && (
                    <div className="absolute -top-3 -right-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm px-3 py-1 rounded-full flex items-center">
                      <Sparkles className="w-4 h-4 mr-1" />
                      {product.badge}
                    </div>
                  )}

                  <div
                    className={`w-12 h-12 rounded-lg bg-gradient-to-r ${product.color} flex items-center justify-center text-white mb-4`}
                  >
                    {product.icon}
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {product.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{product.description}</p>

                  {/* Display a star rating when this is the active product */}
                  <div
                    className="mb-3 flex items-center cursor-pointer"
                    onMouseEnter={() => setShowRating(true)}
                    onMouseLeave={() => setShowRating(false)}
                  >
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-5 h-5 ${
                          activeIndex === index || index === 0
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                        fill={
                          activeIndex === index || index === 0
                            ? "currentColor"
                            : "none"
                        }
                      />
                    ))}
                    <span className="ml-2 text-sm text-gray-600">
                      {activeIndex === index || index === 0
                        ? "4.8 (256 reviews)"
                        : "Rate this product"}
                    </span>
                  </div>

                  <div className="text-2xl font-bold text-gray-900 mb-6">
                    {product.price}
                  </div>

                  <ul className="space-y-3 mb-8">
                    {product.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-gray-600">
                        <ChevronRight className="w-4 h-4 text-blue-600 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center ${
                      product.isPopular
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
                        : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                    }`}
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <button
            title="Previous slide"
            onClick={scrollToPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-8 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <button
            title="Next slide"
            onClick={scrollToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-8 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            <ArrowRight className="w-6 h-6 text-gray-600" />
          </button>

          {/* Pagination dots */}
          <div className="flex justify-center gap-2 mt-6">
            {products.map((_, index) => (
              <button
                title={`Go to slide ${index + 1}`}
                key={index}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  index === activeIndex ? "bg-blue-600 w-6" : "bg-gray-300"
                }`}
                onClick={() => {
                  if (scrollContainerRef.current) {
                    const container = scrollContainerRef.current;
                    const cardWidth = container.children[0].clientWidth + 32;
                    container.scrollTo({
                      left: cardWidth * index,
                      behavior: "smooth",
                    });
                    setActiveIndex(index);
                  }
                }}
              />
            ))}
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-xl border border-gray-200 hover:border-blue-200 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 mb-4">
                {feature.icon}
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h4>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA Section with AnimatePresence for notification */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 text-center relative"
        >
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to Unlock Premium Features?
            </h3>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              Get access to all premium features and take your language learning
              to the next level
            </p>

            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-8 py-3 bg-white text-blue-600 rounded-lg font-medium hover:shadow-lg transition-all duration-300"
                onClick={() => setShowRating(!showRating)}
              >
                Get Started
                <Lock className="w-4 h-4 ml-2" />
              </motion.button>

              {/* Special offer notification using AnimatePresence */}
              <AnimatePresence>
                {showRating && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 bg-white rounded-lg shadow-xl p-4 w-72"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Star
                        className="w-5 h-5 text-yellow-400"
                        fill="currentColor"
                      />
                      <span className="font-medium">
                        Special offer unlocked!
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      Use code <span className="font-bold">PREMIUM20</span> for
                      20% off!
                    </p>
                    <div className="text-xs text-gray-500">
                      Offer expires in {activeIndex + 1} days
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <p className="text-blue-100 text-sm mt-4">
              30-day money-back guarantee • Cancel anytime
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default YouMayAlsoLike;
