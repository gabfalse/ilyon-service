import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import supabase from "../supabaseClient";

export default function AffiliateProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("affiliate_products")
        .select("*");
      if (!error) setProducts(data);
      else console.error(error);
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-200 dark:from-slate-900 dark:to-slate-800 text-slate-800 dark:text-slate-100 px-6 py-16">
      <h1 className="text-4xl font-extrabold mb-10 text-center tracking-tight">
        Produk Affiliate
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {products.map((p) => (
          <motion.div
            key={p.id}
            whileHover={{ y: -4, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 250 }}
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-md border border-slate-200 dark:border-slate-700 p-4 text-center"
          >
            <img
              src={p.foto}
              alt={p.nama}
              className="w-full h-40 object-cover rounded-lg mb-3"
            />
            <h3 className="font-semibold text-base mb-2">{p.nama}</h3>
            <a
              href={p.link}
              target="_blank"
              rel="noreferrer"
              className="inline-block text-sm bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-lg transition"
            >
              Lihat Produk
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
