"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import {
  Laptop,
  Smartphone,
  Tablet,
  Globe,
  Download,
  ExternalLink,
  Check,
  ArrowRight,
  Sparkles,
} from "lucide-react";

interface PlatformInfo {
  name: string;
  icon: React.ReactNode;
  color: string;
  description: string;
  features: string[];
  downloadLink: string;
  screenshot?: string;
  stats?: {
    label: string;
    value: string;
  }[];
}

const platforms: PlatformInfo[] = [
  {
    name: "Desktop",
    icon: <Laptop className="w-12 h-12" />,
    color: "bg-gradient-to-r from-blue-500 to-blue-600",
    description:
      "Akses KamusKenyah di komputer Anda dengan aplikasi desktop yang kuat dan kaya fitur.",
    features: [
      "Kinerja tinggi untuk pencarian cepat",
      "Integrasi dengan sistem operasi untuk akses mudah",
      "Penyimpanan offline untuk akses tanpa internet",
      "Mode belajar fokus dengan tampilan distraksi minimal",
      "Dukungan keyboard penuh untuk navigasi cepat",
    ],
    downloadLink: "/download/desktop",
    screenshot:
      "/public/lovable-uploads/6efc8361-baf3-4584-a407-13b2c34b9cdd.png",
    stats: [
      { label: "Ukuran", value: "45MB" },
      { label: "Versi", value: "2.4.1" },
      { label: "Pengguna", value: "15K+" },
    ],
  },
  {
    name: "Mobile",
    icon: <Smartphone className="w-12 h-12" />,
    color: "bg-gradient-to-r from-purple-500 to-purple-600",
    description:
      "Bawa KamusKenyah ke mana saja dengan aplikasi mobile kami yang responsif dan intuitif.",
    features: [
      "Desain responsif untuk semua ukuran smartphone",
      "Notifikasi push untuk pengingat belajar harian",
      "Mode offline untuk belajar tanpa internet",
      "Fitur pencarian suara untuk kenyamanan",
      "Widget layar beranda untuk akses cepat",
    ],
    downloadLink: "/download/mobile",
    screenshot:
      "/public/lovable-uploads/ad5dd1b8-ed84-4a80-9235-150f320bc60f.png",
    stats: [
      { label: "Ukuran", value: "22MB" },
      { label: "Versi", value: "3.1.2" },
      { label: "Pengguna", value: "25K+" },
    ],
  },
  {
    name: "Tablet",
    icon: <Tablet className="w-12 h-12" />,
    color: "bg-gradient-to-r from-amber-500 to-amber-600",
    description:
      "Nikmati pengalaman belajar yang imersif dan interaktif di tablet Anda.",
    features: [
      "Tampilan layar penuh yang dioptimalkan",
      "Dukungan stylus untuk penulisan alami",
      "Mode belajar khusus tablet dengan konten interaktif",
      "Fitur split-screen untuk multitasking efektif",
      "Antarmuka sentuh yang intuitif",
    ],
    downloadLink: "/download/tablet",
    screenshot: "/public/placeholder.svg",
    stats: [
      { label: "Ukuran", value: "38MB" },
      { label: "Versi", value: "2.8.5" },
      { label: "Pengguna", value: "10K+" },
    ],
  },
  {
    name: "Web",
    icon: <Globe className="w-12 h-12" />,
    color: "bg-gradient-to-r from-emerald-500 to-emerald-600",
    description:
      "Akses KamusKenyah dari browser mana pun, kapan pun, tanpa instalasi.",
    features: [
      "Tidak perlu instalasi, langsung akses",
      "Sinkronisasi lintas perangkat secara real-time",
      "Pembaruan otomatis tanpa intervensi pengguna",
      "Kompatibilitas dengan semua browser modern",
      "Pengalaman pengguna yang cepat dan responsif",
    ],
    downloadLink: "https://app.kamuskenyah.com",
    screenshot: "/public/placeholder.svg",
    stats: [
      { label: "Pengguna Aktif", value: "50K+" },
      { label: "Waktu Muat", value: "1.2s" },
      { label: "Uptime", value: "99.9%" },
    ],
  },
];

