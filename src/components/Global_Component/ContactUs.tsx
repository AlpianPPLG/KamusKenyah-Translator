import React from "react";
import { motion } from "framer-motion";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageSquare,
  Users,
  Clock,
  Loader2,
} from "lucide-react";

// Interface untuk data form
interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ContactUsSection: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactForm>({
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit: SubmitHandler<ContactForm> = async (data) => {
    // Simulasi pengiriman form (ganti dengan API call sesuai kebutuhan)
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("Form submitted:", data);
    reset();
    alert("Pesan Anda telah terkirim! Kami akan segera menghubungi Anda.");
  };

  // Data kontak
  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      detail: "support@kamuskenyah.com",
      link: "mailto:support@kamuskenyah.com",
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Telepon",
      detail: "+62 123 456 7890",
      link: "tel:+621234567890",
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Lokasi",
      detail: "Jalan Bahasa No. 1, Kalimantan Timur, Indonesia",
      link: "#",
    },
  ];

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
            Hubungi{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Kami
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Punya pertanyaan, saran, atau ingin berkontribusi untuk KamusKenyah? Kami siap mendengar dari Anda!
          </p>
          <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
            <MessageSquare className="w-32 h-32 text-blue-200 opacity-20" />
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-xl p-8 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full -mr-32 -mt-32 opacity-30" />
            <div className="relative">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Kirim Pesan
              </h3>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Name Field */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Nama
                  </label>
                  <input
                    id="name"
                    type="text"
                    {...register("name", {
                      required: "Nama wajib diisi",
                      minLength: {
                        value: 2,
                        message: "Nama minimal 2 karakter",
                      },
                    })}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.name
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-200 focus:ring-blue-600"
                    } focus:outline-none focus:ring-2`}
                    placeholder="Masukkan nama Anda"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    {...register("email", {
                      required: "Email wajib diisi",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Email tidak valid",
                      },
                    })}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.email
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-200 focus:ring-blue-600"
                    } focus:outline-none focus:ring-2`}
                    placeholder="Masukkan email Anda"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Subject Field */}
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Subjek
                  </label>
                  <input
                    id="subject"
                    type="text"
                    {...register("subject", {
                      required: "Subjek wajib diisi",
                    })}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.subject
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-200 focus:ring-blue-600"
                    } focus:outline-none focus:ring-2`}
                    placeholder="Masukkan subjek pesan"
                  />
                  {errors.subject && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.subject.message}
                    </p>
                  )}
                </div>

                {/* Message Field */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Pesan
                  </label>
                  <textarea
                    id="message"
                    {...register("message", {
                      required: "Pesan wajib diisi",
                      minLength: {
                        value: 10,
                        message: "Pesan minimal 10 karakter",
                      },
                    })}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.message
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-200 focus:ring-blue-600"
                    } focus:outline-none focus:ring-2 resize-y min-h-[120px]`}
                    placeholder="Tulis pesan Anda di sini..."
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full flex items-center justify-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                    isSubmitting
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-lg"
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Mengirim...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Kirim Pesan</span>
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Contact Info & Additional Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-12"
          >
            {/* Contact Information */}
            <div className="bg-white rounded-2xl shadow-xl p-8 relative overflow-hidden">
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-50 rounded-full -ml-32 -mb-32 opacity-30" />
              <div className="relative">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Informasi Kontak
                </h3>
                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <motion.div
                      key={info.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="flex items-start space-x-4"
                    >
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 flex-shrink-0">
                        {info.icon}
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900">
                          {info.title}
                        </h4>
                        <a
                          href={info.link}
                          className="text-gray-600 hover:text-blue-600 transition-colors duration-300"
                        >
                          {info.detail}
                        </a>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Support Hours & Community */}
            <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl p-8 shadow-lg">
              <div className="grid gap-8 md:grid-cols-2">
                {/* Support Hours */}
                <div>
                  <div className="flex items-center space-x-3 mb-4">
                    <Clock className="w-6 h-6 text-blue-600" />
                    <h4 className="text-lg font-semibold text-gray-900">
                      Jam Dukungan
                    </h4>
                  </div>
                  <ul className="space-y-2 text-gray-600">
                    <li>Senin - Jumat: 08.00 - 17.00 WIB</li>
                    <li>Sabtu: 09.00 - 13.00 WIB</li>
                    <li>Minggu: Tutup</li>
                  </ul>
                </div>

                {/* Community */}
                <div>
                  <div className="flex items-center space-x-3 mb-4">
                    <Users className="w-6 h-6 text-blue-600" />
                    <h4 className="text-lg font-semibold text-gray-900">
                      Komunitas
                    </h4>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Bergabunglah dengan komunitas kami untuk berdiskusi dan
                    berbagi pengetahuan!
                  </p>
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href="#"
                    className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Gabung Komunitas</span>
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactUsSection;