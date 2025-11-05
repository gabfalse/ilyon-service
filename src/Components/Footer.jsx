import { motion } from "framer-motion";
import { Mail, Facebook, Twitter, Globe } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full border-t border-slate-200 dark:border-slate-800 bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-950 text-slate-700 dark:text-slate-300 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-12 sm:py-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-3 text-center sm:text-left">
        {/* Brand Section */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-center sm:items-start"
        >
          <h2 className="text-3xl font-extrabold mb-3 text-sky-600 dark:text-sky-400">
            Ilyon
          </h2>
          <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400 max-w-sm">
            Platform all-in-one untuk produk digital, layanan freelance, dan
            product afiliasi.
          </p>
        </motion.div>

        {/* Services Section */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-3"
        >
          <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200 mb-2">
            Layanan
          </h3>
          <div className="flex flex-col gap-2 text-sm">
            <a
              href="/freelance-it"
              className="hover:text-sky-500 transition-colors"
            >
              Freelance IT
            </a>
            <a
              href="/freelance-umum"
              className="hover:text-sky-500 transition-colors"
            >
              Freelance Umum
            </a>
            <a
              href="/digital-product"
              className="hover:text-sky-500 transition-colors"
            >
              Produk Digital
            </a>
            <a
              href="/affiliate"
              className="hover:text-sky-500 transition-colors"
            >
              Affiliate Product
            </a>
          </div>
        </motion.div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-3"
        >
          <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200 mb-2">
            Hubungi Kami
          </h3>
          <div className="flex justify-center sm:justify-start items-center gap-3">
            <Mail size={18} className="text-sky-500" />
            <a
              href="mailto:ilyoncorp@gmail.com"
              className="text-sm hover:text-sky-500 transition-colors"
            >
              ilyoncorp@gmail.com
            </a>
          </div>
          <div className="flex justify-center sm:justify-start gap-4 pt-2">
            <a
              href="https://www.facebook.com/share/1AGKYcDn5f/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500 transition-transform transform hover:scale-110"
            >
              <Facebook size={18} />
            </a>
            <a
              href="https://x.com/jokitugasilyon?t=g5-jEsL8vtp6xKXHEuzncg&s=09"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-sky-400 transition-transform transform hover:scale-110"
            >
              <Twitter size={18} />
            </a>
          </div>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-200 dark:border-slate-800 text-center py-5 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
        © {new Date().getFullYear()}{" "}
        <span className="text-sky-500 font-semibold">Ilyon</span>. Semua hak
        cipta dilindungi.
      </div>
    </footer>
  );
}
