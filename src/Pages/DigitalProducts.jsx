import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ImageOff } from "lucide-react";
import supabase from "../supabaseClient";

export default function DigitalProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("digital_products")
        .select("*");
      if (!error) setProducts(data);
      else console.error("Gagal fetch data:", error.message);
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-primary text-primary px-4 sm:px-6 py-16">
      <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center">
        Produk Digital
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
        {products.map((p) => (
          <motion.div
            key={p.id}
            whileHover={{ scale: 1.04, y: -5 }}
            className="p-4 bg-card dark:bg-card-dark rounded-xl shadow-sm border border-slate-800 dark:border-slate-700 text-center"
          >
            {p.foto ? (
              <img
                src={p.foto}
                alt={p.nama}
                className="w-full h-32 object-cover rounded-lg mb-3"
              />
            ) : (
              <div className="w-full h-32 flex items-center justify-center bg-slate-100 dark:bg-slate-800 rounded-lg mb-3">
                <ImageOff className="text-slate-400" size={32} />
              </div>
            )}
            <h3 className="font-semibold text-sm sm:text-base mb-2">
              {p.nama}
            </h3>
            <a
              href={p.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-500 text-sm hover:underline"
            >
              Kunjungi
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
