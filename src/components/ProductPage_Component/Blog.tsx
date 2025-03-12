import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  Eye,
  Filter,
  Heart,
  MessageCircle,
  Search,
  Share2,
  Tag,
  Bookmark,
  X,
  ArrowRight,
  AlertCircle,
  ThumbsUp,
  User,
  Layout,
  List,
  SlidersHorizontal,
} from "lucide-react";

// Types
interface Author {
  name: string;
  avatar: string;
  role: string;
}

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  date: string;
  readTime: string;
  author: Author;
  tags: string[];
  category: string;
  views: number;
  likes: number;
  comments: number;
  isFeatured?: boolean;
  isNew?: boolean;
}

type ViewMode = "grid" | "list";
type SortOption = "newest" | "popular" | "recommended";

// Mock Data
const authors: Author[] = [
  {
    name: "Dr. Maria Chen",
    avatar: "/lovable-uploads/6efc8361-baf3-4584-a407-13b2c34b9cdd.png",
    role: "Lead Linguist",
  },
  {
    name: "James Wilson",
    avatar: "/lovable-uploads/ad5dd1b8-ed84-4a80-9235-150f320bc60f.png",
    role: "Language Researcher",
  },
  {
    name: "Dr. Anita Patel",
    avatar: "/lovable-uploads/6efc8361-baf3-4584-a407-13b2c34b9cdd.png",
    role: "Cultural Anthropologist",
  },
  {
    name: "Michael Rodriguez",
    avatar: "/lovable-uploads/ad5dd1b8-ed84-4a80-9235-150f320bc60f.png",
    role: "Content Creator",
  },
];

const tags = [
  "Language Learning",
  "Dayak Culture",
  "Vocabulary",
  "Grammar",
  "Pronunciation",
  "History",
  "Traditions",
  "Community",
  "Tutorials",
  "Research",
];

const categories = [
  "Tutorials",
  "Research",
  "Culture",
  "News",
  "Events",
  "Stories",
];

