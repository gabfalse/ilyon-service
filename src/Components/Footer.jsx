import { motion } from "framer-motion";
import { Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 transition-colors duration-500">
      <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col items-center justify-center text-center space-y-10">
        {/* Brand Section */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-md"
        >
          <h2 className="text-3xl font-bold mb-3 text-sky-600 dark:text-sky-400">
            Ilyon
          </h2>
          <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            Platform serbaguna yang menyediakan produk digital, layanan
            freelance, dan program afiliasi dalam satu ekosistem terpadu.
          </p>
        </motion.div>

        {/* Links Section */}
        <h1>Layanan</h1>
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap justify-center gap-6 sm:gap-10 text-sm"
        >
          <a href="/digital-product" className="hover:text-sky-500 transition">
            Produk Digital
          </a>
          <a href="/affiliate" className="hover:text-sky-500 transition">
            Affiliate
          </a>
          <a href="/freelance-it" className="hover:text-sky-500 transition">
            Freelance IT
          </a>
          <a href="/freelance-umum" className="hover:text-sky-500 transition">
            Freelance Umum
          </a>
        </motion.div>
        <h1>Hubungi Kami</h1>
        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex items-center space-x-3"
        >
          <Mail size={18} />
          <a
            href="mailto:ilyoncorp@gmail.com"
            className="text-sm hover:text-sky-500 transition"
          >
            ilyoncorp@gmail.com
          </a>
        </motion.div>
      </div>

      {/* Bottom */}
      <div className="border-t border-slate-200 dark:border-slate-800 text-center py-5 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
        © {new Date().getFullYear()} Ilyon. All rights reserved.
      </div>
    </footer>
  );
}
