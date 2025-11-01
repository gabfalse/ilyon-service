import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Monitor,
  ShoppingBag,
  Code,
  BookOpenCheck,
  LogOut,
} from "lucide-react";

export default function AdminPage() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("sessionUser");
    if (stored) {
      setUser(JSON.parse(stored));
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("sessionUser");
    navigate("/login");
  };

  if (!user) return null;

  const cmsItems = [
    {
      title: "Digital Product",
      desc: "Kelola e-book, template, dan tools digital.",
      icon: <Monitor className="w-10 h-10 text-sky-500 dark:text-sky-400" />,
      link: "/cms/digital",
    },
    {
      title: "Affiliate Product",
      desc: "Atur produk afiliasi dari berbagai toko online.",
      icon: (
        <ShoppingBag className="w-10 h-10 text-pink-500 dark:text-pink-400" />
      ),
      link: "/cms/affiliate",
    },
    {
      title: "Freelance IT / Web",
      desc: "Tambah dan kelola layanan freelance bidang teknologi.",
      icon: <Code className="w-10 h-10 text-green-500 dark:text-green-400" />,
      link: "/cms/freelance-it",
    },
    {
      title: "Freelance Umum",
      desc: "Kelola jasa freelance umum seperti desain & penulisan.",
      icon: (
        <BookOpenCheck className="w-10 h-10 text-yellow-500 dark:text-yellow-400" />
      ),
      link: "/cms/freelance-umum",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 to-sky-200 dark:from-black dark:to-gray-900 text-slate-800 dark:text-slate-100 px-6 py-16 flex flex-col items-center">
      <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg text-center w-full max-w-5xl mb-10">
        <h1 className="text-3xl font-bold mb-2 dark:text-white">
          Halo, {user.username} 👋
        </h1>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          Kamu login sebagai <b>{user.role}</b>
        </p>
        <button
          onClick={handleLogout}
          className="inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition"
        >
          <LogOut className="w-4 h-4" /> Logout
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-5xl">
        {cmsItems.map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05, y: -4 }}
            transition={{ type: "spring", stiffness: 250 }}
            onClick={() => navigate(item.link)}
            className="cursor-pointer bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 flex flex-col items-center text-center shadow-sm hover:shadow-md transition"
          >
            <div className="mb-3">{item.icon}</div>
            <h2 className="text-base sm:text-lg font-semibold mb-1 dark:text-white">
              {item.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">
              {item.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
