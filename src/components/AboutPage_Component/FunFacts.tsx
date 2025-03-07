"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Globe,
  Users,
  BookOpen,
  Clock,
  Zap,
  Award,
  ChevronDown,
  ChevronUp,
  Sparkles,
} from "lucide-react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import CountUp from "react-countup";

ChartJS.register(ArcElement, Tooltip, Legend);

interface Fact {
  icon: React.ReactNode;
  value: number;
  label: string;
  description: string;
  category: "Pengguna" | "Bahasa" | "Teknologi";
  detailedInfo: string;
  chartData?: {
    labels: string[];
    datasets: {
      data: number[];
      backgroundColor: string[];
      borderColor: string[];
      borderWidth: number;
    }[];
  };
}

const facts: Fact[] = [
  {
    icon: <Users className="w-8 h-8" />,
    value: 10000,
    label: "Pengguna Aktif",
    description: "Komunitas yang terus berkembang",
    category: "Pengguna",
    detailedInfo:
      "Pengguna kami berasal dari berbagai latar belakang, termasuk peneliti bahasa, pelajar, dan anggota komunitas Dayak Kenyah.",
    chartData: {
      labels: ["Peneliti", "Pelajar", "Komunitas Dayak", "Lainnya"],
      datasets: [
        {
          data: [3000, 4000, 2500, 500],
          backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
          borderColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
          borderWidth: 1,
        },
      ],
    },
  },
  {
    icon: <Globe className="w-8 h-8" />,
    value: 7,
    label: "Negara Pengguna",
    description: "Jangkauan global",
    category: "Pengguna",
    detailedInfo:
      "KamusKenyah digunakan di Indonesia, Malaysia, Brunei, Singapura, Australia, Amerika Serikat, dan Belanda.",
    chartData: {
      labels: [
        "Indonesia",
        "Malaysia",
        "Brunei",
        "Singapura",
        "Australia",
        "AS",
        "Belanda",
      ],
      datasets: [
        {
          data: [5000, 2000, 1000, 800, 600, 400, 200],
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#4BC0C0",
            "#9966FF",
            "#FF9F40",
            "#FF6384",
          ],
          borderColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#4BC0C0",
            "#9966FF",
            "#FF9F40",
            "#FF6384",
          ],
          borderWidth: 1,
        },
      ],
    },
  },
  {
    icon: <BookOpen className="w-8 h-8" />,
    value: 5000,
    label: "Kata Terdokumentasi",
    description: "Kosakata yang terus bertambah",
    category: "Bahasa",
    detailedInfo:
      "Kosakata ini mencakup berbagai bidang, termasuk kehidupan sehari-hari, adat istiadat, flora dan fauna lokal.",
    chartData: {
      labels: ["Sehari-hari", "Adat Istiadat", "Flora & Fauna", "Lainnya"],
      datasets: [
        {
          data: [2000, 1500, 1000, 500],
          backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
          borderColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
          borderWidth: 1,
        },
      ],
    },
  },
  {
    icon: <Clock className="w-8 h-8" />,
    value: 1825,
    label: "Hari Pengembangan",
    description: "5 tahun dedikasi",
    category: "Teknologi",
    detailedInfo:
      "Selama 5 tahun, tim kami telah bekerja tanpa henti untuk mengembangkan dan menyempurnakan algoritma terjemahan dan antarmuka pengguna.",
  },
  {
    icon: <Zap className="w-8 h-8" />,
    value: 100000,
    label: "Terjemahan per Hari",
    description: "Aktivitas harian yang tinggi",
    category: "Teknologi",
    detailedInfo:
      "Dengan menggunakan teknologi AI terkini, kami mampu memproses ratusan ribu permintaan terjemahan setiap harinya dengan akurasi tinggi.",
    chartData: {
      labels: ["Akurat", "Perlu Perbaikan", "Tidak Akurat"],
      datasets: [
        {
          data: [95000, 4000, 1000],
          backgroundColor: ["#36A2EB", "#FFCE56", "#FF6384"],
          borderColor: ["#36A2EB", "#FFCE56", "#FF6384"],
          borderWidth: 1,
        },
      ],
    },
  },
  {
    icon: <Award className="w-8 h-8" />,
    value: 3,
    label: "Penghargaan Diraih",
    description: "Pengakuan atas inovasi",
    category: "Teknologi",
    detailedInfo:
      'Penghargaan yang kami terima termasuk "Inovasi Teknologi Bahasa Terbaik", "Pelestarian Warisan Budaya Digital", dan "Aplikasi Edukasi Terbaik".',
  },
];

