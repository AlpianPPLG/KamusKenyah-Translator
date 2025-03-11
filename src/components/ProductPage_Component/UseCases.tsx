"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import {
  BookOpen,
  Building2,
  GraduationCap,
  Users,
  Lightbulb,
  Globe,
  Briefcase,
  HeartHandshake,
  ArrowRight,
} from "lucide-react";

// Custom utility function
const classNames = (...classes: (string | boolean | undefined)[]) => {
  return classes.filter(Boolean).join(" ");
};

// User category type
interface UserCategory {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  benefits: string[];
  color: string;
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
}

const userCategories: UserCategory[] = [
  {
    id: 1,
    title: "Students & Learners",
    description:
      "Perfect for students learning the Kenyah language or researching indigenous cultures.",
    icon: <GraduationCap />,
    benefits: [
      "Easy vocabulary acquisition",
      "Pronunciation guides with audio",
      "Cultural context for deeper understanding",
      "Offline access for remote study",
    ],
    color: "blue",
    testimonial: {
      quote:
        "KamusKenyah has been invaluable for my anthropology research. The audio pronunciations helped me communicate effectively during my field studies.",
      author: "Maya Wijaya",
      role: "Anthropology Student",
    },
  },
  {
    id: 2,
    title: "Educators & Researchers",
    description:
      "A comprehensive resource for teachers, professors, and academic researchers.",
    icon: <BookOpen />,
    benefits: [
      "Authoritative language reference",
      "Etymological information",
      "Searchable database of terms",
      "Exportable word lists for teaching",
    ],
    color: "purple",
    testimonial: {
      quote:
        "As a linguistics professor, I recommend KamusKenyah to all my students studying Austronesian languages. It's the most comprehensive digital resource available.",
      author: "Dr. Ahmad Fauzi",
      role: "Linguistics Professor",
    },
  },
  {
    id: 3,
    title: "Cultural Institutions",
    description:
      "Museums, cultural centers, and heritage organizations preserving indigenous knowledge.",
    icon: <Building2 />,
    benefits: [
      "Preservation of endangered language",
      "Cultural heritage documentation",
      "Interactive exhibits integration",
      "Educational program support",
    ],
    color: "amber",
  },
  {
    id: 4,
    title: "Community Members",
    description:
      "Kenyah community members seeking to maintain their language and pass it to future generations.",
    icon: <Users />,
    benefits: [
      "Intergenerational language transfer",
      "Daily practical vocabulary",
      "Cultural idioms and expressions",
      "Community contribution features",
    ],
    color: "green",
    testimonial: {
      quote:
        "Our community elders worked with the KamusKenyah team to ensure authentic pronunciations. Now our children can learn our language even if they live in cities.",
      author: "Tama Lawai",
      role: "Kenyah Community Leader",
    },
  },
  {
    id: 5,
    title: "Travelers & Explorers",
    description:
      "Adventurers visiting Kenyah regions who want to connect with local communities.",
    icon: <Globe />,
    benefits: [
      "Essential travel phrases",
      "Cultural etiquette guidance",
      "Offline access in remote areas",
      "Location-based relevant terms",
    ],
    color: "teal",
  },
  {
    id: 6,
    title: "Language Enthusiasts",
    description:
      "Polyglots and language lovers interested in learning unique and diverse languages.",
    icon: <Lightbulb />,
    benefits: [
      "Unique language structure exploration",
      "Comparative linguistics features",
      "Achievement tracking",
      "Community of fellow enthusiasts",
    ],
    color: "pink",
  },
  {
    id: 7,
    title: "Business & Organizations",
    description:
      "Companies and NGOs working in regions with Kenyah-speaking populations.",
    icon: <Briefcase />,
    benefits: [
      "Professional communication tools",
      "Cultural sensitivity training",
      "Team licenses available",
      "Integration with other business tools",
    ],
    color: "indigo",
  },
  {
    id: 8,
    title: "Cultural Preservation Projects",
    description:
      "Initiatives focused on documenting and preserving endangered languages and cultures.",
    icon: <HeartHandshake />,
    benefits: [
      "Comprehensive documentation",
      "Multimedia archiving",
      "Collaborative editing tools",
      "API access for integration",
    ],
    color: "rose",
  },
];

