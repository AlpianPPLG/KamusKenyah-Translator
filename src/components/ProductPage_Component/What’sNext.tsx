import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  ArrowRight,
  Clock,
  Check,
  Sparkles,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Package,
  Construction,
  Filter,
  X,
  Search,
  LifeBuoy,
  Laptop,
  Smartphone,
  Gamepad,
  Bookmark,
} from "lucide-react";

type FeatureStatus = "in_progress" | "coming_soon" | "done";

interface Feature {
  id: string;
  title: string;
  description: string;
  status: FeatureStatus;
  estimatedRelease?: string;
  complexity: 1 | 2 | 3;
  category: "mobile" | "web" | "desktop" | "game" | "api";
  likes: number;
  liked?: boolean;
  tags: string[];
}

const featuresData: Feature[] = [
  {
    id: "voice-recognition",
    title: "Enhanced Voice Recognition",
    description: "Improved voice recognition system with Dayak Kenyah language support for better accuracy and dialect detection.",
    status: "in_progress",
    estimatedRelease: "Q3 2024",
    complexity: 3,
    category: "mobile",
    likes: 241,
    tags: ["AI", "Mobile", "Voice"]
  },
  {
    id: "offline-mode",
    title: "Full Offline Dictionary",
    description: "Access the complete dictionary without internet connection. Download language packs for offline use.",
    status: "in_progress",
    estimatedRelease: "Q2 2024",
    complexity: 2,
    category: "mobile",
    likes: 189,
    tags: ["Offline", "Mobile", "Performance"]
  },
  {
    id: "cultural-context",
    title: "Cultural Context Explanations",
    description: "Learn the cultural significance behind phrases and words with detailed explanations from native speakers.",
    status: "coming_soon",
    estimatedRelease: "Q4 2024",
    complexity: 2,
    category: "web",
    likes: 156,
    tags: ["Culture", "Educational", "Context"]
  },
  {
    id: "ai-conversation",
    title: "AI Conversation Practice",
    description: "Practice Dayak Kenyah language with our AI assistant that simulates natural conversation flow.",
    status: "coming_soon",
    estimatedRelease: "Q1 2025",
    complexity: 3,
    category: "web",
    likes: 312,
    tags: ["AI", "Learning", "Interactive"]
  },
  {
    id: "dialect-variations",
    title: "Dialect Variations Support",
    description: "Explore different dialects within Dayak Kenyah language with audio samples and regional usage notes.",
    status: "coming_soon",
    estimatedRelease: "Q3 2024",
    complexity: 2,
    category: "web",
    likes: 98,
    tags: ["Dialect", "Audio", "Regional"]
  },
  {
    id: "gesture-control",
    title: "Camera Gesture Controls",
    description: "Use hand gestures to navigate the app and control translation features with your device's camera.",
    status: "coming_soon",
    estimatedRelease: "Q2 2025",
    complexity: 3,
    category: "mobile",
    likes: 76,
    tags: ["Innovation", "Accessibility", "Mobile"]
  },
  {
    id: "dark-mode",
    title: "Dark Mode & Themes",
    description: "Personalize your experience with dark mode and custom theme options for comfortable use day and night.",
    status: "done",
    complexity: 1,
    category: "web",
    likes: 203,
    tags: ["UI/UX", "Accessibility", "Customization"]
  },
  {
    id: "image-translation",
    title: "Image Translation",
    description: "Instantly translate text from images and photos with our advanced image recognition technology.",
    status: "done",
    complexity: 2,
    category: "mobile",
    likes: 287,
    tags: ["AI", "Camera", "OCR"]
  },
  {
    id: "desktop-app",
    title: "Desktop Application",
    description: "Native desktop application for Windows, macOS, and Linux with enhanced performance and features.",
    status: "in_progress",
    estimatedRelease: "Q3 2024",
    complexity: 2,
    category: "desktop",
    likes: 164,
    tags: ["Desktop", "Performance", "Cross-platform"]
  },
  {
    id: "game-integration",
    title: "Language Learning Games",
    description: "Fun and interactive games to practice Dayak Kenyah vocabulary, grammar, and pronunciation.",
    status: "coming_soon",
    estimatedRelease: "Q4 2024",
    complexity: 2,
    category: "game",
    likes: 218,
    tags: ["Game", "Interactive", "Learning"]
  },
  {
    id: "api-access",
    title: "Developer API Access",
    description: "Public API for developers to integrate Dayak Kenyah translation features into their applications.",
    status: "in_progress",
    estimatedRelease: "Q2 2024",
    complexity: 3,
    category: "api",
    likes: 129,
    tags: ["API", "Developer", "Integration"]
  },
  {
    id: "sentence-generation",
    title: "Sentence Generation",
    description: "AI-powered tool to generate example sentences using selected words to improve language learning.",
    status: "done",
    complexity: 2,
    category: "web",
    likes: 176,
    tags: ["AI", "Learning", "Examples"]
  }
];

