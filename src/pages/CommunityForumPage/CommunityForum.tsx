"use client";

import type React from "react";
import { useState } from "react";
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
  ImageIcon,
  LinkIcon,
  Smile,
  Reply,
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

interface CommentType {
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
  replies?: CommentType[];
}

// Sample comments data using CommentType interface
const sampleComments: Record<string, CommentType[]> = {
  "1": [
    {
      id: "c1",
      content:
        "This is really helpful! I've been struggling with pronunciation.",
      author: {
        name: "John Doe",
        image:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop",
        role: "Language Learner",
      },
      timestamp: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
      likes: 5,
      isLiked: false,
    },
    {
      id: "c2",
      content: "Great tips! Could you elaborate more on the cultural context?",
      author: {
        name: "Jane Smith",
        image:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop",
        role: "Cultural Enthusiast",
      },
      timestamp: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
      likes: 3,
      isLiked: false,
      replies: [
        {
          id: "r1",
          content:
            "I'd be happy to share more details about the cultural context. Let me prepare a follow-up post!",
          author: {
            name: "Sarah Chen",
            image:
              "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop",
            role: "Language Expert",
          },
          timestamp: new Date(Date.now() - 1800000).toISOString(), // 30 minutes ago
          likes: 2,
          isLiked: false,
        },
      ],
    },
  ],
  "2": [
    {
      id: "c3",
      content:
        "Your insights on cultural context are invaluable. I've been trying to understand the nuances behind certain phrases.",
      author: {
        name: "Alex Johnson",
        image:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop",
        role: "Student",
      },
      timestamp: new Date(Date.now() - 5400000).toISOString(), // 1.5 hours ago
      likes: 7,
      isLiked: false,
    },
  ],
  "3": [
    {
      id: "c4",
      content:
        "I've faced similar challenges. What helped me was practicing with native speakers.",
      author: {
        name: "Maria Garcia",
        image:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop",
        role: "Advanced Learner",
      },
      timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
      likes: 12,
      isLiked: false,
    },
  ],
};

