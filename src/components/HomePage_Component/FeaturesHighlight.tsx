import React, { useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  Users,
  Globe2,
  Zap,
  Star,
  ArrowUpRight,
  BarChart3,
  Sparkles,
  Brain,
  BookOpen,
  Clock,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// Interface untuk statistik
interface Stat {
  icon: React.ReactNode;
  value: string;
  label: string;
  description: string;
  color: string;
  shadowColor: string;
  tooltip?: string;
}

// Interface untuk fitur tambahan
interface Feature {
  icon: React.ReactNode;
  title: string;
  detail: string;
}

const FeaturesHighlight: React.FC = () => {
  const [currentStat, setCurrentStat] = useState(0);
  const [direction, setDirection] = useState(0); // Tambahkan state untuk direction
  const [isHovered, setIsHovered] = useState<number | null>(null);

  const stats: Stat[] = [
    {
      icon: <Users className="w-6 h-6" />,
      value: "10.000+",
      label: "Pengguna",
      description: "Pengguna Aktif",
      color: "from-blue-600 to-indigo-600",
      shadowColor: "shadow-blue-500/20",
      tooltip: "Lebih dari 10.000 pengguna aktif setiap bulan!",
    },
    {
      icon: <Globe2 className="w-6 h-6" />,
      value: "50+",
      label: "Bahasa",
      description: "yang Didukung",
      color: "from-emerald-600 to-teal-600",
      shadowColor: "shadow-emerald-500/20",
      tooltip: "Mendukung lebih dari 50 bahasa lokal dan internasional.",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      value: "<1",
      label: "Detik",
      description: "Kecepatan Terjemahan",
      color: "from-amber-500 to-orange-600",
      shadowColor: "shadow-amber-500/20",
      tooltip: "Terjemahan instan dengan latensi kurang dari 1 detik.",
    },
    {
      icon: <Star className="w-6 h-6" />,
      value: "4.8/5",
      label: "Rating",
      description: "di TrustPilot",
      color: "from-purple-600 to-pink-600",
      shadowColor: "shadow-purple-500/20",
      tooltip: "Rating tinggi dari pengguna di platform TrustPilot.",
    },
  ];

  const features: Feature[] = [
    {
      icon: <Brain className="w-6 h-6" />,
      title: "AI Canggih",
      detail:
        "Teknologi AI mutakhir untuk terjemahan yang akurat dan kontekstual.",
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Pembelajaran Interaktif",
      detail:
        "Fitur edukasi untuk memahami bahasa Dayak Kenyah secara mendalam.",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Kecepatan Tinggi",
      detail: "Terjemahan cepat dengan performa optimal di semua platform.",
    },
  ];

  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  // Auto-slide untuk statistik
  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1); // Set direction untuk animasi
      setCurrentStat((prev) => (prev + 1) % stats.length);
    }, 5000); // Ganti statistik setiap 5 detik
    return () => clearInterval(interval);
  }, [stats.length]);

  // Fungsi navigasi manual untuk statistik
  const handleNextStat = () => {
    setDirection(1);
    setCurrentStat((prev) => (prev + 1) % stats.length);
  };

  const handlePrevStat = () => {
    setDirection(-1);
    setCurrentStat((prev) => (prev - 1 + stats.length) % stats.length);
  };

  // Animasi untuk statistik carousel
  const statVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0,
      scale: 0.9,
    }),
  };

  return (
    <section className="relative py-28 overflow-hidden bg-gradient-to-b from-gray-50 to-blue-50">
      {/* Decorative Elements with Sparkles */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full -translate-x-1/3 -translate-y-1/3 blur-3xl opacity-30" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl opacity-30" />
        <motion.div
          className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-br from-yellow-200 to-orange-200 rounded-full opacity-20"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        {/* Tambahkan Sparkles sebagai elemen dekoratif interaktif */}
        <motion.div
          className="absolute top-1/3 right-1/4 w-12 h-12 text-yellow-500 opacity-0 hover:opacity-100 transition-opacity duration-300"
          animate={{ rotate: 360, scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          onMouseEnter={() => setIsHovered(0)} // Gunakan isHovered untuk efek hover
          onMouseLeave={() => setIsHovered(null)}
        >
          <Sparkles className="w-full h-full" />
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Pencapaian{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              KamusKenyah
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Jelajahi dampak luar biasa yang telah kami capai dalam pelestarian
            dan pembelajaran bahasa Dayak Kenyah melalui teknologi modern
          </p>
        </motion.div>
        {/* Stats Carousel */}
        <motion.div style={{ y, scale }} className="relative mb-24">
          <div className="overflow-hidden">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentStat}
                custom={direction}
                variants={statVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
              >
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -10, scale: 1.05 }}
                    className={`relative bg-white rounded-2xl p-6 shadow-lg ${stat.shadowColor} overflow-hidden group`}
                    onMouseEnter={() => setIsHovered(index)} // Gunakan isHovered untuk efek hover
                    onMouseLeave={() => setIsHovered(null)}
                  >
                    {/* Background Gradient */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                    />

                    {/* Icon */}
                    <div
                      className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${stat.color} text-white mb-4`}
                    >
                      {stat.icon}
                    </div>

                    {/* Content */}
                    <div className="space-y-2">
                      <div className="flex items-baseline gap-2">
                        <h3 className="text-4xl font-bold text-gray-900">
                          {stat.value}
                        </h3>
                        <motion.div
                          animate={{ y: [0, -10, 0] }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                          className="text-gray-400"
                        >
                          <BarChart3 className="w-4 h-4" />
                        </motion.div>
                      </div>
                      <p className="text-lg font-medium text-gray-700">
                        {stat.label}
                      </p>
                      <p className="text-sm text-gray-500">
                        {stat.description}
                      </p>
                    </div>

                    {/* Tooltip Interaktif */}
                    {stat.tooltip && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileHover={{ opacity: 1, scale: 1 }}
                        className="absolute bottom-4 right-4 bg-gray-900 text-white text-xs px-3 py-2 rounded-lg shadow-md invisible group-hover:visible transition-all duration-300"
                      >
                        {stat.tooltip}
                      </motion.div>
                    )}

                    {/* Hover Effect with Sparkles */}
                    {isHovered === index && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        className="absolute top-4 left-4 text-yellow-500 opacity-50"
                      >
                        <Sparkles className="w-6 h-6" />
                      </motion.div>
                    )}

                    {/* Hover Effect */}
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ArrowUpRight className={`w-5 h-5 text-gray-400`} />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Arrows for Stats Carousel */}
          <button
            onClick={handlePrevStat}
            className="absolute top-1/2 left-4 -translate-y-1/2 bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            <ChevronLeft className="w-6 h-6 text-blue-600 group-hover:scale-110 transition-transform" />
          </button>
          <button
            onClick={handleNextStat}
            className="absolute top-1/2 right-4 -translate-y-1/2 bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            <ChevronRight className="w-6 h-6 text-blue-600 group-hover:scale-110 transition-transform" />
          </button>

          {/* Dots Navigation for Stats */}
          <div className="flex justify-center mt-6 space-x-2">
            {stats.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentStat ? 1 : -1); // Set direction berdasarkan navigasi
                  setCurrentStat(index);
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentStat
                    ? "bg-blue-600 scale-125"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </motion.div>
        {/* Additional Features Highlight */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-24">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -10, scale: 1.05 }}
              className="bg-white rounded-2xl shadow-lg p-8 overflow-hidden relative group"
              onMouseEnter={() => setIsHovered(index + stats.length)} // Gunakan isHovered untuk fitur
              onMouseLeave={() => setIsHovered(null)}
            >
              {/* Background Decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full -mr-16 -mt-16 opacity-20 group-hover:opacity-30 transition-opacity duration-300" />
              <div className="flex items-center space-x-4">
                <div
                  className={`p-3 rounded-lg bg-gradient-to-br ${
                    index === 0
                      ? "from-blue-600 to-indigo-600"
                      : index === 1
                      ? "from-emerald-600 to-teal-600"
                      : "from-amber-500 to-orange-600"
                  } text-white`}
                >
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.detail}</p>
                </div>
              </div>
              {/* Interactive Element */}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="absolute bottom-4 right-4 bg-blue-600 text-white text-xs px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                Pelajari Lebih Lanjut
                <ArrowUpRight className="inline w-4 h-4 ml-1" />
              </motion.div>

              {/* Sparkles Effect on Hover */}
              {isHovered === index + stats.length && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 0.5, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  className="absolute top-4 left-4 text-yellow-500"
                >
                  <Sparkles className="w-6 h-6" />
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
        {/* Parallax CTA */}
        <motion.div style={{ y }} className="text-center mt-16">
          <p className="text-gray-600 mb-6 max-w-3xl mx-auto">
            Bergabunglah dengan komunitas kami dan jadilah bagian dari
            perjalanan pelestarian bahasa Dayak Kenyah dengan fitur-fitur
            canggih kami
          </p>
          <motion.button
            whileHover={{ scale: 1.05, rotate: 2 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium hover:shadow-xl transition-all duration-300"
          >
            Mulai Sekarang
            <ArrowUpRight className="ml-2 w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>

      {/* Floating Sparkles for Visual Effect */}
      <motion.div
        className="absolute top-1/3 right-1/4 w-16 h-16 bg-gradient-to-br from-yellow-300 to-orange-300 rounded-full opacity-20"
        animate={{ rotate: 360, scale: [1, 1.1, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />
    </section>
  );
};

export default FeaturesHighlight;
