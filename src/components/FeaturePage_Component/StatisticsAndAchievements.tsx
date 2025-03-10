"use client";

import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Users,
  Award,
  Star,
  Globe,
  Brain,
  BookOpen,
  Sparkles,
  CheckCircle2,
  TrendingUp,
  MapPin,
  ArrowRight,
} from "lucide-react";

// Interface untuk data statistik
interface UserStat {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  description: string;
  color: string;
}

// Interface untuk pencapaian
interface Achievement {
  title: string;
  description: string;
  icon: React.ReactNode;
  year: string;
}

// Interface untuk distribusi pengguna berdasarkan wilayah
interface RegionDistribution {
  region: string;
  percentage: number;
  color: string;
}

const userStats: UserStat[] = [
  {
    label: "Pengguna Aktif",
    value: 1200000, // Akan menggunakan counter animasi
    icon: <Users className="w-8 h-8" />,
    description: "Lebih dari 1 juta orang telah bergabung dengan KamusKenyah.",
    color: "from-blue-600 to-indigo-600",
  },
  {
    label: "Kata Diterjemahkan",
    value: 5000000, // Akan menggunakan counter animasi
    icon: <Brain className="w-8 h-8" />,
    description: "Jutaan kata telah diterjemahkan menggunakan AI kami.",
    color: "from-green-500 to-teal-500",
  },
  {
    label: "Sesi Pembelajaran",
    value: 750000,
    icon: <BookOpen className="w-8 h-8" />,
    description: "Pengguna telah menyelesaikan ratusan ribu sesi pembelajaran.",
    color: "from-purple-500 to-pink-500",
  },
  {
    label: "Keberhasilan Pengguna",
    value: "92%",
    icon: <TrendingUp className="w-8 h-8" />,
    description: "92% pengguna melaporkan peningkatan kemampuan berbahasa.",
    color: "from-orange-500 to-yellow-500",
  },
];

const achievements: Achievement[] = [
  {
    title: "Top Language Preservation Tool 2024",
    description: "Diakui sebagai alat pelestarian bahasa terbaik tahun ini.",
    icon: <Award className="w-6 h-6" />,
    year: "2024",
  },
  {
    title: "1 Juta Pengguna Global",
    description: "Mencapai 1 juta pengguna di seluruh dunia.",
    icon: <Globe className="w-6 h-6" />,
    year: "2024",
  },
  {
    title: "Community Choice Award",
    description: "Dipilih oleh komunitas sebagai platform edukasi favorit.",
    icon: <Star className="w-6 h-6" />,
    year: "2023",
  },
];

// Data distribusi pengguna berdasarkan wilayah
const regionDistribution: RegionDistribution[] = [
  { region: "Indonesia", percentage: 60, color: "#2563eb" },
  { region: "Asia", percentage: 20, color: "#10b981" },
  { region: "Eropa", percentage: 10, color: "#f59e0b" },
  { region: "Amerika", percentage: 5, color: "#ef4444" },
  { region: "Lainnya", percentage: 5, color: "#8b5cf6" },
];

// Komponen untuk Counter Animasi (Perbaikan)
const AnimatedCounter: React.FC<{ value: number; duration?: number }> = ({
  value,
  duration = 2,
}) => {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  useEffect(() => {
    if (inView) {
      let start = 0;
      const end = value;
      const increment = end / (duration * 60); // Increment per frame (60 FPS)
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 1000 / 60); // Update setiap ~16.67ms (60 FPS)

      return () => clearInterval(timer);
    }
  }, [inView, value, duration]);

  return (
    <div ref={ref} className="text-4xl md:text-5xl font-bold text-gray-900">
      {count.toLocaleString()}
    </div>
  );
};

// Komponen untuk Pie Chart Sederhana
const PieChart: React.FC<{ data: RegionDistribution[] }> = ({ data }) => {
  const total = data.reduce((sum, item) => sum + item.percentage, 0);
  let cumulativePercentage = 0;

  return (
    <div className="relative w-48 h-48">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {data.map((item, index) => {
          const percentage = (item.percentage / total) * 100;
          const startAngle = (cumulativePercentage / 100) * 360;
          const endAngle = ((cumulativePercentage + percentage) / 100) * 360;
          cumulativePercentage += percentage;

          const startX = 50 + 50 * Math.cos((startAngle * Math.PI) / 180);
          const startY = 50 + 50 * Math.sin((startAngle * Math.PI) / 180);
          const endX = 50 + 50 * Math.cos((endAngle * Math.PI) / 180);
          const endY = 50 + 50 * Math.sin((endAngle * Math.PI) / 180);

          const largeArcFlag = percentage > 50 ? 1 : 0;

          const path = `
            M 50 50
            L ${startX} ${startY}
            A 50 50 0 ${largeArcFlag} 1 ${endX} ${endY}
            Z
          `;

          return (
            <motion.path
              key={index}
              d={path}
              fill={item.color}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            />
          );
        })}
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
          <span className="text-sm font-medium text-gray-600">Distribusi</span>
        </div>
      </div>
    </div>
  );
};

