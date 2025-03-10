import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  X,
  Crown,
  Sparkles,
  ArrowRight,
  Info,
  Star,
  Zap,
  Globe,
  Users,
  BookOpen,
  Brain,
  MessageSquare,
  Volume2,
  Shield,
  Clock,
  Download,
  Smartphone,
} from "lucide-react";

interface FeatureCategory {
  name: string;
  features: Feature[];
}

interface Feature {
  name: string;
  description: string;
  free: boolean | string;
  premium: boolean | string;
  highlight?: boolean;
  icon: React.ReactNode;
}

const featureCategories: FeatureCategory[] = [
  {
    name: "Fitur Dasar",
    features: [
      {
        name: "Terjemahan Teks",
        description:
          "Terjemahkan teks dari Bahasa Indonesia ke Dayak Kenyah dan sebaliknya",
        free: true,
        premium: true,
        icon: <Globe className="w-5 h-5" />,
      },
      {
        name: "Kamus Dasar",
        description: "Akses kamus dengan kata-kata dasar",
        free: "1000 kata",
        premium: "Tidak terbatas",
        icon: <BookOpen className="w-5 h-5" />,
      },
      {
        name: "Latihan Dasar",
        description: "Latihan bahasa interaktif",
        free: "10/hari",
        premium: "Tidak terbatas",
        icon: <Brain className="w-5 h-5" />,
      },
    ],
  },
  {
    name: "Fitur AI & Teknologi",
    features: [
      {
        name: "AI Translation",
        description: "Terjemahan kontekstual dengan AI",
        free: false,
        premium: true,
        highlight: true,
        icon: <Zap className="w-5 h-5" />,
      },
      {
        name: "Voice Recognition",
        description: "Pengenalan suara dan pengucapan",
        free: "5 menit/hari",
        premium: "Tidak terbatas",
        icon: <Volume2 className="w-5 h-5" />,
      },
      {
        name: "Offline Mode",
        description: "Akses fitur tanpa internet",
        free: false,
        premium: true,
        icon: <Download className="w-5 h-5" />,
      },
      {
        name: "Data Security",
        description: "Perlindungan data pengguna melalui enkripsi",
        free: false,
        premium: true,
        icon: <Shield className="w-5 h-5" />,
      },
    ],
  },
  {
    name: "Pembelajaran",
    features: [
      {
        name: "Materi Pembelajaran",
        description: "Akses ke materi pembelajaran terstruktur",
        free: "Dasar",
        premium: "Lengkap",
        icon: <BookOpen className="w-5 h-5" />,
      },
      {
        name: "Progress Tracking",
        description: "Pantau kemajuan pembelajaran",
        free: "Basic",
        premium: "Advanced",
        icon: <Clock className="w-5 h-5" />,
      },
      {
        name: "Sertifikasi",
        description: "Sertifikat keahlian bahasa",
        free: false,
        premium: true,
        highlight: true,
        icon: <Star className="w-5 h-5" />,
      },
    ],
  },
  {
    name: "Komunitas & Dukungan",
    features: [
      {
        name: "Forum Komunitas",
        description: "Akses ke forum diskusi",
        free: "Read-only",
        premium: "Full Access",
        icon: <Users className="w-5 h-5" />,
      },
      {
        name: "Customer Support",
        description: "Dukungan teknis dan bantuan",
        free: "Email",
        premium: "24/7 Priority",
        icon: <MessageSquare className="w-5 h-5" />,
      },
      {
        name: "Mobile App",
        description: "Akses melalui aplikasi mobile",
        free: "Basic",
        premium: "Premium",
        icon: <Smartphone className="w-5 h-5" />,
      },
    ],
  },
];