const blogPosts: BlogPost[] = [
  {
    id: "blog-1",
    title: "The Origins of Dayak Kenyah Language: A Historical Perspective",
    excerpt:
      "Explore the rich history behind the Dayak Kenyah language and how it evolved over centuries of cultural development.",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ac tincidunt nulla. Maecenas vestibulum fermentum nunc ac facilisis...",
    coverImage: "/lovable-uploads/6efc8361-baf3-4584-a407-13b2c34b9cdd.png",
    date: "June 15, 2023",
    readTime: "8 min read",
    author: authors[0],
    tags: ["History", "Language Learning", "Research"],
    category: "Research",
    views: 1245,
    likes: 89,
    comments: 23,
    isFeatured: true,
  },
  {
    id: "blog-2",
    title: "10 Essential Dayak Kenyah Phrases Every Beginner Should Know",
    excerpt:
      "Get started with these fundamental phrases that will help you connect with Dayak Kenyah speakers.",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ac tincidunt nulla. Maecenas vestibulum fermentum nunc ac facilisis...",
    coverImage: "/lovable-uploads/ad5dd1b8-ed84-4a80-9235-150f320bc60f.png",
    date: "July 23, 2023",
    readTime: "5 min read",
    author: authors[1],
    tags: ["Vocabulary", "Pronunciation", "Tutorials"],
    category: "Tutorials",
    views: 3752,
    likes: 241,
    comments: 37,
    isNew: true,
  },
  {
    id: "blog-3",
    title: "Understanding Dayak Kenyah Grammar: A Comprehensive Guide",
    excerpt:
      "Dive deep into the grammatical structures that form the foundation of the Dayak Kenyah language.",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ac tincidunt nulla. Maecenas vestibulum fermentum nunc ac facilisis...",
    coverImage: "/lovable-uploads/6efc8361-baf3-4584-a407-13b2c34b9cdd.png",
    date: "August 5, 2023",
    readTime: "12 min read",
    author: authors[0],
    tags: ["Grammar", "Language Learning", "Research"],
    category: "Tutorials",
    views: 1872,
    likes: 156,
    comments: 42,
  },
  {
    id: "blog-4",
    title: "Celebrating Dayak Cultural Festivals: Language in Ceremonies",
    excerpt:
      "Discover how the Dayak Kenyah language plays a crucial role in traditional ceremonies and festivals.",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ac tincidunt nulla. Maecenas vestibulum fermentum nunc ac facilisis...",
    coverImage: "/lovable-uploads/ad5dd1b8-ed84-4a80-9235-150f320bc60f.png",
    date: "September 12, 2023",
    readTime: "10 min read",
    author: authors[2],
    tags: ["Traditions", "Culture", "History"],
    category: "Culture",
    views: 2341,
    likes: 198,
    comments: 31,
  },
  {
    id: "blog-5",
    title: "Technology and Language Preservation: The KamusKenyah Approach",
    excerpt:
      "Learn how digital tools are helping preserve and promote the Dayak Kenyah language for future generations.",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ac tincidunt nulla. Maecenas vestibulum fermentum nunc ac facilisis...",
    coverImage: "/lovable-uploads/6efc8361-baf3-4584-a407-13b2c34b9cdd.png",
    date: "October 8, 2023",
    readTime: "7 min read",
    author: authors[3],
    tags: ["Technology", "Language Learning", "Community"],
    category: "News",
    views: 1698,
    likes: 143,
    comments: 19,
    isFeatured: true,
  },
  {
    id: "blog-6",
    title: "Storytelling in Dayak Kenyah: Oral Traditions and Modern Practice",
    excerpt:
      "Explore the art of storytelling in Dayak Kenyah culture and how it continues to evolve in the modern world.",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ac tincidunt nulla. Maecenas vestibulum fermentum nunc ac facilisis...",
    coverImage: "/lovable-uploads/ad5dd1b8-ed84-4a80-9235-150f320bc60f.png",
    date: "November 19, 2023",
    readTime: "9 min read",
    author: authors[2],
    tags: ["Stories", "Traditions", "Culture"],
    category: "Stories",
    views: 1426,
    likes: 112,
    comments: 27,
    isNew: true,
  },
  {
    id: "blog-7",
    title: "Interview: Elder Speaks About Language Evolution Over Decades",
    excerpt:
      "A fascinating conversation with a Dayak Kenyah elder about how the language has changed throughout their lifetime.",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ac tincidunt nulla. Maecenas vestibulum fermentum nunc ac facilisis...",
    coverImage: "/lovable-uploads/6efc8361-baf3-4584-a407-13b2c34b9cdd.png",
    date: "December 3, 2023",
    readTime: "15 min read",
    author: authors[0],
    tags: ["History", "Community", "Research"],
    category: "Research",
    views: 1853,
    likes: 176,
    comments: 45,
  },
  {
    id: "blog-8",
    title: "Pronunciation Guide: Mastering Dayak Kenyah Sounds",
    excerpt:
      "A practical guide to help language learners pronounce Dayak Kenyah sounds correctly and authentically.",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ac tincidunt nulla. Maecenas vestibulum fermentum nunc ac facilisis...",
    coverImage: "/lovable-uploads/ad5dd1b8-ed84-4a80-9235-150f320bc60f.png",
    date: "January 15, 2024",
    readTime: "6 min read",
    author: authors[1],
    tags: ["Pronunciation", "Tutorials", "Language Learning"],
    category: "Tutorials",
    views: 2745,
    likes: 203,
    comments: 36,
  },
];

