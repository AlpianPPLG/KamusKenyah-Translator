"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Clock,
  Star,
  Trash2,
  RefreshCw,
  Search,
  Filter,
  SortAsc,
  SortDesc,
} from "lucide-react";
import type { Translation } from "../../hooks/useHistoryModal";

interface HistoryModalPopUpProps {
  isOpen: boolean;
  onClose: () => void;
  translations: Translation[];
  onDelete: (id: number) => void;
  onReuse: (translation: Translation) => void;
  onClearAll: () => void;
  onFavorite: (id: number) => void;
  favoritedTranslations: number[];
}

const HistoryModalPopUp: React.FC<HistoryModalPopUpProps> = ({
  isOpen,
  onClose,
  translations,
  onDelete,
  onReuse,
  onClearAll,
  onFavorite,
  favoritedTranslations,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "az" | "za">(
    "newest"
  );
  const [filterBy, setFilterBy] = useState<
    "all" | "favorites" | "indonesian" | "kenyah"
  >("all");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);
  const sortRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        setIsFilterOpen(false);
      }
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setIsSortOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscKey);
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [isOpen, onClose]);

  // Filter and sort translations
  const filteredTranslations = translations.filter((translation) => {
    // Apply search filter
    const matchesSearch =
      searchQuery === "" ||
      translation.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
      translation.translatedText
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

    // Apply category filter
    let matchesFilter = true;
    if (filterBy === "favorites") {
      matchesFilter = favoritedTranslations.includes(translation.id);
    } else if (filterBy === "indonesian") {
      matchesFilter = translation.from === "Indonesia";
    } else if (filterBy === "kenyah") {
      matchesFilter = translation.from === "Dayak Kenyah";
    }

    return matchesSearch && matchesFilter;
  });

  // Sort filtered translations
  const sortedTranslations = [...filteredTranslations].sort((a, b) => {
    if (sortBy === "newest") {
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    } else if (sortBy === "oldest") {
      return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
    } else if (sortBy === "az") {
      return a.text.localeCompare(b.text);
    } else {
      return b.text.localeCompare(a.text);
    }
  });

  // Animation variants
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", damping: 25, stiffness: 300 },
    },
    exit: { opacity: 0, y: 50, scale: 0.95, transition: { duration: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.05, duration: 0.3 },
    }),
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={onClose}
        >
          <motion.div
            ref={modalRef}
            className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="Close modal"
                >
                  <ArrowLeft className="h-5 w-5 text-gray-600" />
                </button>
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <h2 className="text-xl font-semibold text-gray-900">
                    Translation History
                  </h2>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={onClearAll}
                  className="text-sm text-red-600 hover:text-red-700 px-3 py-1 rounded-md hover:bg-red-50 transition-colors flex items-center space-x-1"
                  disabled={translations.length === 0}
                >
                  <Trash2 className="h-4 w-4" />
                  <span>Clear All</span>
                </button>
              </div>
            </div>

            {/* Search and filters */}
            <div className="p-4 border-b border-gray-200 bg-gray-50">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-grow">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search translations..."
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <div className="flex space-x-2">
                  {/* Filter dropdown */}
                  <div ref={filterRef} className="relative">
                    <button
                      className="flex items-center space-x-1 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm"
                      onClick={() => setIsFilterOpen(!isFilterOpen)}
                    >
                      <Filter className="h-4 w-4 text-gray-500" />
                      <span>
                        {filterBy === "all"
                          ? "All"
                          : filterBy === "favorites"
                          ? "Favorites"
                          : filterBy === "indonesian"
                          ? "Indonesian"
                          : "Kenyah"}
                      </span>
                    </button>

                    {isFilterOpen && (
                      <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                        <div className="py-1">
                          {[
                            { value: "all", label: "All Translations" },
                            { value: "favorites", label: "Favorites" },
                            { value: "indonesian", label: "From Indonesian" },
                            { value: "kenyah", label: "From Kenyah" },
                          ].map((option) => (
                            <button
                              key={option.value}
                              className={`block w-full text-left px-4 py-2 text-sm ${
                                filterBy === option.value
                                  ? "bg-blue-50 text-blue-700 font-medium"
                                  : "text-gray-700 hover:bg-gray-50"
                              }`}
                              onClick={() => {
                                setFilterBy(
                                  option.value as
                                    | "all"
                                    | "favorites"
                                    | "indonesian"
                                    | "kenyah"
                                );
                                setIsFilterOpen(false);
                              }}
                            >
                              {option.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Sort dropdown */}
                  <div ref={sortRef} className="relative">
                    <button
                      className="flex items-center space-x-1 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm"
                      onClick={() => setIsSortOpen(!isSortOpen)}
                    >
                      {sortBy === "newest" || sortBy === "oldest" ? (
                        sortBy === "newest" ? (
                          <SortDesc className="h-4 w-4 text-gray-500" />
                        ) : (
                          <SortAsc className="h-4 w-4 text-gray-500" />
                        )
                      ) : sortBy === "az" ? (
                        <SortAsc className="h-4 w-4 text-gray-500" />
                      ) : (
                        <SortDesc className="h-4 w-4 text-gray-500" />
                      )}
                      <span>
                        {sortBy === "newest"
                          ? "Newest"
                          : sortBy === "oldest"
                          ? "Oldest"
                          : sortBy === "az"
                          ? "A-Z"
                          : "Z-A"}
                      </span>
                    </button>

                    {isSortOpen && (
                      <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                        <div className="py-1">
                          {[
                            {
                              value: "newest",
                              label: "Newest First",
                              icon: <SortDesc className="h-4 w-4" />,
                            },
                            {
                              value: "oldest",
                              label: "Oldest First",
                              icon: <SortAsc className="h-4 w-4" />,
                            },
                            {
                              value: "az",
                              label: "A to Z",
                              icon: <SortAsc className="h-4 w-4" />,
                            },
                            {
                              value: "za",
                              label: "Z to A",
                              icon: <SortDesc className="h-4 w-4" />,
                            },
                          ].map((option) => (
                            <button
                              key={option.value}
                              className={`flex items-center w-full text-left px-4 py-2 text-sm ${
                                sortBy === option.value
                                  ? "bg-blue-50 text-blue-700 font-medium"
                                  : "text-gray-700 hover:bg-gray-50"
                              }`}
                              onClick={() => {
                                setSortBy(
                                  option.value as
                                    | "newest"
                                    | "oldest"
                                    | "az"
                                    | "za"
                                );
                                setIsSortOpen(false);
                              }}
                            >
                              <span className="mr-2">{option.icon}</span>
                              {option.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* History list */}
            <div className="flex-grow overflow-y-auto p-4">
              {sortedTranslations.length > 0 ? (
                <div className="space-y-4">
                  {sortedTranslations.map((translation, index) => (
                    <motion.div
                      key={translation.id}
                      custom={index}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                    >
                      <div className="bg-gray-50 px-4 py-2 flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Clock className="h-4 w-4" />
                          <span>
                            {new Date(
                              translation.timestamp
                            ).toLocaleDateString()}{" "}
                            {" • "}
                            {new Date(
                              translation.timestamp
                            ).toLocaleTimeString()}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700">
                            {translation.from} → {translation.to}
                          </span>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-xs text-gray-500 mb-1">
                              {translation.from}
                            </p>
                            <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded min-h-[60px]">
                              {translation.text}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 mb-1">
                              {translation.to}
                            </p>
                            <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded min-h-[60px]">
                              {translation.translatedText}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="px-4 py-2 border-t border-gray-200 flex items-center justify-between">
                        <button
                          onClick={() => onFavorite(translation.id)}
                          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                          aria-label="Favorite translation"
                        >
                          <Star
                            className={`h-4 w-4 ${
                              favoritedTranslations.includes(translation.id)
                                ? "text-yellow-400 fill-yellow-400"
                                : "text-gray-400"
                            }`}
                          />
                        </button>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => onReuse(translation)}
                            className="flex items-center space-x-1 px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                          >
                            <RefreshCw className="h-4 w-4" />
                            <span>Reuse</span>
                          </button>
                          <button
                            onClick={() => onDelete(translation.id)}
                            className="flex items-center space-x-1 px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                            <span>Delete</span>
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                  <div className="bg-gray-100 p-4 rounded-full mb-4">
                    <Clock className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">
                    No translations found
                  </h3>
                  <p className="text-gray-600 max-w-md">
                    {translations.length === 0
                      ? "Your translation history will appear here."
                      : "No translations match your current filters."}
                  </p>
                  {translations.length > 0 && searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="mt-4 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100"
                    >
                      Clear search
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Footer with stats */}
            <div className="p-4 border-t border-gray-200 bg-gray-50 text-sm text-gray-600">
              <div className="flex justify-between items-center">
                <span>
                  Showing {sortedTranslations.length} of {translations.length}{" "}
                  translations
                </span>
                {favoritedTranslations.length > 0 && (
                  <span>
                    {favoritedTranslations.length} favorite
                    {favoritedTranslations.length !== 1 ? "s" : ""}
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default HistoryModalPopUp;
