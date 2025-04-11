import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Shield,
  Lock,
  User,
  Database,
  Cookie,
  Clock,
  Zap,
  EyeOff,
  Globe,
  FileText,
  Mail,
  Calendar,
  AlertCircle,
  ChevronDown,
  ChevronRight,
  RefreshCw,
  Trash2,
  Check,
  X,
} from "lucide-react";

// Define the structure for privacy sections
interface PrivacySection {
  id: string;
  title: string;
  icon: React.ReactNode;
  content: (string | { title: string; text: string })[];
  updatedAt?: string;
}

const privacySections: PrivacySection[] = [
  {
    id: "overview",
    title: "Privacy Policy Overview",
    icon: <Shield className="w-6 h-6 text-blue-600" />,
    content: [
      "This Privacy Policy explains how we collect, use, and protect your personal information when you use our language learning application.",
      "We are committed to ensuring your privacy and protecting any data you share with us. By using our service, you agree to the collection and use of information in accordance with this policy.",
      {
        title: "Last Updated",
        text: "This Privacy Policy was last updated on October 15, 2023. We may update this policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons.",
      },
    ],
    updatedAt: "October 15, 2023",
  },
  {
    id: "collection",
    title: "Information We Collect",
    icon: <Database className="w-6 h-6 text-purple-600" />,
    content: [
      "We collect several types of information to provide and improve our service to you:",
      {
        title: "Personal Information",
        text: "This includes your name, email address, and profile information that you provide when creating an account.",
      },
      {
        title: "Usage Data",
        text: "We collect data on how you interact with our application, including learning progress, lesson completions, and time spent on various features.",
      },
      {
        title: "Device Information",
        text: "We may collect information about the device you use to access our service, including device type, operating system, unique device identifiers, and mobile network information.",
      },
      {
        title: "Voice Recordings",
        text: "If you use our voice recognition features, we collect audio recordings to provide pronunciation feedback and improve our voice recognition technology.",
      },
    ],
  },
  {
    id: "cookies",
    title: "Cookies and Tracking",
    icon: <Cookie className="w-6 h-6 text-amber-600" />,
    content: [
      "Our service uses cookies and similar tracking technologies to track activity on our application and hold certain information.",
      {
        title: "What Are Cookies",
        text: "Cookies are small data files that are placed on your device when you use our application. They allow us to remember your preferences and provide a more personalized experience.",
      },
      {
        title: "Types of Cookies We Use",
        text: "We use essential cookies necessary for the functioning of our application, analytics cookies to understand how you interact with our application, and preference cookies to remember your settings.",
      },
      {
        title: "Managing Cookies",
        text: "Most web browsers allow you to control cookies through their settings. However, if you limit the ability of websites to set cookies, you may impact your overall user experience.",
      },
    ],
  },
  {
    id: "use",
    title: "How We Use Your Information",
    icon: <Zap className="w-6 h-6 text-green-600" />,
    content: [
      "We use the information we collect in various ways, including to:",
      "• Provide, operate, and maintain our service",
      "• Improve, personalize, and expand our service",
      "• Understand and analyze how you use our service",
      "• Develop new products, services, features, and functionality",
      "• Communicate with you to provide updates, customer support, and other information",
      "• Process transactions and send related information",
      "• Prevent fraudulent activities and improve security",
      {
        title: "Personalized Learning",
        text: "We use your usage data to customize your learning experience, such as recommending appropriate lessons based on your progress and performance.",
      },
    ],
  },
  {
    id: "sharing",
    title: "Information Sharing",
    icon: <Globe className="w-6 h-6 text-red-600" />,
    content: [
      "We may share your information with third parties in limited circumstances:",
      {
        title: "Service Providers",
        text: "We may share your information with third-party service providers that help us operate our service, such as cloud storage providers and payment processors.",
      },
      {
        title: "Business Transfers",
        text: "If we are involved in a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.",
      },
      {
        title: "Legal Requirements",
        text: "We may disclose your information if required to do so by law or in response to valid requests by public authorities (e.g., a court or government agency).",
      },
      {
        title: "With Your Consent",
        text: "We may share your information with third parties when we have your consent to do so.",
      },
    ],
  },
  {
    id: "security",
    title: "Data Security",
    icon: <Lock className="w-6 h-6 text-indigo-600" />,
    content: [
      "We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.",
      {
        title: "Encryption",
        text: "We use industry-standard encryption to protect your data during transmission and while it is stored on our servers.",
      },
      {
        title: "Regular Security Audits",
        text: "We regularly review our information collection, storage, and processing practices to guard against unauthorized access.",
      },
      {
        title: "Limited Access",
        text: "We restrict access to personal information to our employees, contractors, and agents who need to know that information to process it for us.",
      },
      {
        title: "Data Breach Notification",
        text: "In the event of a data breach that affects your personal information, we will notify you in accordance with applicable laws.",
      },
    ],
  },
  {
    id: "retention",
    title: "Data Retention",
    icon: <Clock className="w-6 h-6 text-orange-600" />,
    content: [
      "We retain your personal information for as long as necessary to provide you with our service and as required by applicable laws.",
      {
        title: "Account Information",
        text: "We retain your account information for as long as your account is active or as needed to provide you with our service.",
      },
      {
        title: "Usage Data",
        text: "We may retain usage data for internal analysis purposes. This data is generally retained for a shorter period, except when used to strengthen security or improve functionality.",
      },
      {
        title: "After Account Deletion",
        text: "When you delete your account, we may retain certain information as required by law or for legitimate business purposes.",
      },
    ],
  },
  {
    id: "rights",
    title: "Your Privacy Rights",
    icon: <User className="w-6 h-6 text-teal-600" />,
    content: [
      "Depending on your location, you may have certain rights regarding your personal information:",
      {
        title: "Access",
        text: "You have the right to request copies of your personal information that we hold.",
      },
      {
        title: "Correction",
        text: "You have the right to request that we correct any information you believe is inaccurate or incomplete.",
      },
      {
        title: "Deletion",
        text: "You have the right to request that we erase your personal information under certain conditions.",
      },
      {
        title: "Restriction",
        text: "You have the right to request that we restrict the processing of your personal information under certain conditions.",
      },
      {
        title: "Data Portability",
        text: "You have the right to request that we transfer the data we have collected to another organization or directly to you under certain conditions.",
      },
      {
        title: "Withdrawal of Consent",
        text: "If we rely on your consent to process your personal information, you have the right to withdraw that consent at any time.",
      },
    ],
  },
  {
    id: "children",
    title: "Children's Privacy",
    icon: <EyeOff className="w-6 h-6 text-pink-600" />,
    content: [
      "Our service is not intended for children under the age of 13, and we do not knowingly collect personal information from children under 13.",
      {
        title: "Parental Consent",
        text: "If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact us so that we can take necessary actions.",
      },
      {
        title: "Discovery of Child Data",
        text: "If we become aware that we have collected personal information from children without verification of parental consent, we take steps to remove that information from our servers.",
      },
    ],
  },
  {
    id: "international",
    title: "International Data Transfers",
    icon: <Globe className="w-6 h-6 text-blue-600" />,
    content: [
      "Your information may be transferred to, and maintained on, computers located outside of your state, province, country, or other governmental jurisdiction.",
      {
        title: "Data Protection Measures",
        text: "When we transfer your personal information to other countries, we take all necessary measures to ensure that your data is treated securely and in accordance with this Privacy Policy.",
      },
      {
        title: "EU-US Data Transfers",
        text: "For users in the European Union, we comply with applicable data protection laws when transferring your personal information to countries outside the EU.",
      },
    ],
  },
  {
    id: "changes",
    title: "Changes to This Privacy Policy",
    icon: <RefreshCw className="w-6 h-6 text-violet-600" />,
    content: [
      "We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the 'Last Updated' date.",
      {
        title: "Material Changes",
        text: "For material changes to this Privacy Policy, we will make reasonable efforts to notify you, such as through a prominent notice on our application or by sending you an email.",
      },
      {
        title: "Review",
        text: "We encourage you to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.",
      },
    ],
  },
  {
    id: "contact",
    title: "Contact Us",
    icon: <Mail className="w-6 h-6 text-gray-600" />,
    content: [
      "If you have any questions or concerns about this Privacy Policy or our data practices, please contact us:",
      "• By email: privacy@dictionaryapp.com",
      "• By phone: +1 (555) 123-4567",
      "• By mail: Privacy Officer, Dictionary App Inc., 123 Main Street, San Francisco, CA 94105, USA",
      {
        title: "Data Protection Officer",
        text: "You can contact our Data Protection Officer directly at dpo@dictionaryapp.com for any data protection related inquiries.",
      },
    ],
  },
];

