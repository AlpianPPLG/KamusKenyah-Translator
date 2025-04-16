"use client";

import { motion, useAnimation, useInView } from "framer-motion"; // Tambahkan useAnimation dan useInView
import {
  Users,
  Globe,
  BookOpen,
  Languages,
  History,
  Heart,
  Lightbulb,
  ArrowRight,
  Share2,
} from "lucide-react";
import React, { useState } from "react";

const AboutHero: React.FC = () => {
  const teamStats = [
    { value: 2018, label: "Didirikan" }, // Ubah menjadi angka untuk animasi
    { value: 25, label: "Ahli Bahasa" }, // Ubah menjadi angka
    { value: 4, label: "Penghargaan" }, // Ubah menjadi angka
    { value: 3, label: "Kantor Regional" }, // Ubah menjadi angka
  ];

  // State untuk menyimpan nilai yang dianimasikan
  const [animatedValues, setAnimatedValues] = useState<number[]>(
    teamStats.map(() => 0)
  );

  // Hook untuk mendeteksi apakah elemen berada dalam viewport
  const controls = useAnimation();
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true }); // Animasi hanya sekali saat dilihat

  // Memulai animasi saat elemen masuk ke viewport
  React.useEffect(() => {
    if (isInView) {
      controls.start("visible");

      // Animasi penghitungan
      teamStats.forEach((stat, index) => {
        animateValue(index, 0, stat.value, 2000); // 2000ms = 2 detik
      });
    }
  }, [isInView, controls]);

  // Fungsi untuk menganimasikan nilai
  const animateValue = (
    index: number,
    start: number,
    end: number,
    duration: number
  ) => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const currentValue = Math.floor(progress * (end - start) + start);

      setAnimatedValues((prev) => {
        const newValues = [...prev];
        newValues[index] = currentValue;
        return newValues;
      });

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  };

  // Variasi animasi untuk penghitungan
  const countVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8, // Durasi animasi tampilan (bukan penghitungan)
        ease: "easeOut", // Efek transisi yang halus
      },
    },
  };

  return (
    <section className="relative min-h-screen pt-24 overflow-hidden bg-gradient-to-b from-white to-blue-50">
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
          className="absolute -bottom-20 -left-20 w-60 h-60 bg-indigo-100 rounded-full opacity-20 blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
          }}
          transition={{
            duration: 15,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute top-1/3 right-1/4 w-40 h-40 bg-purple-100 rounded-full opacity-10 blur-2xl"
          animate={{
            y: [0, 30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Hero Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center pt-8 pb-20">
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <div className="inline-flex items-center px-3 py-1.5 mb-6 bg-blue-50 text-blue-700 rounded-full border border-blue-100 text-sm font-medium">
              <Languages className="w-4 h-4 mr-2" />
              <span>Tentang KamusKenyah</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight mb-6">
              Misi Kami{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Melestarikan Bahasa
              </span>{" "}
              Dayak Kenyah
            </h1>

            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Kami adalah tim yang berdedikasi untuk melestarikan keindahan
              bahasa dan budaya Dayak Kenyah melalui teknologi modern.
              Perjalanan kami dimulai dari kepedulian terhadap kelestarian
              bahasa lokal dan berkembang menjadi platform terjemahan yang
              komprehensif.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300"
              >
                <span>Cerita Lengkap</span>
                <ArrowRight className="h-5 w-5" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-700 px-8 py-3 rounded-lg font-medium hover:bg-gray-50 transition-all duration-300"
              >
                <Share2 className="h-5 w-5" />
                <span>Bagikan Misi Kami</span>
              </motion.button>
            </div>

            {/* Stats Grid dengan Animasi Penghitungan */}
            <div
              ref={ref} // Referensi untuk mendeteksi viewport
              className="grid grid-cols-2 sm:grid-cols-4 gap-4"
            >
              {teamStats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial="hidden"
                  animate={controls} // Menggunakan controls untuk animasi
                  variants={countVariants}
                  className="text-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <div className="text-2xl font-bold text-blue-600 mb-1">
                    {animatedValues[index]}
                  </div>
                  <div className="text-xs text-gray-500">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Logo */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="relative z-10 bg-white rounded-2xl shadow-xl overflow-hidden">
              {/* Logo Container */}
              <div className="aspect-[4/3] relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, delay: 0.8 }}
                  className="absolute inset-0 flex items-center justify-center p-8"
                >
                  <img
                    src="/assets/img/Logo.png"
                    alt="KamusKenyah Logo"
                    className="w-full h-full object-contain rounded-lg"
                  />
                </motion.div>
              </div>

              {/* Info Panels */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Tim KamusKenyah
                </h3>

                <div className="space-y-4">
                  {[
                    {
                      icon: <BookOpen className="w-5 h-5 text-blue-600" />,
                      title: "Ahli Bahasa & Budaya",
                      description:
                        "Tim linguistik profesional dengan spesialisasi bahasa Dayak Kenyah",
                    },
                    {
                      icon: <Lightbulb className="w-5 h-5 text-amber-500" />,
                      title: "Inovator Teknologi",
                      description:
                        "Pengembang teknologi yang fokus pada pelestarian bahasa daerah",
                    },
                    {
                      icon: <Heart className="w-5 h-5 text-red-500" />,
                      title: "Komunitas Pendukung",
                      description:
                        "Didukung oleh komunitas lokal dan pegiat pelestarian budaya",
                    },
                  ].map((item, index) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 1.4 + index * 0.2 }}
                      className="flex items-start space-x-4"
                    >
                      <div className="p-2 bg-gray-50 rounded-lg">
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">
                          {item.title}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {item.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-indigo-100 rounded-full opacity-70 z-0"></div>
            <div className="absolute -top-8 -left-8 w-24 h-24 bg-blue-100 rounded-full opacity-70 z-0"></div>
          </motion.div>
        </div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="py-12 border-t border-gray-100"
        >
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-12">
            Nilai-Nilai Yang Kami Junjung Tinggi
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <History className="w-8 h-8" />,
                title: "Pelestarian",
                description:
                  "Menjaga keberlangsungan bahasa dan tradisi Dayak Kenyah untuk generasi mendatang",
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Komunitas",
                description:
                  "Membangun jaringan pendukung yang saling terhubung dan berbagi pengetahuan",
              },
              {
                icon: <Globe className="w-8 h-8" />,
                title: "Aksesibilitas",
                description:
                  "Menyediakan akses pendidikan bahasa daerah yang mudah dan terjangkau untuk semua",
              },
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="w-16 h-16 mb-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg flex items-center justify-center text-blue-600">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutHero;
