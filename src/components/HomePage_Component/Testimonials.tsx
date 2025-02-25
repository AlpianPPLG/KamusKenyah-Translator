import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  ChevronLeft,
  ChevronRight,
  Quote,
  Users,
  Award,
  MessageSquare,
} from "lucide-react";

// Interface untuk data testimonial
interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  rating: number;
  avatarColor: string;
  date: string;
}

const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // Data testimonial
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Sarah Putri",
      role: "Peneliti Bahasa",
      content:
        "KamusKenyah sangat membantu saya dalam mempelajari bahasa Dayak Kenyah. Fitur audio dan terjemahan kontekstualnya luar biasa!",
      rating: 5,
      avatarColor: "from-blue-200 to-indigo-200",
      date: "Jan 2025",
    },
    {
      id: 2,
      name: "Aditya Wijaya",
      role: "Guru Bahasa",
      content:
        "Platform ini tidak hanya akurat tetapi juga ramah pengguna. Saya merekomendasikannya untuk siapa saja yang ingin mendalami budaya Dayak.",
      rating: 4,
      avatarColor: "from-green-200 to-teal-200",
      date: "Feb 2025",
    },
    {
      id: 3,
      name: "Lina Kurnia",
      role: "Mahasiswa Antropologi",
      content:
        "Fitur komunitas dan pembelajaran interaktif membuat proses belajar menjadi menyenangkan dan bermakna.",
      rating: 5,
      avatarColor: "from-purple-200 to-pink-200",
      date: "Dec 2024",
    },
    {
      id: 4,
      name: "Budi Santoso",
      role: "Pecinta Budaya",
      content:
        "Aplikasi ini adalah jembatan untuk melestarikan bahasa Dayak Kenyah. Saya sangat terkesan dengan kecepatan dan akurasinya.",
      rating: 5,
      avatarColor: "from-yellow-200 to-orange-200",
      date: "Nov 2024",
    },
  ];

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000); // Ganti slide setiap 5 detik
    return () => clearInterval(interval);
  }, [currentIndex]);

  // Fungsi navigasi
  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  // Animasi untuk slide
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  return (
    <section className="py-20 bg-gradient-to-b from-blue-50 to-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 relative"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Apa Kata{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Pengguna Kami?
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Dengar pengalaman luar biasa dari komunitas kami tentang bagaimana
            KamusKenyah mengubah cara mereka belajar dan melestarikan bahasa.
          </p>
          <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
            <Quote className="w-32 h-32 text-blue-200 opacity-20" />
          </div>
        </motion.div>

        {/* Testimonial Slider */}
        <div className="relative mb-20">
          <div className="overflow-hidden">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="bg-white rounded-2xl shadow-xl p-8 md:p-12 relative overflow-hidden"
              >
                {/* Background Decorations */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full -mr-32 -mt-32 opacity-30" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-50 rounded-full -ml-32 -mb-32 opacity-30" />

                <div className="relative grid md:grid-cols-2 gap-8 items-center">
                  {/* Left: Testimonial Content */}
                  <div>
                    <div className="flex items-center mb-4">
                      {[...Array(testimonials[currentIndex].rating)].map(
                        (_, i) => (
                          <Star
                            key={i}
                            className="w-5 h-5 text-yellow-400 fill-current"
                          />
                        )
                      )}
                      {/* Menambahkan Award jika rating tinggi */}
                      {testimonials[currentIndex].rating === 5 && (
                        <Award className="w-5 h-5 text-yellow-400 ml-2" />
                      )}
                    </div>
                    <blockquote className="text-lg md:text-xl text-gray-700 italic mb-6">
                      "{testimonials[currentIndex].content}"
                    </blockquote>
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-12 h-12 rounded-full bg-gradient-to-r ${testimonials[currentIndex].avatarColor}`}
                      />
                      <div>
                        <div className="font-medium text-gray-900">
                          {testimonials[currentIndex].name}
                        </div>
                        <div className="text-sm text-gray-600">
                          {testimonials[currentIndex].role}
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 text-sm text-gray-500">
                      {testimonials[currentIndex].date}
                    </div>
                  </div>

                  {/* Right: Community Stats */}
                  <div className="hidden md:block relative">
                    <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl p-6 shadow-lg">
                      <Users className="w-12 h-12 text-blue-600 mb-4" />
                      <h4 className="text-xl font-semibold text-gray-900 mb-2">
                        Komunitas Kami
                      </h4>
                      <p className="text-gray-600 mb-4">
                        Bergabunglah dengan ribuan pengguna yang peduli akan
                        pelestarian bahasa Dayak Kenyah.
                      </p>
                      <div className="flex items-center space-x-4">
                        <div className="flex -space-x-2">
                          {[...Array(5)].map((_, i) => (
                            <div
                              key={i}
                              className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-200 to-indigo-200 border-2 border-white"
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">
                          +10K Pengguna
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            className="absolute top-1/2 left-4 -translate-y-1/2 bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            <ChevronLeft className="w-6 h-6 text-blue-600 group-hover:scale-110 transition-transform" />
          </button>
          <button
            onClick={handleNext}
            className="absolute top-1/2 right-4 -translate-y-1/2 bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            <ChevronRight className="w-6 h-6 text-blue-600 group-hover:scale-110 transition-transform" />
          </button>

          {/* Dots Navigation */}
          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-blue-600 scale-125"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Jadilah Bagian dari Perubahan
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Bergabunglah dengan komunitas kami dan mulailah menjelajahi bahasa
            Dayak Kenyah hari ini!
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-lg font-medium hover:shadow-lg transition-shadow duration-300 mx-auto"
          >
            <MessageSquare className="w-5 h-5" />
            <span>Gabung Sekarang</span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
