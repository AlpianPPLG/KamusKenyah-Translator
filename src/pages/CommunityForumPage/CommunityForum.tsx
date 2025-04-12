import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  Users,
  Search,
  Filter,
  ThumbsUp,
  MessageCircle,
  Share2,
  Bookmark,
  Award,
  Star,
  ArrowRight,
  ChevronDown,
  Globe,
  Sparkles,
  Heart,
  Flag,
  Send,
  Image as ImageIcon,
  Link as LinkIcon,
  Smile,
} from "lucide-react";

interface ForumPost {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
    image: string;
    role: string;
    badges: string[];
  };
  category: string;
  tags: string[];
  stats: {
    likes: number;
    comments: number;
    views: number;
  };
  timestamp: string;
  isLiked?: boolean;
  isBookmarked?: boolean;
  isPinned?: boolean;
  isAnswered?: boolean;
}

interface Comment {
  id: string;
  content: string;
  author: {
    name: string;
    image: string;
    role: string;
  };
  timestamp: string;
  likes: number;
  isLiked?: boolean;
  replies?: Comment[];
}

const forumPosts: ForumPost[] = [
  {
    id: "1",
    title: "Tips for Learning Kenyah Language Effectively",
    content:
      "Ive been using KamusKenyah for 3 months now and wanted to share some effective learning strategies that worked for me...",
    author: {
      name: "Sarah Chen",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      role: "Language Expert",
      badges: ["Top Contributor", "Language Expert"],
    },
    category: "Learning Tips",
    tags: ["beginner", "study-tips", "pronunciation"],
    stats: {
      likes: 156,
      comments: 48,
      views: 1205,
    },
    timestamp: "2024-03-15T10:30:00Z",
    isPinned: true,
    isAnswered: true,
  },
  {
    id: "2",
    title: "Cultural Context Behind Common Phrases",
    content:
      "Understanding the cultural context is crucial when learning Kenyah. Here are some interesting insights about common phrases...",
    author: {
      name: "Dr. Michael Wong",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
      role: "Cultural Researcher",
      badges: ["Verified Expert"],
    },
    category: "Cultural Insights",
    tags: ["culture", "phrases", "advanced"],
    stats: {
      likes: 89,
      comments: 23,
      views: 567,
    },
    timestamp: "2024-03-14T15:45:00Z",
  },
  {
    id: "3",
    title: "Challenges Facing Kenyah Learners",
    content:
      "As Kenyah learners, we often face challenges in learning the language. Here are some common challenges and solutions...",
    author: {
      name: "John Doe",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
      role: "Language Learner",
      badges: ["Top Learner"],
    },
    category: "Challenges",
    tags: ["challenges", "learner-experience"],
    stats: {
      likes: 45,
      comments: 12,
      views: 345,
    },
    timestamp: "2024-03-13T09:20:00Z",
    isAnswered: true,
  },
];

const categories = [
  { name: "All Topics", icon: <Globe className="w-4 h-4" /> },
  { name: "Learning Tips", icon: <Sparkles className="w-4 h-4" /> },
  { name: "Cultural Insights", icon: <Heart className="w-4 h-4" /> },
  { name: "Technical Help", icon: <MessageSquare className="w-4 h-4" /> },
  { name: "Challenges", icon: <Award className="w-4 h-4" /> },
  { name: "Announcements", icon: <Star className="w-4 h-4" /> },
];

const CommunityForum: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("All Topics");
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<"recent" | "popular" | "unanswered">(
    "recent"
  );
  const [expandedPost, setExpandedPost] = useState<string | null>(null);
  const [newPostContent, setNewPostContent] = useState("");

  const handlePostExpand = (postId: string) => {
    setExpandedPost(expandedPost === postId ? null : postId);
  };

  const handleLikePost = (postId: string) => {
    // Handle post liking logic
  };

  const handleBookmarkPost = (postId: string) => {
    // Handle post bookmarking logic
  };

  const handleSubmitPost = () => {
    // Handle new post submission
    setNewPostContent("");
  };

  return (
    <section className="py-20 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 text-blue-600 mb-4"
          >
            <Users className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">Community Forum</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            Join the{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Discussion
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Connect with fellow language learners, share experiences, and get
            help from our community of Kenyah language enthusiasts.
          </motion.p>
        </div>

        {/* Create Post Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl border border-gray-200 p-6 mb-8"
        >
          <div className="flex items-start gap-4">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop"
              alt="User"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex-grow">
              <textarea
                placeholder="Start a discussion..."
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                className="w-full p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows={3}
              />
              <div className="flex items-center justify-between mt-4">
                <div className="flex gap-2">
                  <button className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100">
                    <ImageIcon className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100">
                    <LinkIcon className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100">
                    <Smile className="w-5 h-5" />
                  </button>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSubmitPost}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center"
                >
                  Post
                  <Send className="w-4 h-4 ml-2" />
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search discussions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-4">
              <select
                value={sortBy}
                onChange={(e) =>
                  setSortBy(
                    e.target.value as "recent" | "popular" | "unanswered"
                  )
                }
                className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
              >
                <option value="recent">Most Recent</option>
                <option value="popular">Most Popular</option>
                <option value="unanswered">Unanswered</option>
              </select>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                <Filter className="w-5 h-5 text-gray-400" />
                <span>Filters</span>
              </button>
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-2 mt-4">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category.name
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {category.icon}
                <span className="ml-2">{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Forum Posts */}
        <div className="space-y-6">
          {forumPosts.map((post) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`bg-white rounded-xl border ${
                post.isPinned
                  ? "border-blue-200 bg-blue-50/20"
                  : "border-gray-200"
              } overflow-hidden`}
            >
              <div className="p-6">
                {/* Post Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={post.author.image}
                      alt={post.author.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-medium text-gray-900 flex items-center gap-2">
                        {post.author.name}
                        {post.isPinned && (
                          <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                            Pinned
                          </span>
                        )}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span>{post.author.role}</span>
                        <span>•</span>
                        <span>
                          {new Date(post.timestamp).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {post.author.badges.map((badge) => (
                      <span
                        key={badge}
                        className="px-2 py-1 bg-blue-100 text-blue-600 rounded-full text-xs font-medium"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Post Content */}
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  {post.title}
                </h2>
                <p className="text-gray-600 mb-4">{post.content}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Post Stats and Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <button
                      onClick={() => handleLikePost(post.id)}
                      className="flex items-center gap-1 text-gray-500 hover:text-blue-600"
                    >
                      <ThumbsUp className="w-4 h-4" />
                      <span>{post.stats.likes}</span>
                    </button>
                    <button
                      onClick={() => handlePostExpand(post.id)}
                      className="flex items-center gap-1 text-gray-500 hover:text-blue-600"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>{post.stats.comments}</span>
                    </button>
                    <div className="flex items-center gap-1 text-gray-500">
                      <Globe className="w-4 h-4" />
                      <span>{post.stats.views} views</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                      <Share2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleBookmarkPost(post.id)}
                      className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                    >
                      <Bookmark className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Expanded Comments Section */}
                <AnimatePresence>
                  {expandedPost === post.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="mt-6 pt-6 border-t border-gray-200"
                    >
                      {/* Comment Input */}
                      <div className="flex items-start gap-4 mb-6">
                        <img
                          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop"
                          alt="User"
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <div className="flex-grow">
                          <textarea
                            placeholder="Write a comment..."
                            className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                            rows={2}
                          />
                          <div className="flex justify-end mt-2">
                            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                              Comment
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Sample Comments */}
                      <div className="space-y-4">
                        {[1, 2].map((comment) => (
                          <div key={comment} className="flex items-start gap-4">
                            <img
                              src={`https://images.unsplash.com/photo-${
                                comment === 1
                                  ? "1472099645785-5658abf4ff4e"
                                  : "1438761681033-6461ffad8d80"
                              }?w=50&h=50&fit=crop`}
                              alt="Commenter"
                              className="w-8 h-8 rounded-full object-cover"
                            />
                            <div className="flex-grow">
                              <div className="bg-gray-50 rounded-lg p-4">
                                <div className="flex items-center justify-between mb-2">
                                  <div className="font-medium text-gray-900">
                                    {comment === 1 ? "John Doe" : "Jane Smith"}
                                  </div>
                                  <span className="text-sm text-gray-500">
                                    2h ago
                                  </span>
                                </div>
                                <p className="text-gray-600">
                                  {comment === 1
                                    ? "This is really helpful! Ive been struggling with pronunciation."
                                    : "Great tips! Could you elaborate more on the cultural context?"}
                                </p>
                                <div className="flex items-center gap-4 mt-2">
                                  <button className="text-sm text-gray-500 hover:text-blue-600">
                                    Like
                                  </button>
                                  <button className="text-sm text-gray-500 hover:text-blue-600">
                                    Reply
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="mt-8 text-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-gray-100 text-gray-600 rounded-lg font-medium hover:bg-gray-200 transition-colors inline-flex items-center"
          >
            Load More Discussions
            <ChevronDown className="w-4 h-4 ml-2" />
          </motion.button>
        </div>

        {/* Community Guidelines */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 md:p-12 text-white"
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Community Guidelines
          </h3>
          <p className="text-blue-100 mb-8 max-w-2xl">
            Help us maintain a positive and supportive environment for all
            members. Please review our community guidelines before
            participating.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors flex items-center"
            >
              Read Guidelines
              <ArrowRight className="w-5 h-5 ml-2" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors flex items-center"
            >
              Report an Issue
              <Flag className="w-5 h-5 ml-2" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CommunityForum;