// Component
const Blog: React.FC = () => {
  // State
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [activePage, setActivePage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [sortOption, setSortOption] = useState<SortOption>("newest");
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const [savedPosts, setSavedPosts] = useState<string[]>([]);
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});
  const [showSubscribe, setShowSubscribe] = useState(false);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const carouselRef = useRef<HTMLDivElement>(null);
  const featuredPosts = blogPosts.filter((post) => post.isFeatured);
  const itemsPerPage = 6;

  // Effects
  useEffect(() => {
    const interval = setInterval(() => {
      if (!carouselRef.current) return;

      const nextIndex = (activeSlideIndex + 1) % featuredPosts.length;
      setActiveSlideIndex(nextIndex);

      const scrollAmount = carouselRef.current.clientWidth;
      carouselRef.current.scrollTo({
        left: nextIndex * scrollAmount,
        behavior: "smooth",
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [activeSlideIndex, featuredPosts.length]);

  // Filter and sort posts
  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      searchQuery === "" ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.name.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTags =
      selectedTags.length === 0 ||
      selectedTags.some((tag) => post.tags.includes(tag));

    const matchesCategory =
      !selectedCategory || post.category === selectedCategory;

    return matchesSearch && matchesTags && matchesCategory;
  });

  // Sort posts
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (sortOption === "newest") {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    } else if (sortOption === "popular") {
      return b.views - a.views;
    } else {
      return b.likes - a.likes;
    }
  });

  // Pagination
  const totalPages = Math.ceil(sortedPosts.length / itemsPerPage);
  const paginatedPosts = sortedPosts.slice(
    activePage * itemsPerPage,
    (activePage + 1) * itemsPerPage
  );

  // Handlers
  const handleNextSlide = () => {
    if (!carouselRef.current) return;

    const nextIndex = (activeSlideIndex + 1) % featuredPosts.length;
    setActiveSlideIndex(nextIndex);

    const scrollAmount = carouselRef.current.clientWidth;
    carouselRef.current.scrollTo({
      left: nextIndex * scrollAmount,
      behavior: "smooth",
    });
  };

  const handlePrevSlide = () => {
    if (!carouselRef.current) return;

    const nextIndex =
      (activeSlideIndex - 1 + featuredPosts.length) % featuredPosts.length;
    setActiveSlideIndex(nextIndex);

    const scrollAmount = carouselRef.current.clientWidth;
    carouselRef.current.scrollTo({
      left: nextIndex * scrollAmount,
      behavior: "smooth",
    });
  };

  const handleSelectSlide = (index: number) => {
    if (!carouselRef.current) return;

    setActiveSlideIndex(index);

    const scrollAmount = carouselRef.current.clientWidth;
    carouselRef.current.scrollTo({
      left: index * scrollAmount,
      behavior: "smooth",
    });
  };

  const handleTagSelect = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
    setActivePage(0);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory((prev) => (prev === category ? null : category));
    setActivePage(0);
  };

  const handleSortChange = (option: SortOption) => {
    setSortOption(option);
    setActivePage(0);
  };

  const handleSavePost = (postId: string) => {
    setSavedPosts((prev) =>
      prev.includes(postId)
        ? prev.filter((id) => id !== postId)
        : [...prev, postId]
    );
  };

  const handleLikePost = (postId: string) => {
    setLikedPosts((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      console.log("Subscribed with:", email);
      setSubscribed(true);
      setTimeout(() => {
        setShowSubscribe(false);
        setSubscribed(false);
        setEmail("");
      }, 3000);
    }
  };

  const handleClearFilters = () => {
    setSelectedTags([]);
    setSelectedCategory(null);
    setSearchQuery("");
    setSortOption("newest");
    setActivePage(0);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 text-blue-600 mb-4"
          >
            <BookOpen className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">Knowledge Hub</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-6"
          >
            Discover Our{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Latest Articles
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Explore in-depth resources, tutorials, and insights about Dayak
            Kenyah language and culture
          </motion.p>
        </div>

        {/* Featured Articles Carousel */}
        <div className="relative mb-20 rounded-2xl overflow-hidden shadow-xl bg-gradient-to-r from-blue-600 to-indigo-600">
          <div
            ref={carouselRef}
            className="flex overflow-x-hidden scroll-smooth snap-x snap-mandatory"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {featuredPosts.map((post) => (
              <div
                key={post.id}
                className="w-full flex-shrink-0 snap-center relative"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10" />

                <div className="md:flex">
                  <div className="md:w-1/2 overflow-hidden h-full">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-60 md:h-[400px] object-cover object-center transform transition-transform duration-500 hover:scale-110"
                    />
                  </div>

                  <div className="md:w-1/2 p-8 md:p-12 z-20 relative">
                    <div className="flex items-center space-x-2 mb-6">
                      <div className="bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full text-white text-xs flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {post.date}
                      </div>
                      <div className="bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full text-white text-xs flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {post.readTime}
                      </div>
                    </div>

                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                      {post.title}
                    </h3>

                    <p className="text-white/80 mb-6 line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center mb-8">
                      <img
                        src={post.author.avatar}
                        alt={post.author.name}
                        className="w-10 h-10 rounded-full object-cover mr-3 border-2 border-white/30"
                      />
                      <div>
                        <p className="text-white font-medium">
                          {post.author.name}
                        </p>
                        <p className="text-white/70 text-sm">
                          {post.author.role}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-8">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full text-white text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium flex items-center hover:bg-blue-50 transition-colors">
                      Read Article
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Carousel Controls */}
          <button
            onClick={handlePrevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors z-20"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>

          <button
            onClick={handleNextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors z-20"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
            {featuredPosts.map((_, index) => (
              <button
                key={index}
                onClick={() => handleSelectSlide(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  activeSlideIndex === index
                    ? "w-6 bg-white"
                    : "bg-white/50 hover:bg-white/80"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Blog Content */}
        <div className="mb-8">
          {/* Toolbar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div className="flex flex-wrap items-center gap-2 md:gap-4">
              {/* Search */}
              <div
                className={`relative rounded-lg transition-all duration-300 ${
                  isSearchOpen
                    ? "w-full md:w-64 border border-blue-200 bg-white"
                    : "w-10 h-10"
                }`}
              >
                <button
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className={`${
                    isSearchOpen
                      ? "absolute right-2 top-2"
                      : "w-10 h-10 flex items-center justify-center bg-blue-50 rounded-lg"
                  }`}
                >
                  {isSearchOpen ? (
                    <X className="w-5 h-5 text-gray-500" />
                  ) : (
                    <Search className="w-5 h-5 text-blue-600" />
                  )}
                </button>

                <AnimatePresence>
                  {isSearchOpen && (
                    <motion.input
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "100%" }}
                      exit={{ opacity: 0, width: 0 }}
                      type="text"
                      placeholder="Search articles..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full h-10 pl-4 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                      autoFocus
                    />
                  )}
                </AnimatePresence>
              </div>

              {/* Filter button */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
                className="h-10 px-4 bg-blue-50 rounded-lg flex items-center gap-2 text-blue-600 font-medium"
              >
                <Filter className="w-4 h-4" />
                <span className="hidden md:inline">Filter</span>
                {(selectedTags.length > 0 || selectedCategory) && (
                  <span className="bg-blue-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold">
                    {selectedTags.length + (selectedCategory ? 1 : 0)}
                  </span>
                )}
              </motion.button>

              {/* Sort dropdown */}
              <div className="relative h-10 bg-blue-50 rounded-lg flex items-center gap-2 px-4 text-blue-600 font-medium cursor-pointer group">
                <SlidersHorizontal className="w-4 h-4" />
                <span className="hidden md:inline">Sort by:</span>
                <span className="text-sm">
                  {sortOption === "newest"
                    ? "Newest"
                    : sortOption === "popular"
                    ? "Popular"
                    : "Recommended"}
                </span>
                <ChevronRight className="w-4 h-4 transition-transform group-hover:rotate-90" />

                <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg overflow-hidden z-20 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <div className="p-2">
                    {["newest", "popular", "recommended"].map((option) => (
                      <button
                        key={option}
                        onClick={() => handleSortChange(option as SortOption)}
                        className={`w-full text-left px-3 py-2 rounded-md text-sm ${
                          sortOption === option
                            ? "bg-blue-50 text-blue-600 font-medium"
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        {option === "newest"
                          ? "Newest First"
                          : option === "popular"
                          ? "Most Popular"
                          : "Recommended"}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* View mode toggle */}
              <div className="flex h-10 bg-blue-50 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`w-10 h-10 flex items-center justify-center ${
                    viewMode === "grid"
                      ? "bg-blue-600 text-white"
                      : "text-blue-600"
                  }`}
                  aria-label="Grid view"
                >
                  <Layout className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`w-10 h-10 flex items-center justify-center ${
                    viewMode === "list"
                      ? "bg-blue-600 text-white"
                      : "text-blue-600"
                  }`}
                  aria-label="List view"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>

              {/* Subscribe button */}
              <button
                onClick={() => setShowSubscribe(true)}
                className="h-10 px-4 bg-blue-600 text-white rounded-lg font-medium hidden md:flex items-center gap-2 hover:bg-blue-700 transition-colors"
              >
                <Bookmark className="w-4 h-4" />
                Subscribe
              </button>
            </div>
          </div>

          {/* Filter Menu */}
          <AnimatePresence>
            {isFilterMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-white rounded-xl shadow-lg p-6 mb-8 overflow-hidden"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Filters
                  </h3>
                  <button
                    onClick={handleClearFilters}
                    className="text-sm text-blue-600 hover:text-blue-700"
                  >
                    Clear all
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  {/* Tags */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                      <Tag className="w-4 h-4 mr-2" />
                      Tags
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag) => (
                        <button
                          key={tag}
                          onClick={() => handleTagSelect(tag)}
                          className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                            selectedTags.includes(tag)
                              ? "bg-blue-600 text-white"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Categories */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                      <BookOpen className="w-4 h-4 mr-2" />
                      Categories
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {categories.map((category) => (
                        <button
                          key={category}
                          onClick={() => handleCategorySelect(category)}
                          className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                            selectedCategory === category
                              ? "bg-blue-600 text-white"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Results info */}
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600">
              Showing{" "}
              <span className="font-medium">{paginatedPosts.length}</span> of{" "}
              <span className="font-medium">{filteredPosts.length}</span>{" "}
              articles
            </p>

            {(searchQuery || selectedTags.length > 0 || selectedCategory) && (
              <button
                onClick={handleClearFilters}
                className="text-sm text-blue-600 flex items-center hover:text-blue-700"
              >
                <X className="w-4 h-4 mr-1" />
                Clear filters
              </button>
            )}
          </div>

          {/* Blog posts grid/list */}
          {paginatedPosts.length > 0 ? (
            <>
              <div
                className={`${
                  viewMode === "grid"
                    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    : "space-y-6"
                }`}
              >
                {paginatedPosts.map((post) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className={`group ${
                      viewMode === "grid"
                        ? "bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow relative"
                        : "bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow relative flex"
                    }`}
                  >
                    {/* New badge */}
                    {post.isNew && (
                      <div className="absolute top-4 left-4 z-10 bg-amber-500 text-white text-xs px-2 py-1 rounded-full font-medium flex items-center">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        New
                      </div>
                    )}

                    {/* Save button */}
                    <button
                      onClick={() => handleSavePost(post.id)}
                      className="absolute top-4 right-4 z-10 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-sm hover:bg-white transition-colors"
                      aria-label={
                        savedPosts.includes(post.id)
                          ? "Unsave article"
                          : "Save article"
                      }
                    >
                      <Bookmark
                        className={`w-4 h-4 ${
                          savedPosts.includes(post.id)
                            ? "fill-blue-600 text-blue-600"
                            : "text-gray-600"
                        }`}
                      />
                    </button>

                    {viewMode === "grid" ? (
                      <>
                        <div className="h-48 overflow-hidden">
                          <img
                            src={post.coverImage}
                            alt={post.title}
                            className="w-full h-full object-cover object-center transform transition-transform duration-500 group-hover:scale-110"
                          />
                        </div>

                        <div className="p-6">
                          <div className="flex items-center justify-between mb-3">
                            <div className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs">
                              {post.category}
                            </div>
                            <div className="flex items-center text-gray-500 text-xs">
                              <Calendar className="w-3 h-3 mr-1" />
                              {post.date}
                            </div>
                          </div>

                          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                            {post.title}
                          </h3>

                          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                            {post.excerpt}
                          </p>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <img
                                src={post.author.avatar}
                                alt={post.author.name}
                                className="w-8 h-8 rounded-full object-cover mr-2"
                              />
                              <span className="text-sm text-gray-600">
                                {post.author.name}
                              </span>
                            </div>

                            <div className="flex items-center text-gray-500 text-xs">
                              <Clock className="w-3 h-3 mr-1" />
                              {post.readTime}
                            </div>
                          </div>

                          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                            <div className="flex space-x-4">
                              <button
                                onClick={() => handleLikePost(post.id)}
                                className="flex items-center text-gray-500 hover:text-blue-600"
                              >
                                <Heart
                                  className={`w-4 h-4 mr-1 ${
                                    likedPosts[post.id]
                                      ? "fill-red-500 text-red-500"
                                      : ""
                                  }`}
                                />
                                <span className="text-xs">
                                  {likedPosts[post.id]
                                    ? post.likes + 1
                                    : post.likes}
                                </span>
                              </button>

                              <div className="flex items-center text-gray-500">
                                <MessageCircle className="w-4 h-4 mr-1" />
                                <span className="text-xs">{post.comments}</span>
                              </div>

                              <div className="flex items-center text-gray-500">
                                <Eye className="w-4 h-4 mr-1" />
                                <span className="text-xs">{post.views}</span>
                              </div>
                            </div>

                            <button className="text-blue-600 hover:text-blue-700">
                              <Share2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="w-1/3 overflow-hidden">
                          <img
                            src={post.coverImage}
                            alt={post.title}
                            className="w-full h-full object-cover object-center transform transition-transform duration-500 group-hover:scale-110"
                          />
                        </div>

                        <div className="w-2/3 p-6 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center justify-between mb-3">
                              <div className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs">
                                {post.category}
                              </div>
                              <div className="flex items-center text-gray-500 text-xs">
                                <Calendar className="w-3 h-3 mr-1" />
                                {post.date}
                              </div>
                            </div>

                            <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                              {post.title}
                            </h3>

                            <p className="text-gray-600 text-sm mb-4">
                              {post.excerpt}
                            </p>

                            <div className="flex flex-wrap gap-2 mb-4">
                              {post.tags.slice(0, 3).map((tag) => (
                                <span
                                  key={tag}
                                  className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full text-xs"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <img
                                src={post.author.avatar}
                                alt={post.author.name}
                                className="w-8 h-8 rounded-full object-cover mr-2"
                              />
                              <div>
                                <p className="text-sm font-medium text-gray-900">
                                  {post.author.name}
                                </p>
                                <p className="text-xs text-gray-600">
                                  {post.author.role}
                                </p>
                              </div>
                            </div>

                            <div className="flex space-x-4">
                              <button
                                onClick={() => handleLikePost(post.id)}
                                className="flex items-center text-gray-500 hover:text-blue-600"
                              >
                                <Heart
                                  className={`w-4 h-4 mr-1 ${
                                    likedPosts[post.id]
                                      ? "fill-red-500 text-red-500"
                                      : ""
                                  }`}
                                />
                                <span className="text-xs">
                                  {likedPosts[post.id]
                                    ? post.likes + 1
                                    : post.likes}
                                </span>
                              </button>

                              <div className="flex items-center text-gray-500">
                                <MessageCircle className="w-4 h-4 mr-1" />
                                <span className="text-xs">{post.comments}</span>
                              </div>

                              <div className="flex items-center text-gray-500">
                                <Eye className="w-4 h-4 mr-1" />
                                <span className="text-xs">{post.views}</span>
                              </div>

                              <button className="text-blue-600 hover:text-blue-700">
                                <Share2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-12">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setActivePage(Math.max(0, activePage - 1))}
                      disabled={activePage === 0}
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        activePage === 0
                          ? "text-gray-400 cursor-not-allowed"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>

                    {Array.from({ length: totalPages }).map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setActivePage(index)}
                        className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          activePage === index
                            ? "bg-blue-600 text-white"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        {index + 1}
                      </button>
                    ))}

                    <button
                      onClick={() =>
                        setActivePage(Math.min(totalPages - 1, activePage + 1))
                      }
                      disabled={activePage === totalPages - 1}
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        activePage === totalPages - 1
                          ? "text-gray-400 cursor-not-allowed"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="py-12 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                <AlertCircle className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No articles found
              </h3>
              <p className="text-gray-600 mb-6">
                We couldn't find any articles matching your criteria.
              </p>
              <button
                onClick={handleClearFilters}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>

        {/* Newsletter Subscription */}
        <div className="mt-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 md:p-12 relative overflow-hidden">
          <div className="absolute right-0 top-0 -translate-y-1/4 translate-x-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute left-0 bottom-0 translate-y-1/4 -translate-x-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl" />

          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Stay Updated with Our Latest Articles
            </h3>
            <p className="text-blue-100 mb-8">
              Subscribe to our newsletter to receive regular updates on new
              articles, resources, and language learning tips.
            </p>

            <form
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto"
            >
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 text-white"
              />
              <button
                type="submit"
                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors"
              >
                Subscribe
              </button>
            </form>

            <p className="text-blue-100 text-sm mt-4">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>

      {/* Subscribe Modal */}
      <AnimatePresence>
        {showSubscribe && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl p-6 max-w-md w-full relative"
            >
              <button
                onClick={() => setShowSubscribe(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Bookmark className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Subscribe to Our Newsletter
                </h3>
                <p className="text-gray-600">
                  Get the latest articles, tutorials, and updates directly in
                  your inbox.
                </p>
              </div>

              {subscribed ? (
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ThumbsUp className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Thank You for Subscribing!
                  </h3>
                  <p className="text-gray-600 mb-6">
                    You've been added to our newsletter list.
                  </p>
                  <button
                    onClick={() => setShowSubscribe(false)}
                    className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      placeholder="Enter your name"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
                    />
                  </div>

                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      id="consent"
                      className="mt-1"
                      required
                    />
                    <label
                      htmlFor="consent"
                      className="ml-2 text-sm text-gray-600"
                    >
                      I agree to receive newsletter emails and can unsubscribe
                      at any time.
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  >
                    Subscribe Now
                  </button>
                </form>
              )}

              <div className="flex items-center justify-center mt-6">
                <User className="w-4 h-4 text-gray-400 mr-2" />
                <p className="text-sm text-gray-500">Join 5,000+ subscribers</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Blog;
