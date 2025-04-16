"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";
import {
  AnimatePresence,
  motion,
  useAnimation,
  useInView,
} from "framer-motion";
import {
  Globe,
  Users,
  BookOpen,
  Lightbulb,
  Target,
  Rocket,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Heart,
  Star,
  Shield,
  Award,
  CheckCircle2,
  Clock,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface MissionItem {
  icon: React.ReactNode;
  title: string;
  description: string;
  goals: string[];
  metrics: {
    value: string;
    label: string;
  }[];
}

const missionItems: MissionItem[] = [
  {
    icon: <Globe className="w-6 h-6" />,
    title: "Pelestarian Bahasa",
    description:
      "Melestarikan dan mempromosikan bahasa Dayak Kenyah melalui teknologi digital yang inovatif dan mudah diakses.",
    goals: [
      "Digitalisasi 10.000+ kata dan frasa",
      "Dokumentasi cerita rakyat dan tradisi lisan",
      "Pengembangan materi pembelajaran interaktif",
    ],
    metrics: [
      { value: "5000+", label: "Kata Terdokumentasi" },
      { value: "100+", label: "Cerita Rakyat" },
    ],
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Pemberdayaan Komunitas",
    description:
      "Memberdayakan komunitas Dayak Kenyah untuk aktif berpartisipasi dalam pelestarian bahasa dan budaya mereka.",
    goals: [
      "Pelatihan fasilitator bahasa",
      "Program mentor bahasa",
      "Forum diskusi komunitas",
    ],
    metrics: [
      { value: "50+", label: "Fasilitator Aktif" },
      { value: "1000+", label: "Anggota Komunitas" },
    ],
  },
  {
    icon: <BookOpen className="w-6 h-6" />,
    title: "Edukasi Berkelanjutan",
    description:
      "Menyediakan sumber daya pendidikan yang berkelanjutan untuk pembelajaran bahasa Dayak Kenyah yang efektif.",
    goals: [
      "Kurikulum pembelajaran terstruktur",
      "Modul pembelajaran digital",
      "Program sertifikasi bahasa",
    ],
    metrics: [
      { value: "24/7", label: "Akses Pembelajaran" },
      { value: "500+", label: "Modul Tersedia" },
    ],
  },
  {
    icon: <Lightbulb className="w-6 h-6" />,
    title: "Inovasi Teknologi",
    description:
      "Terus berinovasi dalam pengembangan teknologi untuk mendukung pelestarian dan pembelajaran bahasa.",
    goals: [
      "Pengembangan AI untuk terjemahan",
      "Aplikasi pembelajaran mobile",
      "Platform interaktif real-time",
    ],
    metrics: [
      { value: "99%", label: "Akurasi Terjemahan" },
      { value: "4.8/5", label: "Rating Pengguna" },
    ],
  },
];

const visionPillars = [
  {
    icon: <Star className="w-6 h-6" />,
    title: "Keunggulan",
    description: "Menjadi standar emas dalam pelestarian bahasa daerah",
  },
  {
    icon: <Heart className="w-6 h-6" />,
    title: "Kepedulian",
    description: "Mengutamakan kebutuhan komunitas dan pengguna",
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Keberlanjutan",
    description: "Memastikan pelestarian jangka panjang",
  },
];

const OurMissionAndVission: React.FC = () => {
  // Instead of tab state, we use a slide index for carousel
  const [currentSlide, setCurrentSlide] = useState<number>(0); // 0 for vision, 1 for mission
  const [expandedMission, setExpandedMission] = useState<number | null>(0);
  const [hoveredPillar, setHoveredPillar] = useState<number | null>(null);
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const progressBarVariants = {
    hidden: { width: 0 },
    visible: { width: "100%" },
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
    }),
  };

  const nextSlide = () => {
    setCurrentSlide(1); // Go to mission
  };

  const prevSlide = () => {
    setCurrentSlide(0); // Go to vision
  };

  return (
    <section
      ref={ref}
      className="py-20 bg-gradient-to-b from-white to-blue-50 overflow-hidden"
    >
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="text-center mb-16"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 text-blue-600 mb-4"
          >
            <Award className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">Komitmen Kami</span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            Visi & Misi{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              KamusKenyah
            </span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Kami berkomitmen untuk melestarikan dan mempromosikan bahasa Dayak
            Kenyah melalui inovasi teknologi dan pemberdayaan komunitas.
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid md:grid-cols-2 gap-12 items-start"
        >
          {/* Left Column: Content */}
          <div className="w-full relative">
            {/* Carousel Navigation */}
            <div className="flex justify-between mb-8 w-full">
              <div className="text-2xl font-bold text-gray-900 flex items-center">
                {currentSlide === 0 ? (
                  <>
                    <Target className="w-6 h-6 mr-2 text-blue-600" />
                    Visi Kami
                  </>
                ) : (
                  <>
                    <Rocket className="w-6 h-6 mr-2 text-blue-600" />
                    Misi Kami
                  </>
                )}
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={prevSlide}
                  disabled={currentSlide === 0}
                  className={`p-2 rounded-full ${
                    currentSlide === 0
                      ? "text-gray-300 cursor-not-allowed"
                      : "text-blue-600 hover:bg-blue-50"
                  } transition-colors duration-200`}
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextSlide}
                  disabled={currentSlide === 1}
                  className={`p-2 rounded-full ${
                    currentSlide === 1
                      ? "text-gray-300 cursor-not-allowed"
                      : "text-blue-600 hover:bg-blue-50"
                  } transition-colors duration-200`}
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Carousel Indicators */}
            <div className="flex justify-center mb-6">
              <div className="flex space-x-2">
                <button
                  onClick={() => setCurrentSlide(0)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentSlide === 0
                      ? "bg-blue-600 w-10"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label="Go to vision slide"
                />
                <button
                  onClick={() => setCurrentSlide(1)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentSlide === 1
                      ? "bg-blue-600 w-10"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label="Go to mission slide"
                />
              </div>
            </div>

            {/* Carousel Content */}
            <div className="w-full overflow-hidden">
              <AnimatePresence initial={false} custom={currentSlide}>
                {currentSlide === 0 && (
                  <motion.div
                    key="vision"
                    custom={currentSlide}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.5 }}
                    className="w-full"
                  >
                    <div className="bg-white rounded-2xl shadow-lg p-8">
                      <p className="text-gray-600 mb-6 text-lg">
                        Menjadi platform terdepan dalam pelestarian dan promosi
                        bahasa Dayak Kenyah, menghubungkan generasi dan budaya
                        melalui teknologi inovatif.
                      </p>

                      {/* Vision Pillars */}
                      <div className="grid md:grid-cols-3 gap-4 mb-6">
                        {visionPillars.map((pillar, index) => (
                          <motion.div
                            key={pillar.title}
                            className={`p-4 rounded-xl transition-all duration-300 ${
                              hoveredPillar === index
                                ? "bg-blue-50 scale-105"
                                : "bg-gray-50"
                            }`}
                            onMouseEnter={() => setHoveredPillar(index)}
                            onMouseLeave={() => setHoveredPillar(null)}
                          >
                            <div className="flex items-center mb-3">
                              <div className="text-blue-600">{pillar.icon}</div>
                              <h4 className="font-semibold ml-2">
                                {pillar.title}
                              </h4>
                            </div>
                            <p className="text-sm text-gray-600">
                              {pillar.description}
                            </p>
                          </motion.div>
                        ))}
                      </div>

                      {/* Timeline */}
                      <div className="space-y-4">
                        <h4 className="font-semibold text-gray-900 flex items-center">
                          <Clock className="w-5 h-5 mr-2" />
                          Pencapaian Target
                        </h4>
                        {["2024", "2025", "2026"].map((year, index) => (
                          <div key={year} className="relative">
                            <div className="flex items-center mb-2">
                              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-sm font-medium">
                                {index + 1}
                              </div>
                              <div className="ml-3 font-medium text-gray-900">
                                {year}
                              </div>
                            </div>
                            <div className="ml-4 pl-8 border-l-2 border-blue-100">
                              <div className="bg-gray-50 rounded-lg p-4">
                                <motion.div
                                  variants={progressBarVariants}
                                  initial="hidden"
                                  whileInView="visible"
                                  viewport={{ once: true }}
                                  transition={{
                                    duration: 1,
                                    delay: index * 0.3,
                                  }}
                                  className="h-2 bg-blue-200 rounded-full overflow-hidden mb-2"
                                >
                                  <div
                                    className="h-full bg-blue-600 rounded-full"
                                    style={{ width: `${(3 - index) * 33}%` }}
                                  />
                                </motion.div>
                                <p className="text-sm text-gray-600">
                                  Target Pencapaian {(3 - index) * 33}%
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {currentSlide === 1 && (
                  <motion.div
                    key="mission"
                    custom={currentSlide}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.5 }}
                    className="w-full space-y-4"
                  >
                    {missionItems.map((item, index) => (
                      <motion.div
                        key={index}
                        variants={itemVariants}
                        className="bg-white rounded-2xl shadow-lg overflow-hidden w-full"
                      >
                        <div
                          className="p-6 cursor-pointer hover:bg-gray-50 transition-colors duration-300"
                          onClick={() =>
                            setExpandedMission(
                              expandedMission === index ? null : index
                            )
                          }
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="bg-blue-100 p-3 rounded-full mr-4">
                                {item.icon}
                              </div>
                              <h3 className="text-xl font-semibold text-gray-900">
                                {item.title}
                              </h3>
                            </div>
                            <motion.div
                              animate={{
                                rotate: expandedMission === index ? 180 : 0,
                              }}
                              transition={{ duration: 0.3 }}
                            >
                              {expandedMission === index ? (
                                <ChevronUp className="w-5 h-5 text-blue-600" />
                              ) : (
                                <ChevronDown className="w-5 h-5 text-blue-600" />
                              )}
                            </motion.div>
                          </div>
                        </div>

                        <AnimatePresence>
                          {expandedMission === index && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="px-6 pb-6"
                            >
                              <p className="text-gray-600 mb-4">
                                {item.description}
                              </p>

                              {/* Goals */}
                              <div className="mb-6">
                                <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                                  <Target className="w-4 h-4 mr-2" />
                                  Target Pencapaian
                                </h4>
                                <ul className="space-y-2">
                                  {item.goals.map((goal, idx) => (
                                    <li
                                      key={idx}
                                      className="flex items-center text-gray-600"
                                    >
                                      <CheckCircle2 className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                                      <span>{goal}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              {/* Metrics */}
                              <div className="grid grid-cols-2 gap-4">
                                {item.metrics.map((metric, idx) => (
                                  <div
                                    key={idx}
                                    className="bg-gray-50 rounded-lg p-4 text-center"
                                  >
                                    <div className="text-2xl font-bold text-blue-600 mb-1">
                                      {metric.value}
                                    </div>
                                    <div className="text-sm text-gray-600">
                                      {metric.label}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right Column: Illustration and Stats */}
          <motion.div variants={itemVariants} className="relative">
            <div className="rounded-3xl bg-gradient-to-br from-blue-100 to-indigo-50 p-4 sm:p-6 md:p-8 relative overflow-hidden h-auto min-h-fit">
              <div className="absolute inset-0 bg-white/40 backdrop-blur-sm rounded-3xl" />

              <div className="relative z-10 flex flex-col items-center justify-center text-center space-y-6">
                <div className="relative w-full">
                  <img
                    src="/assets/img/Community.jpg"
                    alt="KamusKenyah Vision and Mission"
                    className="w-full h-auto rounded-2xl shadow-lg"
                  />
                  <motion.div
                    className="absolute -top-4 -right-4 bg-white rounded-full p-3 shadow-lg"
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 10, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <Sparkles className="w-6 h-6 text-yellow-400" />
                  </motion.div>
                </div>

                <h4 className="text-xl md:text-2xl font-semibold text-gray-900">
                  Mewujudkan Visi & Misi
                </h4>
                <p className="text-gray-600 text-sm md:text-base">
                  Bersama-sama, kita dapat melestarikan warisan bahasa dan
                  budaya Dayak Kenyah untuk generasi mendatang.
                </p>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full max-w-[90%] sm:max-w-xs bg-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium text-sm md:text-lg hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center shadow-lg"
                >
                  <span className="mr-2">Bergabung Sekarang</span>
                  <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5" />
                </motion.button>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-yellow-100 rounded-full opacity-70 z-0" />
            <div className="absolute -top-8 -left-8 w-24 h-24 bg-green-100 rounded-full opacity-70 z-0" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default OurMissionAndVission;