const getStatusIcon = (status: FeatureStatus) => {
  switch (status) {
    case "in_progress":
      return <Construction className="w-5 h-5 text-amber-500" />;
    case "coming_soon":
      return <Package className="w-5 h-5 text-blue-500" />;
    case "done":
      return <Check className="w-5 h-5 text-green-500" />;
  }
};

const getStatusText = (status: FeatureStatus) => {
  switch (status) {
    case "in_progress":
      return "In Progress";
    case "coming_soon":
      return "Coming Soon";
    case "done":
      return "Completed";
  }
};

const getStatusColor = (status: FeatureStatus) => {
  switch (status) {
    case "in_progress":
      return "bg-amber-50 text-amber-700 border-amber-200";
    case "coming_soon":
      return "bg-blue-50 text-blue-700 border-blue-200";
    case "done":
      return "bg-green-50 text-green-700 border-green-200";
  }
};

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "mobile":
      return <Smartphone className="w-4 h-4" />;
    case "web":
      return <Laptop className="w-4 h-4" />;
    case "desktop":
      return <Laptop className="w-4 h-4" />;
    case "game":
      return <Gamepad className="w-4 h-4" />;
    case "api":
      return <LifeBuoy className="w-4 h-4" />;
    default:
      return <Laptop className="w-4 h-4" />;
  }
};

