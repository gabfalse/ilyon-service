import { motion } from "framer-motion";
import {
  Monitor,
  ShoppingBag,
  Code,
  BookOpenCheck,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  const items = [
    {
      title: "Digital Product",
      desc: "Kami menyediakan berbagai produk digital seperti e-book, template, dan tools kreatif untuk mendukung produktivitas dan ide-ide baru.",
      icon: (
        <Monitor className="w-8 h-8 sm:w-12 sm:h-12 text-sky-500 dark:text-sky-400" />
      ),
      route: "/digital-product",
    },
    {
      title: "Affiliate Product",
      desc: "Kami menghadirkan beragam produk pilihan dari berbagai toko online.",
      icon: (
        <ShoppingBag className="w-8 h-8 sm:w-12 sm:h-12 text-pink-500 dark:text-pink-400" />
      ),
      route: "/affiliate",
    },
    {
      title: "Freelance IT/Tech/Web",
      desc: "Layanan profesional di bidang teknologi, web development, dan IT support untuk membantu kebutuhan digital bisnismu.",
      icon: (
        <Code className="w-8 h-8 sm:w-12 sm:h-12 text-green-500 dark:text-green-400" />
      ),
      route: "/freelance-it",
    },
    {
      title: "Freelance Umum",
      desc: "Layanan freelance umum untuk berbagai kebutuhan, mulai dari penulisan, desain, hingga pekerjaan administratif dengan hasil cepat dan rapi.",
      icon: (
        <BookOpenCheck className="w-8 h-8 sm:w-12 sm:h-12 text-yellow-500 dark:text-yellow-400" />
      ),
      route: "/freelance-umum",
    },
  ];

  return (
    <div className="min-h-screen bg-primary text-primary transition-colors duration-500 px-4 sm:px-6 py-16 flex flex-col items-center">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
          Selamat Datang di{" "}
          <span className="text-sky-500 dark:text-sky-400">Ilyon</span>
        </h1>
        <p className="text-secondary max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
          Menyediakan berbagai layanan seperti pembuatan dan penjualan produk
          digital, jasa freelance web, joki tugas, serta program afiliasi
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
            <p className="text-secondary text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4">
              {item.desc}
            </p>

            <button
              onClick={() => navigate(item.route)}
              className="flex items-center justify-center gap-1 text-xs sm:text-sm font-medium text-sky-600 dark:text-sky-400 hover:underline transition"
            >
              Lihat Selengkapnya
              <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
