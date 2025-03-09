"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Globe,
  Zap,
  Users,
  BookOpen,
  ArrowRight,
  Check,
  Languages,
  Laptop,
  Smartphone,
  Tablet,
  Brain,
  Headphones,
  Share2,
  MessageSquare,
  Star,
} from "lucide-react";
import { useInView } from "react-intersection-observer";

// Interface untuk data FAQ
interface Feature {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  benefits: string[];
  stats: {
    value: string;
    label: string;
    icon?: React.ReactNode;
  }[];
}

const features: Feature[] = [
  {
    id: 1,
    title: "Terjemahan AI Canggih",
    description:
      "Teknologi AI terkini untuk terjemahan akurat dan natural antara Bahasa Indonesia dan Dayak Kenyah.",
    icon: <Brain className="w-6 h-6" />,
    benefits: [
      "Terjemahan real-time",
      "Pemahaman konteks",
      "Pembelajaran adaptif",
      "Akurasi tinggi",
    ],
    stats: [
      { value: "99%", label: "Akurasi", icon: <Star className="w-5 h-5" /> },
      { value: "<1s", label: "Kecepatan", icon: <Zap className="w-5 h-5" /> },
    ],
  },
  {
    id: 2,
    title: "Pembelajaran Interaktif",
    description:
      "Platform pembelajaran yang dirancang khusus untuk memudahkan penguasaan bahasa Dayak Kenyah.",
    icon: <BookOpen className="w-6 h-6" />,
    benefits: [
      "Materi terstruktur",
      "Latihan interaktif",
      "Progress tracking",
      "Sertifikasi",
    ],
    stats: [
      { value: "1000+", label: "Pelajaran" },
      { value: "24/7", label: "Akses" },
    ],
  },
  {
    id: 3,
    title: "Komunitas & Kolaborasi",
    description:
      "Ruang digital untuk berinteraksi dan berbagi pengetahuan dengan komunitas penutur Dayak Kenyah.",
    icon: <Users className="w-6 h-6" />,
    benefits: [
      "Forum diskusi",
      "Berbagi pengalaman",
      "Mentor native",
      "Event virtual",
    ],
    stats: [
      { value: "10K+", label: "Anggota" },
      { value: "500+", label: "Diskusi" },
    ],
  },
  {
    id: 4,
    title: "Global Reach",
    description:
      "Mencapai pengguna di seluruh dunia melalui platform kami yang inovatif.",
    icon: <Globe className="w-6 h-6" />, // Using Globe icon here
    benefits: [
      "Aksesibilitas global",
      "Kemitraan internasional",
      "Pengalaman multikultural",
    ],
    stats: [
      { value: "50+", label: "Negara", icon: <Globe className="w-5 h-5" /> },
      { value: "1M+", label: "Pengguna" },
    ],
  },
];

