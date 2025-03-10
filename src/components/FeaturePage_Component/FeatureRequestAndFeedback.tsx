"use client";

import type React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import {
  ChevronUp,
  ChevronDown,
  Send,
  ThumbsUp,
  Clock,
  CheckCircle,
  Sparkles,
  MessageCircle,
  Lightbulb,
  Filter,
  Share2,
  ArrowRight,
  Plus,
  Award,
  Search,
  HelpCircle,
  Rocket,
  Star,
} from "lucide-react";

type FeatureStatus = "requested" | "in-progress" | "completed";

interface FeatureRequest {
  id: number;
  title: string;
  description: string;
  votes: number;
  status: FeatureStatus;
  category: string;
  submittedBy?: string;
  submittedDate: string;
  comments?: Comment[];
}

interface Comment {
  id: number;
  author: string;
  text: string;
  date: string;
}

const initialFeatureRequests: FeatureRequest[] = [
  {
    id: 1,
    title: "Integrasi dengan Asisten AI",
    description:
      "Asisten AI yang dapat membantu dalam percakapan bahasa Dayak Kenyah dan memberikan koreksi pengucapan secara real-time. Fitur ini akan sangat membantu pengguna pemula.",
    votes: 45,
    status: "in-progress",
    category: "Teknologi",
    submittedBy: "Budi Setiawan",
    submittedDate: "2023-12-20",
    comments: [
      {
        id: 1,
        author: "Tim Pengembang",
        text: "Terima kasih atas sarannya! Kami sedang mengembangkan fitur ini dan diharapkan rilis pada Q2 2024.",
        date: "2023-12-22",
      },
      {
        id: 2,
        author: "Ani Wijaya",
        text: "Sangat menantikan fitur ini! Akan memudahkan dalam belajar pengucapan yang benar.",
        date: "2024-01-05",
      },
    ],
  },
  {
    id: 2,
    title: "Mode Offline",
    description:
      "Kemampuan untuk menggunakan aplikasi tanpa koneksi internet. Sangat berguna untuk daerah-daerah dengan konektivitas terbatas, terutama di pedalaman Kalimantan.",
    votes: 32,
    status: "requested",
    category: "Aksesibilitas",
    submittedBy: "Diana Putri",
    submittedDate: "2024-01-15",
  },
  {
    id: 3,
    title: "Latihan Pengucapan",
    description:
      "Fitur untuk melatih pengucapan kata-kata Dayak Kenyah dengan umpan balik real-time. Dilengkapi dengan visualisasi pola suara untuk membantu pengguna melihat perbedaan pengucapan mereka.",
    votes: 28,
    status: "requested",
    category: "Pembelajaran",
    submittedBy: "Rudi Hartono",
    submittedDate: "2024-01-30",
  },
  {
    id: 4,
    title: "Integrasi Media Sosial",
    description:
      "Kemampuan untuk berbagi pencapaian dan progress belajar di media sosial. Pengguna dapat membagikan kata baru yang dipelajari atau capaian level pada platform seperti Instagram, Twitter, dan Facebook.",
    votes: 20,
    status: "completed",
    category: "Sosial",
    submittedBy: "Maya Sari",
    submittedDate: "2023-11-10",
    comments: [
      {
        id: 3,
        author: "Tim Pengembang",
        text: "Fitur ini sudah dirilis dalam update terbaru v2.3.0. Silakan update aplikasi Anda.",
        date: "2024-02-10",
      },
    ],
  },
  {
    id: 5,
    title: "Kamus Visual",
    description:
      "Tambahkan ilustrasi dan gambar untuk setiap kata untuk membantu pemahaman visual, terutama untuk objek, hewan, dan tumbuhan khas Kalimantan.",
    votes: 39,
    status: "in-progress",
    category: "Konten",
    submittedBy: "Anton Wijaya",
    submittedDate: "2023-12-05",
  },
  {
    id: 6,
    title: "Mode Anak-anak",
    description:
      "Desain antarmuka khusus untuk anak-anak dengan gambar yang menarik dan permainan edukatif untuk memperkenalkan bahasa Dayak Kenyah sejak dini.",
    votes: 25,
    status: "requested",
    category: "Aksesibilitas",
    submittedBy: "Linda Kusuma",
    submittedDate: "2024-02-01",
  },
];

const categories = [
  "Semua",
  "Pembelajaran",
  "Teknologi",
  "Konten",
  "Aksesibilitas",
  "Sosial",
];

