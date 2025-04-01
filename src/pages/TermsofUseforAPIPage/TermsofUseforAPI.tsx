import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Shield,
  Key,
  Lock,
  AlertCircle,
  Clock,
  Zap,
  Database,
  Code,
  FileCode2,
  CheckCircle2,
  XCircle,
  ArrowRight,
  ExternalLink,
  BookOpen,
  MessageSquare,
  Mail,
} from "lucide-react";

interface APILimit {
  plan: string;
  requests: string;
  features: string[];
  price: string;
  recommended?: boolean;
}

const apiLimits: APILimit[] = [
  {
    plan: "Free Tier",
    requests: "1,000 requests/month",
    features: [
      "Basic translation endpoints",
      "Public dictionary access",
      "Standard rate limiting",
      "Community support",
    ],
    price: "$0",
  },
  {
    plan: "Professional",
    requests: "50,000 requests/month",
    features: [
      "Advanced translation API",
      "Batch processing",
      "Priority support",
      "Custom rate limits",
      "API analytics",
    ],
    price: "$49/month",
    recommended: true,
  },
  {
    plan: "Enterprise",
    requests: "Custom volume",
    features: [
      "Unlimited API access",
      "Dedicated support",
      "Custom integration",
      "SLA guarantee",
      "On-premise options",
    ],
    price: "Custom pricing",
  },
];

const TermsofUseforAPI: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>("overview");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const sections = [
    { id: "overview", label: "Overview", icon: <Shield className="w-5 h-5" /> },
    {
      id: "authentication",
      label: "Authentication",
      icon: <Key className="w-5 h-5" />,
    },
    {
      id: "rate-limits",
      label: "Rate Limits",
      icon: <Clock className="w-5 h-5" />,
    },
    {
      id: "data-usage",
      label: "Data Usage",
      icon: <Database className="w-5 h-5" />,
    },
    { id: "security", label: "Security", icon: <Lock className="w-5 h-5" /> },
  ];

  const faqs = [
    {
      question: "How do I get an API key?",
      answer:
        "You can obtain an API key by registering for a developer account in our dashboard. Once registered, you can generate and manage your API keys from the developer settings.",
    },
    {
      question: "What are the API rate limits?",
      answer:
        "Rate limits vary by plan. Free tier users are limited to 1,000 requests per month, while paid plans offer higher limits. Check our pricing section for detailed information.",
    },
    {
      question: "Is there a sandbox environment for testing?",
      answer:
        "Yes, we provide a sandbox environment for testing your integration. All API endpoints are available in sandbox mode with test data.",
    },
    {
      question: "How is API uptime guaranteed?",
      answer:
        "We maintain a 99.9% uptime SLA for our API services. Real-time status and incident reports are available on our status page.",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 text-blue-600 mb-4"
          >
            <FileCode2 className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">API Documentation</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            Terms of Use for{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              KamusKenyah API
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Essential guidelines and requirements for integrating with our
            translation API service.
          </motion.p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {sections.map((section) => (
            <motion.button
              key={section.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveSection(section.id)}
              className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                activeSection === section.id
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
              }`}
            >
              {section.icon}
              <span className="ml-2">{section.label}</span>
            </motion.button>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* Sidebar with Quick Links */}
          <div className="md:col-span-1">
            <div className="bg-gray-50 rounded-xl p-6 sticky top-24">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Quick Links
              </h3>
              <ul className="space-y-3">
                {[
                  {
                    label: "Getting Started",
                    icon: <BookOpen className="w-4 h-4" />,
                  },
                  {
                    label: "API Reference",
                    icon: <Code className="w-4 h-4" />,
                  },
                  {
                    label: "SDKs & Tools",
                    icon: <FileCode2 className="w-4 h-4" />,
                  },
                  {
                    label: "Support",
                    icon: <MessageSquare className="w-4 h-4" />,
                  },
                  { label: "Contact", icon: <Mail className="w-4 h-4" /> },
                ].map((link, index) => (
                  <li key={index}>
                    <a
                      href="#"
                      className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
                    >
                      {link.icon}
                      <span className="ml-2">{link.label}</span>
                      <ExternalLink className="w-3 h-3 ml-auto" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Main Terms Content */}
          <div className="md:col-span-2 space-y-8">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                API Usage Guidelines
              </h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-green-50 rounded-lg">
                    <CheckCircle2 className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Acceptable Use
                    </h3>
                    <p className="text-gray-600">
                      Use the API for translation services, language learning
                      applications, and cultural preservation projects.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2 bg-red-50 rounded-lg">
                    <XCircle className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Prohibited Use
                    </h3>
                    <p className="text-gray-600">
                      Do not use the API for spam, abuse, or any activities that
                      violate laws or privacy rights.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* API Pricing Plans */}
            <div className="grid md:grid-cols-3 gap-6">
              {apiLimits.map((plan, index) => (
                <motion.div
                  key={plan.plan}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative bg-white rounded-xl border ${
                    plan.recommended
                      ? "border-blue-500 shadow-lg"
                      : "border-gray-200"
                  } p-6`}
                >
                  {plan.recommended && (
                    <div className="absolute -top-3 -right-3 bg-blue-600 text-white text-sm px-3 py-1 rounded-full">
                      Recommended
                    </div>
                  )}

                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {plan.plan}
                  </h3>
                  <div className="text-3xl font-bold text-gray-900 mb-4">
                    {plan.price}
                  </div>

                  <div className="text-sm text-gray-600 mb-4">
                    {plan.requests}
                  </div>

                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-gray-600">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <button
                    className={`w-full py-2 rounded-lg font-medium transition-colors ${
                      plan.recommended
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                    }`}
                  >
                    Get Started
                  </button>
                </motion.div>
              ))}
            </div>

            {/* FAQ Section */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Frequently Asked Questions
              </h2>

              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="border-b border-gray-100 last:border-0 pb-4 last:pb-0"
                  >
                    <button
                      onClick={() =>
                        setExpandedFaq(expandedFaq === index ? null : index)
                      }
                      className="w-full text-left"
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium text-gray-900">
                          {faq.question}
                        </h3>
                        <ArrowRight
                          className={`w-5 h-5 text-gray-400 transition-transform ${
                            expandedFaq === index ? "rotate-90" : ""
                          }`}
                        />
                      </div>
                    </button>

                    {expandedFaq === index && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 text-gray-600"
                      >
                        {faq.answer}
                      </motion.p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to Get Started?
            </h3>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              Sign up now to get your API key and start integrating
              KamusKenyah's translation services into your applications.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-8 py-3 bg-white text-blue-600 rounded-lg font-medium hover:shadow-lg transition-all duration-300"
              >
                Get API Key
                <Key className="w-5 h-5 ml-2" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-8 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-all duration-300"
              >
                View Documentation
                <BookOpen className="w-5 h-5 ml-2" />
              </motion.button>
            </div>
            <p className="text-blue-100 text-sm mt-6">
              No credit card required for free tier
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TermsofUseforAPI;
