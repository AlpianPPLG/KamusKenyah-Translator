import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Zap,
  Globe,
  Users,
  BookOpen,
  Brain,
  MessageSquare,
  Headphones,
  Volume2,
  Laptop,
  Smartphone,
  Share2,
  Clock,
  Shield,
  Award,
  ArrowRight,
  Check,
  ChevronDown,
} from "lucide-react";

interface DetailedFeature {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  category: string;
  details: {
    overview: string;
    keyPoints: string[];
    techSpecs?: string[];
  };
  screenshot: string;
}

const features: DetailedFeature[] = [
  {
    id: "ai-translation",
    icon: <Brain className="w-6 h-6" />,
    title: "Terjemahan AI Pintar",
    description: "Teknologi kecerdasan buatan untuk terjemahan akurat",
    category: "Teknologi",
    details: {
      overview:
        "Sistem terjemahan berbasis AI yang memahami konteks dan nuansa bahasa Dayak Kenyah.",
      keyPoints: [
        "Terjemahan real-time dengan akurasi tinggi",
        "Pemahaman konteks budaya",
        "Pembelajaran adaptif dari input pengguna",
        "Dukungan untuk berbagai dialek",
      ],
      techSpecs: [
        "Neural Machine Translation",
        "Natural Language Processing",
        "Contextual Analysis",
        "Adaptive Learning Algorithms",
      ],
    },
    screenshot: "/assets/img/ai-translation-demo.jpg",
  },
  {
    id: "interactive-learning",
    icon: <BookOpen className="w-6 h-6" />,
    title: "Pembelajaran Interaktif",
    description: "Platform belajar yang menyenangkan dan efektif",
    category: "Pendidikan",
    details: {
      overview:
        "Sistem pembelajaran yang dirancang untuk memaksimalkan pemahaman dan retensi.",
      keyPoints: [
        "Kuis interaktif dan latihan",
        "Sistem penilaian otomatis",
        "Tracking kemajuan personal",
        "Materi pembelajaran terstruktur",
      ],
      techSpecs: [
        "Gamification Elements",
        "Progress Tracking System",
        "Interactive Exercises",
        "Personalized Learning Paths",
      ],
    },
    screenshot: "/assets/img/interactive-learning-demo.jpg",
  },
  {
    id: "voice-recognition",
    icon: <Volume2 className="w-6 h-6" />,
    title: "Pengenalan Suara",
    description: "Teknologi speech-to-text canggih",
    category: "Teknologi",
    details: {
      overview:
        "Sistem pengenalan suara yang akurat untuk bahasa Dayak Kenyah.",
      keyPoints: [
        "Konversi suara ke teks real-time",
        "Analisis pengucapan",
        "Feedback pronunciation",
        "Latihan pengucapan interaktif",
      ],
      techSpecs: [
        "Advanced Speech Recognition",
        "Phonetic Analysis",
        "Real-time Processing",
        "Audio Enhancement",
      ],
    },
    screenshot: "/assets/img/voice-recognition-demo.jpg",
  },
  {
    id: "community-features",
    icon: <Users className="w-6 h-6" />,
    title: "Fitur Komunitas",
    description: "Ruang interaksi dan kolaborasi",
    category: "Komunitas",
    details: {
      overview:
        "Platform komunitas untuk berinteraksi dan berbagi pengetahuan.",
      keyPoints: [
        "Forum diskusi aktif",
        "Grup belajar virtual",
        "Sharing konten edukasi",
        "Event komunitas online",
      ],
      techSpecs: [
        "Real-time Chat System",
        "Content Management",
        "User Profiles",
        "Event Management",
      ],
    },
    screenshot: "/assets/img/community-features-demo.jpg",
  },
  {
    id: "global-reach",
    icon: <Globe className="w-6 h-6" />,
    title: "Jangkauan Global",
    description: "Mencapai pengguna di seluruh dunia",
    category: "Teknologi",
    details: {
      overview: "Platform kami dapat diakses oleh pengguna di seluruh dunia.",
      keyPoints: [
        "Aksesibilitas global",
        "Kemitraan internasional",
        "Pengalaman multikultural",
      ],
      techSpecs: [
        "Global Accessibility",
        "International Partnerships",
        "Multicultural Experience",
      ],
    },
    screenshot: "/assets/img/global-reach-demo.jpg",
  },
  {
    id: "customer-support",
    icon: <Headphones className="w-6 h-6" />,
    title: "Dukungan Pelanggan",
    description: "Dukungan yang tersedia 24/7",
    category: "Komunitas",
    details: {
      overview: "Tim dukungan kami siap membantu Anda setiap saat.",
      keyPoints: [
        "Dukungan 24/7",
        "Tim ahli yang ramah",
        "Solusi cepat dan efektif",
      ],
      techSpecs: [
        "24/7 Support",
        "Friendly Expert Team",
        "Quick and Effective Solutions",
      ],
    },
    screenshot: "/assets/img/customer-support-demo.jpg",
  },
  {
    id: "device-compatibility",
    icon: <Laptop className="w-6 h-6" />,
    title: "Kompatibilitas Perangkat",
    description: "Tersedia di berbagai perangkat",
    category: "Teknologi",
    details: {
      overview: "Platform kami dapat diakses melalui berbagai perangkat.",
      keyPoints: [
        "Akses melalui desktop",
        "Akses melalui mobile",
        "Akses melalui tablet",
      ],
      techSpecs: ["Desktop Access", "Mobile Access", "Tablet Access"],
    },
    screenshot: "/assets/img/device-compatibility-demo.jpg",
  },
  {
    id: "mobile-access",
    icon: <Smartphone className="w-6 h-6" />,
    title: "Akses Mobile",
    description: "Akses platform melalui perangkat mobile",
    category: "Teknologi",
    details: {
      overview:
        "Akses platform kami melalui perangkat mobile dengan mudah dan nyaman.",
      keyPoints: [
        "Antarmuka yang ramah pengguna",
        "Notifikasi real-time",
        "Sinkronisasi data dengan desktop",
      ],
      techSpecs: [
        "User-friendly Interface",
        "Real-time Notifications",
        "Data Synchronization",
      ],
    },
    screenshot: "/assets/img/mobile-access-demo.jpg",
  },
  {
    id: "sharing-features",
    icon: <Share2 className="w-6 h-6" />,
    title: "Fitur Berbagi",
    description: "Berbagi dengan mudah melalui platform kami",
    category: "Komunitas",
    details: {
      overview:
        "Berbagi pengetahuan dan pengalaman Anda dengan komunitas kami.",
      keyPoints: [
        "Berbagi konten edukasi",
        "Berbagi pengalaman belajar",
        "Berbagi sumber daya",
      ],
      techSpecs: [
        "Educational Content Sharing",
        "Learning Experience Sharing",
        "Resource Sharing",
      ],
    },
    screenshot: "/assets/img/sharing-features-demo.jpg",
  },
  {
    id: "real-time-updates",
    icon: <Clock className="w-6 h-6" />,
    title: "Pembaruan Real-Time",
    description: "Dapatkan pembaruan terbaru secara real-time",
    category: "Teknologi",
    details: {
      overview:
        "Dapatkan pembaruan terbaru tentang platform dan konten kami secara real-time.",
      keyPoints: [
        "Pembaruan konten real-time",
        "Notifikasi pembaruan",
        "Akses informasi terbaru",
      ],
      techSpecs: [
        "Real-time Content Updates",
        "Update Notifications",
        "Access to Latest Information",
      ],
    },
    screenshot: "/assets/img/real-time-updates-demo.jpg",
  },
  {
    id: "security-features",
    icon: <Shield className="w-6 h-6" />,
    title: "Fitur Keamanan",
    description: "Keamanan terbaik untuk data Anda",
    category: "Teknologi",
    details: {
      overview:
        "Platform kami memiliki fitur keamanan terbaik untuk melindungi data Anda.",
      keyPoints: [
        "Enkripsi data",
        "Autentikasi dua faktor",
        "Pemantauan aktivitas",
      ],
      techSpecs: [
        "Data Encryption",
        "Two-Factor Authentication",
        "Activity Monitoring",
      ],
    },
    screenshot: "/assets/img/security-features-demo.jpg",
  },
  {
    id: "awards",
    icon: <Award className="w-6 h-6" />,
    title: "Penghargaan",
    description: "Penghargaan yang kami terima",
    category: "Komunitas",
    details: {
      overview:
        "Berbagai penghargaan yang kami terima sebagai bukti komitmen kami.",
      keyPoints: [
        "Penghargaan inovasi",
        "Penghargaan pendidikan",
        "Penghargaan komunitas",
      ],
      techSpecs: ["Innovation Awards", "Education Awards", "Community Awards"],
    },
    screenshot: "/assets/img/awards-demo.jpg",
  },
  {
    id: "performance",
    icon: <Zap className="w-6 h-6" />,
    title: "Kinerja Cepat",
    description: "Kinerja yang cepat dan efisien",
    category: "Teknologi",
    details: {
      overview:
        "Platform kami dirancang untuk memberikan kinerja yang cepat dan efisien.",
      keyPoints: [
        "Waktu muat cepat",
        "Optimasi performa",
        "Pengalaman pengguna yang lancar",
      ],
      techSpecs: [
        "Fast Load Times",
        "Performance Optimization",
        "Smooth User Experience",
      ],
    },
    screenshot: "/assets/img/performance-demo.jpg",
  },
  {
    id: "communication",
    icon: <MessageSquare className="w-6 h-6" />,
    title: "Komunikasi",
    description: "Fitur komunikasi yang efektif",
    category: "Komunitas",
    details: {
      overview:
        "Fitur komunikasi yang memungkinkan interaksi yang efektif antar pengguna.",
      keyPoints: ["Pesan real-time", "Forum diskusi", "Notifikasi interaktif"],
      techSpecs: [
        "Real-time Messaging",
        "Discussion Forums",
        "Interactive Notifications",
      ],
    },
    screenshot: "/assets/img/communication-demo.jpg",
  },
];

