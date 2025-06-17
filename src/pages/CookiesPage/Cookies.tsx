import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Cookie,
  ShieldAlert,
  Globe,
  Fingerprint,
  Clock,
  ChevronRight,
  Settings,
  Eye,
  FileText,
  Bookmark,
  Bell,
  ShieldCheck, // Correct icon to replace Shield
} from "lucide-react";

interface CookieType {
  id: string;
  name: string;
  description: string;
  duration: string;
  category: "essential" | "functional" | "analytics" | "marketing" | "other";
  required: boolean;
}

interface CookieCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  toggleable: boolean;
}

const cookieCategories: CookieCategory[] = [
  {
    id: "essential",
    name: "Essential Cookies",
    icon: <ShieldAlert className="w-6 h-6 text-emerald-600" />,
    description:
      "These cookies are necessary for the website to function and cannot be switched off in our systems. They are usually only set in response to actions made by you which amount to a request for services.",
    toggleable: false,
  },
  {
    id: "functional",
    name: "Functional Cookies",
    icon: <Settings className="w-6 h-6 text-blue-600" />,
    description:
      "These cookies enable the website to provide enhanced functionality and personalization. They may be set by us or by third party providers whose services we have added to our pages.",
    toggleable: true,
  },
  {
    id: "analytics",
    name: "Analytics Cookies",
    icon: <Eye className="w-6 h-6 text-indigo-600" />,
    description:
      "These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us to know which pages are the most and least popular.",
    toggleable: true,
  },
  {
    id: "marketing",
    name: "Marketing Cookies",
    icon: <Bell className="w-6 h-6 text-rose-600" />,
    description:
      "These cookies may be set through our site by our advertising partners. They may be used by those companies to build a profile of your interests and show you relevant adverts on other sites.",
    toggleable: true,
  },
  {
    id: "other",
    name: "Other Cookies",
    icon: <Globe className="w-6 h-6 text-amber-600" />,
    description:
      "These are cookies that do not fit into the other categories. They might be for specific page functionality or third-party integrations.",
    toggleable: true,
  },
];

const cookiesList: CookieType[] = [
  {
    id: "session",
    name: "Session Cookie",
    description: "Preserves user session state across page requests.",
    duration: "Session",
    category: "essential",
    required: true,
  },
  {
    id: "xsrf-token",
    name: "XSRF-TOKEN",
    description: "Helps prevent Cross-Site Request Forgery attacks.",
    duration: "2 hours",
    category: "essential",
    required: true,
  },
  {
    id: "language-preference",
    name: "language_preference",
    description: "Stores your preferred language setting.",
    duration: "1 year",
    category: "functional",
    required: false,
  },
  {
    id: "theme-mode",
    name: "theme_mode",
    description: "Remembers your light/dark theme preference.",
    duration: "1 year",
    category: "functional",
    required: false,
  },
  {
    id: "ga",
    name: "_ga",
    description: "Used by Google Analytics to distinguish users.",
    duration: "2 years",
    category: "analytics",
    required: false,
  },
  {
    id: "ga-session",
    name: "_ga_session",
    description: "Used by Google Analytics to persist session state.",
    duration: "24 hours",
    category: "analytics",
    required: false,
  },
  {
    id: "fbp",
    name: "_fbp",
    description:
      "Used by Facebook to deliver a series of advertisement products.",
    duration: "3 months",
    category: "marketing",
    required: false,
  },
  {
    id: "adsense",
    name: "__gads",
    description:
      "Used by Google AdSense for experimenting with advertisement efficiency.",
    duration: "1 year",
    category: "marketing",
    required: false,
  },
  {
    id: "intercom-id",
    name: "intercom-id-<app_id>",
    description:
      "Allows Intercom to identify returning users to our app and tie conversations to them.",
    duration: "9 months",
    category: "other",
    required: false,
  },
  {
    id: "hotjar",
    name: "_hjid",
    description: "Set by Hotjar to identify a new user's first session.",
    duration: "1 year",
    category: "other",
    required: false,
  },
];