const FeatureHero: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState<number>(1);
  const [hoveredBenefit, setHoveredBenefit] = useState<string | null>(null);

  // Use useInView for animation trigger
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section
      ref={ref}
      className="relative min-h-screen pt-24 overflow-hidden bg-gradient-to-b from-white to-blue-50"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full opacity-20 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute -bottom-20 -left-20 w-60 h-60 bg-indigo-100 rounded-full opacity-20 blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 text-blue-600 mb-4"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">Fitur Unggulan</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
          >
            Fitur Lengkap untuk{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Pengalaman Terbaik
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto mb-8"
          >
            Nikmati berbagai fitur canggih yang dirancang khusus untuk
            memudahkan Anda dalam mempelajari dan melestarikan bahasa Dayak
            Kenyah
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300 flex items-center">
              Jelajahi Fitur
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
            <button className="px-8 py-3 border border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-all duration-300 flex items-center">
              Lihat Demo
              <Share2 className="w-5 h-5 ml-2" />
            </button>
          </motion.div>
        </div>

        {/* Features Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-start mb-20">
          {/* Left: Feature List */}
          <div className="space-y-6">
            {features.map((feature) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: feature.id * 0.1 }}
                className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 ${
                  activeFeature === feature.id
                    ? "bg-white shadow-lg scale-105"
                    : "bg-gray-50 hover:bg-white hover:shadow-md"
                }`}
                onClick={() => setActiveFeature(feature.id)}
              >
                <div className="flex items-start">
                  <div
                    className={`p-3 rounded-lg ${
                      activeFeature === feature.id
                        ? "bg-blue-600 text-white"
                        : "bg-blue-100 text-blue-600"
                    }`}
                  >
                    {feature.icon}
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right: Feature Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-2xl shadow-xl p-8 relative"
          >
            <AnimatePresence mode="wait">
              {features.map(
                (feature) =>
                  feature.id === activeFeature && (
                    <motion.div
                      key={feature.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="mb-8">
                        <h4 className="text-2xl font-semibold text-gray-900 mb-4">
                          Manfaat & Keunggulan
                        </h4>
                        <div className="grid sm:grid-cols-2 gap-4">
                          {feature.benefits.map((benefit) => (
                            <motion.div
                              key={benefit}
                              className="flex items-center p-3 rounded-lg bg-gray-50 hover:bg-blue-50 transition-colors duration-300"
                              onMouseEnter={() => setHoveredBenefit(benefit)}
                              onMouseLeave={() => setHoveredBenefit(null)}
                              whileHover={{ scale: 1.05 }}
                            >
                              <Check
                                className={`w-5 h-5 mr-2 ${
                                  hoveredBenefit === benefit
                                    ? "text-blue-600"
                                    : "text-green-500"
                                }`}
                              />
                              <span className="text-gray-700">{benefit}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      <div className="mb-8">
                        <h4 className="text-2xl font-semibold text-gray-900 mb-4">
                          Statistik
                        </h4>
                        <div className="grid grid-cols-2 gap-4">
                          {feature.stats.map((stat, index) => (
                            <motion.div
                              key={index}
                              className="bg-gray-50 rounded-lg p-4 text-center"
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 }}
                            >
                              <div className="flex justify-center items-center mb-2">
                                {stat.icon && (
                                  <div className="text-blue-600">
                                    {stat.icon}
                                  </div>
                                )}
                              </div>
                              <div className="text-3xl font-bold text-blue-600 mb-1">
                                {stat.value}
                              </div>
                              <div className="text-sm text-gray-600">
                                {stat.label}
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-2xl font-semibold text-gray-900 mb-4">
                          Platform yang Didukung
                        </h4>
                        <div className="grid grid-cols-3 gap-4">
                          {[
                            {
                              icon: <Laptop className="w-6 h-6" />,
                              label: "Desktop",
                            },
                            {
                              icon: <Smartphone className="w-6 h-6" />,
                              label: "Mobile",
                            },
                            {
                              icon: <Tablet className="w-6 h-6" />,
                              label: "Tablet",
                            },
                          ].map((platform, index) => (
                            <motion.div
                              key={index}
                              className="flex flex-col items-center p-4 bg-gray-50 rounded-lg"
                              whileHover={{ scale: 1.05 }}
                            >
                              <div className="text-blue-600 mb-2">
                                {platform.icon}
                              </div>
                              <span className="text-sm text-gray-600">
                                {platform.label}
                              </span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-white rounded-2xl shadow-lg p-8"
        >
          {[
            {
              icon: <Star className="w-6 h-6" />,
              value: "4.9/5",
              label: "Rating Pengguna",
            },
            {
              icon: <Languages className="w-6 h-6" />,
              value: "50+",
              label: "Bahasa Didukung",
            },
            {
              icon: <MessageSquare className="w-6 h-6" />,
              value: "24/7",
              label: "Dukungan",
            },
            {
              icon: <Headphones className="w-6 h-6" />,
              value: "1M+",
              label: "Audio Tersedia",
            },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 mb-4">
                {stat.icon}
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeatureHero;
