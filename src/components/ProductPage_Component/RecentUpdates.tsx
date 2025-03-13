"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  ChevronUp,
  Star,
  Clock,
  Tag,
  Zap,
  BookOpen,
  Users,
  CheckCircle,
  MessageCircle,
  ThumbsUp,
  ThumbsDown,
  Rocket,
  Gift,
} from "lucide-react";

// Custom utility function
const classNames = (...classes: (string | boolean | undefined)[]) => {
  return classes.filter(Boolean).join(" ");
};

// Update interface
interface Update {
  id: number;
  version: string;
  date: string;
  title: string;
  description: string;
  features: string[];
  tags: string[];
  isMajor?: boolean;
  icon?: React.ReactNode;
  imageUrl?: string;
  rating?: number;
  comments?: { user: string; comment: string; date: string }[];
  progress?: number; // For in-progress updates
}

// Simulate fetching data from an API
const fetchUpdates = async (): Promise<Update[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          version: "v2.3.1",
          date: "March 10, 2025",
          title: "Enhanced Performance & Audio",
          description:
            "Major update improving app performance and adding new audio features for better pronunciation learning.",
          features: [
            "40% faster dictionary lookup",
            "High-quality audio for 500+ new words",
            "Optimized offline mode",
            "Fixed minor UI bugs",
          ],
          tags: ["Performance", "Audio", "Bug Fix"],
          isMajor: true,
          icon: <Zap className="h-6 w-6 text-blue-600" />,
          imageUrl: "/images/update-performance.jpg",
          rating: 4.7,
          comments: [
            {
              user: "John Doe",
              comment: "The new audio features are amazing!",
              date: "March 11, 2025",
            },
          ],
        },
        {
          id: 2,
          version: "v2.2.0",
          date: "February 15, 2025",
          title: "Cultural Insights Expansion",
          description:
            "Added cultural context and new vocabulary to enrich user experience.",
          features: [
            "200+ cultural phrases added",
            "Interactive cultural notes",
            "Improved search functionality",
            "New dark mode UI",
          ],
          tags: ["Content", "UI/UX", "Features"],
          icon: <BookOpen className="h-6 w-6 text-purple-600" />,
          imageUrl: "/images/update-culture.jpg",
          rating: 4.5,
          comments: [],
        },
        {
          id: 3,
          version: "v2.1.5",
          date: "January 20, 2025",
          title: "Stability Improvements",
          description:
            "Focused on refining the app experience based on user feedback.",
          features: [
            "Fixed sync issues with offline data",
            "Enhanced audio playback",
            "Updated translations for 100+ terms",
          ],
          tags: ["Stability", "Audio", "Content"],
          icon: <CheckCircle className="h-6 w-6 text-green-600" />,
          progress: 75, // Example of an in-progress update
        },
      ]);
    }, 1000);
  });
};

// Filter options
const filterOptions = [
  { label: "All", icon: <Star className="h-4 w-4" /> },
  { label: "Major Updates", icon: <Zap className="h-4 w-4" /> },
  { label: "Minor Updates", icon: <Clock className="h-4 w-4" /> },
  { label: "Features", icon: <Tag className="h-4 w-4" /> },
  { label: "Bug Fix", icon: <CheckCircle className="h-4 w-4" /> },
];

