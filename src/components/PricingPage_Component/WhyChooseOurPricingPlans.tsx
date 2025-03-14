import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  BadgeCheck,
  DollarSign,
  Shield,
  Users,
  HeartHandshake,
  Sparkles,
  ArrowRight,
  Zap,
} from "lucide-react";

const WhyChooseOurPricingPlans: React.FC = () => {
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById("why-choose-section");
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  const features = [
    {
      id: 1,
      title: "Competitive Pricing",
      description:
        "Our plans are carefully tailored to provide maximum value at prices that outperform the competition. No hidden costs, just transparent pricing that makes sense.",
      icon: <DollarSign className="h-6 w-6 text-green-500" />,
      stat: "30% Lower",
      statLabel: "than competitors",
      color: "from-green-500 to-emerald-600",
      benefits: [
        "Flexible tier-based pricing",
        "Volume discounts available",
        "Student and non-profit discounts",
        "Annual payment savings",
      ],
    },
    {
      id: 2,
      title: "No Hidden Fees",
      description:
        "What you see is what you pay. We believe in complete transparency, with all features clearly listed and no surprise charges after you subscribe.",
      icon: <Shield className="h-6 w-6 text-purple-500" />,
      stat: "100%",
      statLabel: "transparent pricing",
      color: "from-purple-500 to-indigo-600",
      benefits: [
        "All inclusive packages",
        "No setup or cancellation fees",
        "Predictable monthly billing",
        "No data overage charges",
      ],
    },
    {
      id: 3,
      title: "Custom Enterprise Solutions",
      description:
        "Need something unique? Our enterprise plans can be fully customized to meet your specific business requirements and scale with your growth.",
      icon: <Users className="h-6 w-6 text-blue-500" />,
      stat: "Unlimited",
      statLabel: "customization options",
      color: "from-blue-500 to-cyan-600",
      benefits: [
        "Dedicated account manager",
        "Custom API integration",
        "White-label options",
        "Priority development queue",
      ],
    },
    {
      id: 4,
      title: "24/7 Priority Support",
      description:
        "Our support team is available around the clock to help with any questions or issues. Enterprise customers get priority access to technical specialists.",
      icon: <HeartHandshake className="h-6 w-6 text-rose-500" />,
      stat: "<1 Hour",
      statLabel: "response time",
      color: "from-rose-500 to-pink-600",
      benefits: [
        "Live chat support",
        "Dedicated phone line",
        "Video consultation",
        "Comprehensive knowledge base",
      ],
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const competitorComparison = [
    {
      feature: "Monthly Price",
      us: "$12.99",
      competitor1: "$19.99",
      competitor2: "$24.99",
    },
    {
      feature: "Annual Discount",
      us: "25%",
      competitor1: "10%",
      competitor2: "15%",
    },
    {
      feature: "Free Trial Period",
      us: "30 days",
      competitor1: "14 days",
      competitor2: "7 days",
    },
    {
      feature: "Support Response Time",
      us: "1 hour",
      competitor1: "24 hours",
      competitor2: "48 hours",
    },
    {
      feature: "Custom Integrations",
      us: "Included",
      competitor1: "Extra fee",
      competitor2: "Not available",
    },
  ];

  return (
    <section
      id="why-choose-section"
      className="py-20 relative overflow-hidden bg-white"
    >
      {/* Background gradient and pattern */}
      <div className="absolute inset-0 bg-gradient-to-b bg-white"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMzYgMzRjMC0yLjItMS44LTQtNC00cy00IDEuOC00IDQgMS44IDQgNCA0IDQtMS44IDQtNHoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9Ii4wNSIvPjxwYXRoIGQ9Ik02MCAzMGMwLTEuMS0uOS0yLTItMnMtMiAuOS0yIDIgLjkgMiAyIDIgMi0uOSAyLTJ6IiBzdHJva2U9IiNmZmYiIHN0cm9rZS1vcGFjaXR5PSIuMDUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC01OCAtMjgpIi8+PHBhdGggZD0iTTIwIDEwYzAtMS4xLS45LTItMi0ycy0yIC45LTIgMiAuOSAyIDIgMiAyLS45IDItMnoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9Ii4wNSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE4IC04KSIvPjwvZz48L3N2Zz4=')] opacity-5"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.div variants={itemVariants}>
            <span className="inline-block mb-3 px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 text-sm font-medium rounded-full">
              Value Proposition
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Why Choose Our Pricing Plans?
            </h2>
            <p className="text-gray-900 max-w-3xl mx-auto text-lg">
              Our pricing model is designed with your success in mind. We offer
              transparent, flexible options that grow with your needs while
              providing exceptional value.
            </p>
          </motion.div>
        </motion.div>

        {/* Feature cards section */}
        <motion.div
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.id}
              variants={itemVariants}
              className="relative bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6 transition-shadow duration-300 hover:shadow-lg"
              onMouseEnter={() => setActiveCard(feature.id)}
              onMouseLeave={() => setActiveCard(null)}
            >
              <div
                className={`w-12 h-12 rounded-lg mb-4 flex items-center justify-center bg-gradient-to-br ${feature.color} text-white`}
              >
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">
                {feature.title}
              </h3>
              <p className="text-slate-500 dark:text-slate-400 mb-4 text-sm">
                {feature.description}
              </p>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-2xl font-bold text-slate-800 dark:text-white">
                  {feature.stat}
                </span>
                <span className="text-sm text-slate-500 dark:text-slate-400">
                  {feature.statLabel}
                </span>
              </div>
              <div
                className={`mt-4 transition-all duration-300 overflow-hidden ${
                  activeCard === feature.id ? "max-h-screen" : "max-h-0"
                }`}
              >
                <ul className="space-y-2">
                  {feature.benefits.map((benefit, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300"
                    >
                      <BadgeCheck className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Competitor comparison section */}
        <motion.div
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={containerVariants}
          className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 md:p-8 mb-16"
        >
          <motion.div variants={itemVariants} className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900 mb-4">
              <Sparkles className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h3 className="text-2xl font-bold mb-2 text-white">
              How We Compare to Competitors
            </h3>
            <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              See how our translation service pricing stacks up against the
              competition. We're confident you'll find we offer the best value.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <th className="text-left p-3 text-slate-600 dark:text-slate-300 font-medium">
                    Feature
                  </th>
                  <th className="p-3 text-indigo-600 dark:text-indigo-400 font-bold">
                    Our Service
                  </th>
                  <th className="p-3 text-slate-600 dark:text-slate-300 font-medium">
                    Competitor A
                  </th>
                  <th className="p-3 text-slate-600 dark:text-slate-300 font-medium">
                    Competitor B
                  </th>
                </tr>
              </thead>
              <tbody>
                {competitorComparison.map((row, index) => (
                  <tr
                    key={index}
                    className={`${
                      index % 2 === 0
                        ? "bg-slate-900 dark:bg-slate-850"
                        : "bg-white dark:bg-slate-800"
                    }`}
                  >
                    <td className="p-3 text-left font-medium text-slate-700 dark:text-slate-200">
                      {row.feature}
                    </td>
                    <td className="p-3 text-center font-semibold text-indigo-600 dark:text-indigo-400">
                      {row.us}
                    </td>
                    <td className="p-3 text-center text-slate-600 dark:text-slate-300">
                      {row.competitor1}
                    </td>
                    <td className="p-3 text-center text-slate-600 dark:text-slate-300">
                      {row.competitor2}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </motion.div>

        {/* Testimonial/CTA section */}
        <motion.div
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={containerVariants}
          className="rounded-xl overflow-hidden shadow-lg"
        >
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 md:p-12 flex flex-col md:flex-row items-center">
            <motion.div
              variants={itemVariants}
              className="md:w-2/3 text-white mb-8 md:mb-0 md:pr-8"
            >
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Ready to get started with the best value in translation?
              </h3>
              <p className="mb-6 text-indigo-100">
                Join thousands of satisfied customers who have made the smart
                choice for their translation needs. Our plans are designed to
                offer maximum value without compromise.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="bg-white text-indigo-700 hover:bg-indigo-50 px-4 py-2 rounded-md font-medium flex items-center">
                  View Pricing Plans <ArrowRight className="ml-2 h-4 w-4" />
                </button>
                <button className="border border-white text-white hover:bg-white/10 px-4 py-2 rounded-md font-medium flex items-center">
                  Schedule a Demo
                </button>
              </div>
            </motion.div>
            <motion.div
              variants={itemVariants}
              className="md:w-1/3 bg-white dark:bg-slate-800 p-6 rounded-lg shadow-inner text-center"
            >
              <div className="text-5xl font-bold text-indigo-600 mb-2">98%</div>
              <p className="text-slate-600 dark:text-slate-300 mb-4">
                Customer satisfaction rate
              </p>
              <div className="flex items-center justify-center gap-1 text-amber-400">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Zap key={star} className="h-5 w-5 fill-current" />
                ))}
              </div>
              <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
                Based on 10,000+ customer reviews
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseOurPricingPlans;
