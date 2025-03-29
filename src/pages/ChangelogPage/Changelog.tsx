import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

interface ChangelogItem {
  version: string;
  date: string;
  title: string;
  description: string;
  type: "feature" | "improvement" | "bugfix" | "security";
  changes: {
    text: string;
    highlight?: boolean;
  }[];
  expand?: boolean;
}

const Changelog: React.FC = () => {
  const [filter, setFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("newest");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [changelogs, setChangelogs] = useState<ChangelogItem[]>([]);
  const [visibleChangelogs, setVisibleChangelogs] = useState<ChangelogItem[]>(
    []
  );
  const [expandedVersion, setExpandedVersion] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Initial changelog data
  useEffect(() => {
    const initialChangelogs: ChangelogItem[] = [
      {
        version: "2.1.0",
        date: "2023-11-15",
        title: "Enhanced Context Understanding",
        description:
          "Major improvements to our translation engine's ability to understand context in complex sentences.",
        type: "feature",
        changes: [
          {
            text: "Added neural network training for contextual understanding",
            highlight: true,
          },
          { text: "Implemented semantic analysis for idiom translation" },
          { text: "Enhanced support for technical jargon in 12 industries" },
          {
            text: "Reduced translation time by 35% for documents over 5000 words",
          },
        ],
      },
      {
        version: "2.0.5",
        date: "2023-10-22",
        title: "Performance and Security Updates",
        description: "Critical security patches and performance improvements.",
        type: "security",
        changes: [
          { text: "Patched XSS vulnerability in user input forms" },
          { text: "Updated encryption standards for API calls" },
          { text: "Enhanced rate limiting to prevent abuse", highlight: true },
          { text: "Optimized database queries for faster response times" },
        ],
      },
      {
        version: "2.0.0",
        date: "2023-09-01",
        title: "Major Platform Redesign",
        description:
          "Complete overhaul of the platform interface and backend architecture.",
        type: "improvement",
        changes: [
          {
            text: "Redesigned user interface with improved accessibility",
            highlight: true,
          },
          { text: "Rebuilt backend with microservices architecture" },
          { text: "Added support for 25 new languages" },
          { text: "Implemented new file format support: DOCX, PDF, PPTX" },
          { text: "Enhanced real-time collaboration features" },
        ],
      },
      {
        version: "1.9.3",
        date: "2023-08-12",
        title: "Bug Fix Release",
        description: "Addressing several critical bugs reported by users.",
        type: "bugfix",
        changes: [
          {
            text: "Fixed incorrect translations for certain Spanish expressions",
          },
          { text: "Resolved issues with file upload for PDFs over 10MB" },
          { text: "Fixed rendering issues on Safari browsers" },
          { text: "Corrected timezone handling for collaborative editing" },
        ],
      },
      {
        version: "1.9.0",
        date: "2023-07-18",
        title: "New Language Support",
        description: "Added support for 15 new languages and dialects.",
        type: "feature",
        changes: [
          {
            text: "Added support for 10 African languages including Swahili and Hausa",
            highlight: true,
          },
          { text: "Implemented 5 new European dialects" },
          { text: "Enhanced accuracy for existing Asian languages" },
          { text: "Added specialized vocabulary for medical and legal fields" },
        ],
      },
      {
        version: "1.8.5",
        date: "2023-06-30",
        title: "API Enhancements",
        description:
          "Major updates to our API functionality and documentation.",
        type: "improvement",
        changes: [
          { text: "Released v2 of our public API with backward compatibility" },
          { text: "Added new endpoints for batch processing" },
          { text: "Improved rate limits for enterprise customers" },
          { text: "Published comprehensive API documentation with examples" },
        ],
      },
      {
        version: "1.8.0",
        date: "2023-05-15",
        title: "Mobile App Launch",
        description:
          "Launched our first mobile application for iOS and Android.",
        type: "feature",
        changes: [
          { text: "Released native apps for iOS and Android", highlight: true },
          { text: "Implemented camera translation feature" },
          { text: "Added offline translation capabilities for premium users" },
          { text: "Synchronized translation history across devices" },
        ],
      },
    ];

    setChangelogs(initialChangelogs);
    setVisibleChangelogs(initialChangelogs);
  }, []);

  // Filter, sort and search functionality
  useEffect(() => {
    let filtered = [...changelogs];

    // Apply type filter
    if (filter !== "all") {
      filtered = filtered.filter((item) => item.type === filter);
    }

    // Apply search
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(searchLower) ||
          item.description.toLowerCase().includes(searchLower) ||
          item.changes.some((change) =>
            change.text.toLowerCase().includes(searchLower)
          )
      );
    }

    // Apply sorting
    if (sortBy === "newest") {
      filtered.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    } else if (sortBy === "oldest") {
      filtered.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );
    }

    setVisibleChangelogs(filtered);
  }, [changelogs, filter, sortBy, searchTerm]);

  const toggleExpand = (version: string) => {
    setExpandedVersion(expandedVersion === version ? null : version);
  };

  const copyToClipboard = (version: string) => {
    const changelog = changelogs.find((item) => item.version === version);
    if (changelog) {
      const text = `Version ${changelog.version} (${changelog.date}): ${
        changelog.title
      }\n${changelog.description}\n\nChanges:\n${changelog.changes
        .map((change) => `• ${change.text}`)
        .join("\n")}`;
      navigator.clipboard.writeText(text).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "feature":
        return "bg-blue-100 text-blue-800";
      case "improvement":
        return "bg-green-100 text-green-800";
      case "bugfix":
        return "bg-yellow-100 text-yellow-800";
      case "security":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              Changelog
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg sm:text-xl text-white/80">
              Stay updated with all the improvements and new features we're
              adding to our translation platform.
            </p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 mb-8 items-start lg:items-center">
          <div className="flex-1 w-full">
            <div className="relative">
              <input
                type="text"
                className="w-full py-3 pl-10 pr-4 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Search in changelog..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <span className="absolute left-3 top-3.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 w-full lg:w-auto">
            <select
              className="py-3 px-4 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent cursor-pointer"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="feature">Features</option>
              <option value="improvement">Improvements</option>
              <option value="bugfix">Bug Fixes</option>
              <option value="security">Security</option>
            </select>

            <select
              className="py-3 px-4 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent cursor-pointer"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>
        </div>

        {visibleChangelogs.length === 0 && (
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 mx-auto text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-900">
              No changelog entries found
            </h3>
            <p className="mt-2 text-gray-500">
              Try changing your search or filter settings.
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setFilter("all");
                setSortBy("newest");
              }}
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Timeline */}
        <div className="relative">
          {visibleChangelogs.map((item, index) => (
            <div
              key={item.version}
              className={`mb-8 ${
                index === visibleChangelogs.length - 1
                  ? ""
                  : "pb-8 border-l-2 border-gray-200 ml-4"
              }`}
            >
              <div className="relative">
                {/* Timeline dot */}
                <div className="absolute -left-5 h-10 w-10 rounded-full bg-white border-2 border-indigo-500 flex items-center justify-center">
                  {item.type === "feature" && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-indigo-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                  {item.type === "improvement" && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-green-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                  {item.type === "bugfix" && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-yellow-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                  {item.type === "security" && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-red-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>

                {/* Card */}
                <div className="ml-12 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-md">
                  {/* Card header */}
                  <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                      <div>
                        <div className="flex items-center gap-3">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(
                              item.type
                            )}`}
                          >
                            {item.type.charAt(0).toUpperCase() +
                              item.type.slice(1)}
                          </span>
                          <h3 className="text-lg font-semibold text-gray-900">
                            Version {item.version}
                          </h3>
                          <time className="text-sm text-gray-500">
                            {formatDate(item.date)}
                          </time>
                        </div>
                        <h4 className="mt-2 text-xl font-bold text-gray-900">
                          {item.title}
                        </h4>
                      </div>
                      <div className="flex items-center gap-2 mt-3 sm:mt-0">
                        <button
                          onClick={() => copyToClipboard(item.version)}
                          className="flex items-center justify-center h-8 w-8 rounded-full hover:bg-gray-200 text-gray-500 focus:outline-none"
                          title="Copy to clipboard"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                            />
                          </svg>
                        </button>
                        <button
                          onClick={() => toggleExpand(item.version)}
                          className="flex items-center justify-center h-8 w-8 rounded-full hover:bg-gray-200 text-gray-500 focus:outline-none"
                          title={
                            expandedVersion === item.version
                              ? "Collapse"
                              : "Expand"
                          }
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={`h-5 w-5 transition-transform ${
                              expandedVersion === item.version
                                ? "rotate-180"
                                : ""
                            }`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <p className="mt-2 text-gray-600">{item.description}</p>
                  </div>

                  {/* Card content */}
                  {expandedVersion === item.version && (
                    <div className="px-6 py-4">
                      <h5 className="font-medium text-gray-900 mb-3">
                        Changes:
                      </h5>
                      <ul className="space-y-2">
                        {item.changes.map((change, i) => (
                          <li key={i} className="flex gap-2">
                            <svg
                              className="flex-shrink-0 h-5 w-5 text-indigo-500 mt-0.5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span
                              className={
                                change.highlight
                                  ? "text-gray-900 font-medium"
                                  : "text-gray-600"
                              }
                            >
                              {change.text}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter and Share */}
        <div className="mt-16 mb-12 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8">
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Never miss an update
              </h3>
              <p className="text-gray-600 mb-4">
                Subscribe to our newsletter to get notified when we release new
                features and updates.
              </p>
              <div className="flex max-w-md">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 px-4 py-3 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:z-10"
                />
                <button className="bg-indigo-600 text-white px-4 py-3 rounded-r-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                  Subscribe
                </button>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Share our changelog
              </h3>
              <p className="text-gray-600 mb-4">
                Help spread the word about our latest features and improvements.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                >
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-400 text-white hover:bg-blue-500 transition-colors"
                >
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.037 10.037 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.902 4.902 0 01-2.228-.616V9.2a4.92 4.92 0 003.95 4.82 4.916 4.916 0 01-2.224.084A4.927 4.927 0 008.52 17.858 9.88 9.88 0 010 19.945a13.893 13.893 0 007.548 2.212c9.057 0 14.01-7.502 14.01-14.01 0-.213 0-.425-.015-.636a10.026 10.026 0 002.46-2.548l-.047-.02z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="flex items-center justify-center h-10 w-10 rounded-full bg-green-600 text-white hover:bg-green-700 transition-colors"
                >
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.996 8.87c-.093-2.093-1.178-3.953-2.883-5.173-1.705-1.221-3.909-1.508-5.879-.794-1.976.721-3.529 2.256-4.149 4.148-.62 1.893-.285 3.904.884 5.54l-1.44 4.246c-.025.075-.028.155-.008.231.021.76.064.146.125.202.06.055.135.094.217.112.082.018.167.014.248-.012l4.498-1.344c1.01.643 2.155.975 3.323.975.513 0 1.028-.061 1.533-.183 1.925-.476 3.468-1.836 4.149-3.679.682-1.845.406-3.905-.738-5.513m-2.904 5.05c-.237.802-.812 1.457-1.532 1.789-.902.353-1.911.223-2.703-.343-.216-.154-.466-.264-.731-.321l-1.374.41.455-1.345c-.243-.375-.394-.807-.439-1.255-.054-.544.05-1.089.3-1.575.249-.486.637-.883 1.118-1.141.481-.257 1.025-.364 1.569-.309.544.054 1.061.254 1.498.581.437.326.769.767.96 1.276.19.509.221 1.063.089 1.594zm-3.873-2.01c-.046-.092-.148-.15-.257-.145h-.592c-.081 0-.16.026-.224.073-.144.108-.315.188-.5.232-.13.026-.227.134-.227.267v.895c0 .145.116.264.261.268.194.006.386.042.568.107.091.033.195.008.266-.063l.629-.629c.066-.066.099-.157.082-.249-.029-.159-.02-.323.024-.477-.032-.097-.069-.19-.119-.278zm1.478.766c.057 0 .111-.022.152-.062l.255-.254c.156.056.286.168.369.315.013.109.07.206.158.269l.716.41c.08.044.175.044.254 0 .08-.045.129-.128.129-.219v-.812c0-.113-.066-.216-.168-.265-.209-.102-.394-.246-.542-.423-.048-.057-.119-.09-.193-.09h-.92c-.121 0-.22.098-.22.219 0 .12.099.218.22.218h.613c.068 0 .134.027.183.076.159.159.374.254.597.268.051.003.093.045.093.096v.27l-.255-.151c-.152-.088-.328-.12-.499-.09-.17.031-.327.121-.443.253l-.154.153h-.285zm2.097-1.386c.194.194.349.424.455.68.142.343.172.718.087 1.077-.086.359-.285.679-.57.916-.284.239-.644.381-1.027.407-.384.026-.765-.072-1.085-.278-.12-.077-.25-.135-.386-.172-.068-.019-.125-.07-.15-.135-.024-.064-.019-.136.013-.196l.226-.41c.043-.078.129-.127.219-.127.176.004.35-.041.503-.13.153-.088.281-.218.369-.373.088-.155.133-.331.13-.51-.004-.178-.055-.353-.149-.504-.094-.151-.228-.276-.387-.359-.159-.082-.337-.121-.516-.113-.179.007-.353.059-.502.151-.15.092-.273.223-.354.381-.03.061-.082.109-.145.135-.063.026-.134.026-.198 0l-.42-.179c-.075-.031-.131-.097-.151-.177-.02-.08-.003-.165.045-.231.152-.21.352-.384.585-.508.246-.131.518-.21.798-.232.279-.022.56.016.825.111.265.095.508.25.712.453z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-700 text-white hover:bg-blue-800 transition-colors"
                >
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Sticky notification for copy success */}
        {copied && (
          <div className="fixed bottom-5 right-5 bg-black/80 text-white px-4 py-3 rounded-lg flex items-center shadow-lg animate-fadeIn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2 text-green-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            Copied to clipboard!
          </div>
        )}
      </div>

      {/* Footer with navigation */}
      <div className="bg-gray-50 py-8 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-gray-600 mb-4 sm:mb-0">
              Want to see older updates? Check our{" "}
              <a
                href="#"
                className="text-indigo-600 hover:text-indigo-800 font-medium"
              >
                archive
              </a>
              .
            </p>
            <div className="flex space-x-4">
              <Link
                to="/"
                className="text-gray-600 hover:text-indigo-600 transition-colors"
              >
                Home
              </Link>
              <Link
                to="/common-mistakes"
                className="text-gray-600 hover:text-indigo-600 transition-colors"
              >
                Common Mistakes
              </Link>
              <a
                href="#"
                className="text-gray-600 hover:text-indigo-600 transition-colors"
              >
                Documentation
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-indigo-600 transition-colors"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Changelog;
