import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

export default function TestimoniPage() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-primary text-primary px-4">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-3xl font-bold mb-6 text-blue-500 dark:text-blue-400"
      >
        Testimoni
      </motion.h1>

      <div className="flex flex-col gap-3 w-64">
        <a
          href="https://www.facebook.com/share/p/17iK8poQZZ/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 py-2 rounded-lg border border-blue-500 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-800 transition"
        >
          <ExternalLink size={16} /> Testimoni Facebook
        </a>
        <a
          href="https://x.com/jokitugasilyon/status/1683445606487052291?t=iB3INzbRhAf_zD7N5zC9zg&s=19"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 py-2 rounded-lg border border-sky-500 text-sky-600 dark:text-sky-400 hover:bg-sky-50 dark:hover:bg-slate-800 transition"
        >
          <ExternalLink size={16} /> Testimoni X
        </a>
      </div>
    </div>
  );
}
