// src/components/ProductPage_Component/RecentUpdates.tsx
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp, Star, Clock, Tag } from "lucide-react";

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
}

const updatesData: Update[] = [
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
  },
];

// Filter options
const filterOptions = [
  "All",
  "Major Updates",
  "Minor Updates",
  "Features",
  "Bug Fix",
];

const RecentUpdates: React.FC = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const handleToggle = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const filteredUpdates = updatesData.filter((update) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Major Updates") return update.isMajor;
    if (activeFilter === "Minor Updates") return !update.isMajor;
    return update.tags.includes(activeFilter);
  });

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
    <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
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
        <div className="mb-10 flex flex-wrap justify-center gap-3">
          {filterOptions.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={classNames(
                "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                activeFilter === filter
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              )}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Timeline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative"
        >
          {/* Vertical Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gray-200 h-full hidden md:block" />

          {filteredUpdates.map((update, index) => (
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
                  "w-full md:w-5/12 p-6 bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300",
                  index % 2 === 0 ? "md:ml-8" : "md:mr-8"
                )}
              >
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

                {/* Expandable Details */}
                {expandedId === update.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4"
                  >
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
                  </motion.div>
                )}
              </div>

              {/* Timeline Date (Mobile Only) */}
              <div className="md:hidden mt-2 text-sm text-gray-500 text-center">
                {update.date}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Summary Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
        >
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-900">
              {updatesData.length}
            </div>
            <div className="text-sm text-gray-600">Total Updates</div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-900">
              {updatesData.filter((u) => u.isMajor).length}
            </div>
            <div className="text-sm text-gray-600">Major Releases</div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-900">
              {updatesData.reduce((acc, u) => acc + u.features.length, 0)}
            </div>
            <div className="text-sm text-gray-600">New Features</div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-900">100%</div>
            <div className="text-sm text-gray-600">User Focused</div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-lg text-gray-600 mb-4">
            Want to see more? Check out our full changelog.
          </p>
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
            View Full Changelog
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default RecentUpdates;
