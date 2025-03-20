"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Linkedin,
  Twitter,
  Mail,
} from "lucide-react";

// Define team member type
interface TeamMember {
  id: number;
  name: string;
  position: string;
  title: string;
  image: string;
  socialLinks: {
    linkedin?: string;
    twitter?: string;
    email?: string;
  };
  bio: string;
}

const OurTeam_Carousel: React.FC = () => {
  // Team members data
  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: "Dr. Anita Wijaya",
      position: "Linguist",
      title: "Founder & CEO",
      image: "/assets/img/Person1.jpg",
      socialLinks: {
        linkedin: "https://linkedin.com",
        twitter: "https://twitter.com",
        email: "anita@kamuskenyah.com",
      },
      bio: "Ahli bahasa dengan spesialisasi bahasa-bahasa Kalimantan. Telah meneliti bahasa Dayak Kenyah selama 15 tahun.",
    },
    {
      id: 2,
      name: "Budi Santoso",
      position: "UI/UX Designer",
      title: "Creative Director",
      image: "/assets/img/Person2.jpg",
      socialLinks: {
        linkedin: "https://linkedin.com",
        twitter: "https://twitter.com",
        email: "budi@kamuskenyah.com",
      },
      bio: "Desainer dengan pengalaman 10 tahun dalam menciptakan antarmuka yang intuitif dan menarik secara visual.",
    },
    {
      id: 3,
      name: "Maya Putri",
      position: "Developer",
      title: "CTO",
      image: "/assets/img/Person3.jpg",
      socialLinks: {
        linkedin: "https://linkedin.com",
        email: "maya@kamuskenyah.com",
      },
      bio: "Pengembang full-stack dengan keahlian dalam teknologi AI dan pemrosesan bahasa alami.",
    },
    {
      id: 4,
      name: "Reza Firmansyah",
      position: "Cultural Expert",
      title: "Research Lead",
      image: "/assets/img/Person4.jpg",
      socialLinks: {
        linkedin: "https://linkedin.com",
        twitter: "https://twitter.com",
        email: "reza@kamuskenyah.com",
      },
      bio: "Antropolog budaya dengan fokus pada tradisi dan bahasa masyarakat Dayak Kenyah.",
    },
    {
      id: 5,
      name: "Siti Nurhaliza",
      position: "Community Manager",
      title: "Outreach Director",
      image: "/assets/img/Person5.jpg",
      socialLinks: {
        linkedin: "https://linkedin.com",
        twitter: "https://twitter.com",
        email: "siti@kamuskenyah.com",
      },
      bio: "Spesialis hubungan masyarakat yang berdedikasi untuk menghubungkan komunitas Dayak Kenyah dengan dunia digital.",
    },
    {
      id: 6,
      name: "Rizky Maulana",
      position: "Community Manager",
      title: "Outreach Director",
      image: "/assets/img/Person6.jpg",
      socialLinks: {
        linkedin: "https://linkedin.com",
        twitter: "https://twitter.com",
        email: "rizky@kamuskenyah.com",
      },
      bio: "Spesialis hubungan masyarakat yang berdedikasi untuk menghubungkan komunitas Dayak Kenyah dengan dunia digital.",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Determine how many cards to show based on screen size
  const getVisibleCardCount = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth >= 1280) return 4; // xl
      if (window.innerWidth >= 1024) return 3; // lg
      if (window.innerWidth >= 768) return 2; // md
      return 1; // sm and below
    }
    return 3; // Default for SSR
  };

  // Update visible cards when screen size changes
  useEffect(() => {
    const handleResize = () => {
      updateVisibleCards(currentIndex);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [currentIndex]);

  // Update which cards are visible
  const updateVisibleCards = (startIndex: number) => {
    const visibleCount = getVisibleCardCount();
    const newVisibleCards: number[] = [];

    for (let i = 0; i < visibleCount; i++) {
      const index = (startIndex + i) % teamMembers.length;
      newVisibleCards.push(index);
    }

    setVisibleCards(newVisibleCards);
  };

  // Initialize visible cards
  useEffect(() => {
    updateVisibleCards(currentIndex);
  }, [currentIndex]); // Removed getVisibleCardCount from dependencies

  // Navigation functions
  const nextSlide = () => {
    const nextIndex = (currentIndex + 1) % teamMembers.length;
    setCurrentIndex(nextIndex);
    updateVisibleCards(nextIndex);
  };

  const prevSlide = () => {
    const prevIndex =
      (currentIndex - 1 + teamMembers.length) % teamMembers.length;
    setCurrentIndex(prevIndex);
    updateVisibleCards(prevIndex);
  };

  // Card variants for animation
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="#ourteam" className="py-20 bg-gradient-to-b from-blue-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Tim Kami di{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Kamus Kenyah
              </span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Bertemu dengan para ahli bahasa, teknologi, dan budaya yang
              berdedikasi untuk melestarikan bahasa Dayak Kenyah
            </p>
          </motion.div>
        </div>

        {/* Carousel Container */}
        <div ref={carouselRef} className="relative">
          {/* Navigation Buttons */}
          <div className="absolute top-1/2 left-0 transform -translate-y-1/2 z-10">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevSlide}
              className="bg-white p-3 rounded-full shadow-lg text-blue-600 hover:text-blue-800 transition-colors duration-300"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>
          </div>

          <div className="absolute top-1/2 right-0 transform -translate-y-1/2 z-10">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextSlide}
              className="bg-white p-3 rounded-full shadow-lg text-blue-600 hover:text-blue-800 transition-colors duration-300"
              aria-label="Next slide"
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
          </div>

          {/* Cards Container */}
          <div className="overflow-hidden py-8">
            <div className="flex justify-center">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {visibleCards.map((index) => {
                  const member = teamMembers[index];
                  return (
                    <motion.div
                      key={member.id}
                      variants={cardVariants}
                      initial="hidden"
                      animate="visible"
                      className="w-64 bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
                    >
                      {/* Image Container with B&W to Color Effect */}
                      <div className="relative h-72 overflow-hidden group">
                        <img
                          src={member.image || "/placeholder.svg"}
                          alt={member.name}
                          className="w-full h-full object-cover object-center transition-all duration-500 filter grayscale group-hover:grayscale-0"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                        {/* Social Links - Appear on Hover */}
                        <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-center space-x-4 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                          {member.socialLinks.linkedin && (
                            <a
                              href={member.socialLinks.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-white p-2 rounded-full text-blue-600 hover:text-blue-800 transition-colors"
                            >
                              <Linkedin className="w-5 h-5" />
                            </a>
                          )}
                          {member.socialLinks.twitter && (
                            <a
                              href={member.socialLinks.twitter}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-white p-2 rounded-full text-blue-400 hover:text-blue-600 transition-colors"
                            >
                              <Twitter className="w-5 h-5" />
                            </a>
                          )}
                          {member.socialLinks.email && (
                            <a
                              href={`mailto:${member.socialLinks.email}`}
                              className="bg-white p-2 rounded-full text-red-500 hover:text-red-700 transition-colors"
                            >
                              <Mail className="w-5 h-5" />
                            </a>
                          )}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-1">
                          {member.name}
                        </h3>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm font-medium text-blue-600">
                            {member.position}
                          </span>
                          <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full">
                            {member.title}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm line-clamp-3">
                          {member.bio}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Pagination Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {teamMembers.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  updateVisibleCards(index);
                }}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  visibleCards.includes(index)
                    ? "bg-blue-600 w-6"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Team Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { value: "15+", label: "Tahun Pengalaman" },
            { value: "25+", label: "Ahli Bahasa" },
            { value: "5000+", label: "Kata Terdokumentasi" },
            { value: "10K+", label: "Pengguna Aktif" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-xl shadow-md p-6 text-center transform hover:scale-105 transition-transform duration-300"
            >
              <div className="text-2xl md:text-3xl font-bold text-blue-600 mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-lg text-gray-600 mb-6">
            Tertarik bergabung dengan tim kami? Kami selalu mencari talenta baru
            yang bersemangat untuk melestarikan bahasa dan budaya.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300"
          >
            Bergabung Dengan Kami
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default OurTeam_Carousel;
