import { motion } from "framer-motion";
import {
  Monitor,
  ShoppingBag,
  Code,
  BookOpenCheck,
  ChevronDown,
  Gamepad,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  const itemsTop = [
    {
      title: "Freelance IT / Tech / Web",
      icon: (
        <Code className="w-6 h-6 sm:w-8 sm:h-8 text-green-500 dark:text-green-400" />
      ),
      route: "/freelance-it",
    },
    {
      title: "Freelance Umum",
      icon: (
        <BookOpenCheck className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-500 dark:text-yellow-400" />
      ),
      route: "/freelance-umum",
    },
  ];

  const itemsMiddle = [
    {
      title: "Digital Product",
      icon: (
        <Monitor className="w-6 h-6 sm:w-8 sm:h-8 text-sky-500 dark:text-sky-400" />
      ),
      route: "/digital-product",
    },
    {
      title: "Affiliate Product",
      icon: (
        <ShoppingBag className="w-6 h-6 sm:w-8 sm:h-8 text-pink-500 dark:text-pink-400" />
      ),
      route: "/affiliate",
    },
  ];

  const itemBottom = {
    title: "Top Up & PPOB",
    icon: (
      <Gamepad className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-500 dark:text-yellow-400" />
    ),
    route: "https://buylink.id/ilyon",
  };

  return (
    <div className="min-h-screen bg-primary text-primary transition-colors duration-500 px-4 sm:px-6 flex flex-col items-center">
      {/* Banner Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-5xl bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-xl sm:rounded-2xl p-3 sm:p-5 mt-4 mb-6 shadow-md text-center"
      >
        <h2 className="text-sm sm:text-base md:text-lg font-semibold mb-1">
          🎉 Promo Spesial Bulan Ini!
        </h2>
        <p className="text-xs sm:text-sm opacity-90">
          Dapatkan diskon hingga <span className="font-bold">20%</span> untuk
          pelanggan baru!
        </p>
      </motion.div>

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-1">
          Selamat Datang di{" "}
          <span className="text-sky-500 dark:text-sky-400">Ilyon</span>
        </h1>
        <p className="text-secondary max-w-2xl mx-auto text-xs sm:text-sm md:text-base leading-relaxed">
          Menyediakan berbagai layanan seperti pembuatan dan penjualan produk
          digital, jasa freelance web, freelance umum, serta product afiliasi
          online.
        </p>
      </motion.div>

      {/* Top 2 Buttons */}
      <div className="grid grid-cols-2 gap-3 sm:gap-6 w-full max-w-4xl mb-4">
        {itemsTop.map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ type: "spring", stiffness: 200 }}
            onClick={() => navigate(item.route)}
            className="rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm sm:shadow-md cursor-pointer bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-700/60 transition-all duration-300 hover:shadow-lg flex flex-col items-center text-center"
          >
            <div className="mb-2 sm:mb-4">{item.icon}</div>
            <h2 className="text-sm sm:text-lg font-semibold mb-1 sm:mb-2">
              {item.title}
            </h2>
            <button className="text-xs sm:text-sm font-medium text-sky-600 dark:text-sky-400 hover:underline">
              Lihat
            </button>
          </motion.div>
        ))}
      </div>

      {/* Middle 2 Buttons */}
      <div className="grid grid-cols-2 gap-3 sm:gap-6 w-full max-w-4xl mb-4">
        {itemsMiddle.map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ type: "spring", stiffness: 200 }}
            onClick={() => navigate(item.route)}
            className="rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm sm:shadow-md cursor-pointer bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-700/60 transition-all duration-300 hover:shadow-lg flex flex-col items-center text-center"
          >
            <div className="mb-2 sm:mb-4">{item.icon}</div>
            <h2 className="text-sm sm:text-lg font-semibold mb-1 sm:mb-2">
              {item.title}
            </h2>
            <button className="text-xs sm:text-sm font-medium text-sky-600 dark:text-sky-400 hover:underline">
              Lihat
            </button>
          </motion.div>
        ))}
      </div>

      {/* Bottom Full-Width Button */}
      <motion.div
        whileHover={{ scale: 1.03, y: -5 }}
        transition={{ type: "spring", stiffness: 200 }}
        onClick={() => window.open(itemBottom.route, "_blank")}
        className="w-full max-w-4xl rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm sm:shadow-md cursor-pointer bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-700/60 transition-all duration-300 hover:shadow-lg flex flex-col sm:flex-row sm:items-center sm:justify-between text-center sm:text-left"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3 mx-auto sm:mx-0">
          <div className="flex justify-center mb-2 sm:mb-0">
            {itemBottom.icon}
          </div>
          <h2 className="text-sm sm:text-lg font-semibold">
            {itemBottom.title}
          </h2>
        </div>
        <button className="mt-2 sm:mt-0 text-xs sm:text-sm font-medium text-sky-600 dark:text-sky-400 hover:underline">
          Lihat
        </button>
      </motion.div>

      {/* Animated Arrow */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.2, repeat: Infinity }}
        className="mt-10 flex justify-center"
      >
        <ChevronDown className="w-6 h-6 sm:w-8 sm:h-8 text-sky-500 dark:text-sky-400" />
      </motion.div>

      {/* Button */}
      <button
        onClick={() => navigate("/testimoni")}
        className="mt-2 mb-6 px-5 py-2 rounded-full bg-sky-500 hover:bg-sky-600 text-white text-xs sm:text-base font-medium transition-all"
      >
        Testimony
      </button>
    </div>
  );
}
