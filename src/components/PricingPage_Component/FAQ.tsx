import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  HelpCircle,
  Search,
  Plus,
  Minus,
  ArrowRight,
  Mail,
} from "lucide-react";

const FAQ: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [isVisible, setIsVisible] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById("faq-section");
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  // FAQ categories
  const categories = [
    { id: "all", name: "All Questions" },
    { id: "pricing", name: "Pricing & Plans" },
    { id: "payment", name: "Payment" },
    { id: "refunds", name: "Refunds" },
    { id: "features", name: "Features" },
    { id: "account", name: "Account Management" },
  ];

  // FAQ items
  const faqItems = [
    {
      id: "1",
      question: "How do I upgrade or downgrade my subscription plan?",
      answer:
        'You can easily upgrade or downgrade your plan at any time from your account dashboard. Go to "Subscription", select "Change Plan", and choose your new plan. Upgrades take effect immediately, while downgrades will apply at the end of your current billing cycle.',
      category: "account",
      popular: true,
    },
    {
      id: "2",
      question: "Can I cancel my subscription at any time?",
      answer:
        'Yes, you can cancel your subscription at any time. Simply go to your account settings, navigate to "Subscription" and click "Cancel Subscription". Your service will remain active until the end of your current billing period. There are no cancellation fees.',
      category: "account",
      popular: true,
    },
    {
      id: "3",
      question: "Are there any discounts for annual payments?",
      answer:
        "Yes! We offer a 25% discount when you choose annual billing instead of monthly. This is automatically applied at checkout when you select the annual payment option.",
      category: "pricing",
      popular: true,
    },
    {
      id: "4",
      question:
        "Do you offer discounts for educational institutions or non-profits?",
      answer:
        "Yes, we offer special pricing for educational institutions, non-profit organizations, and qualified startups. Please contact our sales team with verification of your status to apply for these special rates.",
      category: "pricing",
      popular: false,
    },
    {
      id: "5",
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards (Visa, Mastercard, American Express, Discover), PayPal, and in some regions, we support bank transfers and digital wallets like Apple Pay and Google Pay. For enterprise plans, we can also arrange invoicing.",
      category: "payment",
      popular: true,
    },
    {
      id: "6",
      question: "How secure is my payment information?",
      answer:
        "Your payment information is completely secure. We use industry-standard encryption and never store your full credit card details on our servers. All payment processing is handled by trusted third-party payment processors that comply with PCI DSS standards.",
      category: "payment",
      popular: false,
    },
    {
      id: "7",
      question: "What is your refund policy?",
      answer:
        "Our refund policy is simple: once you have used our service, you are not eligible for a refund. If you have any questions about our refund policy, please contact our customer support team.",
      category: "refunds",
      popular: true,
    },
    {
      id: "8",
      question: "How do I request a refund?",
      answer:
        'To request a refund, contact our customer support team via the "Help" section in your account or email support@example.com with your account details and reason for the refund. We typically process refund requests within 3-5 business days.',
      category: "refunds",
      popular: false,
    },
    {
      id: "9",
      question: "What features are included in the free trial?",
      answer:
        "Our 30-day free trial includes all features of the Professional plan, with limits on usage volume. This includes access to all translation engines, document translation, and basic API access. No credit card is required to start your trial.",
      category: "features",
      popular: true,
    },
    {
      id: "10",
      question: "Are there any features not included in the basic plan?",
      answer:
        "The Basic plan includes essential translation features but does not include advanced features like custom glossaries, translation memory, API access, and priority support. These features are available in our Professional and Enterprise plans.",
      category: "features",
      popular: false,
    },
    {
      id: "11",
      question: "How are API requests counted in the pricing plans?",
      answer:
        "API requests are counted based on the number of distinct calls made to our API endpoints. Each plan has a monthly limit on API requests. Text volume is counted separately, with character or word limits depending on your plan.",
      category: "pricing",
      popular: false,
    },
    {
      id: "12",
      question: "Can I share my account with team members?",
      answer:
        "Individual plans are for single users only. For team usage, we recommend our Team or Enterprise plans, which include user management features, role-based permissions, and collaboration tools designed for multiple users.",
      category: "account",
      popular: false,
    },
  ];

  // Filter FAQs based on search term and active category
  const filteredFAQs = faqItems.filter((item) => {
    const matchesSearch =
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      activeCategory === "all" || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  // Popular questions
  const popularQuestions = faqItems.filter((item) => item.popular);

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

  // Toggle accordion item
  const toggleAccordion = (id: string) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  return (
    <section id="faq-section" className="py-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-white"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMzYgMzRjMC0yLjItMS44LTQtNC00cy00IDEuOC00IDQgMS44IDQgNCA0IDQtMS44IDQtNHoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9Ii4wNSIvPjxwYXRoIGQ9Ik02MCAzMGMwLTEuMS0uOS0yLTItMnMtMiAuOS0yIDIgLjkgMiAyIDIgMi0uOSAyLTJ6IiBzdHJva2U9IiNmZmYiIHN0cm9rZS1vcGFjaXR5PSIuMDUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC01OCAtMjgpIi8+PHBhdGggZD0iTTIwIDEwYzAtMS4xLS45LTItMi0ycy0yIC45LTIgMiAuOSAyIDIgMiAyLS45IDItMnoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9Ii4wNSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE4IC04KSIvPjwvZz48L3N2Zz4=')] opacity-5"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={containerVariants}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900 mb-6">
              <HelpCircle className="h-8 w-8 text-purple-600 dark:text-purple-400" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-purple-700">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-900 text-lg max-w-2xl mx-auto">
              Find answers to common questions about our pricing, features, and
              policies. Can't find what you're looking for? Contact our support
              team.
            </p>
          </motion.div>

          {/* Search bar */}
          <motion.div variants={itemVariants} className="mb-8 relative">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search for questions..."
                className="pl-10 pr-4 py-3 w-full rounded-full border border-slate-200 dark:border-slate-700 focus:border-purple-500 focus:ring-purple-500 bg-white dark:bg-slate-800 dark:text-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                  onClick={() => setSearchTerm("")}
                >
                  ×
                </button>
              )}
            </div>
          </motion.div>

          {/* Category filters */}
          <motion.div variants={itemVariants} className="mb-8 overflow-x-auto">
            <div className="flex space-x-2 pb-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  className={`cursor-pointer px-3 py-1 rounded-full text-sm font-medium ${
                    activeCategory === category.id
                      ? "bg-purple-600 hover:bg-purple-700 text-white"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                  }`}
                  onClick={() => setActiveCategory(category.id)}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Popular questions - visible when no search/filter is active */}
          {!searchTerm && activeCategory === "all" && (
            <motion.div variants={itemVariants} className="mb-12">
              <h3 className="text-xl font-semibold mb-4 text-purple-700">
                Popular Questions
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {popularQuestions.map((item) => (
                  <div
                    key={item.id}
                    className="border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow rounded-lg bg-white dark:bg-slate-800"
                  >
                    <div className="p-6">
                      <h4 className="font-medium text-purple-700 dark:text-purple-400 mb-2">
                        {item.question}
                      </h4>
                      <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-2">
                        {item.answer}
                      </p>
                      <button
                        className="p-0 h-auto mt-2 text-purple-600 dark:text-purple-400 font-medium hover:underline flex items-center"
                        onClick={() => {
                          const element = document.getElementById(
                            `faq-item-${item.id}`
                          );
                          if (element) {
                            element.scrollIntoView({ behavior: "smooth" });
                            // Force open the accordion item
                            setActiveCategory(item.category);
                            setOpenAccordion(item.id);
                          }
                        }}
                      >
                        Read more
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* FAQ accordion */}
          <motion.div variants={itemVariants}>
            <div className="w-full mb-10">
              {filteredFAQs.length > 0 ? (
                filteredFAQs.map((item) => (
                  <div
                    key={item.id}
                    id={`faq-item-${item.id}`}
                    className="border-b border-slate-200 dark:border-slate-700"
                  >
                    <button
                      className="w-full text-left text-purple-700 dark:text-purple-400 hover:text-purple-600 dark:hover:text-purple-400 py-4 px-1 flex justify-between items-start focus:outline-none"
                      onClick={() => toggleAccordion(item.id)}
                    >
                      <span className="text-base md:text-lg font-medium">
                        {item.question}
                      </span>
                      {openAccordion === item.id ? (
                        <Minus className="h-5 w-5 flex-shrink-0 text-purple-500" />
                      ) : (
                        <Plus className="h-5 w-5 flex-shrink-0 text-slate-400" />
                      )}
                    </button>
                    {openAccordion === item.id && (
                      <div className="text-slate-600 dark:text-slate-300 px-1 pb-4 leading-relaxed">
                        <p className="text-gray-900 mb-4">{item.answer}</p>
                        <div className="flex flex-wrap gap-2">
                          <span className="px-2 py-1 text-xs font-medium bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full">
                            Category:{" "}
                            {
                              categories.find((cat) => cat.id === item.category)
                                ?.name
                            }
                          </span>
                          {item.popular && (
                            <span className="px-2 py-1 text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100 rounded-full">
                              Popular
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-12 border border-dashed border-slate-200 dark:border-slate-700 rounded-lg">
                  <HelpCircle className="mx-auto h-12 w-12 text-slate-300 dark:text-slate-600 mb-4" />
                  <h3 className="text-xl font-medium text-slate-700 dark:text-slate-300 mb-2">
                    No questions found
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 mb-4">
                    We couldn't find any questions that match your search.
                  </p>
                  <button
                    className="px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-md text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                    onClick={() => {
                      setSearchTerm("");
                      setActiveCategory("all");
                    }}
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </div>
          </motion.div>

          {/* Still have questions */}
          <motion.div
            variants={itemVariants}
            className="mt-12 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl p-8 text-white text-center"
          >
            <h3 className="text-2xl font-bold mb-4">Still have questions?</h3>
            <p className="mb-6 max-w-xl mx-auto">
              Our support team is ready to help you with any specific questions
              about our pricing plans or features.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-purple-700 hover:bg-purple-50 px-4 py-2 rounded-lg font-medium flex items-center justify-center">
                <Mail className="mr-2 h-4 w-4" /> Contact Support
              </button>
              <button className="border border-white text-white hover:bg-white/10 px-4 py-2 rounded-lg font-medium flex items-center justify-center">
                Schedule a Demo <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
