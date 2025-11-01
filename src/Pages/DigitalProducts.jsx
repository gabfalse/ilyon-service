import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ImageOff, Folder } from "lucide-react";
import supabase from "../supabaseClient";

export default function DigitalProducts() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("Semua");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const limit = 12; // jumlah produk per halaman

  const categories = [
    "Semua",
    "Ebook",
    "Template",
    "UI Kit",
    "Source Code",
    "Font",
    "Lainnya",
  ];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      let query = supabase
        .from("digital_products")
        .select("*", { count: "exact" })
        .order("created_at", { ascending: false })
        .range((page - 1) * limit, page * limit - 1);

      if (category !== "Semua")
        query = query.eq("kategori", category.toLowerCase());

      const { data, error, count } = await query;

      if (!error) {
        setProducts(data);
        setTotalPages(Math.ceil(count / limit));
      } else {
        console.error("Gagal fetch data:", error.message);
      }

      setLoading(false);
    };
    fetchData();
  }, [category, page]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 to-sky-200 dark:from-black dark:to-gray-900 text-slate-800 dark:text-slate-100 px-4 sm:px-6 py-16 flex flex-col items-center">
      {/* Judul */}
      <h1 className="text-3xl sm:text-4xl font-extrabold mb-10 text-center flex items-center gap-2">
        <Folder className="text-sky-500" size={32} />
        Produk Digital
      </h1>

      {/* Tombol Kategori */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => {
              setCategory(c);
              setPage(1);
            }}
            className={`px-3 py-1.5 rounded-lg text-sm border transition ${
              category === c
                ? "bg-sky-500 text-white border-sky-500"
                : "bg-transparent text-slate-700 dark:text-slate-200 border-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Loading */}
      {loading && (
        <p className="text-center text-slate-500 dark:text-slate-400 mb-6">
          Memuat produk...
        </p>
      )}

      {/* Grid Produk */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 max-w-7xl w-full place-items-center">
        {products.length > 0
          ? products.map((p) => (
              <motion.div
                key={p.id}
                whileHover={{ scale: 1.04, y: -5 }}
                transition={{ type: "spring", stiffness: 250 }}
                className="p-4 bg-white dark:bg-slate-800 rounded-xl shadow-md border border-slate-200 dark:border-slate-700 text-center w-full max-w-xs"
              >
                {p.foto ? (
                  <img
                    src={p.foto}
                    alt={p.nama}
                    className="w-full h-32 sm:h-36 object-cover rounded-lg mb-3"
                  />
                ) : (
                  <div className="w-full h-32 flex items-center justify-center bg-slate-100 dark:bg-slate-700 rounded-lg mb-3">
                    <ImageOff className="text-slate-400" size={32} />
                  </div>
                )}
                <h3 className="font-semibold text-sm sm:text-base mb-2 line-clamp-2">
                  {p.nama}
                </h3>
                <a
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky-500 text-sm font-medium hover:underline"
                >
                  Kunjungi
                </a>
              </motion.div>
            ))
          : !loading && (
              <p className="text-slate-500 dark:text-slate-400 col-span-full">
                Tidak ada produk ditemukan.
              </p>
            )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-10">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className={`px-3 py-1 rounded-md text-sm border ${
              page === 1
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-sky-100 dark:hover:bg-slate-800"
            }`}
          >
            Sebelumnya
          </button>

          <span className="text-sm text-slate-700 dark:text-slate-300">
            Halaman {page} dari {totalPages}
          </span>

          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className={`px-3 py-1 rounded-md text-sm border ${
              page === totalPages
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-sky-100 dark:hover:bg-slate-800"
            }`}
          >
            Selanjutnya
          </button>
        </div>
      )}
    </div>
  );
}
