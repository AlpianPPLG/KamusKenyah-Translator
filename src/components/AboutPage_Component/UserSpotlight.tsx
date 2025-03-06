"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useAnimation,
  useInView,
} from "framer-motion";
import {
  Star,
  Award,
  ThumbsUp,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  MapPin,
} from "lucide-react";

interface UserSpotlight {
  id: number;
  name: string;
  role: string;
  avatar: string;
  testimonial: string;
  contribution: string;
  rating: number;
  socialLink: string;
}

const userSpotlights: UserSpotlight[] = [
  {
    id: 1,
    name: "Dr. Anyi Saging",
    role: "Peneliti Bahasa Kenyah",
    avatar: "../../../public/assets/img/Clien1.jpg",
    testimonial:
      "KamusKenyah telah menjadi alat yang tak ternilai dalam penelitian saya tentang evolusi bahasa Kenyah. Akurasi dan kedalaman informasinya luar biasa.",
    contribution: "Menyumbangkan 1000+ entri kamus dan validasi etimologi",
    rating: 5,
    socialLink: "https://linkedin.com/in/anyi-saging",
  },
  {
    id: 2,
    name: "Balang Beludan",
    role: "Guru Bahasa Daerah",
    avatar: "../../../public/assets/img/Clien2.jpg",
    testimonial:
      "Sebagai guru, saya menemukan bahwa KamusKenyah membuat pelajaran bahasa menjadi lebih interaktif dan menarik bagi siswa saya. Ini adalah revolusi dalam pengajaran bahasa daerah.",
    contribution: "Mengembangkan 20 modul pembelajaran interaktif",
    rating: 5,
    socialLink: "https://twitter.com/balang_beludan",
  },
  {
    id: 3,
    name: "Liah Ding",
    role: "Aktivis Pelestarian Budaya",
    avatar: "../../../public/assets/img/Clien3.jpg",
    testimonial:
      "KamusKenyah bukan hanya tentang bahasa, tapi juga tentang melestarikan warisan budaya kita. Saya bangga menjadi bagian dari komunitas yang peduli akan hal ini.",
    contribution:
      "Menginisiasi kampanye 'Bicara Kenyah' yang menjangkau 5000+ pemuda",
    rating: 5,
    socialLink: "https://instagram.com/liah_ding_culture",
  },
];

const UserSpotlight: React.FC = () => {
  const [currentSpotlight, setCurrentSpotlight] = useState(0);
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  const nextSpotlight = () => {
    setCurrentSpotlight((prev) => (prev + 1) % userSpotlights.length);
  };

  const prevSpotlight = () => {
    setCurrentSpotlight(
      (prev) => (prev - 1 + userSpotlights.length) % userSpotlights.length
    );
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
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section
      ref={ref}
      className="py-20 bg-gradient-to-b from-blue-50 to-indigo-100 overflow-hidden"
    >
      <motion.div
        initial="hidden"
        animate={controls}
        variants={containerVariants}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Sorotan{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Pengguna Terbaik
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Bertemu dengan para pahlawan yang telah memberikan kontribusi luar
            biasa dalam melestarikan bahasa Kenyah
          </p>
        </motion.div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSpotlight}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="md:flex">
                <div className="md:w-1/3 relative">
                  <div className="aspect-w-1 aspect-h-1">
                    <img
                      src={
                        userSpotlights[currentSpotlight].avatar ||
                        "/placeholder.svg"
                      }
                      alt={userSpotlights[currentSpotlight].name}
                      className="w-full h-full object-cover rounded-t-3xl"
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
                    <h3 className="text-2xl font-bold text-white">
                      {userSpotlights[currentSpotlight].name}
                    </h3>
                    <p className="text-lg text-blue-200">
                      {userSpotlights[currentSpotlight].role}
                    </p>
                  </div>
                </div>
                <div className="md:w-2/3 p-8">
                  <div className="flex items-center mb-4">
                    {[...Array(userSpotlights[currentSpotlight].rating)].map(
                      (_, i) => (
                        <Star
                          key={i}
                          className="w-6 h-6 text-yellow-400 fill-current"
                        />
                      )
                    )}
                  </div>
                  <blockquote className="text-xl italic text-gray-700 mb-6">
                    "{userSpotlights[currentSpotlight].testimonial}"
                  </blockquote>
                  <div className="flex items-center text-indigo-600 mb-6">
                    <Award className="w-6 h-6 mr-2" />
                    <span>{userSpotlights[currentSpotlight].contribution}</span>
                  </div>
                  <a
                    href={userSpotlights[currentSpotlight].socialLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200"
                  >
                    <ExternalLink className="w-5 h-5 mr-2" />
                    <MapPin className="w-5 h-5 mr-2" />
                    Lihat Profil
                  </a>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevSpotlight}
              className="bg-white p-3 rounded-full shadow-lg text-blue-600 hover:text-blue-800 transition-colors duration-200"
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>
          </div>

          <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextSpotlight}
              className="bg-white p-3 rounded-full shadow-lg text-blue-600 hover:text-blue-800 transition-colors duration-200"
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
          </div>
        </div>

        <motion.div variants={itemVariants} className="mt-16">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Bergabunglah dengan Para Bintang Kami
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <ThumbsUp className="w-12 h-12 text-green-500" />,
                title: "Beri Kontribusi",
                description: "Tambahkan pengetahuan Anda ke database kami",
              },
              {
                icon: <MessageCircle className="w-12 h-12 text-blue-500" />,
                title: "Beri Feedback",
                description: "Bantu kami meningkatkan platform",
              },
              {
                icon: <Star className="w-12 h-12 text-yellow-500" />,
                title: "Jadi Bintang",
                description: "Dapatkan pengakuan atas kontribusi Anda",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-xl shadow-lg p-6 text-center"
              >
                <div className="inline-block p-3 bg-gray-100 rounded-full mb-4">
                  {item.icon}
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">
                  {item.title}
                </h4>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="mt-16 text-center">
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 15px rgba(59, 130, 246, 0.5)",
            }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xl px-10 py-4 rounded-md font-medium hover:shadow-xl transition-all duration-300"
          >
            Mulai Berkontribusi Sekarang
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default UserSpotlight;
