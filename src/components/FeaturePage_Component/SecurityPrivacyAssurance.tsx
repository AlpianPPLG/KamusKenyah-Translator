"use client";

import type React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  Lock,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  FileText,
  Server,
  Database,
  Fingerprint,
  Key,
  RefreshCw,
  UserCheck,
  Globe,
  Clock,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  ArrowRight,
  BadgeCheck,
  ShieldCheck,
  ShieldQuestion,
  HelpCircle,
  Check,
  Zap,
  Sparkles,
} from "lucide-react";
import { useInView } from "react-intersection-observer"; // Ensure this import is correct

interface SecurityFeature {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  category: "data" | "compliance" | "infrastructure" | "access";
  details: string[];
  certifications?: Certification[];
}

interface Certification {
  name: string;
  icon: React.ReactNode;
  description: string;
  year: string;
}

interface SecurityIncident {
  date: string;
  title: string;
  description: string;
  resolution: string;
  severity: "low" | "medium" | "high";
}

interface FAQ {
  question: string;
  answer: string;
}

const SecurityPrivacyAssurance: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "overview" | "features" | "compliance" | "faq"
  >("overview");
  const [expandedFeature, setExpandedFeature] = useState<string | null>(null);
  const [expandedCertification, setExpandedCertification] = useState<
    string | null
  >(null);
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [showIncidents, setShowIncidents] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Security Features Data
  const securityFeatures: SecurityFeature[] = [
    {
      id: "encryption",
      title: "Enkripsi End-to-End",
      description: "Data Anda dienkripsi saat transit dan saat disimpan",
      icon: <Lock className="w-6 h-6" />,
      category: "data",
      details: [
        "Enkripsi AES-256 untuk semua data yang disimpan",
        "TLS 1.3 untuk semua transmisi data",
        "Enkripsi kunci pribadi untuk data sensitif",
        "Rotasi kunci otomatis setiap 90 hari",
      ],
      certifications: [
        {
          name: "ISO 27001",
          icon: <BadgeCheck className="w-5 h-5" />,
          description: "Standar internasional untuk keamanan informasi",
          year: "2023",
        },
        {
          name: "FIPS 140-2",
          icon: <ShieldCheck className="w-5 h-5" />,
          description: "Standar keamanan kriptografi pemerintah AS",
          year: "2022",
        },
      ],
    },
    {
      id: "data-protection",
      title: "Perlindungan Data",
      description: "Perlindungan data pribadi sesuai regulasi",
      icon: <Shield className="w-6 h-6" />,
      category: "compliance",
      details: [
        "Kepatuhan penuh terhadap GDPR untuk pengguna Eropa",
        "Kepatuhan terhadap UU Perlindungan Data Indonesia",
        "Penyimpanan data terenkripsi dengan akses terbatas",
        "Kebijakan retensi data yang ketat",
      ],
      certifications: [
        {
          name: "GDPR Compliant",
          icon: <Globe className="w-5 h-5" />,
          description: "Mematuhi Regulasi Perlindungan Data Umum Eropa",
          year: "2023",
        },
      ],
    },
    {
      id: "secure-infrastructure",
      title: "Infrastruktur Aman",
      description: "Hosting di pusat data bersertifikasi keamanan tinggi",
      icon: <Server className="w-6 h-6" />,
      category: "infrastructure",
      details: [
        "Hosting di AWS dengan sertifikasi ISO 27001, SOC 1/2/3",
        "Firewall aplikasi web (WAF) untuk mencegah serangan",
        "Pemantauan keamanan 24/7 dengan respons insiden",
        "Pengujian penetrasi rutin oleh pihak ketiga",
      ],
      certifications: [
        {
          name: "SOC 2 Type II",
          icon: <BadgeCheck className="w-5 h-5" />,
          description: "Audit keamanan, ketersediaan, dan kerahasiaan",
          year: "2023",
        },
      ],
    },
    {
      id: "access-control",
      title: "Kontrol Akses",
      description: "Sistem kontrol akses berlapis untuk melindungi data Anda",
      icon: <Key className="w-6 h-6" />,
      category: "access",
      details: [
        "Autentikasi multi-faktor (MFA) untuk semua akses admin",
        "Prinsip hak akses minimal untuk staf internal",
        "Audit log untuk semua akses data sensitif",
        "Proses onboarding dan offboarding karyawan yang ketat",
      ],
    },
    {
      id: "biometric",
      title: "Autentikasi Biometrik",
      description: "Opsi login dengan sidik jari atau pengenalan wajah",
      icon: <Fingerprint className="w-6 h-6" />,
      category: "access",
      details: [
        "Integrasi dengan TouchID/FaceID untuk perangkat Apple",
        "Dukungan untuk pemindai sidik jari Android",
        "Tidak menyimpan data biometrik, hanya token autentikasi",
        "Fallback ke metode autentikasi tradisional",
      ],
    },
    {
      id: "data-backup",
      title: "Backup Data",
      description: "Backup otomatis untuk memastikan keamanan data",
      icon: <Database className="w-6 h-6" />,
      category: "data",
      details: [
        "Backup otomatis setiap 6 jam ke lokasi terpisah",
        "Enkripsi untuk semua data backup",
        "Retensi backup selama 30 hari",
        "Pengujian pemulihan rutin untuk memastikan integritas",
      ],
    },
    {
      id: "privacy-controls",
      title: "Kontrol Privasi",
      description: "Kontrol penuh atas data pribadi Anda",
      icon: <UserCheck className="w-6 h-6" />,
      category: "data",
      details: [
        "Dasbor privasi untuk mengelola preferensi data",
        "Opsi untuk mengunduh semua data pribadi Anda",
        "Kemampuan untuk menghapus akun dan data secara permanen",
        "Pengaturan granular untuk berbagi data",
      ],
    },
    {
      id: "vulnerability-management",
      title: "Manajemen Kerentanan",
      description:
        "Proses proaktif untuk mengidentifikasi dan memperbaiki kerentanan",
      icon: <RefreshCw className="w-6 h-6" />,
      category: "infrastructure",
      details: [
        "Pemindaian kerentanan otomatis mingguan",
        "Program bug bounty untuk pelaporan kerentanan",
        "Patch keamanan diprioritaskan berdasarkan risiko",
        "Pengujian penetrasi tahunan oleh pihak ketiga",
      ],
    },
  ];

  // Security Incidents Data (for transparency)
  const securityIncidents: SecurityIncident[] = [
    {
      date: "15 Mei 2023",
      title: "Upaya Login Tidak Sah",
      description:
        "Terdeteksi upaya login tidak sah dari beberapa alamat IP. Tidak ada akun yang terkompromikan.",
      resolution:
        "Implementasi pembatasan rate-limit tambahan dan pemblokiran alamat IP mencurigakan.",
      severity: "low",
    },
    {
      date: "3 Februari 2023",
      title: "Kerentanan Dependensi Pihak Ketiga",
      description:
        "Teridentifikasi kerentanan dalam pustaka pihak ketiga yang digunakan dalam aplikasi kami.",
      resolution:
        "Segera memperbarui pustaka ke versi aman dan melakukan audit keamanan tambahan.",
      severity: "medium",
    },
  ];

  // FAQ Data
  const faqs: FAQ[] = [
    {
      question: "Bagaimana data saya dilindungi saat menggunakan KamusKenyah?",
      answer:
        "KamusKenyah menggunakan enkripsi end-to-end untuk melindungi data Anda baik saat transit maupun saat disimpan. Kami mengimplementasikan enkripsi AES-256 untuk penyimpanan data dan TLS 1.3 untuk transmisi data. Selain itu, kami menerapkan kontrol akses ketat, autentikasi multi-faktor, dan audit log untuk memastikan hanya personel yang berwenang yang dapat mengakses data.",
    },
    {
      question: "Apakah KamusKenyah mematuhi GDPR?",
      answer:
        "Ya, KamusKenyah sepenuhnya mematuhi Regulasi Perlindungan Data Umum (GDPR) Uni Eropa. Kami memberikan kontrol kepada pengguna atas data mereka, termasuk hak untuk mengakses, mengubah, dan menghapus data pribadi. Kami juga memiliki Petugas Perlindungan Data yang didedikasikan untuk memastikan kepatuhan berkelanjutan terhadap GDPR dan regulasi privasi lainnya.",
    },
    {
      question: "Bagaimana cara menghapus data saya dari KamusKenyah?",
      answer:
        "Anda dapat menghapus data Anda dari KamusKenyah melalui Dasbor Privasi di pengaturan akun Anda. Di sana, Anda akan menemukan opsi untuk mengunduh data Anda dan menghapus akun Anda secara permanen. Setelah penghapusan, semua data pribadi Anda akan dihapus dari sistem kami dalam 30 hari, sesuai dengan kebijakan retensi data kami.",
    },
    {
      question: "Apakah KamusKenyah menggunakan data saya untuk iklan?",
      answer:
        "Tidak, KamusKenyah tidak menjual atau menyewakan data pengguna kepada pengiklan. Kami hanya menggunakan data Anda untuk menyediakan dan meningkatkan layanan kami, serta untuk personalisasi pengalaman belajar Anda. Anda dapat mengontrol preferensi data Anda melalui Dasbor Privasi di pengaturan akun Anda.",
    },
    {
      question: "Bagaimana KamusKenyah menangani pelanggaran data?",
      answer:
        "KamusKenyah memiliki Rencana Respons Insiden Keamanan yang komprehensif. Dalam hal terjadi pelanggaran data, kami akan segera menyelidiki, memitigasi dampaknya, dan memberi tahu pengguna yang terkena dampak sesuai dengan persyaratan hukum. Kami juga akan bekerja sama dengan otoritas yang relevan dan mengambil langkah-langkah untuk mencegah insiden serupa di masa depan.",
    },
  ];

  // Animation variants
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
    visible: { opacity: 1, y: 0 },
  };

  // Group features by category
  const featuresByCategory = securityFeatures.reduce((acc, feature) => {
    if (!acc[feature.category]) {
      acc[feature.category] = [];
    }
    acc[feature.category].push(feature);
    return acc;
  }, {} as Record<string, SecurityFeature[]>);

  // Category labels
  const categoryLabels = {
    data: "Perlindungan Data",
    compliance: "Kepatuhan Regulasi",
    infrastructure: "Infrastruktur",
    access: "Kontrol Akses",
  };

  // Category icons
  const categoryIcons = {
    data: <Database className="w-5 h-5" />,
    compliance: <FileText className="w-5 h-5" />,
    infrastructure: <Server className="w-5 h-5" />,
    access: <Key className="w-5 h-5" />,
  };

  return (
    <section
      ref={ref}
      className="py-20 bg-gradient-to-b from-gray-900 to-blue-900 text-white overflow-hidden relative"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full opacity-10 blur-3xl"
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
          className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500 rounded-full opacity-10 blur-3xl"
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

      {/* Shield Animation */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <Shield className="w-[40rem] h-[40rem]" />
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-800 text-blue-200 mb-4">
            <Shield className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">Keamanan & Privasi</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Keamanan Tanpa Kompromi,{" "}
            <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Privasi Terjamin
            </span>
          </h2>

          <p className="text-xl text-blue-200 max-w-3xl mx-auto">
            Kami memprioritaskan keamanan data dan privasi Anda dengan standar
            keamanan tertinggi dan praktik terbaik industri.
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {[
            {
              id: "overview",
              label: "Ikhtisar",
              icon: <Eye className="w-5 h-5" />,
            },
            {
              id: "features",
              label: "Fitur Keamanan",
              icon: <Shield className="w-5 h-5" />,
            },
            {
              id: "compliance",
              label: "Kepatuhan",
              icon: <BadgeCheck className="w-5 h-5" />,
            },
            {
              id: "faq",
              label: "FAQ",
              icon: <HelpCircle className="w-5 h-5" />,
            },
          ].map((tab) => (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab(tab.id as never)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                activeTab === tab.id
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-blue-800/50 text-blue-200 hover:bg-blue-700/50"
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </motion.button>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === "overview" && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
                <div>
                  <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-3xl font-bold mb-6"
                  >
                    Komitmen Kami Terhadap Keamanan
                  </motion.h3>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-blue-200 mb-6"
                  >
                    Di KamusKenyah, keamanan dan privasi data pengguna adalah
                    prioritas utama kami. Kami menerapkan praktik keamanan
                    terbaik industri dan terus meningkatkan sistem kami untuk
                    melindungi informasi Anda.
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="space-y-4"
                  >
                    {[
                      {
                        icon: <Lock className="w-5 h-5" />,
                        text: "Enkripsi end-to-end untuk semua data",
                      },
                      {
                        icon: <Shield className="w-5 h-5" />,
                        text: "Kepatuhan terhadap standar keamanan global",
                      },
                      {
                        icon: <RefreshCw className="w-5 h-5" />,
                        text: "Pembaruan keamanan rutin",
                      },
                      {
                        icon: <EyeOff className="w-5 h-5" />,
                        text: "Kebijakan privasi yang transparan",
                      },
                    ].map((item, index) => (
                      <div key={index} className="flex items-start">
                        <div className="p-2 bg-blue-800 rounded-full mr-4">
                          {item.icon}
                        </div>
                        <p className="text-blue-100">{item.text}</p>
                      </div>
                    ))}
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl transform rotate-3 opacity-30"></div>
                  <div className="relative bg-blue-800/50 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-blue-700/50">
                    <div className="flex justify-between items-center mb-6">
                      <h4 className="text-xl font-semibold">
                        Sertifikasi Keamanan
                      </h4>
                      <div className="p-2 bg-blue-700 rounded-full">
                        <BadgeCheck className="w-6 h-6 text-blue-200" />
                      </div>
                    </div>

                    <div className="space-y-6">
                      {[
                        {
                          name: "ISO 27001",
                          description: "Manajemen Keamanan Informasi",
                          year: "2023",
                        },
                        {
                          name: "GDPR Compliant",
                          description: "Perlindungan Data Eropa",
                          year: "2023",
                        },
                        {
                          name: "SOC 2 Type II",
                          description: "Kontrol Keamanan & Privasi",
                          year: "2022",
                        },
                        {
                          name: "PCI DSS",
                          description: "Keamanan Data Pembayaran",
                          year: "2023",
                        },
                      ].map((cert, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-4 bg-blue-900/50 rounded-xl"
                        >
                          <div>
                            <h5 className="font-medium">{cert.name}</h5>
                            <p className="text-sm text-blue-300">
                              {cert.description}
                            </p>
                          </div>
                          <div className="text-blue-400 text-sm font-medium">
                            {cert.year}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Security Stats */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
              >
                {[
                  {
                    icon: <Clock className="w-6 h-6" />,
                    value: "99.99%",
                    label: "Uptime",
                  },
                  {
                    icon: <Shield className="w-6 h-6" />,
                    value: "0",
                    label: "Data Breaches",
                  },
                  {
                    icon: <Zap className="w-6 h-6" />,
                    value: "<300ms",
                    label: "Response Time",
                  },
                  {
                    icon: <Globe className="w-6 h-6" />,
                    value: "24/7",
                    label: "Monitoring",
                  },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="bg-blue-800/50 backdrop-blur-sm rounded-xl p-6 text-center border border-blue-700/50"
                  >
                    <div className="inline-flex items-center justify-center p-3 bg-blue-700 rounded-full mb-4">
                      {stat.icon}
                    </div>
                    <div className="text-2xl font-bold mb-1">{stat.value}</div>
                    <div className="text-sm text-blue-300">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Transparency Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-blue-800/50 backdrop-blur-sm rounded-3xl p-8 border border-blue-700/50"
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold">Transparansi Keamanan</h3>
                  <button
                    onClick={() => setShowIncidents(!showIncidents)}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-700 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors"
                  >
                    <span>
                      {showIncidents ? "Sembunyikan Insiden" : "Lihat Insiden"}
                    </span>
                    {showIncidents ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                </div>

                <p className="text-blue-200 mb-6">
                  Kami berkomitmen untuk transparansi dalam praktik keamanan
                  kami. Kami secara proaktif memantau, menyelidiki, dan
                  mengatasi insiden keamanan, serta membagikan informasi yang
                  relevan dengan pengguna kami.
                </p>

                <AnimatePresence>
                  {showIncidents && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4 mt-4"
                    >
                      {securityIncidents.map((incident, index) => (
                        <div
                          key={index}
                          className="bg-blue-900/50 rounded-xl p-6 border border-blue-800"
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h4 className="font-semibold">
                                {incident.title}
                              </h4>
                              <p className="text-sm text-blue-300">
                                {incident.date}
                              </p>
                            </div>
                            <div
                              className={`px-3 py-1 rounded-full text-xs font-medium ${
                                incident.severity === "low"
                                  ? "bg-green-900/50 text-green-400"
                                  : incident.severity === "medium"
                                  ? "bg-yellow-900/50 text-yellow-400"
                                  : "bg-red-900/50 text-red-400"
                              }`}
                            >
                              {incident.severity.charAt(0).toUpperCase() +
                                incident.severity.slice(1)}
                            </div>
                          </div>
                          <p className="text-blue-200 text-sm mb-4">
                            {incident.description}
                          </p>
                          <div className="bg-blue-800/50 p-4 rounded-lg">
                            <div className="text-xs text-blue-300 mb-1">
                              Resolusi:
                            </div>
                            <p className="text-sm">{incident.resolution}</p>
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          )}

          {activeTab === "features" && (
            <motion.div
              key="features"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-12"
            >
              {/* Features by Category */}
              {Object.entries(featuresByCategory).map(
                ([category, features], categoryIndex) => (
                  <motion.div
                    key={category}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: categoryIndex * 0.1 }}
                    className="bg-blue-800/50 backdrop-blur-sm rounded-3xl p-8 border border-blue-700/50"
                  >
                    <div className="flex items-center mb-6">
                      <div className="p-2 bg-blue-700 rounded-full mr-3">
                        {categoryIcons[category as keyof typeof categoryIcons]}
                      </div>
                      <h3 className="text-2xl font-bold">
                        {
                          categoryLabels[
                            category as keyof typeof categoryLabels
                          ]
                        }
                      </h3>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      {features.map((feature, featureIndex) => (
                        <motion.div
                          key={feature.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            delay: categoryIndex * 0.1 + featureIndex * 0.05,
                          }}
                          className={`bg-blue-900/50 rounded-xl overflow-hidden border ${
                            expandedFeature === feature.id
                              ? "border-blue-500"
                              : "border-blue-800"
                          }`}
                        >
                          <div
                            className="p-6 cursor-pointer hover:bg-blue-800/50 transition-colors"
                            onClick={() =>
                              setExpandedFeature(
                                expandedFeature === feature.id
                                  ? null
                                  : feature.id
                              )
                            }
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex items-start">
                                <div className="p-2 bg-blue-700 rounded-lg mr-4 flex-shrink-0">
                                  {feature.icon}
                                </div>
                                <div>
                                  <h4 className="font-semibold text-lg">
                                    {feature.title}
                                  </h4>
                                  <p className="text-blue-300 text-sm">
                                    {feature.description}
                                  </p>
                                </div>
                              </div>
                              <motion.div
                                animate={{
                                  rotate:
                                    expandedFeature === feature.id ? 180 : 0,
                                }}
                                transition={{ duration: 0.3 }}
                              >
                                <ChevronDown className="w-5 h-5 text-blue-400" />
                              </motion.div>
                            </div>
                          </div>

                          <AnimatePresence>
                            {expandedFeature === feature.id && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="border-t border-blue-800"
                              >
                                <div className="p-6">
                                  <h5 className="font-medium mb-3 text-blue-200">
                                    Detail Keamanan:
                                  </h5>
                                  <ul className="space-y-2 mb-6">
                                    {feature.details.map(
                                      (detail, detailIndex) => (
                                        <li
                                          key={detailIndex}
                                          className="flex items-start"
                                        >
                                          <CheckCircle2 className="w-5 h-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                                          <span className="text-blue-200">
                                            {detail}
                                          </span>
                                        </li>
                                      )
                                    )}
                                  </ul>

                                  {feature.certifications && (
                                    <div>
                                      <h5 className="font-medium mb-3 text-blue-200">
                                        Sertifikasi Terkait:
                                      </h5>
                                      <div className="space-y-3">
                                        {feature.certifications.map(
                                          (cert, certIndex) => (
                                            <div
                                              key={certIndex}
                                              className="bg-blue-800/50 p-4 rounded-lg flex items-center justify-between"
                                            >
                                              <div className="flex items-center">
                                                <div className="p-1.5 bg-blue-700 rounded-full mr-3">
                                                  {cert.icon}
                                                </div>
                                                <div>
                                                  <h6 className="font-medium">
                                                    {cert.name}
                                                  </h6>
                                                  <p className="text-xs text-blue-300">
                                                    {cert.description}
                                                  </p>
                                                </div>
                                              </div>
                                              <span className="text-sm text-blue-400">
                                                {cert.year}
                                              </span>
                                            </div>
                                          )
                                        )}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )
              )}

              {/* Security Process */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-gradient-to-r from-blue-700 to-indigo-700 rounded-3xl p-8 shadow-xl"
              >
                <h3 className="text-2xl font-bold mb-6 flex items-center">
                  <Sparkles className="w-6 h-6 mr-2" />
                  Proses Keamanan Berkelanjutan
                </h3>

                <div className="grid md:grid-cols-4 gap-6">
                  {[
                    {
                      step: "1",
                      title: "Identifikasi",
                      description:
                        "Pemindaian kerentanan rutin dan audit keamanan",
                      icon: <AlertCircle className="w-6 h-6" />,
                    },
                    {
                      step: "2",
                      title: "Proteksi",
                      description: "Implementasi kontrol keamanan berlapis",
                      icon: <Shield className="w-6 h-6" />,
                    },
                    {
                      step: "3",
                      title: "Deteksi",
                      description:
                        "Pemantauan 24/7 untuk aktivitas mencurigakan",
                      icon: <Eye className="w-6 h-6" />,
                    },
                    {
                      step: "4",
                      title: "Respons",
                      description:
                        "Protokol respons insiden yang cepat dan efektif",
                      icon: <Zap className="w-6 h-6" />,
                    },
                  ].map((process, index) => (
                    <div
                      key={index}
                      className="bg-blue-800/50 backdrop-blur-sm rounded-xl p-6 border border-blue-600/50"
                    >
                      <div className="flex items-center mb-4">
                        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-sm font-bold mr-3">
                          {process.step}
                        </div>
                        <h4 className="font-semibold">{process.title}</h4>
                      </div>
                      <div className="p-3 bg-blue-700/50 rounded-lg mb-4">
                        {process.icon}
                      </div>
                      <p className="text-blue-200 text-sm">
                        {process.description}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}

          {activeTab === "compliance" && (
            <motion.div
              key="compliance"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid md:grid-cols-2 gap-12 mb-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h3 className="text-2xl font-bold mb-6">
                    Kepatuhan Regulasi
                  </h3>
                  <p className="text-blue-200 mb-6">
                    KamusKenyah berkomitmen untuk mematuhi semua regulasi dan
                    standar keamanan yang berlaku. Kami secara teratur menjalani
                    audit dan sertifikasi untuk memastikan kepatuhan kami
                    terhadap standar industri terkini.
                  </p>

                  <div className="space-y-4">
                    {[
                      {
                        name: "GDPR",
                        description:
                          "Regulasi Perlindungan Data Umum Uni Eropa",
                        details:
                          "Kami mematuhi semua persyaratan GDPR, termasuk hak pengguna untuk mengakses, mengubah, dan menghapus data mereka.",
                      },
                      {
                        name: "UU Perlindungan Data Indonesia",
                        description: "Regulasi perlindungan data nasional",
                        details:
                          "Kami mematuhi semua persyaratan UU Perlindungan Data Indonesia untuk melindungi data pribadi pengguna.",
                      },
                      {
                        name: "CCPA",
                        description: "California Consumer Privacy Act",
                        details:
                          "Kami memberikan transparansi dan kontrol kepada pengguna California sesuai dengan CCPA.",
                      },
                    ].map((regulation, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        className="bg-blue-800/50 backdrop-blur-sm rounded-xl p-6 border border-blue-700/50"
                      >
                        <h4 className="font-semibold mb-2">
                          {regulation.name}
                        </h4>
                        <p className="text-blue-300 text-sm mb-4">
                          {regulation.description}
                        </p>
                        <p className="text-blue-200 text-sm">
                          {regulation.details}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <h3 className="text-2xl font-bold mb-6">
                    Sertifikasi & Standar
                  </h3>

                  <div className="bg-blue-800/50 backdrop-blur-sm rounded-3xl p-6 border border-blue-700/50 mb-8">
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      {[
                        { name: "ISO 27001", year: "2023" },
                        { name: "SOC 2 Type II", year: "2022" },
                        { name: "GDPR Compliant", year: "2023" },
                        { name: "PCI DSS", year: "2023" },
                      ].map((cert, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-blue-700/50 rounded-lg"
                        >
                          <span className="font-medium">{cert.name}</span>
                          <span className="text-blue-300 text-sm">
                            {cert.year}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div
                      className="p-4 bg-blue-900/50 rounded-xl border border-blue-800 cursor-pointer"
                      onClick={() =>
                        setExpandedCertification(
                          expandedCertification === "iso" ? null : "iso"
                        )
                      }
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <BadgeCheck className="w-5 h-5 text-blue-400 mr-2" />
                          <h4 className="font-medium">
                            ISO 27001 - Manajemen Keamanan Informasi
                          </h4>
                        </div>
                        <ChevronDown
                          className={`w-5 h-5 text-blue-400 transition-transform duration-300 ${
                            expandedCertification === "iso"
                              ? "transform rotate-180"
                              : ""
                          }`}
                        />
                      </div>

                      <AnimatePresence>
                        {expandedCertification === "iso" && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="mt-4 pt-4 border-t border-blue-800"
                          >
                            <p className="text-blue-200 text-sm mb-4">
                              ISO 27001 adalah standar internasional untuk
                              manajemen keamanan informasi. Sertifikasi ini
                              menunjukkan bahwa KamusKenyah telah menerapkan
                              kontrol keamanan komprehensif untuk melindungi
                              data pengguna.
                            </p>
                            <div className="space-y-2">
                              <div className="flex items-start">
                                <Check className="w-4 h-4 text-green-400 mr-2 mt-1" />
                                <span className="text-blue-200 text-sm">
                                  Manajemen risiko keamanan informasi
                                </span>
                              </div>
                              <div className="flex items-start">
                                <Check className="w-4 h-4 text-green-400 mr-2 mt-1" />
                                <span className="text-blue-200 text-sm">
                                  Kontrol keamanan fisik dan lingkungan
                                </span>
                              </div>
                              <div className="flex items-start">
                                <Check className="w-4 h-4 text-green-400 mr-2 mt-1" />
                                <span className="text-blue-200 text-sm">
                                  Keamanan operasional dan komunikasi
                                </span>
                              </div>
                              <div className="flex items-start">
                                <Check className="w-4 h-4 text-green-400 mr-2 mt-1" />
                                <span className="text-blue-200 text-sm">
                                  Kontrol akses dan manajemen insiden
                                </span>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-6 shadow-xl">
                    <h4 className="font-semibold mb-4 flex items-center">
                      <ShieldCheck className="w-5 h-5 mr-2" />
                      Audit Keamanan Independen
                    </h4>
                    <p className="text-blue-100 text-sm mb-4">
                      Kami secara rutin menjalani audit keamanan oleh pihak
                      ketiga independen untuk memastikan kepatuhan kami terhadap
                      standar keamanan tertinggi.
                    </p>
                    <div className="flex items-center justify-between p-4 bg-blue-700/50 rounded-lg">
                      <div>
                        <span className="font-medium">
                          Audit Keamanan Tahunan
                        </span>
                        <p className="text-blue-200 text-xs">
                          Oleh KPMG Cyber Security
                        </p>
                      </div>
                      <span className="text-blue-200 text-sm">
                        Terakhir: Juni 2023
                      </span>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Compliance Timeline */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-blue-800/50 backdrop-blur-sm rounded-3xl p-8 border border-blue-700/50"
              >
                <h3 className="text-2xl font-bold mb-8">Timeline Kepatuhan</h3>

                <div className="relative">
                  <div className="absolute left-0 md:left-1/2 h-full w-1 bg-blue-600 transform md:translate-x-0"></div>

                  <div className="space-y-12">
                    {[
                      {
                        year: "2020",
                        event:
                          "Pendirian KamusKenyah dengan fokus pada keamanan dan privasi",
                      },
                      {
                        year: "2021",
                        event: "Implementasi kerangka keamanan ISO 27001",
                      },
                      {
                        year: "2022",
                        event: "Sertifikasi SOC 2 Type II",
                        highlight: true,
                      },
                      {
                        year: "2023",
                        event: "Sertifikasi ISO 27001 dan kepatuhan GDPR",
                        highlight: true,
                      },
                    ].map((item, index) => (
                      <div key={index} className="relative flex items-center">
                        <div
                          className={`absolute left-0 md:left-1/2 w-6 h-6 rounded-full transform -translate-x-1/2 border-2 ${
                            item.highlight
                              ? "bg-blue-500 border-blue-300"
                              : "bg-blue-800 border-blue-600"
                          }`}
                        ></div>

                        <div
                          className={`ml-10 md:ml-0 md:w-1/2 ${
                            index % 2 === 0 ? "md:pr-12" : "md:pl-12 md:ml-auto"
                          }`}
                        >
                          <div
                            className={`p-4 rounded-xl ${
                              item.highlight
                                ? "bg-gradient-to-r from-blue-600 to-indigo-600"
                                : "bg-blue-900/50 border border-blue-800"
                            }`}
                          >
                            <div className="font-bold text-lg mb-2">
                              {item.year}
                            </div>
                            <p className="text-blue-200">{item.event}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}

          {activeTab === "faq" && (
            <motion.div
              key="faq"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-blue-800/50 backdrop-blur-sm rounded-3xl p-8 border border-blue-700/50"
            >
              <h3 className="text-2xl font-bold mb-8">
                Pertanyaan yang Sering Diajukan
              </h3>

              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className={`bg-blue-900/50 rounded-xl overflow-hidden border ${
                      expandedFAQ === index
                        ? "border-blue-500"
                        : "border-blue-800"
                    }`}
                  >
                    <div
                      className="p-6 cursor-pointer hover:bg-blue-800/50 transition-colors"
                      onClick={() =>
                        setExpandedFAQ(expandedFAQ === index ? null : index)
                      }
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start">
                          <ShieldQuestion className="w-5 h-5 text-blue-400 mr-3 mt-1" />
                          <h4 className="font-semibold">{faq.question}</h4>
                        </div>
                        <motion.div
                          animate={{ rotate: expandedFAQ === index ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ChevronDown className="w-5 h-5 text-blue-400" />
                        </motion.div>
                      </div>
                    </div>

                    <AnimatePresence>
                      {expandedFAQ === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="border-t border-blue-800"
                        >
                          <div className="p-6 text-blue-200">{faq.answer}</div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 pt-8 border-t border-blue-700">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">Masih punya pertanyaan?</h4>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center space-x-2 px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-sm font-medium transition-colors"
                  >
                    <span>Hubungi Tim Keamanan</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl font-bold mb-4">
            Keamanan Anda Adalah Prioritas Kami
          </h3>
          <p className="text-blue-200 mb-8 max-w-2xl mx-auto">
            Bergabunglah dengan ribuan pengguna yang mempercayakan data mereka
            kepada KamusKenyah. Kami berkomitmen untuk terus meningkatkan
            standar keamanan kami.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <motion.a
              href="#"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 px-8 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg font-medium transition-colors"
            >
              <Shield className="w-5 h-5" />
              <span>Kebijakan Privasi</span>
              <ExternalLink className="w-4 h-4" />
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 px-8 py-3 bg-blue-800 hover:bg-blue-700 rounded-lg font-medium transition-colors"
            >
              <FileText className="w-5 h-5" />
              <span>Laporan Keamanan</span>
              <ExternalLink className="w-4 h-4" />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SecurityPrivacyAssurance;
