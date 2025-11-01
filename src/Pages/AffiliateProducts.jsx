import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import supabase from "../supabaseClient";

export default function AffiliateProducts() {
  const [products, setProducts] = useState([]);
  const [platform, setPlatform] = useState("Semua");
  const [category, setCategory] = useState("Semua");
  const [loading, setLoading] = useState(false);

  // pagination state
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 16;

  // sesuai field di CMS
  const platforms = ["Semua", "Shopee", "TikTok", "Blibli", "Lazada"];
  const categories = [
    "Semua",
    "Elektronik",
    "Fashion Pria",
    "Fashion Wanita",
    "Kecantikan",
    "Kesehatan",
    "Makanan & Minuman",
    "Aksesoris",
    "Hobi",
    "Alat Rumah Tangga",
    "Lainnya",
  ];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      let query = supabase
        .from("affiliate_products")
        .select("*", { count: "exact" })
        .order("created_at", { ascending: false });

      // filter sesuai DB (tanpa lower/upper)
      if (platform !== "Semua") query = query.eq("platform", platform);
      if (category !== "Semua") query = query.eq("kategori", category);

      const start = (page - 1) * limit;
      const end = start + limit - 1;

      const { data, count, error } = await query.range(start, end);
      if (!error) {
        setProducts(data);
        setTotalPages(Math.ceil(count / limit));
      } else {
        console.error(error);
      }
      setLoading(false);
    };

    fetchData();
  }, [platform, category, page]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 to-sky-200 dark:from-black dark:to-gray-900 text-slate-800 dark:text-slate-100 px-3 sm:px-6 py-12 flex flex-col items-center">
      {/* Judul */}
      <h1 className="text-2xl sm:text-4xl font-extrabold mb-8 text-center tracking-tight flex items-center gap-2">
        <ShoppingBag className="text-sky-500" size={32} />
        Produk Affiliate
      </h1>

      {/* Filter Platform */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6">
        {platforms.map((p) => (
          <button
            key={p}
            onClick={() => {
              setPlatform(p);
              setPage(1);
            }}
            className={`px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium border transition ${
              platform === p
                ? "bg-sky-500 text-white border-sky-500"
                : "bg-transparent text-slate-700 dark:text-slate-200 border-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      {/* Filter Kategori */}
      <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 mb-8">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => {
              setCategory(c);
              setPage(1);
            }}
            className={`px-2.5 py-1 rounded-md text-xs sm:text-sm border transition ${
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
        <p className="text-center text-slate-500 dark:text-slate-400 mb-6 text-sm">
          Memuat produk...
        </p>
      )}

      {/* Grid Produk */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-5 w-full max-w-7xl place-items-center">
        {products.length > 0
          ? products.map((p) => (
              <motion.div
                key={p.id}
                whileHover={{ y: -3, scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-white dark:bg-slate-800 rounded-xl shadow-md border border-slate-200 dark:border-slate-700 p-2 sm:p-4 text-center flex flex-col justify-between w-full"
              >
                <img
                  src={p.foto}
                  alt={p.nama}
                  className="w-full h-24 sm:h-36 object-cover rounded-md mb-2"
                />
                <h3 className="font-semibold text-xs sm:text-sm mb-2 text-slate-800 dark:text-slate-100 line-clamp-2">
                  {p.nama}
                </h3>
                <a
                  href={p.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block text-[10px] sm:text-sm bg-sky-500 hover:bg-sky-600 text-white px-2 py-1 sm:px-3 sm:py-1.5 rounded-md transition"
                >
                  Lihat
                </a>
              </motion.div>
            ))
          : !loading && (
              <p className="text-slate-500 dark:text-slate-400 col-span-full text-sm">
                Tidak ada produk ditemukan.
              </p>
            )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-10">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-3 py-1.5 rounded-md text-xs sm:text-sm border border-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-50"
          >
            Sebelumnya
          </button>
          <span className="text-sm text-slate-600 dark:text-slate-300">
            Halaman {page} / {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="px-3 py-1.5 rounded-md text-xs sm:text-sm border border-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-50"
          >
            Berikutnya
          </button>
        </div>
      )}
    </div>
  );
}
