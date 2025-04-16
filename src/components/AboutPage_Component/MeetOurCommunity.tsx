"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import {
  Users,
  MessageCircle,
  Heart,
  Star,
  Globe,
  ChevronRight,
  MapPin,
} from "lucide-react";

interface CommunityMember {
  id: number;
  name: string;
  role: string;
  avatar: string;
  contribution: string;
  testimonial: string;
  socialLink?: string;
}

const communityMembers: CommunityMember[] = [
  {
    id: 1,
    name: "Bulan Lenjau",
    role: "Penerjemah Sukarela",
    avatar: "/assets/img/Member1.jpg",
    contribution: "500+ kata diterjemahkan",
    testimonial:
      "KamusKenyah memberi saya kesempatan untuk berbagi pengetahuan bahasa Kenyah saya dengan dunia.",
    socialLink: "https://twitter.com/bulan_lenjau",
  },
  {
    id: 2,
    name: "Ding Anyie",
    role: "Guru Bahasa",
    avatar: "/assets/img/Member2.jpg",
    contribution: "20 pelajaran bahasa dibuat",
    testimonial:
      "Platform ini membantu saya mengajar bahasa Kenyah dengan cara yang lebih interaktif dan menarik.",
    socialLink: "https://linkedin.com/in/ding-anyie",
  },
  {
    id: 3,
    name: "Liah Ding",
    role: "Kontributor Konten",
    avatar: "/assets/img/Member3.jpg",
    contribution: "30 artikel budaya ditulis",
    testimonial:
      "Saya bangga bisa membantu melestarikan warisan budaya kami melalui KamusKenyah.",
    socialLink: "https://instagram.com/liah_ding",
  },
  {
    id: 4,
    name: "Jalong Peluk",
    role: "Moderator Forum",
    avatar: "/assets/img/Member4.jpg",
    contribution: "1000+ diskusi difasilitasi",
    testimonial:
      "Komunitas KamusKenyah adalah tempat yang luar biasa untuk berbagi dan belajar bersama.",
    socialLink: "https://facebook.com/jalong_peluk",
  },
  {
    id: 5,
    name: "Ubong Emang",
    role: "Pengembang Aplikasi",
    avatar: "/assets/img/Member5.jpg",
    contribution: "5 fitur baru diimplementasikan",
    testimonial:
      "Berkontribusi pada KamusKenyah memungkinkan saya menggabungkan passion teknologi dan pelestarian bahasa.",
    socialLink: "https://github.com/ubong_emang",
  },
];

const MeetOurCommunity: React.FC = () => {
  const [activeMember, setActiveMember] = useState<CommunityMember>(
    communityMembers[0]
  );
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

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
      className="py-20 bg-gradient-to-b from-indigo-50 to-white overflow-hidden"
    >
      <motion.div
        initial="hidden"
        animate={controls}
        variants={containerVariants}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Bertemu dengan{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Komunitas Kami
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Temui para pahlawan di balik layar yang membuat KamusKenyah hidup
            dan berkembang
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Community Showcase */}
          <motion.div variants={itemVariants} className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-3xl transform rotate-3 scale-105 opacity-10"></div>
            <div className="relative bg-white rounded-3xl shadow-xl p-8 overflow-hidden">
              <div className="flex items-center mb-6">
                <motion.img
                  key={activeMember.id}
                  src={activeMember.avatar}
                  alt={activeMember.name}
                  className="w-24 h-24 rounded-full object-cover border-4 border-indigo-500"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                />
                <div className="ml-6">
                  <motion.h3
                    key={`name-${activeMember.id}`}
                    className="text-2xl font-bold text-gray-900"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    {activeMember.name}
                  </motion.h3>
                  <motion.p
                    key={`role-${activeMember.id}`}
                    className="text-lg text-indigo-600"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    {activeMember.role}
                  </motion.p>
                </div>
              </div>
              <motion.div
                key={`contribution-${activeMember.id}`}
                className="mb-6 flex items-center text-lg text-gray-700"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Star className="w-6 h-6 text-yellow-500 mr-2" />
                {activeMember.contribution}
              </motion.div>
              <motion.blockquote
                key={`testimonial-${activeMember.id}`}
                className="text-xl italic text-gray-600"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                "{activeMember.testimonial}"
              </motion.blockquote>
              {activeMember.socialLink && (
                <motion.a
                  href={activeMember.socialLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center mt-4 text-indigo-600 hover:text-indigo-800 transition-colors duration-200"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <MapPin className="w-5 h-5 mr-2" />
                  Lihat Profil
                </motion.a>
              )}
            </div>
          </motion.div>

          {/* Community Stats and Selection */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  icon: <Users className="w-8 h-8 text-indigo-500" />,
                  label: "Anggota Aktif",
                  value: "5,000+",
                },
                {
                  icon: <MessageCircle className="w-8 h-8 text-green-500" />,
                  label: "Diskusi",
                  value: "10,000+",
                },
                {
                  icon: <Heart className="w-8 h-8 text-red-500" />,
                  label: "Kontribusi",
                  value: "50,000+",
                },
                {
                  icon: <Globe className="w-8 h-8 text-blue-500" />,
                  label: "Negara",
                  value: "20+",
                },
              ].map((stat) => (
                <motion.div
                  key={stat.label}
                  className="bg-white rounded-xl shadow-md p-4 flex items-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  {stat.icon}
                  <div className="ml-4">
                    <div className="text-2xl font-bold text-gray-900">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Pilih Anggota Komunitas
              </h3>
              <div className="space-y-3">
                {communityMembers.map((member) => (
                  <motion.button
                    key={member.id}
                    className={`w-full text-left px-4 py-2 rounded-lg flex items-center justify-between ${
                      activeMember.id === member.id
                        ? "bg-indigo-100 text-indigo-700"
                        : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                    } transition-colors duration-200`}
                    onClick={() => setActiveMember(member)}
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>{member.name}</span>
                    <ChevronRight className="w-5 h-5" />
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div variants={itemVariants} className="mt-20 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Bergabunglah dengan Komunitas Kami
          </h3>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Jadilah bagian dari gerakan pelestarian bahasa Dayak Kenyah.
            Bersama-sama, kita bisa membuat perbedaan.
          </p>
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 15px rgba(79, 70, 229, 0.5)",
            }}
            whileTap={{ scale: 0.95 }}
            className="bg-indigo-600 text-white text-xl px-10 py-4 rounded-md font-medium hover:shadow-xl transition-all duration-300"
          >
            Gabung Sekarang
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default MeetOurCommunity;
