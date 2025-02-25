import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Type,
  Sparkles,
  Volume2,
  Share2,
  BookOpen,
  ArrowRight,
  MessageSquare,
  Laptop,
  Smartphone,
  Tablet,
  Languages,
} from "lucide-react";

const HowItWorks: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      icon: <Type className="w-6 h-6" />,
      title: "Ketik atau Tempel Teks",
      description:
        "Masukkan teks yang ingin Anda terjemahkan dalam bahasa Indonesia atau Dayak Kenyah",
      animation: "typing-animation",
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "AI Memproses",
      description:
        "Teknologi AI kami akan menganalisis dan memproses teks untuk terjemahan yang akurat",
      animation: "processing-animation",
    },
    {
      icon: <Volume2 className="w-6 h-6" />,
      title: "Dapatkan Hasil",
      description:
        "Terima hasil terjemahan dengan fitur audio dan opsi penyimpanan",
      animation: "result-animation",
    },
  ];

  const features = [
    {
      icon: <Laptop className="w-6 h-6" />,
      title: "Desktop",
      description: "Akses melalui browser desktop Anda",
    },
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: "Mobile",
      description: "Gunakan di perangkat mobile Anda",
    },
    {
      icon: <Tablet className="w-6 h-6" />,
      title: "Tablet",
      description: "Optimal untuk penggunaan tablet",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-blue-50 overflow-hidden">
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
              Bagaimana{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Cara Kerjanya?
              </span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Proses terjemahan yang mudah dan cepat dengan tiga langkah
              sederhana
            </p>
          </motion.div>
        </div>

        {/* Interactive Steps */}
        <div className="relative mb-20">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 transform -translate-y-1/2 hidden md:block" />
          <div className="grid md:grid-cols-3 gap-8 relative">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`relative ${
                  activeStep === index ? "scale-105" : ""
                } transition-all duration-300`}
                onMouseEnter={() => setActiveStep(index)}
              >
                <div className="bg-white rounded-xl shadow-lg p-6 relative z-10 h-full hover:shadow-xl transition-shadow duration-300">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -mr-16 -mt-16 opacity-20" />
                  <div className="relative">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-4">
                        {step.icon}
                      </div>
                      <span className="text-sm font-semibold text-blue-600">
                        Langkah {index + 1}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Demo Section with MessageSquare */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-xl p-8 mb-20 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full -mr-32 -mt-32" />
          <div className="relative">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Lihat Cara Kerjanya
                </h3>
                <p className="text-gray-600 mb-6">
                  Coba fitur terjemahan kami sekarang dan rasakan kemudahannya
                  dalam menerjemahkan bahasa Dayak Kenyah.
                </p>
                <div className="space-y-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-shadow duration-300"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>Coba Sekarang</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center space-x-2 bg-gray-100 text-gray-900 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-300"
                  >
                    <MessageSquare className="w-4 h-4" />{" "}
                    {/* MessageSquare digunakan di sini */}
                    <span>Tanya Komunitas</span>
                  </motion.button>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Languages className="w-16 h-16 text-blue-600 animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Platform Support */}
        <div className="text-center mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Tersedia di Semua Platform
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Akses KamusKenyah dari berbagai perangkat Anda dengan pengalaman
            yang konsisten
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                  {feature.icon}
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-gray-900">
                    {feature.title}
                  </h4>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8"
        >
          <div className="flex items-start space-x-6">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex-shrink-0 flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">
                Tips Penggunaan
              </h4>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-700">
                  <ArrowRight className="w-4 h-4 mr-2 text-blue-600" />
                  Gunakan kalimat lengkap untuk hasil terjemahan yang lebih
                  akurat
                </li>
                <li className="flex items-center text-gray-700">
                  <ArrowRight className="w-4 h-4 mr-2 text-blue-600" />
                  Manfaatkan fitur audio untuk mendengar pengucapan yang benar
                </li>
                <li className="flex items-center text-gray-700">
                  <ArrowRight className="w-4 h-4 mr-2 text-blue-600" />
                  Simpan terjemahan favorit Anda untuk akses cepat
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
