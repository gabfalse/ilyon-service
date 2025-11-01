import { useState } from "react";
import { motion } from "framer-motion";
import {
  Monitor,
  ShoppingBag,
  Code,
  BookOpenCheck,
  ChevronDown,
  ExternalLink,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);

  const items = [
    {
      title: "Freelance IT/Tech/Web",
      icon: (
        <Code className="w-8 h-8 sm:w-12 sm:h-12 text-green-500 dark:text-green-400" />
      ),
      route: "/freelance-it",
    },
    {
      title: "Freelance Umum",
      icon: (
        <BookOpenCheck className="w-8 h-8 sm:w-12 sm:h-12 text-yellow-500 dark:text-yellow-400" />
      ),
      route: "/freelance-umum",
    },
    {
      title: "Digital Product",
      icon: (
        <Monitor className="w-8 h-8 sm:w-12 sm:h-12 text-sky-500 dark:text-sky-400" />
      ),
      route: "/digital-product",
    },
    {
      title: "Affiliate Product",
      icon: (
        <ShoppingBag className="w-8 h-8 sm:w-12 sm:h-12 text-pink-500 dark:text-pink-400" />
      ),
      route: "/affiliate",
    },
  ];

  return (
    <div className="min-h-screen bg-primary text-primary transition-colors duration-500 px-4 sm:px-6 flex flex-col items-center">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-1">
          Selamat Datang di{" "}
          <span className="text-sky-500 dark:text-sky-400">Ilyon</span>
        </h1>
        <p className="text-secondary max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
          Menyediakan berbagai layanan seperti pembuatan dan penjualan produk
          digital, jasa freelance web, Freelance Umum, serta program afiliasi
          online.
        </p>
      </motion.div>

      {/* Cards Section */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 w-full max-w-6xl">
        {items.map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="rounded-xl sm:rounded-2xl p-3 sm:p-6 shadow-sm sm:shadow-md cursor-pointer bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-700/60 transition-all duration-300 hover:shadow-lg flex flex-col items-center text-center"
          >
            <div className="mb-3 sm:mb-4">{item.icon}</div>
            <h2 className="text-sm sm:text-lg font-semibold mb-1 sm:mb-2">
              {item.title}
            </h2>

            <button
              onClick={() => navigate(item.route)}
              className="flex items-center justify-center gap-1 text-xs sm:text-sm font-medium text-sky-600 dark:text-sky-400 hover:underline transition outline rounded-2xl py-1 px-4 hover:bg-sky-700 hover:text-sky-100 dark:hover:bg-white dark:hover:text-black"
            >
              Lihat
            </button>
          </motion.div>
        ))}
      </div>

      {/* Animated Arrow */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.2, repeat: Infinity }}
        className="mt-12 flex justify-center"
      >
        <ChevronDown className="w-8 h-8 text-sky-500 dark:text-sky-400" />
      </motion.div>

      {/* Button to open modal */}
      <button
        onClick={() => setOpenModal(true)}
        className="mt-4 px-6 py-2 rounded-full bg-sky-500 hover:bg-sky-600 text-white text-sm sm:text-base font-medium transition-all"
      >
        Project & Testimony
      </button>

      {/* Modal */}
      {openModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl w-80 p-6 text-center"
          >
            <h2 className="text-lg font-semibold mb-4 text-slate-800 dark:text-slate-100">
              Tautan Tambahan
            </h2>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => {
                  setOpenModal(false);
                  navigate("/portfolio");
                }}
                className="flex items-center justify-center gap-2 py-2 rounded-lg border border-sky-400 text-sky-600 dark:text-sky-400 hover:bg-sky-50 dark:hover:bg-slate-800 transition"
              >
                <ExternalLink size={16} />
                Portfolio
              </button>
              <button
                onClick={() => {
                  setOpenModal(false);
                  navigate("/testimoni");
                }}
                className="flex items-center justify-center gap-2 py-2 rounded-lg border border-blue-500 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-800 transition"
              >
                <ExternalLink size={16} />
                Testimoni
              </button>
            </div>

            <button
              onClick={() => setOpenModal(false)}
              className="mt-5 px-4 py-2 text-sm text-white bg-red-500 hover:bg-red-600 rounded-lg transition"
            >
              Tutup
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
}
