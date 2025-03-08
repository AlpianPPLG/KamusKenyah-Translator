"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";
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
  Globe,
  Zap,
  Download,
  Headphones,
  Share2,
  Star,
  Clock,
  ArrowRight,
  Filter,
  X,
  ThumbsUp,
  ThumbsDown,
  Mail,
  Phone,
  ExternalLink,
  Shield,
} from "lucide-react";
import { useInView } from "react-intersection-observer"; // Ensure this import is correct

// Interface untuk data FAQ
interface FAQ {
  id: number;
  question: string;
  answer: string;
  category: string;
  tags: string[];
  helpfulCount: number;
  notHelpfulCount: number;
  relatedQuestions?: number[];
}

// Interface untuk kategori dengan ikon
interface Category {
  name: string;
  icon: React.ReactNode;
  description: string;
}

const FAQSection: React.FC = () => {
  const [activeFAQ, setActiveFAQ] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [feedbackGiven, setFeedbackGiven] = useState<
    Record<number, "helpful" | "not-helpful" | null>
  >({});
  const [showRelated, setShowRelated] = useState(false);
  const [relatedFAQs, setRelatedFAQs] = useState<FAQ[]>([]);
  const [sortBy, setSortBy] = useState<"popular" | "recent">("popular");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Data FAQ
  const faqs: FAQ[] = [
    {
      id: 1,
      question: "Apa tujuan utama dari KamusKenyah?",
      answer:
        "KamusKenyah memiliki tujuan utama untuk melestarikan dan mempromosikan bahasa Dayak Kenyah melalui teknologi digital. Kami berusaha menciptakan platform yang memudahkan orang untuk belajar, menggunakan, dan memahami bahasa ini, sehingga warisan budaya yang berharga ini dapat diteruskan ke generasi mendatang. Selain itu, kami juga bertujuan untuk mendokumentasikan kosakata, tata bahasa, dan ekspresi unik dalam bahasa Dayak Kenyah.",
      category: "Tentang Kami",
      tags: ["Misi", "Pelestarian", "Budaya"],
      helpfulCount: 124,
      notHelpfulCount: 3,
      relatedQuestions: [2, 6, 10],
    },
    {
      id: 2,
      question: "Siapa yang mendirikan KamusKenyah dan kapan didirikan?",
      answer:
        "KamusKenyah didirikan pada tahun 2020 oleh sekelompok linguis, teknolog, dan anggota komunitas Dayak Kenyah yang peduli dengan pelestarian bahasa. Tim pendiri kami terdiri dari Dr. Bulan Lenjau (linguis), Anyie Apui (pengembang teknologi), dan Laing Along (pemimpin komunitas). Proyek ini dimulai sebagai inisiatif kecil dan berkembang menjadi platform komprehensif berkat dukungan dari berbagai lembaga pendidikan, pemerintah daerah, dan organisasi pelestarian budaya.",
      category: "Tentang Kami",
      tags: ["Sejarah", "Pendiri", "Tim"],
      helpfulCount: 98,
      notHelpfulCount: 5,
      relatedQuestions: [1, 3],
    },
    {
      id: 3,
      question:
        "Bagaimana KamusKenyah mengumpulkan dan memverifikasi data bahasa?",
      answer:
        "Proses pengumpulan dan verifikasi data bahasa kami sangat ketat untuk memastikan akurasi. Kami bekerja dengan penutur asli bahasa Dayak Kenyah, ahli bahasa, dan peneliti budaya untuk mengumpulkan kata-kata, frasa, dan ekspresi. Setiap entri dalam database kami melewati proses verifikasi tiga tahap: dokumentasi dari sumber primer, konfirmasi oleh minimal dua penutur asli, dan tinjauan oleh ahli linguistik. Kami juga melakukan penelitian lapangan secara berkala di komunitas Dayak Kenyah untuk memperbarui dan memperluas database kami.",
      category: "Metodologi",
      tags: ["Verifikasi", "Penelitian", "Akurasi"],
      helpfulCount: 87,
      notHelpfulCount: 2,
      relatedQuestions: [4, 7],
    },
    {
      id: 4,
      question: "Teknologi apa yang digunakan dalam pengembangan KamusKenyah?",
      answer:
        "KamusKenyah menggunakan berbagai teknologi canggih untuk memberikan pengalaman terbaik. Platform kami dibangun dengan React.js dan TypeScript untuk antarmuka pengguna yang responsif dan intuitif. Untuk pemrosesan bahasa, kami menggunakan model AI khusus yang dilatih dengan dataset bahasa Dayak Kenyah. Teknologi pengenalan suara kami menggunakan algoritma deep learning untuk mengenali dan memproses ucapan dalam bahasa Dayak Kenyah. Database kami menggunakan sistem NoSQL untuk fleksibilitas dalam menyimpan berbagai jenis data linguistik. Semua ini didukung oleh infrastruktur cloud yang aman dan skalabel.",
      category: "Teknologi",
      tags: ["AI", "Pengembangan", "Inovasi"],
      helpfulCount: 156,
      notHelpfulCount: 8,
      relatedQuestions: [5, 7, 11],
    },
    {
      id: 5,
      question: "Bagaimana akurasi terjemahan di KamusKenyah?",
      answer:
        "Akurasi terjemahan adalah prioritas utama kami. Berdasarkan evaluasi independen, KamusKenyah mencapai tingkat akurasi 95-98% untuk terjemahan umum. Untuk terminologi khusus atau ekspresi idiomatik, akurasi kami berkisar 90-95%. Kami terus meningkatkan model AI kami melalui pembelajaran mesin dan umpan balik dari pengguna. Setiap terjemahan juga memiliki indikator kepercayaan yang memberi tahu pengguna tentang tingkat keyakinan sistem terhadap terjemahan tersebut. Untuk terjemahan penting atau resmi, kami menyarankan verifikasi tambahan melalui fitur 'Tanya Ahli' kami.",
      category: "Metodologi",
      tags: ["Akurasi", "Terjemahan", "AI"],
      helpfulCount: 203,
      notHelpfulCount: 12,
      relatedQuestions: [3, 4],
    },
    {
      id: 6,
      question: "Bagaimana cara bergabung dengan tim KamusKenyah?",
      answer:
        "Kami selalu mencari individu berbakat dan berdedikasi untuk bergabung dengan tim kami. Ada beberapa cara untuk terlibat: 1) Posisi penuh waktu - kunjungi halaman Karir kami untuk melihat lowongan terbaru dalam pengembangan teknologi, linguistik, atau manajemen proyek. 2) Kontributor - Anda dapat menjadi kontributor sukarela untuk proyek tertentu, terutama jika Anda adalah penutur asli bahasa Dayak Kenyah atau memiliki keahlian dalam linguistik. 3) Magang - kami menawarkan program magang untuk mahasiswa di bidang teknologi, linguistik, atau pelestarian budaya. 4) Peneliti tamu - para akademisi dapat mengajukan proposal untuk proyek penelitian kolaboratif. Kirim email ke careers@kamuskenyah.org untuk informasi lebih lanjut.",
      category: "Karir",
      tags: ["Pekerjaan", "Magang", "Kolaborasi"],
      helpfulCount: 76,
      notHelpfulCount: 1,
      relatedQuestions: [2, 10],
    },
    {
      id: 7,
      question: "Apakah KamusKenyah tersedia dalam bentuk aplikasi mobile?",
      answer:
        "Ya, KamusKenyah tersedia sebagai aplikasi mobile untuk perangkat Android dan iOS. Aplikasi kami menawarkan semua fitur yang ada di versi web, plus beberapa keunggulan tambahan seperti: 1) Terjemahan offline untuk kata-kata dan frasa umum, 2) Pengenalan suara yang dioptimalkan untuk perangkat mobile, 3) Widget kamus cepat untuk akses instan, 4) Integrasi dengan aplikasi lain untuk terjemahan dalam konteks, dan 5) Notifikasi 'Kata Hari Ini' untuk pembelajaran berkelanjutan. Anda dapat mengunduh aplikasi kami dari Google Play Store atau Apple App Store secara gratis, dengan opsi pembelian dalam aplikasi untuk fitur premium.",
      category: "Produk",
      tags: ["Aplikasi", "Mobile", "Unduhan"],
      helpfulCount: 189,
      notHelpfulCount: 4,
      relatedQuestions: [8, 11],
    },
    {
      id: 8,
      question: "Apakah layanan KamusKenyah gratis untuk digunakan?",
      answer:
        "KamusKenyah mengadopsi model freemium. Layanan dasar kami, termasuk pencarian kamus, terjemahan teks dasar, dan akses ke materi pembelajaran tingkat pemula, tersedia secara gratis untuk semua pengguna. Untuk fitur lanjutan seperti terjemahan kontekstual, pengenalan suara tingkat lanjut, materi pembelajaran komprehensif, dan akses API, kami menawarkan langganan premium dengan beberapa tingkatan harga. Kami juga menyediakan akses gratis ke semua fitur premium untuk lembaga pendidikan, peneliti bahasa, dan anggota komunitas Dayak Kenyah melalui program kemitraan kami. Tujuan kami adalah memastikan bahwa pelestarian bahasa tetap dapat diakses oleh semua orang yang membutuhkannya.",
      category: "Harga",
      tags: ["Biaya", "Langganan", "Premium"],
      helpfulCount: 215,
      notHelpfulCount: 18,
      relatedQuestions: [7, 9],
    },
    {
      id: 9,
      question: "Bagaimana cara mendukung misi KamusKenyah?",
      answer:
        "Ada banyak cara untuk mendukung misi pelestarian bahasa kami: 1) Gunakan platform kami dan bagikan dengan orang lain, 2) Berlangganan paket premium untuk mendukung operasi kami, 3) Sumbangkan ke Dana Pelestarian Bahasa Dayak Kenyah kami (sumbangan dapat dikurangkan dari pajak), 4) Menjadi sukarelawan untuk proyek transkripsi atau verifikasi, 5) Jika Anda adalah penutur asli, bantu kami dengan merekam pengucapan atau meninjau terjemahan, 6) Bagikan pengetahuan dan keahlian Anda jika Anda adalah linguis atau peneliti budaya, 7) Ikuti dan bagikan konten kami di media sosial untuk meningkatkan kesadaran. Setiap bentuk dukungan, besar atau kecil, membantu kami melestarikan warisan bahasa yang berharga ini.",
      category: "Dukungan",
      tags: ["Donasi", "Sukarelawan", "Partisipasi"],
      helpfulCount: 92,
      notHelpfulCount: 3,
      relatedQuestions: [1, 6, 10],
    },
    {
      id: 10,
      question:
        "Bagaimana KamusKenyah bekerja sama dengan komunitas Dayak Kenyah?",
      answer:
        "Kolaborasi dengan komunitas Dayak Kenyah adalah inti dari pendekatan kami. Kami menjalin kemitraan formal dengan dewan adat, lembaga pendidikan lokal, dan kelompok masyarakat. Kami mengadakan lokakarya dan konsultasi rutin di desa-desa untuk memastikan bahwa upaya kami selaras dengan kebutuhan dan prioritas komunitas. Program 'Duta Bahasa' kami melatih anggota komunitas untuk menjadi fasilitator bahasa di daerah mereka. Kami juga mendanai inisiatif yang dipimpin komunitas untuk dokumentasi bahasa dan program pengajaran. 30% dari tim kami berasal dari komunitas Dayak Kenyah, dan kami memiliki Dewan Penasihat Komunitas yang memberikan arahan strategis untuk organisasi kami.",
      category: "Komunitas",
      tags: ["Kolaborasi", "Kemitraan", "Pemberdayaan"],
      helpfulCount: 134,
      notHelpfulCount: 2,
      relatedQuestions: [1, 9],
    },
    {
      id: 11,
      question: "Apa rencana pengembangan KamusKenyah di masa depan?",
      answer:
        "Roadmap pengembangan kami untuk 3-5 tahun ke depan mencakup beberapa inisiatif menarik: 1) Ekspansi ke dialek Dayak Kenyah lainnya untuk dokumentasi yang lebih komprehensif, 2) Pengembangan kurikulum pembelajaran bahasa K-12 untuk sekolah-sekolah di Kalimantan, 3) Peningkatan teknologi AI kami untuk menangani terjemahan kontekstual yang lebih kompleks, 4) Peluncuran aplikasi pembelajaran immersive menggunakan AR/VR, 5) Pengembangan corpus bahasa digital yang lebih besar melalui digitalisasi literatur lisan dan tertulis, 6) Ekspansi program kemitraan komunitas ke daerah-daerah terpencil, dan 7) Peluncuran platform penelitian kolaboratif untuk linguis dan antropolog. Semua inisiatif ini didorong oleh misi kami untuk memastikan keberlanjutan dan vitalitas bahasa Dayak Kenyah.",
      category: "Teknologi",
      tags: ["Roadmap", "Inovasi", "Masa Depan"],
      helpfulCount: 167,
      notHelpfulCount: 5,
      relatedQuestions: [4, 7],
    },
    {
      id: 12,
      question: "Bagaimana KamusKenyah menangani privasi data pengguna?",
      answer:
        "Kami memprioritaskan privasi dan keamanan data pengguna. Semua data pengguna dienkripsi baik saat transit maupun saat disimpan. Kami hanya mengumpulkan informasi yang diperlukan untuk menyediakan layanan kami, dan pengguna memiliki kontrol penuh atas data mereka melalui Dasbor Privasi. Kami tidak pernah menjual data pengguna kepada pihak ketiga. Untuk penelitian dan peningkatan layanan, kami hanya menggunakan data yang dianonimkan. Kami mematuhi standar keamanan industri dan secara teratur menjalani audit keamanan independen. Kebijakan Privasi kami transparan dan ditulis dalam bahasa yang jelas, dan tim Perlindungan Data kami tersedia untuk menjawab pertanyaan apa pun di privacy@kamuskenyah.org.",
      category: "Kebijakan",
      tags: ["Privasi", "Keamanan", "Data"],
      helpfulCount: 108,
      notHelpfulCount: 7,
      relatedQuestions: [8],
    },
  ];

  // Kategori dengan ikon dan deskripsi
  const categories: Category[] = [
    {
      name: "Semua",
      icon: <HelpCircle className="w-5 h-5" />,
      description: "Semua pertanyaan dari berbagai kategori",
    },
    {
      name: "Tentang Kami",
      icon: <Users className="w-5 h-5" />,
      description: "Informasi tentang sejarah dan misi KamusKenyah",
    },
    {
      name: "Metodologi",
      icon: <BookOpen className="w-5 h-5" />,
      description: "Cara kami mengumpulkan dan memverifikasi data bahasa",
    },
    {
      name: "Teknologi",
      icon: <Zap className="w-5 h-5" />,
      description: "Teknologi yang digunakan dalam platform kami",
    },
    {
      name: "Produk",
      icon: <Sparkles className="w-5 h-5" />,
      description: "Informasi tentang produk dan layanan kami",
    },
    {
      name: "Komunitas",
      icon: <Globe className="w-5 h-5" />,
      description: "Kolaborasi kami dengan komunitas Dayak Kenyah",
    },
    {
      name: "Harga",
      icon: <MessageSquare className="w-5 h-5" />,
      description: "Informasi tentang biaya dan langganan",
    },
    {
      name: "Karir",
      icon: <Star className="w-5 h-5" />,
      description: "Peluang untuk bergabung dengan tim kami",
    },
    {
      name: "Dukungan",
      icon: <Headphones className="w-5 h-5" />,
      description: "Cara mendukung misi pelestarian bahasa kami",
    },
    {
      name: "Kebijakan",
      icon: <Shield className="w-5 h-5" />,
      description: "Kebijakan privasi dan keamanan data",
    },
  ];

  // Semua tag unik dari FAQ
  const allTags = Array.from(new Set(faqs.flatMap((faq) => faq.tags))).sort();

  // Efek untuk menangani klik di luar pencarian
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsSearchFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Efek untuk menghasilkan saran pencarian
  useEffect(() => {
    if (searchQuery.length > 1) {
      const allWords = faqs.flatMap((faq) =>
        [faq.question, faq.answer, ...faq.tags]
          .join(" ")
          .toLowerCase()
          .split(/\s+/)
      );

      const uniqueWords = Array.from(new Set(allWords))
        .filter(
          (word) => word.length > 3 && word.includes(searchQuery.toLowerCase())
        )
        .slice(0, 5);

      setSearchSuggestions(uniqueWords);
    } else {
      setSearchSuggestions([]);
    }
  }, [searchQuery]);

  // Efek untuk mengatur FAQ terkait saat FAQ aktif berubah
  useEffect(() => {
    if (activeFAQ !== null) {
      const currentFAQ = faqs.find((faq) => faq.id === activeFAQ);
      if (currentFAQ && currentFAQ.relatedQuestions) {
        const related = faqs.filter((faq) =>
          currentFAQ.relatedQuestions?.includes(faq.id)
        );
        setRelatedFAQs(related);
      } else {
        setRelatedFAQs([]);
      }
    }
  }, [activeFAQ]);

  // Filter FAQ berdasarkan pencarian, kategori, dan tag
  const filteredFAQs = faqs
    .filter(
      (faq) =>
        (selectedCategory === "Semua" || faq.category === selectedCategory) &&
        (selectedTags.length === 0 ||
          selectedTags.some((tag) => faq.tags.includes(tag))) &&
        (searchQuery === "" ||
          faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.tags.some((tag) =>
            tag.toLowerCase().includes(searchQuery.toLowerCase())
          ))
    )
    .sort((a, b) => {
      if (sortBy === "popular") {
        return b.helpfulCount - a.helpfulCount;
      } else {
        return b.id - a.id; // Mengasumsikan ID yang lebih tinggi adalah yang lebih baru
      }
    });

  // Fungsi untuk menangani umpan balik
  const handleFeedback = (id: number, type: "helpful" | "not-helpful") => {
    if (feedbackGiven[id] === type) {
      // Batalkan umpan balik jika sudah diberikan
      setFeedbackGiven({ ...feedbackGiven, [id]: null });
    } else {
      setFeedbackGiven({ ...feedbackGiven, [id]: type });
    }
  };

  // Fungsi untuk menangani pemilihan tag
  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  // Animasi untuk ekspansi FAQ
  const faqVariants = {
    collapsed: { height: 0, opacity: 0 },
    expanded: { height: "auto", opacity: 1 },
  };

  return (
    <section
      ref={ref}
      className="py-20 bg-gradient-to-b from-white to-blue-50 overflow-hidden relative"
    >
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 relative"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 text-blue-600 mb-4">
            <HelpCircle className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">Pusat Bantuan</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Pertanyaan yang Sering{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Diajukan
            </span>
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Temukan jawaban lengkap untuk pertanyaan umum tentang KamusKenyah,
            metodologi kami, dan bagaimana kami melestarikan bahasa Dayak
            Kenyah.
          </p>
        </motion.div>

        {/* Search and Filter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
            {/* Search Bar */}
            <div ref={searchRef} className="relative mb-6">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                placeholder="Cari pertanyaan atau kata kunci..."
                className="w-full pl-12 pr-4 py-4 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-600 text-gray-900 placeholder-gray-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2"
                >
                  <X className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                </button>
              )}

              {/* Search Suggestions */}
              <AnimatePresence>
                {isSearchFocused && searchSuggestions.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute z-10 left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 py-2"
                  >
                    {searchSuggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => setSearchQuery(suggestion)}
                        className="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700 flex items-center"
                      >
                        <Search className="w-4 h-4 mr-2 text-gray-400" />
                        {suggestion}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Filter Controls */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 transition-colors"
                >
                  <Filter className="w-4 h-4" />
                  <span>Filter</span>
                  {showFilters ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>

                {selectedCategory !== "Semua" && (
                  <div className="flex items-center px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm">
                    {categories.find((c) => c.name === selectedCategory)?.icon}
                    <span className="ml-1">{selectedCategory}</span>
                    <button
                      onClick={() => setSelectedCategory("Semua")}
                      className="ml-1 hover:text-blue-900"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {selectedTags.map((tag) => (
                  <div
                    key={tag}
                    className="flex items-center px-3 py-1.5 bg-indigo-100 text-indigo-700 rounded-full text-sm"
                  >
                    <span>{tag}</span>
                    <button
                      onClick={() => toggleTag(tag)}
                      className="ml-1 hover:text-indigo-900"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}

                {(selectedCategory !== "Semua" || selectedTags.length > 0) && (
                  <button
                    onClick={() => {
                      setSelectedCategory("Semua");
                      setSelectedTags([]);
                    }}
                    className="text-sm text-gray-500 hover:text-gray-700"
                  >
                    Reset Filter
                  </button>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">Urutkan:</span>
                <button
                  onClick={() => setSortBy("popular")}
                  className={`px-3 py-1.5 rounded-lg text-sm ${
                    sortBy === "popular"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Populer
                </button>
                <button
                  onClick={() => setSortBy("recent")}
                  className={`px-3 py-1.5 rounded-lg text-sm ${
                    sortBy === "recent"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Terbaru
                </button>
              </div>
            </div>

            {/* Expanded Filters */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-6 pt-6 border-t border-gray-200 overflow-hidden"
                >
                  {/* Categories */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Kategori
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                      {categories.map((category) => (
                        <button
                          key={category.name}
                          onClick={() => setSelectedCategory(category.name)}
                          className={`flex flex-col items-center p-4 rounded-xl transition-all duration-300 ${
                            selectedCategory === category.name
                              ? "bg-blue-600 text-white shadow-md"
                              : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                          }`}
                        >
                          <div
                            className={`p-3 rounded-full mb-2 ${
                              selectedCategory === category.name
                                ? "bg-blue-500"
                                : "bg-white"
                            }`}
                          >
                            {category.icon}
                          </div>
                          <span className="text-sm font-medium">
                            {category.name}
                          </span>
                          <span
                            className={`text-xs mt-1 text-center line-clamp-2 ${
                              selectedCategory === category.name
                                ? "text-blue-100"
                                : "text-gray-500"
                            }`}
                          >
                            {category.description}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Tags */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Tag
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {allTags.map((tag) => (
                        <button
                          key={tag}
                          onClick={() => toggleTag(tag)}
                          className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                            selectedTags.includes(tag)
                              ? "bg-indigo-600 text-white"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* FAQ List */}
        <div className="mb-16">
          <div className="grid gap-6">
            {filteredFAQs.length > 0 ? (
              filteredFAQs.map((faq) => (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={
                    inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                  }
                  transition={{ duration: 0.6 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden"
                >
                  <button
                    onClick={() =>
                      setActiveFAQ(activeFAQ === faq.id ? null : faq.id)
                    }
                    className="w-full px-6 py-5 flex justify-between items-center text-left hover:bg-gray-50 transition-colors duration-300"
                  >
                    <div className="flex items-start">
                      <div className="bg-blue-100 p-2 rounded-full mr-4 mt-1">
                        <HelpCircle className="w-5 h-5 text-blue-600" />
                      </div>
                      <span className="text-lg font-semibold text-gray-900">
                        {faq.question}
                      </span>
                    </div>
                    {activeFAQ === faq.id ? (
                      <ChevronUp className="w-6 h-6 text-blue-600 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-6 h-6 text-gray-400 flex-shrink-0" />
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
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6">
                          <div className="pl-11">
                            <div className="prose prose-blue max-w-none text-gray-600">
                              <p>{faq.answer}</p>
                            </div>

                            {/* Tags */}
                            <div className="mt-6 flex flex-wrap gap-2">
                              {faq.tags.map((tag) => (
                                <button
                                  key={tag}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleTag(tag);
                                  }}
                                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 transition-colors"
                                >
                                  {tag}
                                </button>
                              ))}
                            </div>

                            {/* Feedback and Category */}
                            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                              <div className="text-sm text-gray-500">
                                Kategori:{" "}
                                <span className="text-blue-600">
                                  {faq.category}
                                </span>
                              </div>

                              <div className="flex items-center space-x-4">
                                <span className="text-sm text-gray-500">
                                  Apakah ini membantu?
                                </span>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleFeedback(faq.id, "helpful");
                                  }}
                                  className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg text-sm transition-colors ${
                                    feedbackGiven[faq.id] === "helpful"
                                      ? "bg-green-100 text-green-700"
                                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                  }`}
                                >
                                  <ThumbsUp className="w-4 h-4" />
                                  <span>
                                    Ya (
                                    {faq.helpfulCount +
                                      (feedbackGiven[faq.id] === "helpful"
                                        ? 1
                                        : 0)}
                                    )
                                  </span>
                                </button>

                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleFeedback(faq.id, "not-helpful");
                                  }}
                                  className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg text-sm transition-colors ${
                                    feedbackGiven[faq.id] === "not-helpful"
                                      ? "bg-red-100 text-red-700"
                                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                  }`}
                                >
                                  <ThumbsDown className="w-4 h-4" />
                                  <span>
                                    Tidak (
                                    {faq.notHelpfulCount +
                                      (feedbackGiven[faq.id] === "not-helpful"
                                        ? 1
                                        : 0)}
                                    )
                                  </span>
                                </button>
                              </div>
                            </div>

                            {/* Related Questions */}
                            {relatedFAQs.length > 0 && (
                              <div className="mt-8 pt-6 border-t border-gray-200">
                                <button
                                  onClick={() => setShowRelated(!showRelated)}
                                  className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
                                >
                                  <span className="font-medium">
                                    Pertanyaan Terkait
                                  </span>
                                  {showRelated ? (
                                    <ChevronUp className="w-4 h-4" />
                                  ) : (
                                    <ChevronDown className="w-4 h-4" />
                                  )}
                                </button>

                                <AnimatePresence>
                                  {showRelated && (
                                    <motion.div
                                      initial={{ height: 0, opacity: 0 }}
                                      animate={{ height: "auto", opacity: 1 }}
                                      exit={{ height: 0, opacity: 0 }}
                                      transition={{ duration: 0.3 }}
                                      className="mt-4 space-y-3 overflow-hidden"
                                    >
                                      {relatedFAQs.map((relatedFaq) => (
                                        <button
                                          key={relatedFaq.id}
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            setActiveFAQ(relatedFaq.id);
                                          }}
                                          className="w-full text-left p-4 bg-gray-50 hover:bg-gray-100 rounded-lg text-gray-700 transition-colors flex items-start"
                                        >
                                          <ArrowRight className="w-4 h-4 mr-2 mt-1 text-blue-600 flex-shrink-0" />
                                          <span>{relatedFaq.question}</span>
                                        </button>
                                      ))}
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            )}
                          </div>
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
                className="text-center py-16 bg-white rounded-xl shadow-lg"
              >
                <div className="flex flex-col items-center">
                  <Search className="w-16 h-16 text-gray-300 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Tidak ada hasil yang ditemukan
                  </h3>
                  <p className="text-gray-600 max-w-md mx-auto mb-6">
                    Kami tidak dapat menemukan pertanyaan yang cocok dengan
                    kriteria pencarian Anda. Coba kata kunci lain atau reset
                    filter.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedCategory("Semua");
                      setSelectedTags([]);
                    }}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Reset Pencarian
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Contact and Support Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 md:p-12 text-white shadow-xl"
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-6">
                Masih Punya Pertanyaan?
              </h3>
              <p className="text-blue-100 mb-8 text-lg">
                Jika Anda tidak menemukan jawaban yang Anda cari, tim dukungan
                kami siap membantu. Hubungi kami melalui salah satu saluran di
                bawah ini.
              </p>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-white/20 p-3 rounded-full mr-4">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Email Kami</h4>
                    <p className="text-blue-100 mb-2">Respons dalam 24 jam</p>
                    <a
                      href="mailto:support@kamuskenyah.org"
                      className="text-white underline hover:text-blue-100 transition-colors inline-flex items-center"
                    >
                      support@kamuskenyah.org
                      <ExternalLink className="w-4 h-4 ml-1" />
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-white/20 p-3 rounded-full mr-4">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Hubungi Kami</h4>
                    <p className="text-blue-100 mb-2">
                      Senin-Jumat, 9:00-17:00 WIB
                    </p>
                    <a
                      href="tel:+6281234567890"
                      className="text-white underline hover:text-blue-100 transition-colors inline-flex items-center"
                    >
                      +62 812 3456 7890
                      <ExternalLink className="w-4 h-4 ml-1" />
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-white/20 p-3 rounded-full mr-4">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Forum Komunitas</h4>
                    <p className="text-blue-100 mb-2">
                      Bergabung dengan diskusi
                    </p>
                    <a
                      href="#"
                      className="text-white underline hover:text-blue-100 transition-colors inline-flex items-center"
                    >
                      community.kamuskenyah.org
                      <ExternalLink className="w-4 h-4 ml-1" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-2xl transform rotate-6"></div>
              <div className="relative bg-white/20 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
                <h4 className="text-2xl font-bold mb-6">Kirim Pertanyaan</h4>
                <form className="space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium mb-1"
                    >
                      Nama
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 text-white placeholder-white/50"
                      placeholder="Nama Anda"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium mb-1"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 text-white placeholder-white/50"
                      placeholder="email@anda.com"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="question"
                      className="block text-sm font-medium mb-1"
                    >
                      Pertanyaan
                    </label>
                    <textarea
                      id="question"
                      rows={4}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 text-white placeholder-white/50"
                      placeholder="Tulis pertanyaan Anda di sini..."
                    ></textarea>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="w-full bg-white text-blue-600 font-medium py-3 px-6 rounded-lg hover:bg-blue-50 transition-colors shadow-lg flex items-center justify-center"
                  >
                    <span>Kirim Pertanyaan</span>
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </motion.button>
                </form>
              </div>
            </div>
          </div>
        </motion.div>

        {/* FAQ Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            {
              icon: <HelpCircle className="w-6 h-6" />,
              value: "100+",
              label: "Pertanyaan Terjawab",
            },
            {
              icon: <Clock className="w-6 h-6" />,
              value: "24/7",
              label: "Dukungan Tersedia",
            },
            {
              icon: <Users className="w-6 h-6" />,
              value: "10K+",
              label: "Pengguna Terbantu",
            },
            {
              icon: <ThumbsUp className="w-6 h-6" />,
              value: "98%",
              label: "Tingkat Kepuasan",
            },
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl shadow-md p-6 text-center"
            >
              <div className="bg-blue-100 p-3 rounded-full inline-flex mb-4">
                <div className="text-blue-600">{stat.icon}</div>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Download Resources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Sumber Daya Tambahan
          </h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Unduh panduan dan materi referensi untuk mempelajari lebih lanjut
            tentang KamusKenyah dan bahasa Dayak Kenyah.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            {[
              {
                icon: <Download className="w-5 h-5" />,
                label: "Panduan Pengguna",
                color: "bg-blue-600",
              },
              {
                icon: <BookOpen className="w-5 h-5" />,
                label: "Materi Pembelajaran",
                color: "bg-indigo-600",
              },
              {
                icon: <Share2 className="w-5 h-5" />,
                label: "Kit Media",
                color: "bg-purple-600",
              },
            ].map((resource, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center space-x-2 ${resource.color} text-white px-6 py-3 rounded-lg hover:shadow-lg transition-shadow duration-300`}
              >
                {resource.icon}
                <span>{resource.label}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
