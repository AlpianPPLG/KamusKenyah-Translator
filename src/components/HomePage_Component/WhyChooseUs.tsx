import React from "react";
import { motion } from "framer-motion";
import {
  Users,
  Globe2,
  Sparkles,
  BookOpen,
  MessageSquare,
  Award,
  CheckCircle2,
  ArrowRight,
  Brain,
} from "lucide-react";

const WhyChooseUs: React.FC = () => {
  const stats = [
    { value: "10K+", label: "Pengguna Aktif" },
    { value: "5000+", label: "Kata Diterjemahkan" },
    { value: "99%", label: "Tingkat Akurasi" },
    { value: "24/7", label: "Dukungan" },
  ];

  const features = [
    {
      icon: <Brain className="w-6 h-6" />,
      title: "AI Canggih",
      description:
        "Menggunakan teknologi AI terkini untuk hasil terjemahan yang akurat dan natural",
    },
    {
      icon: <Globe2 className="w-6 h-6" />,
      title: "Preservasi Budaya",
      description:
        "Membantu melestarikan warisan bahasa dan budaya Dayak Kenyah untuk generasi mendatang",
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Pembelajaran Interaktif",
      description:
        "Fitur pembelajaran yang memudahkan pengguna untuk memahami bahasa Dayak Kenyah",
    },
  ];

  const benefits = [
    "Terjemahan Instan & Akurat",
    "Kamus Lengkap",
    "Pembelajaran Kontekstual",
    "Dukungan Multi-Platform",
    "Update Berkala",
    "Komunitas Aktif",
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-blue-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Mengapa Memilih{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                KamusKenyah?
              </span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Platform terjemahan modern yang menggabungkan teknologi AI dengan
              pemahaman mendalam tentang bahasa dan budaya Dayak Kenyah
            </p>
          </motion.div>
          {/* Sparkles Decoration */}
          <div className="absolute inset-0 flex justify-center items-center">
            <Sparkles className="w-32 h-32 text-blue-300 opacity-30" />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6 text-center transform hover:scale-105 transition-transform duration-300"
            >
              <div className="text-2xl md:text-3xl font-bold text-blue-600 mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Main Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg p-8 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-150 duration-500" />
              <div className="relative">
                <div className="text-blue-600 mb-4 p-3 bg-blue-50 rounded-lg inline-block">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Benefits and CTA */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-gray-900">
              Keunggulan Platform Kami
            </h3>
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex items-center space-x-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">{benefit}</span>
                </motion.div>
              ))}
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-8 flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-shadow duration-300"
            >
              <span>Mulai Sekarang</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-blue-100 to-indigo-50 p-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-white/40 backdrop-blur-sm rounded-2xl" />
              <div className="relative z-10 h-full flex flex-col items-center justify-center text-center">
                <Users className="w-16 h-16 text-blue-600 mb-6" />
                <h4 className="text-xl font-semibold text-gray-900 mb-4">
                  Bergabung dengan Komunitas
                </h4>
                <p className="text-gray-600 mb-6">
                  Jadilah bagian dari komunitas yang peduli akan pelestarian
                  bahasa dan budaya Dayak Kenyah
                </p>
                <div className="flex items-center space-x-4">
                  <div className="flex -space-x-2">
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-200 to-indigo-200 border-2 border-white"
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    +1000 pengguna aktif
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Testimonial Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 bg-white rounded-2xl shadow-xl p-8 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-50 rounded-full -ml-32 -mb-32" />
          <div className="relative">
            <MessageSquare className="w-12 h-12 text-blue-600 mb-6" />
            <blockquote className="text-xl text-gray-700 italic mb-6">
              "Platform ini sangat membantu saya dalam mempelajari bahasa Dayak
              Kenyah. Terjemahannya akurat dan fitur pembelajarannya sangat
              interaktif."
            </blockquote>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-200 to-indigo-200" />
              <div>
                <div className="font-medium text-gray-900">Sarah Johnson</div>
                <div className="text-sm text-gray-600">Peneliti Bahasa</div>
              </div>
              <Award className="w-6 h-6 text-yellow-400 ml-auto" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