const Cookies: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    "essential"
  );
  const [cookiePreferences, setCookiePreferences] = useState<
    Record<string, boolean>
  >({
    essential: true, // Always true
    functional: false,
    analytics: false,
    marketing: false,
    other: false,
  });
  const [showBanner, setShowBanner] = useState(true);
  const [activeSection, setActiveSection] = useState("what-are-cookies");

  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Observer for scroll spy
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
  }, []);

  // Fix for the ref type issue - create a callback to properly set the ref
  const setSectionRef = (id: string) => (el: HTMLDivElement | null) => {
    sectionRefs.current[id] = el;
  };

  // Filter cookies based on search and category
  const filteredCookies = cookiesList.filter((cookie) => {
    const matchesSearch =
      searchQuery.trim() === "" ||
      cookie.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cookie.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === null || cookie.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const acceptAllCookies = () => {
    setCookiePreferences({
      essential: true,
      functional: true,
      analytics: true,
      marketing: true,
      other: true,
    });
    setShowBanner(false);
  };

  const acceptEssentialOnly = () => {
    setCookiePreferences({
      essential: true,
      functional: false,
      analytics: false,
      marketing: false,
      other: false,
    });
    setShowBanner(false);
  };

  const savePreferences = () => {
    setShowBanner(false);
    // Here you would normally save the preferences to a cookie or localStorage
    console.log("Saved preferences:", cookiePreferences);
  };

  const togglePreference = (category: string) => {
    if (category === "essential") return; // Cannot toggle essential cookies

    setCookiePreferences((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

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

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="inline-flex items-center justify-center p-2 bg-white bg-opacity-10 rounded-full mb-4">
              <Cookie className="w-6 h-6 mr-2 text-gray-900" />
              <span className="text-sm font-medium text-gray-900">Cookie Policy</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Our Cookie Policy
            </h1>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto">
              Learn how we use cookies and similar technologies to enhance your
              experience.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="sticky top-8">
              {/* Search */}
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search cookies..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                  />
                </div>
                {searchQuery.trim() !== "" && (
                  <div className="mt-2 text-sm text-gray-600">
                    Found {filteredCookies.length} cookie(s) matching "
                    {searchQuery}"
                  </div>
                )}
              </div>

              {/* Navigation */}
              <nav className="space-y-1">
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
                  On this page
                </p>
                <a
                  href="#what-are-cookies"
                  className={`flex items-center px-3 py-2 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors ${
                    activeSection === "what-are-cookies"
                      ? "bg-purple-50 text-purple-700 font-medium"
                      : ""
                  }`}
                >
                  <Cookie className="w-5 h-5 mr-3 text-purple-500" />
                  <span className="text-sm">What are Cookies?</span>
                </a>
                <a
                  href="#why-we-use-cookies"
                  className={`flex items-center px-3 py-2 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors ${
                    activeSection === "why-we-use-cookies"
                      ? "bg-purple-50 text-purple-700 font-medium"
                      : ""
                  }`}
                >
                  <FileText className="w-5 h-5 mr-3 text-purple-500" />
                  <span className="text-sm">Why We Use Cookies</span>
                </a>
                <a
                  href="#cookie-categories"
                  className={`flex items-center px-3 py-2 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors ${
                    activeSection === "cookie-categories"
                      ? "bg-purple-50 text-purple-700 font-medium"
                      : ""
                  }`}
                >
                  <Bookmark className="w-5 h-5 mr-3 text-purple-500" />
                  <span className="text-sm">Cookie Categories</span>
                </a>
                <a
                  href="#manage-preferences"
                  className={`flex items-center px-3 py-2 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors ${
                    activeSection === "manage-preferences"
                      ? "bg-purple-50 text-purple-700 font-medium"
                      : ""
                  }`}
                >
                  <Settings className="w-5 h-5 mr-3 text-purple-500" />
                  <span className="text-sm">Manage Preferences</span>
                </a>
                <a
                  href="#cookie-list"
                  className={`flex items-center px-3 py-2 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors ${
                    activeSection === "cookie-list"
                      ? "bg-purple-50 text-purple-700 font-medium"
                      : ""
                  }`}
                >
                  <Fingerprint className="w-5 h-5 mr-3 text-purple-500" />
                  <span className="text-sm">Cookie List</span>
                </a>
              </nav>

              {/* Last updated info */}
              <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center text-gray-600 mb-2">
                  <Clock className="w-5 h-5 mr-2" />
                  <span className="text-sm font-medium">Last Updated</span>
                </div>
                <p className="text-sm text-gray-500">November 10, 2023</p>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1">
            {/* What are Cookies section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              id="what-are-cookies"
              ref={setSectionRef("what-are-cookies")}
              className="mb-12 scroll-mt-20"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="flex-shrink-0 p-2 rounded-lg bg-purple-50">
                  <Cookie className="w-6 h-6 text-purple-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  What are Cookies?
                </h2>
              </div>
              <div className="pl-4 border-l-2 border-purple-100 space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  Cookies are small text files that are placed on your computer
                  or mobile device when you visit a website. They are widely
                  used in order to make websites work more efficiently, as well
                  as to provide information to the owners of the site.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Cookies are used to enable certain functions, provide
                  analytics information, store preferences, for marketing
                  purposes and to personalize your experience. These files do
                  not contain any sensitive information like passwords, but they
                  do contain a unique identifier that recognizes your browser
                  the next time you visit our site.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  They can be "persistent" cookies that remain on your computer
                  until a certain date, or "session" cookies that are deleted
                  when you close your browser. Cookies can also be first-party
                  cookies which are those set by the website you're visiting, or
                  third-party cookies which are set by someone other than the
                  owner of the website.
                </p>
              </div>
            </motion.div>

            {/* Why We Use Cookies section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              id="why-we-use-cookies"
              ref={setSectionRef("why-we-use-cookies")}
              className="mb-12 scroll-mt-20"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="flex-shrink-0 p-2 rounded-lg bg-blue-50">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Why We Use Cookies
                </h2>
              </div>
              <div className="pl-4 border-l-2 border-blue-100 space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  We use cookies for several reasons. Some are necessary for
                  technical reasons for our website to operate. Others enable us
                  to improve performance and provide you with a better user
                  experience. Here are the primary ways we use cookies:
                </p>

                <div className="grid md:grid-cols-2 gap-4 mt-6">
                  <div className="bg-white p-5 rounded-lg border border-gray-200 hover:border-blue-200 hover:shadow-md transition-all">
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                        <ShieldCheck className="w-5 h-5 text-blue-600" />
                      </div>
                      <h3 className="font-medium text-gray-900">
                        Security & Authentication
                      </h3>
                    </div>
                    <p className="text-gray-600 text-sm">
                      To protect your data and account from unauthorized access
                      and verify your identity when you sign in.
                    </p>
                  </div>

                  <div className="bg-white p-5 rounded-lg border border-gray-200 hover:border-blue-200 hover:shadow-md transition-all">
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                        <Settings className="w-5 h-5 text-green-600" />
                      </div>
                      <h3 className="font-medium text-gray-900">
                        Site Functionality
                      </h3>
                    </div>
                    <p className="text-gray-600 text-sm">
                      To remember your settings and preferences so you don't
                      have to reset them each time you visit.
                    </p>
                  </div>

                  <div className="bg-white p-5 rounded-lg border border-gray-200 hover:border-blue-200 hover:shadow-md transition-all">
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mr-3">
                        <Eye className="w-5 h-5 text-amber-600" />
                      </div>
                      <h3 className="font-medium text-gray-900">
                        Analytics & Performance
                      </h3>
                    </div>
                    <p className="text-gray-600 text-sm">
                      To understand how visitors interact with our website,
                      which pages are most popular, and improve our website and
                      services.
                    </p>
                  </div>

                  <div className="bg-white p-5 rounded-lg border border-gray-200 hover:border-blue-200 hover:shadow-md transition-all">
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center mr-3">
                        <Bell className="w-5 h-5 text-rose-600" />
                      </div>
                      <h3 className="font-medium text-gray-900">
                        Personalized Marketing
                      </h3>
                    </div>
                    <p className="text-gray-600 text-sm">
                      To deliver more relevant advertisements and track the
                      effectiveness of our marketing campaigns.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Cookie Categories section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              id="cookie-categories"
              ref={setSectionRef("cookie-categories")}
              className="mb-12 scroll-mt-20"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="flex-shrink-0 p-2 rounded-lg bg-indigo-50">
                  <Bookmark className="w-6 h-6 text-indigo-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Cookie Categories
                </h2>
              </div>
              <div className="pl-4 border-l-2 border-indigo-100 space-y-8">
                {cookieCategories.map((category) => (
                  <div
                    key={category.id}
                    className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-md transition-all"
                  >
                    <div className="flex items-start md:items-center justify-between mb-4 flex-col md:flex-row gap-4">
                      <div className="flex items-center">
                        <div className="p-2 rounded-lg bg-gray-50 mr-3">
                          {category.icon}
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {category.name}
                        </h3>
                      </div>

                      <div className="flex items-center">
                        {!category.toggleable ? (
                          <span className="text-xs px-2 py-1 bg-gray-100 text-gray-800 rounded-full mr-3">
                            Always Active
                          </span>
                        ) : (
                          <button
                            title={`Toggle ${category.name}`}
                            onClick={() => togglePreference(category.id)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 ${
                              cookiePreferences[
                                category.id as keyof typeof cookiePreferences
                              ]
                                ? "bg-purple-600"
                                : "bg-gray-200"
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                cookiePreferences[
                                  category.id as keyof typeof cookiePreferences
                                ]
                                  ? "translate-x-6"
                                  : "translate-x-1"
                              }`}
                            />
                          </button>
                        )}
                      </div>
                    </div>

                    <p className="text-gray-600">{category.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Manage Preferences section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              id="manage-preferences"
              ref={setSectionRef("manage-preferences")}
              className="mb-12 scroll-mt-20"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="flex-shrink-0 p-2 rounded-lg bg-green-50">
                  <Settings className="w-6 h-6 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Manage Your Cookie Preferences
                </h2>
              </div>
              <div className="pl-4 border-l-2 border-green-100 space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  You can manage your cookie preferences at any time. Here's how
                  you can control the cookies on our website:
                </p>

                <div className="bg-white p-6 rounded-xl border border-gray-200 mt-4">
                  <h3 className="font-medium text-lg text-gray-900 mb-3">
                    Cookie Preference Center
                  </h3>
                  <p className="text-gray-700 mb-6">
                    Use the toggles below to customize which categories of
                    cookies you accept. Essential cookies cannot be disabled as
                    they are necessary for the website to function properly.
                  </p>

                  <div className="space-y-4 mb-6">
                    {cookieCategories.map((category) => (
                      <div
                        key={category.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center">
                          {category.icon}
                          <span className="ml-3 font-medium">
                            {category.name}
                          </span>
                        </div>

                        {!category.toggleable ? (
                          <span className="text-xs px-2 py-1 bg-gray-200 text-gray-800 rounded-full">
                            Always Active
                          </span>
                        ) : (
                          <button
                            title={`Toggle ${category.name}`}
                            aria-label={`Toggle ${category.name}`}
                            onClick={() => togglePreference(category.id)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 ${
                              cookiePreferences[
                                category.id as keyof typeof cookiePreferences
                              ]
                                ? "bg-purple-600"
                                : "bg-gray-200"
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                cookiePreferences[
                                  category.id as keyof typeof cookiePreferences
                                ]
                                  ? "translate-x-6"
                                  : "translate-x-1"
                              }`}
                            />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={acceptAllCookies}
                      className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      Accept All Cookies
                    </button>
                    <button
                      onClick={acceptEssentialOnly}
                      className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                      Essential Cookies Only
                    </button>
                    <button
                      onClick={savePreferences}
                      className="px-4 py-2 bg-white border border-purple-500 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors"
                    >
                      Save Preferences
                    </button>
                  </div>
                </div>

                <h3 className="font-medium text-lg text-gray-900 mt-8 mb-3">
                  Browser Settings
                </h3>
                <p className="text-gray-700 mb-4">
                  You can also control cookies through your browser settings.
                  Most browsers allow you to refuse to accept cookies and to
                  delete cookies. The methods for doing so vary from browser to
                  browser. Please refer to your browser's help section for more
                  information.
                </p>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <a
                    href="https://support.google.com/chrome/answer/95647"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <span>Google Chrome</span>
                    <ChevronRight className="w-4 h-4 ml-auto" />
                  </a>
                  <a
                    href="https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <span>Mozilla Firefox</span>
                    <ChevronRight className="w-4 h-4 ml-auto" />
                  </a>
                  <a
                    href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <span>Microsoft Edge</span>
                    <ChevronRight className="w-4 h-4 ml-auto" />
                  </a>
                  <a
                    href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <span>Apple Safari</span>
                    <ChevronRight className="w-4 h-4 ml-auto" />
                  </a>
                  <a
                    href="https://help.opera.com/en/latest/web-preferences/#cookies"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <span>Opera</span>
                    <ChevronRight className="w-4 h-4 ml-auto" />
                  </a>
                </div>

                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-6">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <ShieldAlert className="h-5 w-5 text-yellow-400" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-yellow-700">
                        Please note that blocking some types of cookies may
                        impact your experience on our website and the services
                        we offer.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Cookie List section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              id="cookie-list"
              ref={setSectionRef("cookie-list")}
              className="mb-12 scroll-mt-20"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="flex-shrink-0 p-2 rounded-lg bg-rose-50">
                  <Fingerprint className="w-6 h-6 text-rose-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Cookie List
                </h2>
              </div>
              <div className="pl-4 border-l-2 border-rose-100">
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2 mb-4">
                    <button
                      onClick={() => setSelectedCategory(null)}
                      className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
                        selectedCategory === null
                          ? "bg-purple-100 text-purple-800"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      All Cookies
                    </button>
                    {cookieCategories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
                          selectedCategory === category.id
                            ? "bg-purple-100 text-purple-800"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>

                  <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <div className="grid grid-cols-12 bg-gray-50 p-4 border-b border-gray-200">
                      <div className="col-span-3 font-medium text-gray-700">
                        Name
                      </div>
                      <div className="col-span-5 font-medium text-gray-700">
                        Purpose
                      </div>
                      <div className="col-span-2 font-medium text-gray-700">
                        Duration
                      </div>
                      <div className="col-span-2 font-medium text-gray-700">
                        Category
                      </div>
                    </div>

                    <div className="divide-y divide-gray-200">
                      {filteredCookies.length > 0 ? (
                        filteredCookies.map((cookie) => (
                          <div
                            key={cookie.id}
                            className="grid grid-cols-12 p-4 hover:bg-gray-50 transition-colors"
                          >
                            <div className="col-span-3 text-gray-900 font-medium">
                              {highlightText(cookie.name)}
                            </div>
                            <div className="col-span-5 text-gray-600">
                              {highlightText(cookie.description)}
                            </div>
                            <div className="col-span-2 text-gray-600">
                              {cookie.duration}
                            </div>
                            <div className="col-span-2">
                              <span
                                className={`text-xs px-2 py-1 rounded-full ${
                                  cookie.category === "essential"
                                    ? "bg-emerald-100 text-emerald-800"
                                    : cookie.category === "functional"
                                    ? "bg-blue-100 text-blue-800"
                                    : cookie.category === "analytics"
                                    ? "bg-indigo-100 text-indigo-800"
                                    : cookie.category === "marketing"
                                    ? "bg-rose-100 text-rose-800"
                                    : "bg-amber-100 text-amber-800"
                                }`}
                              >
                                {cookie.category.charAt(0).toUpperCase() +
                                  cookie.category.slice(1)}
                              </span>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="py-12 text-center">
                          <Search className="mx-auto w-10 h-10 text-gray-400 mb-3" />
                          <p className="text-gray-500">
                            No cookies found matching your search
                          </p>
                          <button
                            onClick={() => {
                              setSearchQuery("");
                              setSelectedCategory(null);
                            }}
                            className="mt-2 text-purple-600 text-sm hover:text-purple-800"
                          >
                            Clear filters
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Privacy Policy Link */}
            <div className="mt-16 border-t border-gray-200 pt-8">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
                <a
                  href="/terms"
                  className="group flex items-center text-gray-600 hover:text-purple-600 transition-colors"
                >
                  <ChevronRight className="w-5 h-5 mr-2 transform rotate-180" />
                  <span>Previous: Terms of Service</span>
                </a>

                <a
                  href="/privacy"
                  className="group flex items-center text-gray-600 hover:text-purple-600 transition-colors"
                >
                  <span>Next: Privacy Policy</span>
                  <ChevronRight className="w-5 h-5 ml-2" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cookie Consent Banner */}
      {showBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="fixed bottom-0 left-0 w-full bg-gray-900 bg-opacity-95 text-white z-50 shadow-lg"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <Cookie className="w-5 h-5 mr-2 text-purple-400" />
                  <h3 className="text-lg font-medium">Cookie Notice</h3>
                </div>
                <p className="text-gray-300 text-sm">
                  We use cookies to enhance your browsing experience, serve
                  personalized ads or content, and analyze our traffic. By
                  clicking "Accept All", you consent to our use of cookies.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={acceptAllCookies}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors whitespace-nowrap"
                >
                  Accept All
                </button>
                <button
                  onClick={acceptEssentialOnly}
                  className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors whitespace-nowrap"
                >
                  Essential Only
                </button>
                <a
                  href="#manage-preferences"
                  onClick={(e) => {
                    e.preventDefault();
                    const element =
                      document.getElementById("manage-preferences");
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className="px-4 py-2 bg-transparent border border-gray-500 text-white rounded-lg hover:bg-gray-800 transition-colors whitespace-nowrap"
                >
                  Manage Preferences
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Cookies;
