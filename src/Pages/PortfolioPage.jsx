import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

export default function PortfolioPage() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-primary text-primary px-4">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-3xl font-bold mb-5 text-sky-500 dark:text-sky-400"
      >
        Portfolio
      </motion.h1>

      <div className="flex flex-col gap-3 w-64">
        <a
          href="/portfolio/web"
          className="flex items-center justify-center gap-2 py-2 rounded-lg border border-sky-500 text-sky-600 dark:text-sky-400 hover:bg-sky-50 dark:hover:bg-slate-800 transition"
        >
          <ExternalLink size={16} /> Portfolio Web
        </a>
        <a
          href="/portfolio/uiux"
          className="flex items-center justify-center gap-2 py-2 rounded-lg border border-pink-500 text-pink-600 dark:text-pink-400 hover:bg-pink-50 dark:hover:bg-slate-800 transition"
        >
          <ExternalLink size={16} /> Portfolio UI/UX
        </a>
      </div>
    </div>
  );
}