const MultiPlatformCompatibility: React.FC = () => {
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const controls = useAnimation();
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const handlePlatformClick = (platformName: string) => {
    if (isAnimating) return; // Prevent clicking while animating
    if (selectedPlatform === platformName) {
      setSelectedPlatform(null);
    } else {
      setSelectedPlatform(platformName);
    }
    setIsAnimating(true);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  // Monitor when the section comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById("multi-platform-section");
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  return (
    <section
      id="multi-platform-section"
      className="py-20 bg-gradient-to-b from-blue-50 to-white overflow-x-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.div
            variants={fadeInUp}
            className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 text-blue-600 mb-4"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">Fleksibilitas Maksimal</span>
          </motion.div>

          <motion.h2
            variants={fadeInUp}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            Kompatibilitas{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              Multi-Platform
            </span>
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            KamusKenyah tersedia di berbagai platform, memberikan Anda akses ke
            pembelajaran bahasa Dayak Kenyah di mana pun Anda berada.
          </motion.p>
        </motion.div>

        {/* Platform Cards */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {platforms.map((platform) => (
            <motion.div
              key={platform.name}
              variants={itemVariants}
              whileHover={{
                y: -10,
                boxShadow:
                  "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
              whileTap={{ y: 0 }}
              className={`bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transition-all duration-300 border-2 ${
                selectedPlatform === platform.name
                  ? "border-blue-500"
                  : "border-transparent"
              }`}
              onClick={() => handlePlatformClick(platform.name)}
            >
              <div
                className="h-2 w-full"
                style={{ background: platform.color }}
              />
              <div className="p-6">
                <div className="flex items-center justify-center mb-6">
                  <div
                    className={`${platform.color.replace(
                      "bg-gradient-to-r",
                      "bg"
                    )} text-white p-4 rounded-full shadow-md`}
                  >
                    {platform.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-center mb-3">
                  {platform.name}
                </h3>
                <p className="text-gray-600 text-center mb-4 line-clamp-3">
                  {platform.description}
                </p>
                <div className="text-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`inline-flex items-center text-sm px-3 py-1 rounded-full ${
                      selectedPlatform === platform.name
                        ? "bg-blue-100 text-blue-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    <span>Lihat Detail</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Expanded Platform Details */}
        <AnimatePresence mode="wait">
          {selectedPlatform && (
            <motion.div
              key={selectedPlatform}
              initial={{ opacity: 0, y: 20, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -20, height: 0 }}
              transition={{ duration: 0.5 }}
              onAnimationComplete={() => setIsAnimating(false)}
              className="mb-16"
            >
              {platforms.map(
                (platform) =>
                  platform.name === selectedPlatform && (
                    <div
                      key={platform.name}
                      className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100"
                    >
                      <div
                        className="h-3 w-full"
                        style={{ background: platform.color }}
                      />
                      <div className="grid md:grid-cols-2 gap-8 p-8">
                        <div>
                          <div className="flex items-center mb-6">
                            <div
                              className={`${platform.color.replace(
                                "bg-gradient-to-r",
                                "bg"
                              )} text-white p-3 rounded-full shadow-md mr-4`}
                            >
                              {platform.icon}
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900">
                              KamusKenyah untuk {platform.name}
                            </h3>
                          </div>

                          <p className="text-gray-600 mb-6 text-lg">
                            {platform.description}
                          </p>

                          <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                            <Sparkles className="w-5 h-5 mr-2 text-blue-500" />
                            Fitur Utama:
                          </h4>

                          <ul className="space-y-3 mb-6">
                            {platform.features.map((feature, index) => (
                              <motion.li
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{
                                  duration: 0.3,
                                  delay: index * 0.1,
                                }}
                                className="flex items-start text-gray-700"
                              >
                                <span className="bg-green-100 p-1 rounded-full text-green-600 mr-3 mt-1 flex-shrink-0">
                                  <Check className="w-4 h-4" />
                                </span>
                                <span>{feature}</span>
                              </motion.li>
                            ))}
                          </ul>

                          {platform.stats && (
                            <div className="grid grid-cols-3 gap-4 mb-6">
                              {platform.stats.map((stat, index) => (
                                <div
                                  key={index}
                                  className="bg-gray-50 rounded-lg p-3 text-center"
                                >
                                  <div className="text-lg font-bold text-gray-900">
                                    {stat.value}
                                  </div>
                                  <div className="text-xs text-gray-500">
                                    {stat.label}
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}

                          <motion.a
                            href={platform.downloadLink}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`inline-flex items-center px-6 py-3 rounded-lg text-white shadow-lg ${platform.color} hover:opacity-90 transition-all duration-300`}
                          >
                            {platform.name === "Web" ? (
                              <>
                                <ExternalLink className="w-5 h-5 mr-2" />
                                Akses Web App
                              </>
                            ) : (
                              <>
                                <Download className="w-5 h-5 mr-2" />
                                Download untuk {platform.name}
                              </>
                            )}
                          </motion.a>
                        </div>

                        <div className="flex justify-center items-center">
                          {platform.screenshot && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.5 }}
                              className="relative"
                            >
                              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 rounded-xl" />
                              <img
                                src={platform.screenshot}
                                alt={`${platform.name} screenshot`}
                                className="w-full max-w-md h-auto rounded-xl shadow-lg relative z-10"
                              />
                              <div className="absolute -bottom-3 -right-3 z-0 w-full h-full bg-gray-200 rounded-xl" />
                            </motion.div>
                          )}
                        </div>
                      </div>
                    </div>
                  )
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Cross-Platform Experience Section */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="bg-gradient-to-tr from-blue-50 to-indigo-50 rounded-2xl p-8 shadow-lg"
        >
          <motion.div variants={fadeInUp} className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Pengalaman Belajar yang Mulus Antar Platform
            </h3>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Mulai belajar di satu perangkat dan lanjutkan dengan mulus di
              perangkat lain. KamusKenyah memastikan pengalaman yang konsisten
              di semua platform.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {[
              {
                title: "Sinkronisasi Otomatis",
                description:
                  "Kemajuan belajar Anda disinkronkan secara real-time antar perangkat",
                icon: (
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <Globe className="w-8 h-8 text-blue-500" />
                  </motion.div>
                ),
              },
              {
                title: "Antarmuka yang Konsisten",
                description:
                  "Pengalaman pengguna yang familiar pada semua perangkat",
                icon: <Laptop className="w-8 h-8 text-purple-500" />,
              },
              {
                title: "Lanjutkan Belajar Dimana Saja",
                description:
                  "Berhenti dan mulai lagi dari perangkat mana pun dengan mulus",
                icon: <Smartphone className="w-8 h-8 text-emerald-500" />,
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white rounded-xl shadow-md p-6 text-center"
              >
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h4>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div variants={fadeInUp} className="text-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Coba KamusKenyah Sekarang
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default MultiPlatformCompatibility;
