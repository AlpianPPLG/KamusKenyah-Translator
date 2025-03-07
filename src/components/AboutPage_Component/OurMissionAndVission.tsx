"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
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
  Star,
  Heart,
  MessageCircle,
} from "lucide-react";

interface MissionItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const missionItems: MissionItem[] = [
  {
    icon: <Globe className="w-6 h-6" />,
    title: "Pelestarian Bahasa",
    description:
      "Melestarikan dan mempromosikan bahasa Dayak Kenyah melalui teknologi digital.",
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Pemberdayaan Komunitas",
    description:
      "Memberdayakan komunitas Dayak Kenyah untuk aktif dalam pelestarian bahasa mereka.",
  },
  {
    icon: <BookOpen className="w-6 h-6" />,
    title: "Edukasi Berkelanjutan",
    description:
      "Menyediakan sumber daya pendidikan yang berkelanjutan untuk pembelajaran bahasa Dayak Kenyah.",
  },
  {
    icon: <Lightbulb className="w-6 h-6" />,
    title: "Inovasi Teknologi",
    description:
      "Terus berinovasi dalam pengembangan teknologi untuk mendukung pelestarian bahasa.",
  },
];

interface TargetItem {
  year: number;
  progress: number;
  target: number;
}

const targetItems: TargetItem[] = [
  { year: 2024, progress: 95, target: 100 },
  { year: 2025, progress: 66, target: 100 },
  { year: 2026, progress: 33, target: 100 },
];

const OurMissionAndVision: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"vision" | "mission">("vision");
  const [expandedMission, setExpandedMission] = useState<number | null>(null);
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

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

  const progressVariants = {
    hidden: { width: 0 },
    visible: {
      width: (item: TargetItem) => `${(item.progress / item.target) * 100}%`,
      transition: {
        duration: 1.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      ref={ref}
      className="py-12 md:py-20 bg-gradient-to-b from-blue-50 to-white overflow-hidden relative"
    >
      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid md:grid-cols-2 gap-8 md:gap-12 items-start"
        >
          {/* Left Column: Text Content */}
          <div className="space-y-6 md:space-y-8">
            <motion.div variants={itemVariants}>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
                Visi & Misi{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                  KamusKenyah
                </span>
              </h2>
              <p className="text-lg md:text-xl text-gray-600 mb-6">
                Kami berkomitmen untuk melestarikan dan mempromosikan bahasa
                Dayak Kenyah melalui inovasi teknologi dan pemberdayaan
                komunitas.
              </p>
            </motion.div>

            {/* Tab Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex mb-6 md:mb-8 space-x-2"
            >
              <button
                onClick={() => setActiveTab("vision")}
                className={`flex items-center px-4 md:px-6 py-2 md:py-3 rounded-full font-medium text-base md:text-lg transition-colors duration-300 ${
                  activeTab === "vision"
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <Target className="w-4 md:w-5 h-4 md:h-5 mr-2" />
                Visi
              </button>
              <button
                onClick={() => setActiveTab("mission")}
                className={`flex items-center px-4 md:px-6 py-2 md:py-3 rounded-full font-medium text-base md:text-lg transition-colors duration-300 ${
                  activeTab === "mission"
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <Rocket className="w-4 md:w-5 h-4 md:h-5 mr-2" />
                Misi
              </button>
            </motion.div>

            {/* Vision Content */}
            {activeTab === "vision" && (
              <motion.div
                variants={itemVariants}
                className="bg-white rounded-2xl shadow-lg p-4 md:p-6 space-y-4 md:space-y-6"
              >
                <h3 className="text-xl md:text-2xl font-semibold text-gray-900">
                  Visi Kami
                </h3>
                <p className="text-gray-600 text-sm md:text-base">
                  Menjadi platform terdepan dalam pelestarian dan promosi bahasa
                  Dayak Kenyah, menghubungkan generasi dan budaya melalui
                  teknologi inovatif.
                </p>
                <div className="grid grid-cols-3 gap-2 md:gap-4">
                  {[
                    {
                      icon: (
                        <Star className="w-5 md:w-6 h-5 md:h-6 text-yellow-500" />
                      ),
                      label: "Keunggulan",
                    },
                    {
                      icon: (
                        <Heart className="w-5 md:w-6 h-5 md:h-6 text-red-500" />
                      ),
                      label: "Kepedulian",
                    },
                    {
                      icon: (
                        <MessageCircle className="w-5 md:w-6 h-5 md:h-6 text-green-500" />
                      ),
                      label: "Keterlibatan",
                    },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className="flex items-center space-x-2 text-gray-700 text-sm md:text-base"
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </motion.div>
                  ))}
                </div>
                <div className="space-y-4 md:space-y-6">
                  {targetItems.map((item, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className="space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-gray-900 font-medium text-sm md:text-base">
                          {item.year}
                        </span>
                        <span className="text-sm text-gray-600">
                          Target Pencapaian {item.progress}%
                        </span>
                      </div>
                      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div
                          variants={progressVariants}
                          initial="hidden"
                          animate="visible"
                          className="h-full bg-blue-600 rounded-full"
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Mission Content */}
            {activeTab === "mission" && (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-4"
              >
                {missionItems.map((item, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden"
                  >
                    <div
                      className="p-4 md:p-6 cursor-pointer flex items-center justify-between"
                      onClick={() =>
                        setExpandedMission(
                          expandedMission === index ? null : index
                        )
                      }
                    >
                      <div className="flex items-center space-x-3 md:space-x-4">
                        <div className="bg-blue-100 p-2 md:p-3 rounded-full">
                          {item.icon}
                        </div>
                        <h3 className="text-lg md:text-xl font-semibold text-gray-900">
                          {item.title}
                        </h3>
                      </div>
                      {expandedMission === index ? (
                        <ChevronUp className="w-5 h-5 text-blue-600" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-blue-600" />
                      )}
                    </div>
                    {expandedMission === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="px-4 md:px-6 pb-4 md:pb-6"
                      >
                        <p className="text-gray-600 text-sm md:text-base">
                          {item.description}
                        </p>
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>

          {/* Right Column: Illustration */}
          <motion.div variants={itemVariants} className="relative">
            <div className="rounded-3xl bg-gradient-to-br from-blue-100 to-indigo-50 p-4 md:p-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-white/40 backdrop-blur-sm rounded-3xl" />
              <div className="relative z-10 flex flex-col items-center justify-center text-center space-y-4 md:space-y-6">
                <img
                  src="../../../public/assets/img/Community.jpg"
                  alt="KamusKenyah Vision and Mission"
                  className="w-full h-auto rounded-2xl shadow-lg"
                />
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
                  className="bg-blue-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-md font-medium text-base md:text-lg hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center w-full max-w-[90%] md:max-w-sm"
                >
                  Bergabung Sekarang
                  <ArrowRight className="w-4 md:w-5 h-4 md:h-5 ml-2" />
                </motion.button>
              </div>
            </div>
            {/* Decorative Elements */}
            <div className="absolute -bottom-8 -right-8 w-32 md:w-40 h-32 md:h-40 bg-yellow-100 rounded-full opacity-70 z-0" />
            <div className="absolute -top-8 -left-8 w-20 md:w-24 h-20 md:h-24 bg-green-100 rounded-full opacity-70 z-0" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default OurMissionAndVision;