const FunFacts: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [hoveredFact, setHoveredFact] = useState<number | null>(null);
  const [isComparing, setIsComparing] = useState(false);
  const [comparedFacts, setComparedFacts] = useState<number[]>([]);
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const filteredFacts = selectedCategory
    ? facts.filter((fact) => fact.category === selectedCategory)
    : facts;

  const categories = Array.from(new Set(facts.map((fact) => fact.category)));

  const handleCompare = (index: number) => {
    if (comparedFacts.includes(index)) {
      setComparedFacts(comparedFacts.filter((i) => i !== index));
    } else if (comparedFacts.length < 2) {
      setComparedFacts([...comparedFacts, index]);
    }
    if (comparedFacts.length === 1) {
      setIsComparing(true);
    }
  };

  const resetComparison = () => {
    setIsComparing(false);
    setComparedFacts([]);
  };

  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-b from-white to-blue-50">
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
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-100 rounded-full opacity-20 blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          animate={controls}
          initial="hidden"
          variants={{
            visible: { opacity: 1, y: 0 },
            hidden: { opacity: 0, y: 50 },
          }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
            Fakta Menarik{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              KamusKenyah
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Jelajahi pencapaian dan statistik menarik tentang perjalanan kami
            dalam melestarikan bahasa Dayak Kenyah
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
              selectedCategory === null
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
            }`}
          >
            Semua
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
                selectedCategory === category
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredFacts.map((fact, index) => (
              <FactCard
                key={fact.label}
                fact={fact}
                index={index}
                isHovered={hoveredFact === index}
                setHovered={(isHovered) =>
                  setHoveredFact(isHovered ? index : null)
                }
                isComparing={isComparing}
                isCompared={comparedFacts.includes(index)}
                onCompare={() => handleCompare(index)}
              />
            ))}
          </AnimatePresence>
        </div>

        {isComparing && (
          <ComparisonModal
            facts={facts.filter((_, index) => comparedFacts.includes(index))}
            onClose={resetComparison}
          />
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-2xl font-semibold text-gray-700 mb-8">
            Bergabunglah dengan kami dalam misi pelestarian bahasa!
          </p>
          <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-3 px-8 hover:shadow-lg transition-all duration-300 flex items-center mx-auto">
            <Sparkles className="w-5 h-5 mr-2" />
            Mulai Petualangan Bahasa
          </button>
        </motion.div>
      </div>
    </section>
  );
};

const FactCard: React.FC<{
  fact: Fact;
  index: number;
  isHovered: boolean;
  setHovered: (isHovered: boolean) => void;
  isComparing: boolean;
  isCompared: boolean;
  onCompare: () => void;
}> = ({
  fact,
  index,
  isHovered,
  setHovered,
  isComparing,
  isCompared,
  onCompare,
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.5 } }}
      variants={{
        visible: { opacity: 1, scale: 1 },
        hidden: { opacity: 0, scale: 0.5 },
      }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`bg-white rounded-2xl p-8 transform transition-all duration-300 shadow-lg hover:shadow-xl ${
        isHovered ? "scale-105" : ""
      } ${isCompared ? "ring-2 ring-blue-600" : ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="bg-blue-50 p-3 rounded-full text-blue-600">
          {fact.icon}
        </div>
        {!isComparing && (
          <button
            onClick={onCompare}
            className="text-blue-600 hover:text-blue-700 transition-colors duration-300 text-sm font-medium"
          >
            {isCompared ? "Batalkan Perbandingan" : "Bandingkan"}
          </button>
        )}
      </div>
      <h3 className="text-4xl font-bold text-gray-900 mb-2">
        <CountUp end={fact.value} duration={2.5} separator="," />
      </h3>
      <p className="text-xl font-semibold mb-4 text-blue-600">{fact.label}</p>
      <p className="text-gray-600 mb-4">{fact.description}</p>
      <button
        onClick={() => setShowDetails(!showDetails)}
        className="flex items-center justify-center w-full text-blue-600 hover:text-blue-700 transition-colors duration-300"
      >
        {showDetails ? (
          <>
            <span className="mr-2">Sembunyikan Detail</span>
            <ChevronUp className="w-4 h-4" />
          </>
        ) : (
          <>
            <span className="mr-2">Lihat Detail</span>
            <ChevronDown className="w-4 h-4" />
          </>
        )}
      </button>
      <AnimatePresence>
        {showDetails && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4"
          >
            <p className="text-gray-600 mb-4">{fact.detailedInfo}</p>
            {fact.chartData && (
              <div className="w-full h-64">
                <Doughnut
                  data={fact.chartData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: "bottom",
                        labels: {
                          color: "#4B5563", // text-gray-600
                        },
                      },
                    },
                  }}
                />
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const ComparisonModal: React.FC<{
  facts: Fact[];
  onClose: () => void;
}> = ({ facts, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-white rounded-2xl p-8 max-w-4xl w-full mx-4 shadow-xl"
      >
        <h3 className="text-2xl font-bold mb-6 text-gray-900">
          Perbandingan Fakta
        </h3>
        <div className="grid grid-cols-2 gap-8">
          {facts.map((fact, index) => (
            <div key={index} className="bg-gray-50 rounded-xl p-6">
              <h4 className="text-xl font-semibold mb-4 text-blue-600">
                {fact.label}
              </h4>
              <p className="text-4xl font-bold mb-2 text-gray-900">
                {fact.value.toLocaleString()}
              </p>
              <p className="text-gray-600 mb-4">{fact.description}</p>
              <p className="text-sm text-gray-500">{fact.detailedInfo}</p>
            </div>
          ))}
        </div>
        <div className="flex justify-end mt-8">
          <button
            onClick={onClose}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300"
          >
            Tutup
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default FunFacts;
