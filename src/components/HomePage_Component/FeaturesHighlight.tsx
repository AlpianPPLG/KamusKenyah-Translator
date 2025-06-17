"use client";

import { useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  type Variants,
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
  Trophy,
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
  const [direction, setDirection] = useState(0); // State untuk arah navigasi
  const [isHovered, setIsHovered] = useState<number | null>(null);

  // Mengelompokkan stats menjadi dua slide
  const slide1: Stat[] = [
    {
      icon: <Users className="w-6 h-6 text-blue-600" />,
      value: "10.000+",
      label: "Pengguna",
      description: "Pengguna Aktif",
      color: "from-blue-100 to-indigo-100",
      shadowColor: "shadow-blue-200/30",
      tooltip: "Lebih dari 10.000 pengguna aktif setiap bulan!",
    },
    {
      icon: <Globe2 className="w-6 h-6 text-emerald-600" />,
      value: "50+",
      label: "Bahasa",
      description: "yang Didukung",
      color: "from-emerald-100 to-teal-100",
      shadowColor: "shadow-emerald-200/30",
      tooltip: "Mendukung lebih dari 50 bahasa lokal dan internasional.",
    },
    {
      icon: <Zap className="w-6 h-6 text-amber-600" />,
      value: "<1",
      label: "Detik",
      description: "Kecepatan Terjemahan",
      color: "from-amber-100 to-orange-100",
      shadowColor: "shadow-amber-200/30",
      tooltip: "Terjemahan instan dengan latensi kurang dari 1 detik.",
    },
    {
      icon: <Star className="w-6 h-6 text-purple-600" />,
      value: "4.8/5",
      label: "Rating",
      description: "di TrustPilot",
      color: "from-purple-100 to-pink-100",
      shadowColor: "shadow-purple-200/30",
      tooltip: "Rating tinggi dari pengguna di platform TrustPilot.",
    },
  ];

  const slide2: Stat[] = [
    {
      icon: <ArrowUpRight className="w-6 h-6 text-cyan-600" />,
      value: "50%",
      label: "Hasil",
      description: "Terjemahan yang Akurat",
      color: "from-cyan-100 to-sky-100",
      shadowColor: "shadow-cyan-200/30",
      tooltip: "Terjemahan akurat dengan tingkat akurasi sekitar 50%.",
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-pink-600" />,
      value: "30%",
      label: "Pengguna",
      description: "yang Mendapatkan Hasil Terbaik",
      color: "from-pink-100 to-rose-100",
      shadowColor: "shadow-pink-200/30",
      tooltip: "30% dari pengguna mendapatkan hasil terbaik.",
    },
    {
      icon: <Sparkles className="w-6 h-6 text-amber-600" />,
      value: "99%",
      label: "Tingkat",
      description: "Akurasi Terjemahan",
      color: "from-amber-100 to-orange-100",
      shadowColor: "shadow-amber-200/30",
      tooltip: "Tingkat akurasi terjemahan sekitar 99%.",
    },
    {
      icon: <Trophy className="w-6 h-6 text-yellow-600" />,
      value: "1st",
      label: "Peringkat",
      description: "Terbaik",
      color: "from-yellow-100 to-amber-100",
      shadowColor: "shadow-yellow-200/30",
      tooltip: "Peringkat terbaik di kategori terjemahan.",
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
      icon: <BookOpen className="w-6 h-6 text-emerald-600" />,
      title: "Pembelajaran Interaktif",
      detail:
        "Fitur edukasi untuk memahami bahasa Dayak Kenyah secara mendalam.",
    },
    {
      icon: <Clock className="w-6 h-6 text-amber-600" />,
      title: "Kecepatan Tinggi",
      detail: "Terjemahan cepat dengan performa optimal di semua platform.",
    },
  ];

  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  // Auto-slide untuk statistik, hanya berpindah antara dua slide
  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1); // Set direction untuk animasi
      setCurrentStat((prev) => (prev + 1) % 2); // Hanya berpindah antara 0 (slide 1) dan 1 (slide 2)
    }, 5000); // Ganti statistik setiap 5 detik
    return () => clearInterval(interval);
  }, []);

  // Fungsi navigasi manual untuk statistik, hanya berpindah antara dua slide
  const handleNextStat = () => {
    setDirection(1);
    setCurrentStat((prev) => (prev + 1) % 2); // Hanya berpindah antara 0 dan 1
  };

  const handlePrevStat = () => {
    setDirection(-1);
    setCurrentStat((prev) => (prev - 1 + 2) % 2); // Hanya berpindah antara 0 dan 1
  };

  // Animasi untuk statistik carousel - Fixed TypeScript error by properly typing the variants
  const statVariants: Variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9,
    }),
  };

  // Variasi untuk kontainer agar tetap stabil
  const containerVariants: Variants = {
    hidden: { height: "auto" }, // Tinggi otomatis berdasarkan konten
    visible: {
      height: "auto",
      transition: { duration: 0.5, ease: "easeInOut" },
    },
  };

  return (
    <section className="relative py-20 bg-gradient-to-b from-blue-50 to-white overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl opacity-30" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl opacity-30" />
        <motion.div
          className="absolute top-1/3 left-1/3 w-32 h-32 bg-gradient-to-br from-yellow-200 to-orange-200 rounded-full opacity-20"
          animate={{ rotate: 360 }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute top-2/3 right-1/3 w-24 h-24 bg-gradient-to-br from-green-200 to-emerald-200 rounded-full opacity-20"
          animate={{ rotate: -360, scale: [1, 1.1, 1] }}
          transition={{
            duration: 15,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Pencapaian{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              KamusKenyah
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Jelajahi dampak luar biasa yang telah kami capai dalam pelestarian
            dan pembelajaran bahasa Dayak Kenyah melalui teknologi modern
          </p>
        </motion.div>

        {/* Stats Carousel */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ y, scale }}
          className="relative mb-20"
        >
          <div className="overflow-hidden relative h-full">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentStat}
                custom={direction}
                variants={statVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                style={{
                  position: currentStat === 0 ? "relative" : "absolute",
                  width: "100%",
                  top: 0,
                  left: 0,
                }}
              >
                {(currentStat === 0 ? slide1 : slide2).map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -5, scale: 1.05, rotate: 2 }}
                    onMouseEnter={() => setIsHovered(index)} // Gunakan setIsHovered untuk efek hover
                    onMouseLeave={() => setIsHovered(null)} // Gunakan setIsHovered untuk reset hover
                    className={`relative bg-white rounded-[20px] p-6 shadow-md ${stat.shadowColor} overflow-hidden group`}
                  >
                    {/* Background Gradient with Dynamic Effect */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                    >
                      {isHovered === index && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 0.5, scale: 1 }}
                          exit={{ opacity: 0, scale: 0 }}
                          transition={{ duration: 0.3 }}
                          className="absolute top-4 left-4 text-yellow-500"
                        >
                          <Sparkles className="w-6 h-6" />
                        </motion.div>
                      )}
                    </div>

                    {/* Icon with Animation */}
                    {stat.icon && (
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 15 }}
                        className={`inline-flex p-3 rounded-lg bg-${
                          stat.color.split("from-")[1].split(" ")[0]
                        } text-white mb-4`}
                      >
                        {stat.icon}
                      </motion.div>
                    )}

                    {/* Content */}
                    <div className="space-y-2">
                      <div className="flex items-baseline gap-2">
                        <h3 className="text-3xl font-bold text-gray-900">
                          {stat.value}
                        </h3>
                        <motion.div
                          animate={{ y: [0, -10, 0] }}
                          transition={{
                            duration: 2,
                            repeat: Number.POSITIVE_INFINITY,
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

                    {/* Navigation Arrow */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      <ArrowUpRight className="w-5 h-5 text-gray-400" />
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Arrows for Stats Carousel */}
          <button
            title="Previous slide"
            onClick={handlePrevStat}
            className="absolute top-1/2 left-4 -translate-y-1/2 bg-white p-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300 group"
            onMouseEnter={() => setIsHovered(-1)} // Gunakan setIsHovered untuk efek hover pada panah kiri
            onMouseLeave={() => setIsHovered(null)} // Gunakan setIsHovered untuk reset hover
          >
            <ChevronLeft className="w-6 h-6 text-blue-600 group-hover:scale-110 transition-transform" />
          </button>
          <button
            title="Next slide"
            onClick={handleNextStat}
            className="absolute top-1/2 right-4 -translate-y-1/2 bg-white p-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300 group"
            onMouseEnter={() => setIsHovered(-2)} // Gunakan setIsHovered untuk efek hover pada panah kanan
            onMouseLeave={() => setIsHovered(null)} // Gunakan setIsHovered untuk reset hover
          >
            <ChevronRight className="w-6 h-6 text-blue-600 group-hover:scale-110 transition-transform" />
          </button>

          {/* Dots Navigation for Stats */}
          <div className="flex justify-center mt-6 space-x-2">
            {Array.from({ length: 2 }).map((_, index) => (
              <button
                title={`Navigate to slide ${index + 1}`}
                key={index}
                onClick={() => {
                  setDirection(index > currentStat ? 1 : -1); // Set direction berdasarkan navigasi
                  setCurrentStat(index);
                }}
                onMouseEnter={() => setIsHovered(index)} // Gunakan setIsHovered untuk efek hover pada dots
                onMouseLeave={() => setIsHovered(null)} // Gunakan setIsHovered untuk reset hover
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -5, scale: 1.05, rotate: 2 }}
              onMouseEnter={() => setIsHovered(index + 2)} // Gunakan setIsHovered untuk efek hover pada fitur (offset untuk stats)
              onMouseLeave={() => setIsHovered(null)} // Gunakan setIsHovered untuk reset hover
              className={`bg-white rounded-[20px] shadow-md p-6 overflow-hidden relative group`}
            >
              {/* Background Decoration */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full -mr-12 -mt-12 opacity-20 group-hover:opacity-30 transition-opacity duration-300" />
              <div className="flex items-center space-x-4">
                <div
                  className={`p-3 rounded-lg ${
                    index === 0
                      ? "bg-blue-600"
                      : index === 1
                      ? "bg-emerald-600"
                      : "bg-amber-600"
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
              {isHovered === index + 2 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 0.5, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute top-4 left-4 text-yellow-500"
                >
                  <Sparkles className="w-6 h-6" />
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div style={{ y }} className="text-center mt-16">
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Bergabunglah dengan komunitas kami dan jadilah bagian dari
            perjalanan pelestarian bahasa Dayak Kenyah dengan fitur-fitur
            canggih kami
          </p>
          <motion.button
            whileHover={{ scale: 1.05, rotate: 2 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-[20px] font-medium hover:shadow-lg transition-all duration-300"
          >
            Mulai Sekarang
            <ArrowUpRight className="ml-2 w-4 h-4" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesHighlight;