// Color mapping for styling
const colorVariants = {
  blue: {
    light: "bg-blue-50 border-blue-200",
    medium: "bg-blue-100",
    text: "text-blue-600",
    icon: "bg-blue-100 text-blue-600",
    hover: "hover:bg-blue-50 hover:border-blue-300",
    active: "bg-blue-50 border-blue-300",
  },
  purple: {
    light: "bg-purple-50 border-purple-200",
    medium: "bg-purple-100",
    text: "text-purple-600",
    icon: "bg-purple-100 text-purple-600",
    hover: "hover:bg-purple-50 hover:border-purple-300",
    active: "bg-purple-50 border-purple-300",
  },
  amber: {
    light: "bg-amber-50 border-amber-200",
    medium: "bg-amber-100",
    text: "text-amber-600",
    icon: "bg-amber-100 text-amber-600",
    hover: "hover:bg-amber-50 hover:border-amber-300",
    active: "bg-amber-50 border-amber-300",
  },
  green: {
    light: "bg-green-50 border-green-200",
    medium: "bg-green-100",
    text: "text-green-600",
    icon: "bg-green-100 text-green-600",
    hover: "hover:bg-green-50 hover:border-green-300",
    active: "bg-green-50 border-green-300",
  },
  teal: {
    light: "bg-teal-50 border-teal-200",
    medium: "bg-teal-100",
    text: "text-teal-600",
    icon: "bg-teal-100 text-teal-600",
    hover: "hover:bg-teal-50 hover:border-teal-300",
    active: "bg-teal-50 border-teal-300",
  },
  pink: {
    light: "bg-pink-50 border-pink-200",
    medium: "bg-pink-100",
    text: "text-pink-600",
    icon: "bg-pink-100 text-pink-600",
    hover: "hover:bg-pink-50 hover:border-pink-300",
    active: "bg-pink-50 border-pink-300",
  },
  indigo: {
    light: "bg-indigo-50 border-indigo-200",
    medium: "bg-indigo-100",
    text: "text-indigo-600",
    icon: "bg-indigo-100 text-indigo-600",
    hover: "hover:bg-indigo-50 hover:border-indigo-300",
    active: "bg-indigo-50 border-indigo-300",
  },
  rose: {
    light: "bg-rose-50 border-rose-200",
    medium: "bg-rose-100",
    text: "text-rose-600",
    icon: "bg-rose-100 text-rose-600",
    hover: "hover:bg-rose-50 hover:border-rose-300",
    active: "bg-rose-50 border-rose-300",
  },
};