const Privacy: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSection, setActiveSection] = useState("overview");
  const [showNotification, setShowNotification] = useState(false);
  const [cookieConsent, setCookieConsent] = useState<
    "accepted" | "declined" | null
  >(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Filter sections based on search query
  const filteredSections = privacySections.filter((section) => {
    if (searchQuery.trim() === "") return true;

    const query = searchQuery.toLowerCase();
    return (
      section.title.toLowerCase().includes(query) ||
      section.content.some((item) =>
        typeof item === "string"
          ? item.toLowerCase().includes(query)
          : item.text.toLowerCase().includes(query)
      )
    );
  });

  // Handle intersection observer for section highlighting
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      Object.values(sectionRefs.current).forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [filteredSections]);

  // Show notification when user scrolls down
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300 && !showNotification && cookieConsent === null) {
        setShowNotification(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [showNotification, cookieConsent]);

  // Highlight search term in text
  const highlightText = (text: string) => {
    if (!searchQuery.trim()) return text;

    const parts = text.split(new RegExp(`(${searchQuery})`, "gi"));

    return (
      <>
        {parts.map((part, i) =>
          part.toLowerCase() === searchQuery.toLowerCase() ? (
            <span key={i} className="bg-yellow-200 px-1 rounded">
              {part}
            </span>
          ) : (
            part
          )
        )}
      </>
    );
  };

  // Function to scroll to section
  const scrollToSection = (id: string) => {
    setMobileNavOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="inline-flex items-center justify-center p-2 bg-white bg-opacity-10 rounded-full mb-4">
              <Shield className="w-6 h-6 mr-2 text-gray-900" />
              <span className="text-sm font-medium text-gray-900">
                Privacy & Data Protection
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Privacy Policy
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              We are committed to protecting your privacy and personal data.
              Learn how we collect, use, and safeguard your information.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar for desktop */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-8">
              {/* Search */}
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search privacy policy..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                </div>
                {searchQuery.trim() !== "" && (
                  <div className="mt-2 text-sm text-gray-600">
                    Found {filteredSections.length} section(s) matching "
                    {searchQuery}"
                  </div>
                )}
              </div>

              {/* Navigation */}
              <nav className="space-y-1">
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
                  On this page
                </p>
                {privacySections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`flex items-center w-full px-3 py-2 text-left rounded-lg transition-colors ${
                      activeSection === section.id
                        ? "bg-blue-50 text-blue-700 font-medium"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <div className="mr-3">{section.icon}</div>
                    <span className="text-sm">{section.title}</span>
                  </button>
                ))}
              </nav>

              {/* Last updated info */}
              <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center text-gray-600 mb-2">
                  <Calendar className="w-5 h-5 mr-2" />
                  <span className="text-sm font-medium">Last Updated</span>
                </div>
                <p className="text-sm text-gray-500">October 15, 2023</p>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <a
                    href="#"
                    className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Download PDF version
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile navigation toggle */}
          <div className="lg:hidden mb-6">
            <button
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 rounded-lg"
            >
              <span className="font-medium">Privacy Policy Sections</span>
              <ChevronDown
                className={`w-5 h-5 transition-transform ${
                  mobileNavOpen ? "transform rotate-180" : ""
                }`}
              />
            </button>

            {mobileNavOpen && (
              <div className="mt-2 p-2 bg-white border border-gray-200 rounded-lg shadow-lg">
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search privacy policy..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                </div>

                <nav className="space-y-1">
                  {privacySections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={`flex items-center w-full px-3 py-2 text-left rounded-lg transition-colors ${
                        activeSection === section.id
                          ? "bg-blue-50 text-blue-700 font-medium"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      <div className="mr-3">{section.icon}</div>
                      <span className="text-sm">{section.title}</span>
                    </button>
                  ))}
                </nav>
              </div>
            )}
          </div>

          {/* Main content */}
          <div className="flex-1">
            {/* Summary card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-10"
            >
              <h2 className="text-xl font-semibold text-blue-800 mb-3">
                Policy Summary
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start">
                  <div className="bg-white p-2 rounded-full mr-3">
                    <Database className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-blue-900">
                      Data Collection
                    </h3>
                    <p className="text-sm text-blue-700">
                      We collect personal info, usage data, and device info
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-white p-2 rounded-full mr-3">
                    <Zap className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-blue-900">Data Usage</h3>
                    <p className="text-sm text-blue-700">
                      Used to provide and improve our services
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-white p-2 rounded-full mr-3">
                    <Lock className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-blue-900">Data Security</h3>
                    <p className="text-sm text-blue-700">
                      Industry-standard encryption and security practices
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-white p-2 rounded-full mr-3">
                    <User className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-blue-900">Your Rights</h3>
                    <p className="text-sm text-blue-700">
                      Access, correct, delete, and export your data
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Timeline of changes */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mb-10"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Policy Change History
              </h2>
              <div className="relative border-l-2 border-gray-200 pl-5 pb-1 space-y-6">
                <div className="relative">
                  <div className="absolute -left-[25px] mt-1.5 h-4 w-4 rounded-full border-2 border-blue-600 bg-white"></div>
                  <div className="flex flex-col sm:flex-row sm:justify-between">
                    <h3 className="text-lg font-medium text-gray-900">
                      Current Version
                    </h3>
                    <time className="text-sm text-gray-500">
                      October 15, 2023
                    </time>
                  </div>
                  <p className="mt-1 text-gray-600">
                    Major revision of our data collection and processing
                    practices.
                  </p>
                </div>

                <div className="relative">
                  <div className="absolute -left-[25px] mt-1.5 h-4 w-4 rounded-full border-2 border-gray-300 bg-white"></div>
                  <div className="flex flex-col sm:flex-row sm:justify-between">
                    <h3 className="text-lg font-medium text-gray-600">
                      Previous Version
                    </h3>
                    <time className="text-sm text-gray-500">May 5, 2023</time>
                  </div>
                  <p className="mt-1 text-gray-600">
                    Updated international data transfer information.
                  </p>
                </div>

                <div className="relative">
                  <div className="absolute -left-[25px] mt-1.5 h-4 w-4 rounded-full border-2 border-gray-300 bg-white"></div>
                  <div className="flex flex-col sm:flex-row sm:justify-between">
                    <h3 className="text-lg font-medium text-gray-600">
                      Initial Version
                    </h3>
                    <time className="text-sm text-gray-500">
                      January 10, 2023
                    </time>
                  </div>
                  <p className="mt-1 text-gray-600">
                    First publication of our privacy policy.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Privacy content sections */}
            <div className="space-y-12">
              {filteredSections.map((section, index) => (
                <motion.div
                  key={section.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  id={section.id}
                  ref={(el) => {
                    sectionRefs.current[0] = el;
                  }}
                  className="scroll-mt-8"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex-shrink-0 p-2 rounded-lg bg-gray-50">
                      {section.icon}
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {highlightText(section.title)}
                    </h2>
                  </div>

                  <div className="pl-4 border-l-2 border-gray-100 space-y-4">
                    {section.content.map((item, i) =>
                      typeof item === "string" ? (
                        <p key={i} className="text-gray-700 leading-relaxed">
                          {highlightText(item)}
                        </p>
                      ) : (
                        <div key={i} className="bg-gray-50 rounded-lg p-4 my-4">
                          <h3 className="font-medium text-gray-900 mb-2">
                            {highlightText(item.title)}
                          </h3>
                          <p className="text-gray-700">
                            {highlightText(item.text)}
                          </p>
                        </div>
                      )
                    )}
                  </div>

                  {section.id === "contact" && (
                    <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                      <h3 className="text-lg font-semibold mb-4">
                        Have a specific privacy concern?
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <a
                          href="#"
                          className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-500 transition-colors"
                        >
                          <div className="flex items-center">
                            <Mail className="w-5 h-5 text-blue-600 mr-3" />
                            <span>Email our privacy team</span>
                          </div>
                          <ChevronRight className="w-5 h-5 text-gray-400" />
                        </a>
                        <a
                          href="#"
                          className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-500 transition-colors"
                        >
                          <div className="flex items-center">
                            <FileText className="w-5 h-5 text-blue-600 mr-3" />
                            <span>Submit GDPR request</span>
                          </div>
                          <ChevronRight className="w-5 h-5 text-gray-400" />
                        </a>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* No results message */}
            {filteredSections.length === 0 && (
              <div className="text-center py-16">
                <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No matching sections
                </h3>
                <p className="text-gray-600 mb-4">
                  No sections matched your search for "{searchQuery}"
                </p>
                <button
                  onClick={() => setSearchQuery("")}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Clear search
                </button>
              </div>
            )}

            {/* Back to top button */}
            <div className="mt-12 text-center">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="inline-flex items-center text-sm text-gray-600 hover:text-blue-600"
              >
                <ChevronDown className="w-5 h-5 mr-1 transform rotate-180" />
                Back to top
              </button>
            </div>

            {/* Links to other policy documents */}
            <div className="mt-16 border-t border-gray-200 pt-8">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
                <a
                  href="/terms"
                  className="group flex items-center text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <ChevronRight className="w-5 h-5 mr-2 transform rotate-180" />
                  <span>Previous: Terms of Service</span>
                </a>

                <a
                  href="#"
                  className="group flex items-center text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <span>Next: Data Processing Agreement</span>
                  <ChevronRight className="w-5 h-5 ml-2" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cookie consent notification */}
      {showNotification && cookieConsent === null && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg p-4 z-50"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-start sm:items-center gap-3">
                <Cookie className="w-8 h-8 text-blue-600 flex-shrink-0" />
                <p className="text-sm text-gray-600">
                  We use cookies to enhance your experience. By continuing to
                  visit this site you agree to our use of cookies.
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setCookieConsent("declined");
                    setShowNotification(false);
                  }}
                  className="flex items-center gap-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <X className="w-4 h-4" />
                  <span>Decline</span>
                </button>
                <button
                  onClick={() => {
                    setCookieConsent("accepted");
                    setShowNotification(false);
                  }}
                  className="flex items-center gap-1 px-4 py-2 bg-blue-600 rounded-lg text-white hover:bg-blue-700 transition-colors"
                >
                  <Check className="w-4 h-4" />
                  <span>Accept</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Data deletion animation for educational purposes */}
      {cookieConsent === "declined" && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ delay: 2, duration: 1 }}
          onAnimationComplete={() => setCookieConsent(null)}
          className="fixed bottom-4 right-4 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-50 max-w-xs"
        >
          <div className="flex items-start gap-3">
            <div className="bg-red-100 p-2 rounded-full">
              <Trash2 className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Cookies declined</h3>
              <p className="text-sm text-gray-600">
                We respect your choice. No unnecessary cookies will be stored.
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Privacy;