const RecentUpdates: React.FC = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [activeFilters, setActiveFilters] = useState<string[]>(["All"]);
  const [updates, setUpdates] = useState<Update[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const updatesPerPage = 5;

  useEffect(() => {
    const loadUpdates = async () => {
      const data = await fetchUpdates();
      setUpdates(data);
      setLoading(false);
    };
    loadUpdates();
  }, []);

  const handleToggle = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleFilterClick = (filter: string) => {
    if (filter === "All") {
      setActiveFilters(["All"]);
    } else {
      setActiveFilters((prev) =>
        prev.includes("All")
          ? [filter]
          : prev.includes(filter)
          ? prev.filter((f) => f !== filter)
          : [...prev, filter]
      );
    }
  };

  const filteredUpdates = updates.filter((update) => {
    if (activeFilters.includes("All")) return true;
    if (activeFilters.includes("Major Updates") && update.isMajor) return true;
    if (activeFilters.includes("Minor Updates") && !update.isMajor) return true;
    return update.tags.some((tag) => activeFilters.includes(tag));
  });

  const indexOfLastUpdate = currentPage * updatesPerPage;
  const indexOfFirstUpdate = indexOfLastUpdate - updatesPerPage;
  const currentUpdates = filteredUpdates.slice(
    indexOfFirstUpdate,
    indexOfLastUpdate
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="bg-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Recent Updates
          </h2>
          <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto">
            Discover the latest enhancements to KamusKenyah, keeping the app
            fresh and valuable for all users.
          </p>
        </motion.div>

        {/* Filter Bar */}
        <div className="mb-12 flex flex-wrap justify-center gap-3">
          {filterOptions.map((filter) => (
            <button
              key={filter.label}
              onClick={() => handleFilterClick(filter.label)}
              className={classNames(
                "px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2",
                activeFilters.includes(filter.label)
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              )}
            >
              {filter.icon}
              {filter.label}
            </button>
          ))}
        </div>

        {/* Timeline */}
        {loading ? (
          <div className="text-center py-12">Loading updates...</div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="relative"
          >
            {/* Vertical Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gray-200 h-full hidden md:block" />

            {currentUpdates.map((update, index) => (
              <motion.div
                key={update.id}
                variants={itemVariants}
                className={classNames(
                  "mb-12 relative flex flex-col md:flex-row items-center",
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                )}
              >
                {/* Timeline Dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full z-10 hidden md:block" />

                {/* Update Card */}
                <div
                  className={classNames(
                    "w-full md:w-5/12 p-6 bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 relative",
                    index % 2 === 0 ? "md:ml-8" : "md:mr-8"
                  )}
                >
                  {/* Update Icon */}
                  {update.icon && (
                    <div className="absolute -top-4 -right-4 p-3 bg-white border border-gray-200 rounded-full shadow-sm">
                      {update.icon}
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span
                        className={classNames(
                          "text-sm font-semibold px-2 py-1 rounded-full",
                          update.isMajor
                            ? "bg-blue-100 text-blue-600"
                            : "bg-gray-100 text-gray-600"
                        )}
                      >
                        {update.version}
                      </span>
                      {update.isMajor && (
                        <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      )}
                    </div>
                    <button
                      onClick={() => handleToggle(update.id)}
                      className="p-1 text-gray-500 hover:text-blue-600 transition-colors"
                    >
                      {expandedId === update.id ? (
                        <ChevronUp className="h-5 w-5" />
                      ) : (
                        <ChevronDown className="h-5 w-5" />
                      )}
                    </button>
                  </div>

                  <h3 className="mt-3 text-xl font-semibold text-gray-900">
                    {update.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                    <Clock className="h-4 w-4" />
                    <span>{update.date}</span>
                  </div>
                  <p className="mt-2 text-gray-600">{update.description}</p>

                  {/* Progress Bar for In-Progress Updates */}
                  {update.progress && (
                    <div className="mt-4">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${update.progress}%` }}
                        ></div>
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        {update.progress}% Complete
                      </div>
                    </div>
                  )}

                  {/* Expandable Details */}
                  <AnimatePresence>
                    {expandedId === update.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4"
                      >
                        {update.imageUrl && (
                          <div className="mb-4 rounded-lg overflow-hidden">
                            <img
                              src={update.imageUrl}
                              alt={update.title}
                              className="w-full h-48 object-cover"
                            />
                          </div>
                        )}
                        <h4 className="text-sm font-medium text-gray-900 mb-2">
                          What’s New:
                        </h4>
                        <ul className="space-y-2">
                          {update.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2" />
                              <span className="text-gray-700">{feature}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {update.tags.map((tag) => (
                            <span
                              key={tag}
                              className="flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                            >
                              <Tag className="h-3 w-3" />
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Rating and Comments Section */}
                        {update.rating && (
                          <div className="mt-6">
                            <h4 className="text-sm font-medium text-gray-900 mb-2">
                              User Rating:
                            </h4>
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < Math.floor(update.rating!)
                                      ? "text-yellow-400 fill-yellow-400"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                              <span className="text-sm text-gray-600 ml-2">
                                {update.rating.toFixed(1)}/5
                              </span>
                            </div>
                          </div>
                        )}

                        {update.comments && update.comments.length > 0 && (
                          <div className="mt-6">
                            <h4 className="text-sm font-medium text-gray-900 mb-2">
                              User Feedback:
                            </h4>
                            <div className="space-y-4">
                              {update.comments.map((comment, idx) => (
                                <div
                                  key={idx}
                                  className="flex items-start gap-3"
                                >
                                  <div className="flex-shrink-0">
                                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                      <span className="text-sm font-medium text-blue-600">
                                        {comment.user[0]}
                                      </span>
                                    </div>
                                  </div>
                                  <div>
                                    <div className="text-sm font-medium text-gray-900">
                                      {comment.user}
                                    </div>
                                    <p className="text-sm text-gray-600">
                                      {comment.comment}
                                    </p>
                                    <div className="text-xs text-gray-500 mt-1">
                                      {comment.date}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Feedback section */}
                        <div className="mt-4 flex items-center gap-2">
                          <button className="flex items-center text-green-600">
                            <ThumbsUp className="h-5 w-5" />
                            <span className="ml-1">Helpful</span>
                          </button>
                          <button className="flex items-center text-red-600">
                            <ThumbsDown className="h-5 w-5" />
                            <span className="ml-1">Not Helpful</span>
                          </button>
                          <MessageCircle
                            className="h-5 w-5 text-gray-600 ml-5 cursor-pointer"
                            title="Comment"
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Pagination */}
        <div className="mt-12 flex justify-center">
          {Array.from(
            { length: Math.ceil(filteredUpdates.length / updatesPerPage) },
            (_, i) => (
              <button
                key={i + 1}
                onClick={() => paginate(i + 1)}
                className={classNames(
                  "px-4 py-2 mx-1 rounded-lg text-sm font-medium transition-colors",
                  currentPage === i + 1
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                )}
              >
                {i + 1}
              </button>
            )
          )}
        </div>

        {/* Summary Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            {
              label: "Total Updates",
              value: updates.length,
              icon: <Star className="h-6 w-6" />,
              color: "text-blue-600",
            },
            {
              label: "Major Releases",
              value: updates.filter((u) => u.isMajor).length,
              icon: <Zap className="h-6 w-6" />,
              color: "text-purple-600",
            },
            {
              label: "New Features",
              value: updates.reduce((acc, u) => acc + u.features.length, 0),
              icon: <Tag className="h-6 w-6" />,
              color: "text-green-600",
            },
            {
              label: "Active Users",
              value: "10K+",
              icon: <Users className="h-6 w-6" />,
              color: "text-yellow-600",
            },
          ].map((stat, index) => (
            <div
              key={index}
              className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className={`${stat.color} mb-3`}>{stat.icon}</div>
              <div className="text-2xl font-bold text-gray-900">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Dapatkan Update Terbaru!
              <Rocket className="inline h-6 w-6 ml-2" />
            </h3>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              Jangan lewatkan fitur baru dan perbaikan yang akan meningkatkan
              pengalaman Anda. Ajak teman Anda untuk bergabung sekarang!
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-8 py-3 bg-white text-blue-600 rounded-lg font-medium hover:shadow-lg transition-all duration-300"
            >
              Bergabung Sekarang
              <Gift className="w-5 h-5 ml-2" />
            </motion.button>
            <p className="text-blue-100 text-sm mt-4">
              Syarat dan ketentuan berlaku
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default RecentUpdates;
