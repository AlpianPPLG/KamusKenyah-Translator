import React, { useState } from "react";
import {
  Shield,
  Calendar,
  ArrowLeftRight,
  CheckCircle,
  DollarSign,
  AlertCircle,
  MessageSquare,
} from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const MoneyBackGuaranteeAndRefundPolicy = () => {
  const [activeTab, setActiveTab] = useState<"refund" | "faq">("refund");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const handleFaqClick = (index: number) => {
    if (expandedFaq === index) {
      setExpandedFaq(null);
    } else {
      setExpandedFaq(index);
    }
  };

  const refundSteps = [
    {
      icon: <Shield className="w-6 h-6 text-white" />,
      title: "30-Day Guarantee",
      description:
        "We stand behind our product with a no-questions-asked 30-day money-back guarantee",
      color: "bg-gradient-to-br from-indigo-500 to-purple-600",
    },
    {
      icon: <Calendar className="w-6 h-6 text-white" />,
      title: "Quick Processing",
      description:
        "Refunds are typically processed within 5-7 business days after approval",
      color: "bg-gradient-to-br from-blue-500 to-teal-500",
    },
    {
      icon: <ArrowLeftRight className="w-6 h-6 text-white" />,
      title: "Simple Process",
      description:
        "Contact our support team via email or through the help center to initiate your refund",
      color: "bg-gradient-to-br from-pink-500 to-orange-500",
    },
    {
      icon: <DollarSign className="w-6 h-6 text-white" />,
      title: "Full Reimbursement",
      description:
        "Receive 100% of your payment back to your original payment method",
      color: "bg-gradient-to-br from-green-500 to-emerald-600",
    },
  ];

  const faqItems: FAQItem[] = [
    {
      question: "How do I request a refund?",
      answer:
        "To request a refund, simply contact our customer support team through your account dashboard or send an email to support@example.com with your order number and the reason for your refund request. Our team will process your request within 1-2 business days.",
    },
    {
      question: "What's covered under the money-back guarantee?",
      answer:
        "Our 30-day money-back guarantee covers all subscription plans purchased directly from our website. If you're not satisfied with our service for any reason within the first 30 days, you can request a full refund with no questions asked.",
    },
    {
      question: "How long does the refund process take?",
      answer:
        "Once your refund is approved, it typically takes 5-7 business days for the amount to be credited back to your original payment method. The exact timing may vary depending on your payment provider or bank.",
    },
    {
      question: "Are there any conditions that would void the guarantee?",
      answer:
        "While we offer a generous refund policy, there are a few exceptions: accounts with clear abuse of the platform, violations of our terms of service, or requests made after the 30-day period. Enterprise contracts may also have different terms as specified in your agreement.",
    },
    {
      question: "Do I get refunded for unused subscription time?",
      answer:
        "For annual subscription plans, after the 30-day money-back guarantee period, we may provide pro-rated refunds for the unused portion of your subscription in certain circumstances. This is evaluated on a case-by-case basis. Monthly plans are not eligible for partial refunds.",
    },
    {
      question: "What if I purchased through an app store?",
      answer:
        "If you purchased a subscription through Apple App Store, Google Play, or another third-party marketplace, the refund must be requested through that platform directly, as they manage the payment processing. Different refund policies may apply based on their terms.",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-indigo-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center mb-4">
            <span className="flex items-center justify-center w-12 h-12 rounded-full bg-indigo-100">
              <Shield className="w-6 h-6 text-indigo-600" />
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Risk-Free Purchase with Our Guarantee
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We're confident you'll love our product. That's why we offer a
            comprehensive money-back guarantee and transparent refund policy.
          </p>
        </div>

        {/* Featured Banner */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-xl overflow-hidden">
            <div className="relative px-6 py-10 md:p-10 text-white">
              {/* Background Decoration */}
              <div className="absolute right-0 top-0 w-40 h-40 bg-white opacity-10 rounded-full -mr-20 -mt-20"></div>
              <div className="absolute left-0 bottom-0 w-32 h-32 bg-white opacity-10 rounded-full -ml-16 -mb-16"></div>

              <div className="relative flex flex-col md:flex-row items-center">
                <div className="flex-shrink-0 mb-6 md:mb-0 md:mr-8">
                  <div className="w-28 h-28 flex items-center justify-center bg-white bg-opacity-20 rounded-full backdrop-blur-sm">
                    <Shield
                      className="w-14 h-14 text-white"
                      strokeWidth={1.5}
                    />
                  </div>
                </div>
                <div>
                  <h3 className="text-3xl font-bold mb-3">
                    30-Day Money-Back Guarantee
                  </h3>
                  <p className="text-indigo-100 text-lg mb-4">
                    Try our premium service risk-free. If you're not completely
                    satisfied for any reason, simply request a refund within 30
                    days of purchase.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <div className="flex items-center bg-white bg-opacity-20 px-4 py-2 rounded-full backdrop-blur-sm">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      <span className="text-sm font-medium">
                        No Questions Asked
                      </span>
                    </div>
                    <div className="flex items-center bg-white bg-opacity-20 px-4 py-2 rounded-full backdrop-blur-sm">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      <span className="text-sm font-medium">
                        100% Full Refund
                      </span>
                    </div>
                    <div className="flex items-center bg-white bg-opacity-20 px-4 py-2 rounded-full backdrop-blur-sm">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      <span className="text-sm font-medium">Easy Process</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="max-w-4xl mx-auto mb-10">
          <div className="flex justify-center space-x-2 mb-8">
            <button
              onClick={() => setActiveTab("refund")}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === "refund"
                  ? "bg-indigo-600 text-white shadow-md"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              Refund Process
            </button>
            <button
              onClick={() => setActiveTab("faq")}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === "faq"
                  ? "bg-indigo-600 text-white shadow-md"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              FAQ
            </button>
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            {activeTab === "refund" && (
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                  Our Simple Refund Process
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {refundSteps.map((step, index) => (
                    <div
                      key={index}
                      className="bg-gray-50 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start p-6">
                        <div
                          className={`flex-shrink-0 p-3 rounded-lg mr-4 ${step.color}`}
                        >
                          {step.icon}
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900 mb-2">
                            {step.title}
                          </h4>
                          <p className="text-gray-600">{step.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-10 p-6 bg-indigo-50 rounded-lg border border-indigo-100">
                  <div className="flex items-start">
                    <AlertCircle className="h-5 w-5 text-indigo-600 mt-0.5" />
                    <div className="ml-3">
                      <h5 className="font-semibold text-gray-900">
                        Important note about refunds:
                      </h5>
                      <p className="text-gray-600 mt-1">
                        Refund requests made after the 30-day period are
                        reviewed on a case-by-case basis and may be subject to
                        our discretion. Enterprise plans may have different
                        terms as specified in your contract.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex flex-col md:flex-row items-center justify-between p-6 bg-gray-50 rounded-lg">
                  <div className="text-center md:text-left mb-4 md:mb-0">
                    <h4 className="text-lg font-semibold text-gray-900">
                      Need to request a refund?
                    </h4>
                    <p className="text-gray-600">
                      Our support team is ready to assist you
                    </p>
                  </div>
                  <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm">
                    Contact Support
                  </button>
                </div>
              </div>
            )}

            {activeTab === "faq" && (
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                  Frequently Asked Questions
                </h3>

                <div className="space-y-4">
                  {faqItems.map((item, index) => (
                    <div
                      key={index}
                      className={`border rounded-lg overflow-hidden transition-all ${
                        expandedFaq === index
                          ? "border-indigo-200 bg-indigo-50"
                          : "border-gray-200 hover:border-indigo-200"
                      }`}
                    >
                      <button
                        onClick={() => handleFaqClick(index)}
                        className="w-full px-6 py-4 text-left flex justify-between items-center"
                      >
                        <span className="font-medium text-gray-900">
                          {item.question}
                        </span>
                        <span
                          className={`transform transition-transform ${
                            expandedFaq === index ? "rotate-180" : "rotate-0"
                          }`}
                        >
                          <svg
                            width="14"
                            height="8"
                            viewBox="0 0 14 8"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M1 1L7 7L13 1"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                      </button>

                      <div
                        className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
                          expandedFaq === index ? "max-h-96 pb-6" : "max-h-0"
                        }`}
                      >
                        <p className="text-gray-600">{item.answer}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-10 p-6 bg-gray-50 rounded-lg text-center">
                  <p className="text-gray-600 mb-4">
                    Still have questions about our refund policy?
                  </p>
                  <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm inline-flex items-center">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Chat with Support
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Testimonials */}
        <div className="max-w-5xl mx-auto mt-16">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-10">
            Customer Experiences
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                quote:
                  "I needed to cancel my subscription due to budget cuts, and their team made the refund process incredibly simple and fast.",
                author: "Sarah Johnson",
                role: "Marketing Director",
              },
              {
                quote:
                  "While I loved the product, it wasn't the right fit for my needs. The no-questions-asked refund policy gave me confidence to try it risk-free.",
                author: "Michael Chen",
                role: "Freelance Designer",
              },
              {
                quote:
                  "I accidentally purchased the wrong tier, and customer support helped me get a refund and switch to the correct plan within hours.",
                author: "Jessica Williams",
                role: "Small Business Owner",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col h-full">
                  <div className="mb-4">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-yellow-400">
                        ★
                      </span>
                    ))}
                  </div>
                  <p className="text-gray-600 italic mb-4 flex-grow">
                    {testimonial.quote}
                  </p>
                  <div>
                    <p className="font-medium text-gray-900">
                      {testimonial.author}
                    </p>
                    <p className="text-gray-500 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Badges */}
        <div className="max-w-4xl mx-auto mt-16 text-center">
          <p className="text-sm uppercase tracking-wider text-gray-500 mb-6">
            Trusted By Thousands Of Customers
          </p>

          <div className="flex flex-wrap justify-center gap-8 opacity-80">
            {[1, 2, 3, 4].map((badge) => (
              <div
                key={badge}
                className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center"
              >
                <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MoneyBackGuaranteeAndRefundPolicy;