const FeaturesList: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [expandedFeature, setExpandedFeature] = useState<string | null>(null);
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null);

  const categories = ["all", "Teknologi", "Pendidikan", "Komunitas"];

  const filteredFeatures =
    selectedCategory === "all"
      ? features
      : features.filter((feature) => feature.category === selectedCategory);

  return (
    <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-600 mb-4"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">Fitur Lengkap</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-6"
          >
            Semua Fitur yang Anda Butuhkan untuk{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Belajar Bahasa
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Jelajahi fitur-fitur canggih yang akan membantu Anda menguasai
            bahasa Dayak Kenyah dengan cara yang menyenangkan dan efektif
          </motion.p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category, index) => (
            <motion.button
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * index }}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-blue-600 text-white shadow-lg scale-105"
                  : "bg-white text-gray-600 hover:bg-gray-50 hover:shadow"
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </motion.button>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {filteredFeatures.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * index }}
              className={`bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 ${
                hoveredFeature === feature.id ? "transform scale-105" : ""
              }`}
              onMouseEnter={() => setHoveredFeature(feature.id)}
              onMouseLeave={() => setHoveredFeature(null)}
            >
              {/* Feature Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="p-3 rounded-lg bg-blue-50 text-blue-600">
                      {feature.icon}
                    </div>
                    <div className="ml-4">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {feature.category}
                      </p>
                    </div>
                  </div>
                  <motion.button
                    onClick={() =>
                      setExpandedFeature(
                        expandedFeature === feature.id ? null : feature.id
                      )
                    }
                    animate={{
                      rotate: expandedFeature === feature.id ? 180 : 0,
                    }}
                    className="p-2 hover:bg-gray-50 rounded-full transition-colors"
                  >
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  </motion.button>
                </div>
                <p className="text-gray-600">{feature.description}</p>
              </div>

              {/* Expandable Content */}
              <AnimatePresence>
                {expandedFeature === feature.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-gray-100"
                  >
                    <div className="p-6">
                      <div className="mb-6">
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">
                          Overview
                        </h4>
                        <p className="text-gray-600">
                          {feature.details.overview}
                        </p>
                      </div>

                      <div className="mb-6">
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">
                          Fitur Utama
                        </h4>
                        <div className="grid grid-cols-2 gap-3">
                          {feature.details.keyPoints.map((point, idx) => (
                            <div
                              key={idx}
                              className="flex items-center text-gray-600"
                            >
                              <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                              <span className="text-sm">{point}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {feature.details.techSpecs && (
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900 mb-2">
                            Spesifikasi Teknis
                          </h4>
                          <div className="grid grid-cols-2 gap-2">
                            {feature.details.techSpecs.map((spec, idx) => (
                              <div
                                key={idx}
                                className="text-sm text-gray-600 bg-gray-50 rounded-lg px-3 py-2"
                              >
                                {spec}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Feature Footer */}
              <div className="px-6 py-4 bg-gray-50 flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-500">
                    Pelajari lebih lanjut
                  </span>
                  <div className="flex -space-x-2">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-200 to-indigo-200 border-2 border-white"
                      />
                    ))}
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center text-blue-600 hover:text-blue-700"
                >
                  <span className="text-sm font-medium">Detail</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Siap untuk memulai?
          </h3>
          <p className="text-gray-600 mb-8">
            Bergabunglah dengan ribuan pengguna lainnya dan mulai perjalanan
            Anda dalam mempelajari bahasa Dayak Kenyah.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300"
          >
            Mulai Sekarang
            <ArrowRight className="w-5 h-5 ml-2" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesList;
