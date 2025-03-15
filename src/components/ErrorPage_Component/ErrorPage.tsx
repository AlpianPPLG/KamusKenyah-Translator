import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Compass, Home, RefreshCw, ArrowRight, Globe2, AlertCircle } from 'lucide-react';

const ErrorPage: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const controls = useAnimation();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX - window.innerWidth / 2) / 50,
        y: (e.clientY - window.innerHeight / 2) / 50
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const floatingAnimation = {
    y: ['-10px', '10px'],
    x: ['-5px', '5px'],
    rotate: [-2, 2],
    transition: {
      duration: 4,
      repeat: Infinity,
      repeatType: "reverse" as const,
      ease: 'easeInOut'
    }
  };

  const glowAnimation = {
    boxShadow: [
      '0 0 20px rgba(59, 130, 246, 0.2)',
      '0 0 40px rgba(59, 130, 246, 0.4)',
      '0 0 20px rgba(59, 130, 246, 0.2)'
    ],
    scale: [1, 1.05, 1],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  };

  const handleRefresh = () => {
    controls.start({
      rotate: 360,
      scale: [1, 0.9, 1],
      transition: { duration: 0.5 }
    });
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  const handleHome = () => {
    window.location.href = '/';
  };

  const particleVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: (custom: number) => ({
      opacity: [0.3, 0.8, 0.3],
      scale: [1, 1.2, 1],
      transition: {
        delay: custom * 0.1,
        duration: 4,
        repeat: Infinity,
        repeatType: "reverse" as const
      }
    })
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4 relative overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Interactive Background Particles */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          custom={i}
          className="absolute w-2 h-2 bg-blue-200 rounded-full"
          variants={particleVariants}
          initial="hidden"
          animate="visible"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}

      <motion.div 
        className="max-w-3xl w-full relative"
        style={{
          transform: `perspective(1000px) rotateX(${mousePosition.y}deg) rotateY(${mousePosition.x}deg)`
        }}
      >
        <motion.div
          className="absolute inset-0 bg-white/50 backdrop-blur-xl rounded-3xl"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        />

        <div className="relative p-6 md:p-12 text-center">
          <motion.div
            className="mb-8 md:mb-12 relative"
            animate={floatingAnimation}
          >
            <motion.div
              className="w-32 h-32 md:w-48 md:h-48 mx-auto mb-6 md:mb-8 relative"
              whileHover={{ scale: 1.05 }}
              onHoverStart={() => setIsHovered(true)}
              onHoverEnd={() => setIsHovered(false)}
            >
              <motion.div
                className="absolute inset-0 bg-blue-100 rounded-full"
                animate={glowAnimation}
              />
              <motion.div className="relative">
                <Compass className="w-full h-full text-blue-500" />
                <motion.div
                  className="absolute inset-0"
                  animate={{
                    rotate: isHovered ? [0, 360] : 0
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  <motion.div 
                    className="w-3 h-3 md:w-4 md:h-4 bg-red-500 rounded-full absolute top-0 left-1/2 transform -translate-x-1/2 shadow-lg"
                    whileHover={{ scale: 1.2 }}
                  />
                </motion.div>
              </motion.div>
            </motion.div>

            <motion.div
              className="absolute -top-4 -right-4 w-16 h-16 md:w-24 md:h-24 text-purple-400 opacity-30"
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            >
              <Globe2 className="w-full h-full" />
            </motion.div>
          </motion.div>

          <motion.div
            className="space-y-4 md:space-y-6"
            variants={itemVariants}
          >
            <motion.div
              className="relative"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <motion.h1
                className="text-6xl md:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-500 to-blue-600 bg-size-200 animate-gradient"
                variants={itemVariants}
              >
                404
              </motion.h1>
              <motion.div
                className="absolute -top-4 -right-4 text-red-500"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <AlertCircle className="w-6 h-6 md:w-8 md:h-8" />
              </motion.div>
            </motion.div>

            <motion.h2
              className="text-2xl md:text-3xl font-semibold text-gray-800"
              variants={itemVariants}
            >
              Halaman Tidak Ditemukan
            </motion.h2>

            <motion.p
              className="text-base md:text-lg text-gray-600 max-w-lg mx-auto leading-relaxed"
              variants={itemVariants}
            >
              Maaf, halaman yang Anda cari tidak dapat ditemukan. Halaman mungkin telah dipindahkan atau dihapus.
            </motion.p>

            <motion.div
              className="flex flex-col md:flex-row gap-4 justify-center mt-8 md:mt-12 px-4"
              variants={itemVariants}
            >
              <motion.button
                className="group flex items-center justify-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-blue-500 via-blue-600 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all shadow-xl hover:shadow-blue-500/25 w-full md:w-auto"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleHome}
              >
                <Home className="w-5 h-5" />
                <span>Kembali ke Beranda</span>
                <motion.span
                  className="opacity-0 group-hover:opacity-100 ml-2"
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.span>
              </motion.button>

              <motion.button
                className="group flex items-center justify-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-white text-gray-700 rounded-xl hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl border border-gray-100 w-full md:w-auto relative overflow-hidden"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleRefresh}
              >
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-blue-100 to-purple-100 opacity-0 group-hover:opacity-100 transition-opacity"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.1, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.div animate={controls}>
                  <RefreshCw className="w-5 h-5" />
                </motion.div>
                <span>Muat Ulang</span>
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ErrorPage;