const forumPosts: ForumPost[] = [
  {
    id: "1",
    title: "Tips for Learning Kenyah Language Effectively",
    content:
      "I've been using KamusKenyah for 3 months now and wanted to share some effective learning strategies that worked for me...",
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
  const [likedPosts, setLikedPosts] = useState<string[]>([]);
  const [bookmarkedPosts, setBookmarkedPosts] = useState<string[]>([]);

  // State for comments using CommentType
  const [comments, setComments] =
    useState<Record<string, CommentType[]>>(sampleComments);
  const [newCommentContent, setNewCommentContent] = useState("");
  const [likedComments, setLikedComments] = useState<string[]>([]);
  const [showReplyForm, setShowReplyForm] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");

  const handlePostExpand = (id: string) => {
    setExpandedPost(expandedPost === id ? null : id);
  };

  const handleLikePost = (id: string) => {
    setLikedPosts((prev) => {
      if (prev.includes(id)) {
        return prev.filter((postId) => postId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleBookmarkPost = (id: string) => {
    setBookmarkedPosts((prev) => {
      if (prev.includes(id)) {
        return prev.filter((postId) => postId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleSubmitPost = () => {
    if (!newPostContent.trim()) return;

    // Here you would typically send the new post to your backend
    console.log("Submitting new post:", newPostContent);

    // Clear the input after submission
    setNewPostContent("");
  };

  // Function to handle comment submission - using CommentType
  const handleSubmitComment = (postId: string) => {
    if (!newCommentContent.trim()) return;

    const newComment: CommentType = {
      id: `c${Date.now()}`,
      content: newCommentContent,
      author: {
        name: "Current User", // In a real app, this would be the logged-in user
        image:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop",
        role: "Member",
      },
      timestamp: new Date().toISOString(),
      likes: 0,
      isLiked: false,
    };

    setComments((prev) => ({
      ...prev,
      [postId]: [...(prev[postId] || []), newComment],
    }));

    setNewCommentContent("");
  };

  // Function to handle liking a comment - using CommentType
  const handleLikeComment = (commentId: string) => {
    setLikedComments((prev) => {
      if (prev.includes(commentId)) {
        return prev.filter((id) => id !== commentId);
      } else {
        return [...prev, commentId];
      }
    });
  };

  // Function to handle reply submission - using CommentType
  const handleSubmitReply = (postId: string, commentId: string) => {
    if (!replyContent.trim() || !showReplyForm) return;

    const newReply: CommentType = {
      id: `r${Date.now()}`,
      content: replyContent,
      author: {
        name: "Current User", // In a real app, this would be the logged-in user
        image:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop",
        role: "Member",
      },
      timestamp: new Date().toISOString(),
      likes: 0,
      isLiked: false,
    };

    setComments((prev) => {
      const updatedComments = [...(prev[postId] || [])];
      const commentIndex = updatedComments.findIndex(
        (comment) => comment.id === commentId
      );

      if (commentIndex !== -1) {
        const updatedComment = { ...updatedComments[commentIndex] };
        updatedComment.replies = [...(updatedComment.replies || []), newReply];
        updatedComments[commentIndex] = updatedComment;
      }

      return {
        ...prev,
        [postId]: updatedComments,
      };
    });

    setReplyContent("");
    setShowReplyForm(null);
  };

  const filteredPosts = forumPosts.filter((post) => {
    // Filter by category
    if (
      selectedCategory !== "All Topics" &&
      post.category !== selectedCategory
    ) {
      return false;
    }

    // Filter by search term
    if (
      searchTerm &&
      !post.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !post.content.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }

    // Filter by sort option
    if (sortBy === "unanswered" && post.isAnswered) {
      return false;
    }

    return true;
  });

  // Sort posts based on sortBy
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (sortBy === "recent") {
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    } else if (sortBy === "popular") {
      return b.stats.likes - a.stats.likes;
    }
    return 0;
  });

  // Format date helper function
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSecs = Math.floor(diffMs / 1000);
    const diffMins = Math.floor(diffSecs / 60);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffSecs < 60) return `${diffSecs} sec ago`;
    if (diffMins < 60) return `${diffMins} min ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;

    return date.toLocaleDateString();
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
                  <button 
                    className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100"
                    title="Add image"
                    aria-label="Add image to post"
                  >
                    <ImageIcon className="w-5 h-5" />
                  </button>
                  <button 
                    className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100"
                    title="Add link"
                    aria-label="Add link to post"
                  >
                    <LinkIcon className="w-5 h-5" />
                  </button>
                  <button 
                    className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100"
                    title="Add emoji"
                    aria-label="Add emoji to post"
                  >
                    <Smile className="w-5 h-5" />
                  </button>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSubmitPost}
                  disabled={!newPostContent.trim()}
                  className={`px-6 py-2 ${
                    newPostContent.trim()
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "bg-blue-400 cursor-not-allowed"
                  } text-white rounded-lg font-medium transition-colors flex items-center`}
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
                title="Sort posts"
                aria-label="Sort posts"
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
          {sortedPosts.length > 0 ? (
            sortedPosts.map((post) => (
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
                        src={post.author.image || "/placeholder.svg"}
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
                        className={`flex items-center gap-1 ${
                          likedPosts.includes(post.id)
                            ? "text-blue-600"
                            : "text-gray-500 hover:text-blue-600"
                        }`}
                      >
                        <ThumbsUp className="w-4 h-4" />
                        <span>
                          {post.stats.likes +
                            (likedPosts.includes(post.id) ? 1 : 0)}
                        </span>
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
                      <button 
                        className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                        title="Share post"
                        aria-label="Share this post"
                      >
                        <Share2 className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleBookmarkPost(post.id)}
                        className={`p-2 ${
                          bookmarkedPosts.includes(post.id)
                            ? "text-blue-600"
                            : "text-gray-400 hover:text-blue-600"
                        } transition-colors`}
                      >
                        <Bookmark className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Expanded Comments Section - Using CommentType */}
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
                              value={newCommentContent}
                              onChange={(e) =>
                                setNewCommentContent(e.target.value)
                              }
                              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                              rows={2}
                            />
                            <div className="flex justify-end mt-2">
                              <button
                                onClick={() => handleSubmitComment(post.id)}
                                disabled={!newCommentContent.trim()}
                                className={`px-4 py-2 ${
                                  newCommentContent.trim()
                                    ? "bg-blue-600 hover:bg-blue-700"
                                    : "bg-blue-400 cursor-not-allowed"
                                } text-white rounded-lg text-sm font-medium transition-colors`}
                              >
                                Comment
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Comments List - Using CommentType */}
                        <div className="space-y-4">
                          {comments[post.id]?.map((comment) => (
                            <div key={comment.id} className="space-y-4">
                              <div className="flex items-start gap-4">
                                <img
                                  src={
                                    comment.author.image || "/placeholder.svg"
                                  }
                                  alt={comment.author.name}
                                  className="w-8 h-8 rounded-full object-cover"
                                />
                                <div className="flex-grow">
                                  <div className="bg-gray-50 rounded-lg p-4">
                                    <div className="flex items-center justify-between mb-2">
                                      <div className="font-medium text-gray-900">
                                        {comment.author.name}
                                      </div>
                                      <span className="text-sm text-gray-500">
                                        {formatDate(comment.timestamp)}
                                      </span>
                                    </div>
                                    <p className="text-gray-600">
                                      {comment.content}
                                    </p>
                                    <div className="flex items-center gap-4 mt-2">
                                      <button
                                        onClick={() =>
                                          handleLikeComment(comment.id)
                                        }
                                        className={`text-sm ${
                                          likedComments.includes(comment.id)
                                            ? "text-blue-600"
                                            : "text-gray-500 hover:text-blue-600"
                                        }`}
                                      >
                                        Like{" "}
                                        {comment.likes +
                                          (likedComments.includes(comment.id)
                                            ? 1
                                            : 0)}
                                      </button>
                                      <button
                                        onClick={() =>
                                          setShowReplyForm(
                                            showReplyForm === comment.id
                                              ? null
                                              : comment.id
                                          )
                                        }
                                        className="text-sm text-gray-500 hover:text-blue-600"
                                      >
                                        Reply
                                      </button>
                                    </div>
                                  </div>

                                  {/* Reply Form */}
                                  {showReplyForm === comment.id && (
                                    <div className="mt-2 ml-4 flex items-start gap-2">
                                      <img
                                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop"
                                        alt="User"
                                        className="w-6 h-6 rounded-full object-cover"
                                      />
                                      <div className="flex-grow">
                                        <textarea
                                          placeholder="Write a reply..."
                                          value={replyContent}
                                          onChange={(e) =>
                                            setReplyContent(e.target.value)
                                          }
                                          className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                          rows={1}
                                        />
                                        <div className="flex justify-end mt-1">
                                          <button
                                            onClick={() =>
                                              handleSubmitReply(
                                                post.id,
                                                comment.id
                                              )
                                            }
                                            disabled={!replyContent.trim()}
                                            className={`px-3 py-1 ${
                                              replyContent.trim()
                                                ? "bg-blue-600 hover:bg-blue-700"
                                                : "bg-blue-400 cursor-not-allowed"
                                            } text-white rounded-lg text-xs font-medium transition-colors flex items-center`}
                                          >
                                            Reply
                                            <Reply className="w-3 h-3 ml-1" />
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  )}

                                  {/* Replies - Using CommentType */}
                                  {comment.replies &&
                                    comment.replies.length > 0 && (
                                      <div className="mt-2 ml-8 space-y-3">
                                        {comment.replies.map((reply) => (
                                          <div
                                            key={reply.id}
                                            className="flex items-start gap-2"
                                          >
                                            <img
                                              src={
                                                reply.author.image ||
                                                "/placeholder.svg"
                                              }
                                              alt={reply.author.name}
                                              className="w-6 h-6 rounded-full object-cover"
                                            />
                                            <div className="flex-grow">
                                              <div className="bg-gray-50 rounded-lg p-3">
                                                <div className="flex items-center justify-between mb-1">
                                                  <div className="font-medium text-sm text-gray-900">
                                                    {reply.author.name}
                                                  </div>
                                                  <span className="text-xs text-gray-500">
                                                    {formatDate(
                                                      reply.timestamp
                                                    )}
                                                  </span>
                                                </div>
                                                <p className="text-sm text-gray-600">
                                                  {reply.content}
                                                </p>
                                                <div className="flex items-center gap-3 mt-1">
                                                  <button
                                                    onClick={() =>
                                                      handleLikeComment(
                                                        reply.id
                                                      )
                                                    }
                                                    className={`text-xs ${
                                                      likedComments.includes(
                                                        reply.id
                                                      )
                                                        ? "text-blue-600"
                                                        : "text-gray-500 hover:text-blue-600"
                                                    }`}
                                                  >
                                                    Like{" "}
                                                    {reply.likes +
                                                      (likedComments.includes(
                                                        reply.id
                                                      )
                                                        ? 1
                                                        : 0)}
                                                  </button>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    )}
                                </div>
                              </div>
                            </div>
                          ))}

                          {/* Empty state for no comments */}
                          {(!comments[post.id] ||
                            comments[post.id].length === 0) && (
                            <div className="text-center py-6">
                              <MessageSquare className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                              <p className="text-gray-500">
                                No comments yet. Be the first to comment!
                              </p>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No discussions found
              </h3>
              <p className="text-gray-600">
                Try adjusting your search or filters
              </p>
            </div>
          )}
        </div>

        {/* Load More Button */}
        {sortedPosts.length > 0 && (
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
        )}

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