const WhatsNext: React.FC = () => {
  const [features, setFeatures] = useState<Feature[]>(featuresData);
  const [visibleFeatures, setVisibleFeatures] = useState<Feature[]>(featuresData);
  const [filterStatus, setFilterStatus] = useState<FeatureStatus | "all">("all");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("default");
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedFeature, setExpandedFeature] = useState<string | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [showVoteAnimation, setShowVoteAnimation] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"list" | "timeline" | "roadmap">("list");
  
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Apply filters and search
  useEffect(() => {
    let result = [...features];
    
    // Filter by status
    if (filterStatus !== "all") {
      result = result.filter(feature => feature.status === filterStatus);
    }
    
    // Filter by category
    if (filterCategory !== "all") {
      result = result.filter(feature => feature.category === filterCategory);
    }
    
    // Apply search
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      result = result.filter(
        feature => 
          feature.title.toLowerCase().includes(searchLower) || 
          feature.description.toLowerCase().includes(searchLower) ||
          feature.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }
    
    // Apply sorting
    switch (sortBy) {
      case "likes":
        result.sort((a, b) => b.likes - a.likes);
        break;
      case "complexity":
        result.sort((a, b) => a.complexity - b.complexity);
        break;
      case "upcoming":
        // Sort by status priority (coming_soon first, then in_progress, then done)
        result.sort((a, b) => {
          const statusOrder = { coming_soon: 0, in_progress: 1, done: 2 };
          return statusOrder[a.status] - statusOrder[b.status];
        });
        break;
      default:
        // Default sorting is already applied
        break;
    }
    
    setVisibleFeatures(result);
  }, [features, filterStatus, filterCategory, searchTerm, sortBy]);

  const handleLike = (id: string) => {
    setFeatures(prev => 
      prev.map(feature => 
        feature.id === id 
          ? { 
              ...feature, 
              likes: feature.liked ? feature.likes - 1 : feature.likes + 1,
              liked: !feature.liked 
            } 
          : feature
      )
    );
    
    // Show animation
    setShowVoteAnimation(id);
    setTimeout(() => setShowVoteAnimation(null), 1000);
  };

  const handleToggleExpand = (id: string) => {
    setExpandedFeature(prev => prev === id ? null : id);
  };

  const toggleFilter = () => {
    setIsFilterOpen(prev => !prev);
  };

  const clearFilters = () => {
    setFilterStatus("all");
    setFilterCategory("all");
    setSortBy("default");
    setSearchTerm("");
    if (searchInputRef.current) {
      searchInputRef.current.value = "";
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInputRef.current) {
      setSearchTerm(searchInputRef.current.value);
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 text-blue-600 mb-4"
          >
            <Calendar className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">Feature Roadmap</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-6"
          >
            What's{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Coming Next
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto mb-8"
          >
            Discover the exciting features we're working on to make your Dayak Kenyah 
            language experience even better
          </motion.p>

          {/* View Tabs */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="inline-flex p-1 bg-gray-100 rounded-lg mb-6"
          >
            {[
              { id: "list", label: "List View" },
              { id: "timeline", label: "Timeline" },
              { id: "roadmap", label: "Roadmap" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as "list" | "timeline" | "roadmap")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <form 
              onSubmit={handleSearch}
              className="relative flex-1 max-w-md"
            >
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search features..."
                className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button type="submit" className="absolute left-3 top-1/2 -translate-y-1/2">
                <Search className="w-4 h-4 text-gray-400" />
              </button>
            </form>
            <div className="flex items-center gap-2">
              <button
                onClick={toggleFilter}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Filter className="w-4 h-4" />
                <span>Filter</span>
                {isFilterOpen ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="default">Sort by: Default</option>
                <option value="likes">Most Voted</option>
                <option value="complexity">Complexity</option>
                <option value="upcoming">Upcoming First</option>
              </select>
            </div>
          </div>

          {/* Filter Panel */}
          <AnimatePresence>
            {isFilterOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200"
              >
                <div className="flex flex-wrap gap-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Status</h4>
                    <div className="flex flex-wrap gap-2">
                      {["all", "in_progress", "coming_soon", "done"].map((status) => (
                        <button
                          key={status}
                          onClick={() => setFilterStatus(status as "all" | FeatureStatus)}
                          className={`px-3 py-1 text-xs rounded-full border ${
                            filterStatus === status
                              ? status === "all"
                                ? "bg-gray-800 text-white border-gray-800"
                                : status === "in_progress"
                                ? "bg-amber-500 text-white border-amber-500"
                                : status === "coming_soon"
                                ? "bg-blue-500 text-white border-blue-500"
                                : "bg-green-500 text-white border-green-500"
                              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                          }`}
                        >
                          {status === "all" ? "All" : getStatusText(status as FeatureStatus)}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Category</h4>
                    <div className="flex flex-wrap gap-2">
                      {["all", "mobile", "web", "desktop", "game", "api"].map((category) => (
                        <button
                          key={category}
                          onClick={() => setFilterCategory(category)}
                          className={`px-3 py-1 text-xs rounded-full border ${
                            filterCategory === category
                              ? "bg-gray-800 text-white border-gray-800"
                              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                          } flex items-center gap-1`}
                        >
                          {category !== "all" && getCategoryIcon(category)}
                          <span>
                            {category === "all" ? "All" : 
                             category.charAt(0).toUpperCase() + category.slice(1)}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end mt-4">
                  <button
                    onClick={clearFilters}
                    className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm"
                  >
                    <X className="w-4 h-4" />
                    <span>Clear filters</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {activeTab === "list" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleFeatures.length > 0 ? (
              visibleFeatures.map((feature) => (
                <motion.div
                  key={feature.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className={`bg-white rounded-xl border-2 ${
                    feature.status === "in_progress" ? "border-amber-200" : 
                    feature.status === "coming_soon" ? "border-blue-200" : 
                    "border-green-200"
                  } overflow-hidden hover:shadow-md transition-shadow duration-300`}
                >
                  <div className="p-6">
                    {/* Feature Header */}
                    <div className="flex justify-between items-start mb-4">
                      <div 
                        className={`px-3 py-1 text-xs font-medium rounded-full flex items-center gap-1.5 ${
                          getStatusColor(feature.status)
                        }`}
                      >
                        {getStatusIcon(feature.status)}
                        {getStatusText(feature.status)}
                      </div>
                      
                      <button 
                        onClick={() => handleLike(feature.id)}
                        className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
                          feature.liked 
                            ? "bg-blue-50 text-blue-600"
                            : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                        } transition-colors relative`}
                      >
                        <Bookmark className={`w-3.5 h-3.5 ${feature.liked ? "fill-blue-600" : ""}`} />
                        <span>{feature.likes}</span>
                        
                        {/* Animation on vote */}
                        <AnimatePresence>
                          {showVoteAnimation === feature.id && (
                            <motion.div
                              initial={{ opacity: 1, y: 0 }}
                              animate={{ opacity: 0, y: -20 }}
                              exit={{ opacity: 0 }}
                              className="absolute -top-2 left-1/2 -translate-x-1/2 text-blue-600 font-bold"
                            >
                              {feature.liked ? "+1" : "-1"}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </button>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {feature.title}
                    </h3>

                    {/* Feature Category */}
                    <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-3">
                      {getCategoryIcon(feature.category)}
                      <span>
                        {feature.category.charAt(0).toUpperCase() + feature.category.slice(1)}
                      </span>
                      
                      {/* Complexity indicator */}
                      <span className="mx-2">•</span>
                      <div className="flex items-center">
                        <span className="mr-1">Complexity:</span>
                        <div className="flex gap-0.5">
                          {[...Array(3)].map((_, i) => (
                            <div 
                              key={i} 
                              className={`w-2 h-2 rounded-full ${
                                i < feature.complexity ? "bg-blue-500" : "bg-gray-200"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-4">
                      {expandedFeature === feature.id 
                        ? feature.description
                        : feature.description.length > 100 
                          ? `${feature.description.substring(0, 100)}...`
                          : feature.description
                      }
                    </p>
                    
                    {feature.description.length > 100 && (
                      <button
                        onClick={() => handleToggleExpand(feature.id)}
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center"
                      >
                        {expandedFeature === feature.id ? (
                          <>
                            <span>Show less</span>
                            <ChevronUp className="w-4 h-4 ml-1" />
                          </>
                        ) : (
                          <>
                            <span>Read more</span>
                            <ChevronDown className="w-4 h-4 ml-1" />
                          </>
                        )}
                      </button>
                    )}
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mt-4">
                      {feature.tags.map(tag => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded-md text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Feature Footer */}
                  {feature.estimatedRelease && (
                    <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span>Expected: {feature.estimatedRelease}</span>
                      </div>
                      
                      <button className="text-blue-600 hover:text-blue-700 flex items-center text-sm font-medium">
                        <span>Learn more</span>
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </button>
                    </div>
                  )}
                </motion.div>
              ))
            ) : (
              <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-16">
                <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No features found</h3>
                <p className="text-gray-500 mb-6">Try changing your search or filters</p>
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === "timeline" && (
          <div className="relative mx-auto max-w-4xl pb-12">
            {/* Timeline line */}
            <div className="absolute left-5 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 -ml-px" />
            
            {visibleFeatures.length > 0 ? (
              visibleFeatures
                .sort((a, b) => {
                  const dateA = a.estimatedRelease ? new Date(a.estimatedRelease.replace("Q", " ")) : new Date();
                  const dateB = b.estimatedRelease ? new Date(b.estimatedRelease.replace("Q", " ")) : new Date();
                  return dateA.getTime() - dateB.getTime();
                })
                .map((feature, index) => (
                  <motion.div
                    key={feature.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * index }}
                    className={`relative mb-12 md:clear-both ${
                      index % 2 === 0 ? "md:float-left md:pr-10 md:w-1/2" : "md:float-right md:pl-10 md:w-1/2"
                    }`}
                  >
                    {/* Timeline dot */}
                    <div 
                      className={`absolute left-5 md:left-auto ${
                        index % 2 === 0 ? "md:right-0 md:mr-[calc(-0.5rem-1px)]" : "md:left-0 md:ml-[calc(-0.5rem-1px)]"
                      } w-4 h-4 rounded-full border-4 border-white z-10 ${
                        feature.status === "in_progress" ? "bg-amber-500" : 
                        feature.status === "coming_soon" ? "bg-blue-500" : 
                        "bg-green-500"
                      }`}
                      style={{ top: "1.25rem" }}
                    />
                    
                    {/* Content card */}
                    <div className={`ml-12 md:ml-0 bg-white rounded-lg border ${
                      feature.status === "in_progress" ? "border-amber-200" : 
                      feature.status === "coming_soon" ? "border-blue-200" : 
                      "border-green-200"
                    } p-4 hover:shadow-md transition-shadow`}>
                      {/* Timeline date/quarter */}
                      <div className="text-sm font-semibold text-gray-500 mb-2">
                        {feature.estimatedRelease || "Completed"}
                      </div>
                      
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
                        {feature.title}
                        <span 
                          className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                            getStatusColor(feature.status)
                          }`}
                        >
                          {getStatusText(feature.status)}
                        </span>
                      </h3>
                      
                      <p className="text-gray-600 text-sm mb-3">
                        {feature.description.length > 80 
                          ? `${feature.description.substring(0, 80)}...`
                          : feature.description
                        }
                      </p>
                      
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-1.5 text-xs text-gray-500">
                          {getCategoryIcon(feature.category)}
                          <span>
                            {feature.category.charAt(0).toUpperCase() + feature.category.slice(1)}
                          </span>
                        </div>
                        
                        <button 
                          onClick={() => handleLike(feature.id)}
                          className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
                            feature.liked 
                              ? "bg-blue-50 text-blue-600"
                              : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                          }`}
                        >
                          <Bookmark className={`w-3.5 h-3.5 ${feature.liked ? "fill-blue-600" : ""}`} />
                          <span>{feature.likes}</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
            ) : (
              <div className="text-center py-16">
                <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No timeline data available</h3>
                <p className="text-gray-500 mb-6">Try changing your search or filters</p>
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Clear all filters
                </button>
              </div>
            )}
            <div className="clear-both"></div>
          </div>
        )}

        {activeTab === "roadmap" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {["in_progress", "coming_soon", "done"].map((status) => {
              const statusFeatures = visibleFeatures.filter(f => f.status === status);
              
              return (
                <motion.div
                  key={status}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="bg-white rounded-xl border overflow-hidden"
                >
                  <div 
                    className={`p-4 ${
                      status === "in_progress" ? "bg-amber-50 border-b border-amber-200" : 
                      status === "coming_soon" ? "bg-blue-50 border-b border-blue-200" : 
                      "bg-green-50 border-b border-green-200"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(status as FeatureStatus)}
                        <h3 className="font-semibold text-gray-900">
                          {getStatusText(status as FeatureStatus)}
                        </h3>
                      </div>
                      <div className="bg-white rounded-full px-2 py-0.5 text-xs font-medium text-gray-600">
                        {statusFeatures.length} features
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 max-h-[500px] overflow-y-auto">
                    {statusFeatures.length > 0 ? (
                      <div className="space-y-4">
                        {statusFeatures.map((feature) => (
                          <div
                            key={feature.id}
                            className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                          >
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-medium text-gray-900">{feature.title}</h4>
                              <button 
                                onClick={() => handleLike(feature.id)}
                                className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs ${
                                  feature.liked 
                                    ? "bg-blue-50 text-blue-600"
                                    : "bg-white text-gray-600"
                                }`}
                              >
                                <Bookmark className={`w-3.5 h-3.5 ${feature.liked ? "fill-blue-600" : ""}`} />
                                <span>{feature.likes}</span>
                              </button>
                            </div>
                            
                            <p className="text-sm text-gray-600 mb-2">
                              {feature.description.length > 100 
                                ? `${feature.description.substring(0, 100)}...`
                                : feature.description
                              }
                            </p>
                            
                            <div className="flex flex-wrap justify-between items-center">
                              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                {getCategoryIcon(feature.category)}
                                <span>
                                  {feature.category.charAt(0).toUpperCase() + feature.category.slice(1)}
                                </span>
                              </div>
                              
                              {feature.estimatedRelease && (
                                <div className="text-xs text-gray-500 flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  <span>{feature.estimatedRelease}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        No {getStatusText(status as FeatureStatus).toLowerCase()} features match your filters
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Vote CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Got a Feature Request?
            </h3>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              We're always looking to improve. Let us know what features you'd like to see next
              in our Dayak Kenyah language platform.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-8 py-3 bg-white text-blue-600 rounded-lg font-medium hover:shadow-lg transition-all duration-300"
            >
              Submit Your Idea
              <Sparkles className="w-5 h-5 ml-2" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhatsNext;
