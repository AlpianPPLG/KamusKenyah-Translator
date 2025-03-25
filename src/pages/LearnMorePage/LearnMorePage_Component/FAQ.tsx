import React, { useState, useEffect } from "react";
import {
  Search,
  ChevronDown,
  ChevronUp,
  MessageCircle,
  Settings,
  CreditCard,
  Shield,
  Globe,
  Clock,
  HelpCircle,
  BookOpen,
  ArrowRight,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: string;
  helpful: number;
  notHelpful: number;
  relatedQuestions: number[];
  lastUpdated: string;
}

interface Category {
  name: string;
  icon: React.ReactNode;
  description: string;
}

const FAQ: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [expandedQuestion, setExpandedQuestion] = useState<number | null>(null);
  const [helpfulFeedback, setHelpfulFeedback] = useState<{
    [key: number]: "helpful" | "not-helpful" | null;
  }>({});
  const [searchResults, setSearchResults] = useState<FAQItem[]>([]);
  const [showAllQuestions, setShowAllQuestions] = useState<boolean>(false);

  const categories: { [key: string]: Category } = {
    All: {
      name: "All Questions",
      icon: <HelpCircle className="w-6 h-6" />,
      description: "Browse all frequently asked questions",
    },
    General: {
      name: "General",
      icon: <MessageCircle className="w-6 h-6" />,
      description: "Basic information about our services",
    },
    Technical: {
      name: "Technical",
      icon: <Settings className="w-6 h-6" />,
      description: "Technical details and troubleshooting",
    },
    Billing: {
      name: "Billing",
      icon: <CreditCard className="w-6 h-6" />,
      description: "Payment and subscription questions",
    },
    Security: {
      name: "Security",
      icon: <Shield className="w-6 h-6" />,
      description: "Privacy and security information",
    },
    Languages: {
      name: "Languages",
      icon: <Globe className="w-6 h-6" />,
      description: "Supported languages and features",
    },
  };

  const faqData: FAQItem[] = [
    {
      id: 1,
      question: "How accurate are the translations?",
      answer:
        "Our AI-powered translation system achieves 99.9% accuracy for supported languages. We use advanced neural networks and context-aware processing to ensure translations maintain both accuracy and natural language flow. For specialized content, we recommend using our professional human translation service for additional verification.",
      category: "General",
      helpful: 245,
      notHelpful: 12,
      relatedQuestions: [2, 3],
      lastUpdated: "2024-02-15",
    },
    {
      id: 2,
      question: "What file formats are supported?",
      answer:
        "We support a wide range of file formats including: PDF, DOCX, XLSX, PPTX, TXT, HTML, XML, JSON, and more. Files are processed while maintaining their original formatting. Maximum file size is 100MB per document. For larger files, please contact our enterprise support.",
      category: "Technical",
      helpful: 189,
      notHelpful: 8,
      relatedQuestions: [4, 5],
      lastUpdated: "2024-02-10",
    },
    {
      id: 3,
      question: "How much does it cost?",
      answer:
        "We offer flexible pricing plans starting from $10/month for individual users. Business plans start at $49/month with additional features. Enterprise solutions are custom-priced based on volume and specific requirements. All plans come with a 14-day free trial, no credit card required.",
      category: "Billing",
      helpful: 302,
      notHelpful: 15,
      relatedQuestions: [6, 7],
      lastUpdated: "2024-02-18",
    },
    {
      id: 4,
      question: "How is my data protected?",
      answer:
        "We employ industry-leading security measures including end-to-end encryption, secure data centers, and regular security audits. Your data is encrypted both in transit and at rest. We are GDPR compliant and never store translated content longer than necessary. Read our security whitepaper for detailed information.",
      category: "Security",
      helpful: 278,
      notHelpful: 5,
      relatedQuestions: [8, 9],
      lastUpdated: "2024-02-20",
    },
    {
      id: 5,
      question: "Which languages are supported?",
      answer:
        "We currently support 100+ languages including all major world languages and many regional dialects. Our system is constantly updated to improve accuracy and add new languages. Popular languages include English, Spanish, French, German, Chinese, Japanese, Korean, Arabic, and Russian.",
      category: "Languages",
      helpful: 423,
      notHelpful: 18,
      relatedQuestions: [1, 10],
      lastUpdated: "2024-02-12",
    },
  ];

  useEffect(() => {
    const filtered = faqData.filter((item) => {
      const matchesSearch =
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
    setSearchResults(filtered);
  }, [searchQuery, selectedCategory]);

  const handleQuestionClick = (id: number) => {
    setExpandedQuestion(expandedQuestion === id ? null : id);
  };

  const handleFeedback = (id: number, type: "helpful" | "not-helpful") => {
    setHelpfulFeedback((prev) => ({
      ...prev,
      [id]: prev[id] === type ? null : type,
    }));
  };

  const getRelatedQuestions = (questionIds: number[]) => {
    return faqData.filter((item) => questionIds.includes(item.id));
  };

  return (
    <div className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Find answers to common questions about our translation platform.
            Can't find what you're looking for? Contact our support team.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search your question..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          {Object.entries(categories).map(([key, category]) => (
            <button
              key={key}
              onClick={() => setSelectedCategory(key)}
              className={`p-4 rounded-xl border transition-all duration-300 ${
                selectedCategory === key
                  ? "bg-blue-50 border-blue-200 shadow-sm"
                  : "border-gray-200 hover:border-blue-200 hover:bg-gray-50"
              }`}
            >
              <div
                className={`${
                  selectedCategory === key ? "text-blue-600" : "text-gray-600"
                }`}
              >
                {category.icon}
              </div>
              <h3 className="text-sm font-medium mt-2">{category.name}</h3>
              <p className="text-xs text-gray-500 mt-1">
                {category.description}
              </p>
            </button>
          ))}
        </div>

        {/* FAQ List */}
        <div className="space-y-6">
          {searchResults
            .slice(0, showAllQuestions ? undefined : 5)
            .map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-md"
              >
                <button
                  onClick={() => handleQuestionClick(item.id)}
                  className="w-full text-left px-6 py-4 flex items-center justify-between"
                >
                  <div className="flex items-center space-x-3">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                      <MessageCircle className="w-4 h-4" />
                    </span>
                    <h3 className="text-lg font-medium text-gray-900">
                      {item.question}
                    </h3>
                  </div>
                  {expandedQuestion === item.id ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </button>

                {expandedQuestion === item.id && (
                  <div className="px-6 pb-4">
                    <div className="prose max-w-none text-gray-600">
                      <p>{item.answer}</p>
                    </div>

                    {/* Feedback Section */}
                    <div className="mt-6 flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={() => handleFeedback(item.id, "helpful")}
                          className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm ${
                            helpfulFeedback[item.id] === "helpful"
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                          }`}
                        >
                          <ThumbsUp className="w-4 h-4" />
                          <span>{item.helpful}</span>
                        </button>
                        <button
                          onClick={() => handleFeedback(item.id, "not-helpful")}
                          className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm ${
                            helpfulFeedback[item.id] === "not-helpful"
                              ? "bg-red-100 text-red-700"
                              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                          }`}
                        >
                          <ThumbsDown className="w-4 h-4" />
                          <span>{item.notHelpful}</span>
                        </button>
                      </div>
                      <div className="text-sm text-gray-500 flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        Updated: {item.lastUpdated}
                      </div>
                    </div>

                    {/* Related Questions */}
                    {item.relatedQuestions.length > 0 && (
                      <div className="mt-6">
                        <h4 className="text-sm font-medium text-gray-900 mb-3">
                          Related Questions
                        </h4>
                        <div className="space-y-2">
                          {getRelatedQuestions(item.relatedQuestions).map(
                            (related) => (
                              <button
                                key={related.id}
                                onClick={() => handleQuestionClick(related.id)}
                                className="block text-left w-full text-sm text-blue-600 hover:text-blue-800"
                              >
                                {related.question}
                              </button>
                            )
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
        </div>

        {/* Show More Button */}
        {searchResults.length > 5 && (
          <div className="text-center mt-8">
            <button
              onClick={() => setShowAllQuestions(!showAllQuestions)}
              className="inline-flex items-center px-6 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-all duration-300"
            >
              {showAllQuestions
                ? "Show Less"
                : `Show All (${searchResults.length})`}
              <ArrowRight
                className={`ml-2 w-4 h-4 transition-transform duration-300 ${
                  showAllQuestions ? "rotate-90" : ""
                }`}
              />
            </button>
          </div>
        )}

        {/* Still Need Help */}
        <div className="mt-16 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Still Need Help?</h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Can't find the answer you're looking for? Our support team is here
            to help 24/7.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="inline-flex items-center px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-all duration-300">
              <MessageCircle className="w-5 h-5 mr-2" />
              Contact Support
            </button>
            <button className="inline-flex items-center px-6 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-all duration-300">
              <BookOpen className="w-5 h-5 mr-2" />
              Browse Documentation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