const UseCases: React.FC = () => {
  const [activeCategoryId, setActiveCategory] = useState<number>(1);
  const [visibleTestimonial, setVisibleTestimonial] = useState<number | null>(
    null
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.2 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  // Auto-rotate through categories
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCategory((prev) => {
        const next = (prev % userCategories.length) + 1;

        // Find if the next category has a testimonial
        const nextCategory = userCategories.find((cat) => cat.id === next);
        if (nextCategory?.testimonial) {
          setVisibleTestimonial(next);
        }

        return next;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Show testimonial when changing to a category that has one
  useEffect(() => {
    const category = userCategories.find((cat) => cat.id === activeCategoryId);
    if (category?.testimonial) {
      setVisibleTestimonial(activeCategoryId);
    }
  }, [activeCategoryId]);

  const handleCategoryClick = (id: number) => {
    setActiveCategory(id);

    // Find if the category has a testimonial
    const category = userCategories.find((cat) => cat.id === id);
    if (category?.testimonial) {
      setVisibleTestimonial(id);
    } else {
      setVisibleTestimonial(null);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const activeCategory =
    userCategories.find((cat) => cat.id === activeCategoryId) ||
    userCategories[0];
  const activeColorVariant =
    colorVariants[activeCategory.color as keyof typeof colorVariants];

  return (
    <section className="py-20 bg-white overflow-hidden" ref={containerRef}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            Who Benefits from KamusKenyah?
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our dictionary app serves diverse users, from language learners to
            cultural institutions, each finding unique value in preserving and
            learning the Kenyah language.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left column - Category selection */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={controls}
            className="lg:col-span-1"
          >
            <h3 className="text-xl font-semibold mb-6 text-gray-900">
              User Categories
            </h3>
            <div className="space-y-3">
              {userCategories.map((category) => {
                const colorVariant =
                  colorVariants[category.color as keyof typeof colorVariants];
                const isActive = category.id === activeCategoryId;

                return (
                  <motion.div
                    key={category.id}
                    variants={itemVariants}
                    className={classNames(
                      "flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all duration-300",
                      isActive
                        ? `${colorVariant.active} border-2`
                        : `border border-gray-200 ${colorVariant.hover}`
                    )}
                    onClick={() => handleCategoryClick(category.id)}
                  >
                    <div className={`p-2 rounded-full ${colorVariant.icon}`}>
                      {category.icon}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {category.title}
                      </h4>
                    </div>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="ml-auto"
                      >
                        <div
                          className={`w-2 h-2 rounded-full ${colorVariant.medium}`}
                        ></div>
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Right column - Category details */}
          <motion.div
            className="lg:col-span-2 relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              key={activeCategory.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className={`p-8 rounded-2xl border-2 h-full ${activeColorVariant.light}`}
            >
              <div className="flex items-start gap-4 mb-6">
                <div
                  className={`p-3 rounded-xl ${activeColorVariant.icon} text-2xl`}
                >
                  {activeCategory.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {activeCategory.title}
                  </h3>
                  <p className="text-gray-600 mt-1">
                    {activeCategory.description}
                  </p>
                </div>
              </div>

              <div className="mb-8">
                <h4 className="text-lg font-semibold mb-4 text-gray-900">
                  Key Benefits
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {activeCategory.benefits.map((benefit, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                      className="flex items-center gap-2"
                    >
                      <div
                        className={`w-2 h-2 rounded-full ${activeColorVariant.medium}`}
                      ></div>
                      <span className="text-gray-700">{benefit}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Use case illustration */}
              <div className="relative h-48 md:h-64 mb-6 overflow-hidden rounded-xl bg-white p-4 border border-gray-200">
                <div className="absolute inset-0 opacity-10">
                  <div
                    className={`absolute -right-16 -bottom-16 w-64 h-64 rounded-full ${activeColorVariant.medium}`}
                  ></div>
                  <div
                    className={`absolute -left-8 -top-8 w-32 h-32 rounded-full ${activeColorVariant.medium}`}
                  ></div>
                </div>

                <div className="relative h-full flex items-center justify-center">
                  <div className="text-center max-w-md">
                    <div
                      className={`inline-block p-4 rounded-full ${activeColorVariant.icon} text-3xl mb-4`}
                    >
                      {activeCategory.icon}
                    </div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">
                      Perfect for {activeCategory.title}
                    </h4>
                    <p className="text-gray-600">
                      Discover how KamusKenyah enhances your{" "}
                      {activeCategory.title.toLowerCase()} experience
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex justify-start">
                <button
                  className={`inline-flex items-center gap-1 font-medium ${activeColorVariant.text}`}
                >
                  Learn more about features for {activeCategory.title}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>

            {/* Testimonial overlay */}
            {visibleTestimonial !== null && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5 }}
                className="absolute -bottom-12 right-4 left-4 md:left-auto md:right-8 md:max-w-sm"
              >
                {userCategories.map((category) => {
                  if (
                    category.id === visibleTestimonial &&
                    category.testimonial
                  ) {
                    const colorVariant =
                      colorVariants[
                        category.color as keyof typeof colorVariants
                      ];
                    return (
                      <div
                        key={category.id}
                        className={`p-6 rounded-xl shadow-lg bg-white border ${colorVariant.light.replace(
                          "bg-",
                          "border-"
                        )}`}
                      >
                        <div className="flex items-center gap-2 mb-3">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <svg
                              key={star}
                              className="w-4 h-4 text-yellow-400 fill-current"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                            </svg>
                          ))}
                        </div>
                        <p className="text-gray-700 italic mb-4">
                          "{category.testimonial.quote}"
                        </p>
                        <div>
                          <p className="font-medium text-gray-900">
                            {category.testimonial.author}
                          </p>
                          <p className={`text-sm ${colorVariant.text}`}>
                            {category.testimonial.role}
                          </p>
                        </div>
                      </div>
                    );
                  }
                  return null;
                })}
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={controls}
          variants={{
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.6, delay: 0.4 },
            },
          }}
          className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
        >
          {[
            {
              label: "Active Users",
              value: "10,000+",
              icon: <Users className="h-6 w-6" />,
            },
            {
              label: "User Categories",
              value: "8",
              icon: <Briefcase className="h-6 w-6" />,
            },
            {
              label: "Satisfaction Rate",
              value: "98%",
              icon: <HeartHandshake className="h-6 w-6" />,
            },
            {
              label: "Global Reach",
              value: "25+ Countries",
              icon: <Globe className="h-6 w-6" />,
            },
          ].map((stat, index) => (
            <div
              key={index}
              className="p-6 rounded-xl bg-gray-50 border border-gray-200"
            >
              <div className="flex justify-center mb-3">
                <div className="p-2 rounded-full bg-blue-100 text-blue-600">
                  {stat.icon}
                </div>
              </div>
              <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={controls}
          variants={{
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.6, delay: 0.6 },
            },
          }}
          className="mt-20 text-center"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            Ready to experience KamusKenyah?
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
              Download Now
            </button>
            <button className="px-6 py-3 bg-white text-blue-600 border border-blue-200 rounded-lg font-medium hover:bg-blue-50 transition-colors">
              View All Features
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default UseCases;