const FeatureComparison: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<"free" | "premium">(
    "premium"
  );
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null);
  const [showTooltip, setShowTooltip] = useState<string | null>(null);

  // Filter features based on selected plan
  const getFilteredFeatures = (category: FeatureCategory) => {
    return {
      ...category,
      features: category.features.filter((feature) => {
        if (selectedPlan === "free") {
          return feature.free !== false;
        }
        return feature.premium !== false;
      }),
    };
  };

  // Filter categories that have features after filtering
  const filteredCategories = featureCategories
    .map(getFilteredFeatures)
    .filter((category) => category.features.length > 0);

  return (
    <section className="py-20 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-600 mb-4"
          >
            <Crown className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">
              {selectedPlan === "free" ? "Fitur Gratis" : "Fitur Premium"}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-6"
          >
            {selectedPlan === "free" ? (
              <>
                Fitur{" "}
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Gratis
                </span>
              </>
            ) : (
              <>
                Fitur{" "}
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Premium
                </span>
              </>
            )}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto mb-12"
          >
            {selectedPlan === "free"
              ? "Jelajahi fitur-fitur gratis yang tersedia untuk memulai pembelajaran bahasa Dayak Kenyah"
              : "Nikmati akses penuh ke semua fitur premium untuk pengalaman belajar yang maksimal"}
          </motion.p>

          {/* Plan Toggle */}
          <div className="flex justify-center gap-4 mb-12">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedPlan("free")}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                selectedPlan === "free"
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-white text-gray-600 hover:bg-gray-50"
              }`}
            >
              Free
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedPlan("premium")}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                selectedPlan === "premium"
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
                  : "bg-white text-gray-600 hover:bg-gray-50"
              }`}
            >
              Premium
            </motion.button>
          </div>
        </div>

        {/* Feature List */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedPlan}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden"
          >
            {filteredCategories.map((category, categoryIndex) => (
              <div
                key={category.name}
                className="border-b border-gray-100 last:border-0"
              >
                <div className="px-6 py-4 bg-gray-50">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {category.name}
                  </h3>
                </div>
                <div className="divide-y divide-gray-100">
                  {category.features.map((feature, featureIndex) => (
                    <motion.div
                      key={feature.name}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: categoryIndex * 0.1 + featureIndex * 0.05,
                      }}
                      className={`px-6 py-4 relative ${
                        hoveredFeature === feature.name ? "bg-blue-50" : ""
                      }`}
                      onMouseEnter={() => setHoveredFeature(feature.name)}
                      onMouseLeave={() => setHoveredFeature(null)}
                    >
                      <div className="flex items-center gap-4">
                        <div className="text-blue-600">{feature.icon}</div>
                        <div className="flex-grow">
                          <h4 className="font-medium text-gray-900 flex items-center gap-2">
                            {feature.name}
                            {feature.highlight && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-yellow-400 to-orange-400 text-white">
                                <Sparkles className="w-3 h-3 mr-1" />
                                Popular
                              </span>
                            )}
                          </h4>
                          <p className="text-sm text-gray-600 mt-1">
                            {feature.description}
                          </p>
                        </div>
                        <div className="flex items-center text-right">
                          {typeof feature.free === "boolean" ? (
                            selectedPlan === "free" ? (
                              feature.free ? (
                                <Check className="w-5 h-5 text-green-500" />
                              ) : (
                                <X className="w-5 h-5 text-red-500" />
                              )
                            ) : (
                              <span className="text-sm font-medium text-blue-600">
                                {feature.premium}
                              </span>
                            )
                          ) : (
                            <span className="text-sm text-gray-600">
                              {selectedPlan === "free"
                                ? feature.free
                                : feature.premium}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Info Tooltip */}
                      <button
                        className="absolute right-2 top-2"
                        onMouseEnter={() => setShowTooltip(feature.name)}
                        onMouseLeave={() => setShowTooltip(null)}
                      >
                        <Info className="w-4 h-4 text-gray-400" />
                      </button>

                      <AnimatePresence>
                        {showTooltip === feature.name && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute right-8 top-0 z-10 w-64 p-4 bg-gray-900 text-white text-sm rounded-lg shadow-xl"
                          >
                            <p>{feature.description}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              {selectedPlan === "free"
                ? "Tingkatkan ke Premium"
                : "Mulai Perjalanan Bahasa Anda Sekarang"}
            </h3>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              {selectedPlan === "free"
                ? "Dapatkan akses ke semua fitur premium dan maksimalkan pembelajaran bahasa Anda"
                : "Bergabunglah dengan ribuan pengguna lainnya dan mulai mempelajari bahasa Dayak Kenyah"}
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-8 py-3 bg-white text-blue-600 rounded-lg font-medium hover:shadow-lg transition-all duration-300"
            >
              {selectedPlan === "free" ? "Upgrade ke Premium" : "Mulai Gratis"}
              <ArrowRight className="w-5 h-5 ml-2" />
            </motion.button>
            <p className="text-blue-100 text-sm mt-4">
              Tidak perlu kartu kredit • Batalkan kapan saja
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeatureComparison;
