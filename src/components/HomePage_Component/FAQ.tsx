import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Search,
  MessageSquare,
  BookOpen,
  Sparkles,
  Users,
} from "lucide-react";

// Interface untuk data FAQ
interface FAQ {
  id: number;
  question: string;
  answer: string;
  category: string;
}

// Interface untuk kategori dengan ikon
interface Category {
  name: string;
  icon: React.ReactNode;
}

const FAQSection: React.FC = () => {
  const [activeFAQ, setActiveFAQ] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");

  // Data FAQ
  const faqs: FAQ[] = [
    {
      id: 1,
      question: "Bagaimana cara kerja KamusKenyah?",
      answer:
        "KamusKenyah menggunakan teknologi AI canggih untuk menerjemahkan teks dari bahasa Indonesia ke Dayak Kenyah atau sebaliknya. Anda cukup memasukkan teks, memilih bahasa, dan AI akan memprosesnya dalam hitungan detik.",
      category: "Fitur",
    },
    {
      id: 2,
      question: "Apakah terjemahan di KamusKenyah akurat?",
      answer:
        "Ya, kami memiliki tingkat akurasi hingga 99% berkat penggunaan model bahasa yang dilatih dengan data autentik bahasa Dayak Kenyah, diperiksa oleh ahli bahasa lokal.",
      category: "Keakuratan",
    },
    {
      id: 3,
      question: "Bisakah saya menggunakan aplikasi ini secara offline?",
      answer:
        "Saat ini, KamusKenyah memerlukan koneksi internet untuk memproses terjemahan. Namun, kami sedang mengembangkan fitur offline yang akan tersedia dalam pembaruan mendatang.",
      category: "Fitur",
    },
    {
      id: 4,
      question: "Bagaimana cara bergabung dengan komunitas KamusKenyah?",
      answer:
        "Anda dapat bergabung dengan komunitas kami melalui tombol 'Gabung Sekarang' di halaman utama. Kami memiliki forum aktif di mana Anda bisa bertanya, berbagi, dan belajar bersama pengguna lain.",
      category: "Komunitas",
    },
    {
      id: 5,
      question: "Apakah ada biaya untuk menggunakan KamusKenyah?",
      answer:
        "KamusKenyah gratis untuk fitur dasar seperti terjemahan teks dan audio. Kami juga menawarkan langganan premium untuk fitur tambahan seperti kamus kontekstual dan pembelajaran lanjutan.",
      category: "Harga",
    },
    {
      id: 6,
      question:
        "Bagaimana saya bisa membantu melestarikan bahasa Dayak Kenyah?",
      answer:
        "Dengan menggunakan KamusKenyah, Anda sudah berkontribusi! Anda juga bisa berpartisipasi dalam komunitas kami untuk memberikan saran kata atau frasa baru yang akan memperkaya database kami.",
      category: "Komunitas",
    },
    {
      id: 7,
      question: "Apakah ada fitur audio untuk pengucapan?",
      answer:
        "Ya, setiap terjemahan dilengkapi dengan fitur audio yang memungkinkan Anda mendengar pengucapan yang benar oleh penutur asli atau sintesis suara berkualitas tinggi.",
      category: "Fitur",
    },
  ];

  // Kategori dengan ikon
  const categories: Category[] = [
    { name: "Semua", icon: <HelpCircle className="w-5 h-5" /> },
    { name: "Fitur", icon: <Sparkles className="w-5 h-5" /> },
    { name: "Keakuratan", icon: <BookOpen className="w-5 h-5" /> },
    { name: "Komunitas", icon: <Users className="w-5 h-5" /> },
    { name: "Harga", icon: <MessageSquare className="w-5 h-5" /> },
  ];

  // Filter FAQ berdasarkan pencarian dan kategori
  const filteredFAQs = faqs.filter(
    (faq) =>
      (selectedCategory === "Semua" || faq.category === selectedCategory) &&
      (faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Animasi untuk ekspansi FAQ
  const faqVariants = {
    collapsed: { height: 0, opacity: 0 },
    expanded: { height: "auto", opacity: 1 },
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-blue-50 overflow-hidden relative">
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
            Pertanyaan{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              yang Sering Diajukan
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Temukan jawaban atas pertanyaan Anda tentang KamusKenyah dan
            bagaimana kami membantu Anda menjelajahi bahasa Dayak Kenyah.
          </p>
          <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
            <HelpCircle className="w-32 h-32 text-blue-200 opacity-20" />
          </div>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12 max-w-2xl mx-auto"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari pertanyaan..."
              className="w-full pl-12 pr-4 py-3 rounded-lg bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-600 text-gray-900 placeholder-gray-400"
            />
          </div>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12 flex flex-wrap justify-center gap-4"
        >
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => setSelectedCategory(category.name)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                selectedCategory === category.name
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-100"
              }`}
            >
              {category.icon}
              <span>{category.name}</span>
            </button>
          ))}
        </motion.div>

        {/* FAQ List */}
        <div className="grid gap-6">
          {filteredFAQs.length > 0 ? (
            filteredFAQs.map((faq) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                <button
                  onClick={() =>
                    setActiveFAQ(activeFAQ === faq.id ? null : faq.id)
                  }
                  className="w-full px-6 py-5 flex justify-between items-center text-left hover:bg-gray-50 transition-colors duration-300"
                >
                  <span className="text-lg font-semibold text-gray-900">
                    {faq.question}
                  </span>
                  {activeFAQ === faq.id ? (
                    <ChevronUp className="w-6 h-6 text-blue-600" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-gray-400" />
                  )}
                </button>
                <AnimatePresence initial={false}>
                  {activeFAQ === faq.id && (
                    <motion.div
                      variants={faqVariants}
                      initial="collapsed"
                      animate="expanded"
                      exit="collapsed"
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="px-6 pb-5 text-gray-600 overflow-hidden"
                    >
                      <p>{faq.answer}</p>
                      <div className="mt-4 text-sm text-gray-500">
                        Kategori: {faq.category}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-10 text-gray-600"
            >
              Tidak ada pertanyaan yang cocok dengan pencarian Anda.
            </motion.div>
          )}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Masih Punya Pertanyaan?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Hubungi komunitas kami atau tim dukungan untuk mendapatkan jawaban
            lebih lanjut.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-lg font-medium hover:shadow-lg transition-shadow duration-300 mx-auto"
          >
            <MessageSquare className="w-5 h-5" />
            <span>Tanya Sekarang</span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