// Komponen untuk User Statistics and Achievements
const UserStatisticsAndAchievements: React.FC = () => {
  const [hoveredStat, setHoveredStat] = useState<string | null>(null);
  const controls = useAnimation();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [inView, controls]);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section
      ref={ref}
      className="relative py-20 bg-gradient-to-b from-blue-50 to-white overflow-hidden"
    >
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-0 left-0 w-64 h-64 bg-blue-100 rounded-full opacity-20 blur-3xl"
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-100 rounded-full opacity-20 blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], rotate: [90, 0, 90] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="text-center mb-16"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-600 mb-4"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">Statistik & Pencapaian</span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-6"
          >
            Dampak & Pencapaian{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              KamusKenyah
            </span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Lihat bagaimana KamusKenyah telah membantu jutaan pengguna di
            seluruh dunia dalam melestarikan dan mempelajari bahasa Dayak
            Kenyah.
          </motion.p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
        >
          {userStats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              className={`relative bg-white rounded-2xl shadow-lg p-6 transition-all duration-300 ${
                hoveredStat === stat.label
                  ? "transform scale-105 shadow-xl"
                  : ""
              }`}
              onMouseEnter={() => setHoveredStat(stat.label)}
              onMouseLeave={() => setHoveredStat(null)}
            >
              <div className="flex items-center mb-4">
                <div
                  className={`p-3 rounded-full bg-gradient-to-r ${stat.color} text-white mr-4`}
                >
                  {stat.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {stat.label}
                </h3>
              </div>
              <div className="mb-4">
                {typeof stat.value === "number" ? (
                  <AnimatedCounter value={stat.value} />
                ) : (
                  <span className="text-4xl md:text-5xl font-bold text-gray-900">
                    {stat.value}
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-600">{stat.description}</p>
              <motion.div
                className="absolute top-4 right-4"
                animate={{
                  scale: hoveredStat === stat.label ? 1.2 : 1,
                  rotate: hoveredStat === stat.label ? 360 : 0,
                }}
                transition={{ duration: 0.3 }}
              >
                <CheckCircle2 className="w-6 h-6 text-green-500" />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Achievements & Distribution Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid md:grid-cols-2 gap-12"
        >
          {/* Achievements */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 flex items-center">
              <Award className="w-6 h-6 mr-2 text-blue-600" />
              Pencapaian Kami
            </h3>
            <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start space-x-4"
                >
                  <div className="p-3 rounded-full bg-blue-50 text-blue-600">
                    {achievement.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">
                      {achievement.title}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {achievement.description}
                    </p>
                    <span className="text-xs text-gray-500">
                      {achievement.year}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* User Distribution */}
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-bold text-gray-900 flex items-center mb-6">
              <MapPin className="w-6 h-6 mr-2 text-blue-600" />
              Distribusi Pengguna Global
            </h3>
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <PieChart data={regionDistribution} />
                <div className="space-y-3 flex-1">
                  {regionDistribution.map((region, index) => (
                    <motion.div
                      key={region.region}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center">
                        <div
                          className="w-4 h-4 rounded-full mr-2"
                          style={{ backgroundColor: region.color }}
                        />
                        <span className="text-sm text-gray-600">
                          {region.region}
                        </span>
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        {region.percentage}%
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* CTA Section */}
        <motion.div variants={itemVariants} className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Bergabung dengan Komunitas Global Kami
            </h3>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              Jadilah bagian dari jutaan pengguna yang telah mempercayakan
              KamusKenyah untuk mempelajari dan melestarikan bahasa Dayak
              Kenyah.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-8 py-3 bg-white text-blue-600 rounded-lg font-medium hover:shadow-lg transition-all duration-300"
            >
              Mulai Sekarang
              <ArrowRight className="w-5 h-5 ml-2" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default UserStatisticsAndAchievements;
