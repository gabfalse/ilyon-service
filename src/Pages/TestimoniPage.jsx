import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ExternalLink, PlusCircle, X } from "lucide-react";
import supabase from "../supabaseClient";

export default function TestimoniPage() {
  const [testimoni, setTestimoni] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalTestimoni, setTotalTestimoni] = useState(0);
  const [userIP, setUserIP] = useState("");

  const PER_PAGE = 15;

  // Ambil IP user
  useEffect(() => {
    fetch("https://api.ipify.org?format=json")
      .then((res) => res.json())
      .then((data) => setUserIP(data.ip))
      .catch(() => setUserIP("unknown"));
  }, []);

  useEffect(() => {
    fetchTestimoni(currentPage);
  }, [currentPage]);

  const fetchTestimoni = async (page) => {
    const start = (page - 1) * PER_PAGE;
    const end = start + PER_PAGE - 1;

    const { data, count, error } = await supabase
      .from("testimoni")
      .select("*", { count: "exact" })
      .order("id", { ascending: false })
      .range(start, end);

    if (!error) {
      setTestimoni(data);
      setTotalTestimoni(count);
    } else {
      console.error(error);
    }
  };

  const handleAddTestimoni = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Cek jumlah testimoni user/IP
    const { data: existing, error: checkError } = await supabase
      .from("testimoni")
      .select("*", { count: "exact" })
      .eq("ip_address", userIP);

    if (checkError) {
      alert("Gagal mengecek limit testimoni!");
      setLoading(false);
      return;
    }

    if (existing.length >= 3) {
      alert("Batas maksimal 3 testimoni per perangkat/jaringan.");
      setLoading(false);
      return;
    }

    const finalName =
      name.trim() === ""
        ? "User_" + Math.random().toString(36).substring(2, 7)
        : name.trim();

    const newTestimoni = {
      name: finalName,
      text: text.trim(),
      ip_address: userIP, // simpan IP untuk limit
    };

    const { data, error } = await supabase
      .from("testimoni")
      .insert([newTestimoni])
      .select();

    if (!error && data) {
      setCurrentPage(1);
      fetchTestimoni(1);
      setShowForm(false);
      setName("");
      setText("");
    } else {
      console.error(error);
      alert("Gagal menambah testimoni!");
    }

    setLoading(false);
  };

  const totalPages = Math.ceil(totalTestimoni / PER_PAGE);

  return (
    <div className="min-h-[85vh] flex flex-col items-center bg-primary text-primary px-4 py-10">
      {/* Judul */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-3xl font-bold mb-6 text-blue-500 dark:text-blue-400"
      >
        Testimoni
      </motion.h1>

      {/* Tombol Sosial */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        <a
          href="https://www.facebook.com/share/p/17iK8poQZZ/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-blue-500 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-800 transition"
        >
          <ExternalLink size={16} /> Facebook
        </a>
        <a
          href="https://x.com/jokitugasilyon/status/1683445606487052291"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-sky-500 text-sky-600 dark:text-sky-400 hover:bg-sky-50 dark:hover:bg-slate-800 transition"
        >
          <ExternalLink size={16} /> X (Twitter)
        </a>
      </div>

      {/* Tombol Tambah */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowForm(true)}
        className="flex items-center gap-2 mb-8 px-5 py-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium shadow-md transition-all"
      >
        <PlusCircle size={18} />
        Tambah Testimoni
      </motion.button>

      <div className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {testimoni.length > 0 ? (
          testimoni.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col"
            >
              <h3 className="font-semibold text-sky-600 dark:text-sky-400 truncate">
                {item.name}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 break-words">
                {item.text}
              </p>
            </div>
          ))
        ) : (
          <p className="text-slate-500 dark:text-slate-400 text-center col-span-full">
            Belum ada testimoni.
          </p>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex gap-3 mt-6">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="px-4 py-2 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 disabled:opacity-50 hover:bg-slate-300 dark:hover:bg-slate-600 transition"
          >
            Previous
          </button>
          <span className="px-3 py-2 text-sm text-slate-700 dark:text-slate-300">
            {currentPage} / {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="px-4 py-2 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 disabled:opacity-50 hover:bg-slate-300 dark:hover:bg-slate-600 transition"
          >
            Next
          </button>
        </div>
      )}

      {/* Modal Form Tambah */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-lg w-[90%] max-w-md"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-blue-500 dark:text-blue-400">
                Tambah Testimoni
              </h2>
              <button
                onClick={() => setShowForm(false)}
                className="text-slate-500 hover:text-red-500 transition"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddTestimoni} className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Nama (kosongkan untuk anonim)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent text-slate-700 dark:text-slate-200"
              />
              <textarea
                placeholder="Tulis testimoni kamu..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                required
                className="p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent text-slate-700 dark:text-slate-200 h-24 resize-none"
              />
              <button
                type="submit"
                disabled={loading}
                className="mt-2 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-medium disabled:opacity-50 transition"
              >
                {loading ? "Mengirim..." : "Kirim Testimoni"}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