const FeatureRequestAndFeedback: React.FC = () => {
  const [featureRequests, setFeatureRequests] = useState<FeatureRequest[]>(
    initialFeatureRequests
  );
  const [newFeature, setNewFeature] = useState({
    title: "",
    description: "",
    category: "Pembelajaran",
  });
  const [activeTab, setActiveTab] = useState<"submit" | "vote">("vote");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [selectedStatus, setSelectedStatus] = useState<FeatureStatus | "all">(
    "all"
  );
  const [commentText, setCommentText] = useState("");
  const [expandedFeature, setExpandedFeature] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<"votes" | "date">("votes");

  const filteredFeatures = featureRequests
    .filter(
      (feature) =>
        feature.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        feature.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((feature) =>
      selectedCategory === "Semua"
        ? true
        : feature.category === selectedCategory
    )
    .filter((feature) =>
      selectedStatus === "all" ? true : feature.status === selectedStatus
    )
    .sort((a, b) => {
      if (sortBy === "votes") {
        return b.votes - a.votes;
      } else {
        return (
          new Date(b.submittedDate).getTime() -
          new Date(a.submittedDate).getTime()
        );
      }
    });

  const handleVote = (id: number, increment: boolean) => {
    setFeatureRequests((prevRequests) =>
      prevRequests.map((request) => {
        if (request.id === id) {
          const newVotes = request.votes + (increment ? 1 : -1);
          return { ...request, votes: newVotes < 0 ? 0 : newVotes };
        }
        return request;
      })
    );

    toast.success(increment ? "Vote ditambahkan!" : "Vote dikurangi", {
      position: "top-right",
      autoClose: 2000,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    const newId = Math.max(...featureRequests.map((f) => f.id)) + 1;
    const today = new Date().toISOString().split("T")[0];

    setFeatureRequests((prevRequests) => [
      ...prevRequests,
      {
        id: newId,
        title: newFeature.title,
        description: newFeature.description,
        votes: 1,
        status: "requested",
        category: newFeature.category,
        submittedDate: today,
        submittedBy: "Anda",
      },
    ]);

    setNewFeature({ title: "", description: "", category: "Pembelajaran" });
    setIsSubmitting(false);

    toast.success("Ide fitur Anda telah berhasil dikirim!", {
      position: "top-right",
      autoClose: 3000,
    });

    setActiveTab("vote");
  };

  const handleAddComment = (featureId: number) => {
    if (!commentText.trim()) return;

    const newComment = {
      id: Date.now(),
      author: "Anda",
      text: commentText,
      date: new Date().toISOString().split("T")[0],
    };

    setFeatureRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.id === featureId
          ? {
              ...request,
              comments: [...(request.comments || []), newComment],
            }
          : request
      )
    );

    setCommentText("");

    toast.success("Komentar ditambahkan", {
      position: "top-right",
      autoClose: 2000,
    });
  };

  const toggleExpandFeature = (id: number) => {
    setExpandedFeature(expandedFeature === id ? null : id);
  };

  const getStatusColor = (status: FeatureStatus) => {
    switch (status) {
      case "requested":
        return "bg-blue-100 text-blue-700";
      case "in-progress":
        return "bg-yellow-100 text-yellow-700";
      case "completed":
        return "bg-green-100 text-green-700";
    }
  };

  const getStatusIcon = (status: FeatureStatus) => {
    switch (status) {
      case "requested":
        return <ThumbsUp className="w-5 h-5" />;
      case "in-progress":
        return <Clock className="w-5 h-5" />;
      case "completed":
        return <CheckCircle className="w-5 h-5" />;
    }
  };

  const getStatusText = (status: FeatureStatus) => {
    switch (status) {
      case "requested":
        return "Diajukan";
      case "in-progress":
        return "Sedang Dikembangkan";
      case "completed":
        return "Selesai";
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-indigo-50 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 mb-4">
            <Lightbulb className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">Berikut dengan ide Anda</span>
          </div>

          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Bantu Kami Meningkatkan{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
              KamusKenyah
            </span>
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Suara Anda sangat penting bagi kami! Ajukan fitur baru atau vote
            untuk fitur yang Anda inginkan.
          </p>
        </motion.div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-12">
          <div className="flex border-b">
            <button
              className={`flex-1 py-4 px-6 text-center font-medium transition-all duration-300 ${
                activeTab === "vote"
                  ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
                  : "bg-gray-50 text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => setActiveTab("vote")}
            >
              <div className="flex items-center justify-center">
                <ThumbsUp className="w-5 h-5 mr-2" />
                Lihat & Vote Fitur
              </div>
            </button>
            <button
              className={`flex-1 py-4 px-6 text-center font-medium transition-all duration-300 ${
                activeTab === "submit"
                  ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
                  : "bg-gray-50 text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => setActiveTab("submit")}
            >
              <div className="flex items-center justify-center">
                <Sparkles className="w-5 h-5 mr-2" />
                Ajukan Ide Fitur Baru
              </div>
            </button>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === "vote" && (
              <motion.div
                key="vote"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="p-6 bg-gray-50 border-b">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-grow">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        placeholder="Cari fitur..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2">
                      <div className="relative">
                        <select
                          value={selectedCategory}
                          onChange={(e) => setSelectedCategory(e.target.value)}
                          className="pl-10 appearance-none w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                        >
                          {categories.map((cat) => (
                            <option key={cat} value={cat}>
                              {cat}
                            </option>
                          ))}
                        </select>
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Filter className="h-5 w-5 text-gray-400" />
                        </div>
                      </div>

                      <div className="relative">
                        <select
                          value={selectedStatus}
                          onChange={(e) =>
                            setSelectedStatus(
                              e.target.value as FeatureStatus | "all"
                            )
                          }
                          className="pl-10 appearance-none w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                        >
                          <option value="all">Semua Status</option>
                          <option value="requested">Diajukan</option>
                          <option value="in-progress">
                            Sedang Dikembangkan
                          </option>
                          <option value="completed">Selesai</option>
                        </select>
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Clock className="h-5 w-5 text-gray-400" />
                        </div>
                      </div>

                      <div className="relative">
                        <select
                          value={sortBy}
                          onChange={(e) =>
                            setSortBy(e.target.value as "votes" | "date")
                          }
                          className="pl-10 appearance-none w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                        >
                          <option value="votes">Urut: Vote Tertinggi</option>
                          <option value="date">Urut: Terbaru</option>
                        </select>
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <ArrowRight className="h-5 w-5 text-gray-400" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  {filteredFeatures.length === 0 ? (
                    <div className="text-center py-10">
                      <HelpCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        Tidak ada fitur ditemukan
                      </h3>
                      <p className="text-gray-500">
                        Coba ubah filter atau ajukan ide fitur baru Anda!
                      </p>
                      <button
                        onClick={() => setActiveTab("submit")}
                        className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Ajukan Fitur Baru
                      </button>
                    </div>
                  ) : (
                    <ul className="space-y-4">
                      {filteredFeatures.map((feature) => (
                        <motion.li
                          key={feature.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                          className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200"
                        >
                          <div className="p-5">
                            <div className="flex flex-col sm:flex-row">
                              <div className="flex sm:flex-col items-center justify-center mb-4 sm:mb-0 sm:mr-6 px-4 py-2 sm:py-4 bg-gray-50 rounded-lg sm:min-w-[90px]">
                                <button
                                  onClick={() => handleVote(feature.id, true)}
                                  className="p-1 rounded-full hover:bg-indigo-100 transition-colors duration-200"
                                  aria-label="Vote up"
                                >
                                  <ChevronUp className="w-6 h-6 text-indigo-600" />
                                </button>
                                <span className="font-bold text-2xl mx-2 sm:my-2 text-indigo-700">
                                  {feature.votes}
                                </span>
                                <button
                                  onClick={() => handleVote(feature.id, false)}
                                  className="p-1 rounded-full hover:bg-indigo-100 transition-colors duration-200"
                                  aria-label="Vote down"
                                >
                                  <ChevronDown className="w-6 h-6 text-indigo-600" />
                                </button>
                              </div>

                              <div className="flex-1">
                                <div className="flex items-start justify-between">
                                  <div>
                                    <h4 className="font-bold text-xl mb-2 text-gray-900">
                                      {feature.title}
                                    </h4>
                                    <div className="flex flex-wrap gap-2 mb-3">
                                      <span
                                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                          feature.status
                                        )}`}
                                      >
                                        {getStatusIcon(feature.status)}
                                        <span className="ml-1">
                                          {getStatusText(feature.status)}
                                        </span>
                                      </span>
                                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
                                        {feature.category}
                                      </span>
                                    </div>
                                  </div>
                                  <button
                                    onClick={() =>
                                      toggleExpandFeature(feature.id)
                                    }
                                    className="ml-2 text-gray-400 hover:text-indigo-600"
                                    aria-label="Expand feature details"
                                  >
                                    {expandedFeature === feature.id ? (
                                      <ChevronUp className="w-5 h-5" />
                                    ) : (
                                      <ChevronDown className="w-5 h-5" />
                                    )}
                                  </button>
                                </div>

                                <p className="text-gray-600 mb-3 line-clamp-2">
                                  {feature.description}
                                </p>

                                <div className="flex items-center text-xs text-gray-500">
                                  <span>
                                    Diajukan oleh:{" "}
                                    {feature.submittedBy || "Anonim"}
                                  </span>
                                  <span className="mx-2">•</span>
                                  <span>{feature.submittedDate}</span>
                                  {feature.comments && (
                                    <>
                                      <span className="mx-2">•</span>
                                      <span className="flex items-center">
                                        <MessageCircle className="w-3 h-3 mr-1" />
                                        {feature.comments.length} komentar
                                      </span>
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>

                            <AnimatePresence>
                              {expandedFeature === feature.id && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.3 }}
                                  className="mt-4 pt-4 border-t border-gray-200"
                                >
                                  <div className="mb-4">
                                    <h5 className="font-semibold text-gray-900 mb-2">
                                      Deskripsi Lengkap:
                                    </h5>
                                    <p className="text-gray-600">
                                      {feature.description}
                                    </p>
                                  </div>

                                  <div className="mb-4">
                                    <h5 className="font-semibold text-gray-900 mb-3 flex items-center">
                                      <MessageCircle className="w-4 h-4 mr-2" />
                                      Komentar ({feature.comments?.length || 0})
                                    </h5>

                                    {feature.comments &&
                                    feature.comments.length > 0 ? (
                                      <div className="space-y-3">
                                        {feature.comments.map((comment) => (
                                          <div
                                            key={comment.id}
                                            className="bg-gray-50 rounded-lg p-3"
                                          >
                                            <div className="flex justify-between items-start">
                                              <span className="font-medium text-gray-900">
                                                {comment.author}
                                              </span>
                                              <span className="text-xs text-gray-500">
                                                {comment.date}
                                              </span>
                                            </div>
                                            <p className="text-gray-600 mt-1 text-sm">
                                              {comment.text}
                                            </p>
                                          </div>
                                        ))}
                                      </div>
                                    ) : (
                                      <p className="text-gray-500 text-sm italic">
                                        Belum ada komentar untuk fitur ini.
                                      </p>
                                    )}
                                  </div>

                                  <div>
                                    <h5 className="font-semibold text-gray-900 mb-2">
                                      Tambahkan Komentar:
                                    </h5>
                                    <div className="flex">
                                      <input
                                        type="text"
                                        value={commentText}
                                        onChange={(e) =>
                                          setCommentText(e.target.value)
                                        }
                                        className="flex-grow mr-2 px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                                        placeholder="Tulis komentar Anda..."
                                      />
                                      <button
                                        onClick={() =>
                                          handleAddComment(feature.id)
                                        }
                                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                        disabled={!commentText.trim()}
                                      >
                                        <Send className="w-4 h-4" />
                                      </button>
                                    </div>
                                  </div>

                                  <div className="mt-4 flex items-center justify-end">
                                    <button
                                      onClick={() =>
                                        navigator.clipboard.writeText(
                                          `${feature.title}\n\n${feature.description}\n\n${window.location.href}`
                                        )
                                      }
                                      className="flex items-center text-indigo-600 hover:text-indigo-800"
                                    >
                                      <Share2 className="w-5 h-5 mr-2" />
                                      Bagikan Fitur Ini
                                    </button>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </motion.li>
                      ))}
                    </ul>
                  )}
                </div>
              </motion.div>
            )}

            {activeTab === "submit" && (
              <motion.div
                key="submit"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="p-6"
              >
                <div className="bg-indigo-50 rounded-xl p-6 mb-6">
                  <div className="flex items-start">
                    <div className="bg-indigo-100 p-3 rounded-full mr-4">
                      <Lightbulb className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Bagikan Ide Brillian Anda!
                      </h3>
                      <p className="text-gray-600">
                        Kami sangat menghargai masukan dari Anda untuk
                        meningkatkan KamusKenyah. Jelaskan ide fitur Anda dengan
                        detail untuk membantu kami memahami kebutuhan Anda.
                      </p>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="title"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Judul Fitur
                    </label>
                    <input
                      type="text"
                      id="title"
                      value={newFeature.title}
                      onChange={(e) =>
                        setNewFeature({ ...newFeature, title: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      required
                      placeholder="Masukkan judul fitur yang jelas dan singkat"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="category"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Kategori
                    </label>
                    <select
                      id="category"
                      value={newFeature.category}
                      onChange={(e) =>
                        setNewFeature({
                          ...newFeature,
                          category: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      {categories
                        .filter((c) => c !== "Semua")
                        .map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Deskripsi Detail
                    </label>
                    <textarea
                      id="description"
                      value={newFeature.description}
                      onChange={(e) =>
                        setNewFeature({
                          ...newFeature,
                          description: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      rows={6}
                      required
                      placeholder="Jelaskan fitur Anda secara detail. Bagaimana cara kerjanya? Mengapa fitur ini penting? Siapa yang akan mendapat manfaat?"
                    ></textarea>
                  </div>

                  <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                    <Star className="w-5 h-5 text-yellow-500 mr-3 flex-shrink-0" />
                    <p className="text-sm text-gray-600">
                      Setelah diajukan, fitur Anda akan ditinjau oleh tim kami.
                      Fitur dengan vote terbanyak akan diprioritaskan untuk
                      pengembangan.
                    </p>
                  </div>

                  <button
                    type="submit"
                    className={`w-full py-4 px-6 border border-transparent rounded-lg shadow-md text-white font-medium bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 ${
                      isSubmitting ? "opacity-75 cursor-not-allowed" : ""
                    }`}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Mengirim...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center">
                        <Rocket className="w-5 h-5 mr-2" />
                        Ajukan Ide Fitur
                      </span>
                    )}
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {[
            {
              status: "requested" as FeatureStatus,
              title: "Menunggu Review",
              icon: <ThumbsUp className="w-6 h-6 text-blue-500" />,
              bgColor: "bg-blue-50",
              borderColor: "border-blue-200",
              count: featureRequests.filter((f) => f.status === "requested")
                .length,
            },
            {
              status: "in-progress" as FeatureStatus,
              title: "Sedang Dikembangkan",
              icon: <Clock className="w-6 h-6 text-yellow-500" />,
              bgColor: "bg-yellow-50",
              borderColor: "border-yellow-200",
              count: featureRequests.filter((f) => f.status === "in-progress")
                .length,
            },
            {
              status: "completed" as FeatureStatus,
              title: "Sudah Diterapkan",
              icon: <CheckCircle className="w-6 h-6 text-green-500" />,
              bgColor: "bg-green-50",
              borderColor: "border-green-200",
              count: featureRequests.filter((f) => f.status === "completed")
                .length,
            },
          ].map((item) => (
            <motion.div
              key={item.status}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={`${item.bgColor} border ${item.borderColor} rounded-xl shadow-sm p-6`}
            >
              <div className="flex items-center mb-4">
                <div className="mr-3">{item.icon}</div>
                <h3 className="text-lg font-semibold">{item.title}</h3>
              </div>
              <div className="text-3xl font-bold mb-2">{item.count}</div>
              <button
                onClick={() => {
                  setActiveTab("vote");
                  setSelectedStatus(item.status);
                }}
                className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center"
              >
                Lihat semua
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl p-8 shadow-xl"
        >
          <Award className="w-12 h-12 mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-4">
            Jadilah Bagian dari Perkembangan KamusKenyah
          </h3>
          <p className="text-lg mb-6 max-w-2xl mx-auto opacity-90">
            Kontribusi Anda sangat berarti dalam upaya kami melestarikan bahasa
            dan budaya Dayak Kenyah. Bersama-sama, kita ciptakan platform yang
            semakin baik.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setActiveTab("submit")}
              className="px-6 py-3 bg-white text-indigo-700 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-300"
            >
              <Sparkles className="w-5 h-5 inline mr-2" />
              Ajukan Ide Baru
            </button>
            <button
              onClick={() => {
                setActiveTab("vote");
                setSelectedStatus("all");
              }}
              className="px-6 py-3 bg-indigo-700 text-white rounded-lg font-medium hover:bg-indigo-800 transition-colors duration-300"
            >
              <ThumbsUp className="w-5 h-5 inline mr-2" />
              Vote Fitur Favorit
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeatureRequestAndFeedback;
