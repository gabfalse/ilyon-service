import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import supabase from "../supabaseClient";

export default function FreelanceGeneral() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("freelance_general")
        .select("*");
      if (!error) setServices(data);
      else console.error(error);
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-200 dark:from-slate-900 dark:to-slate-800 text-slate-800 dark:text-slate-100 px-6 py-16">
      <h1 className="text-4xl font-extrabold mb-10 text-center tracking-tight">
        Freelance Umum
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {services.map((s) => (
          <motion.div
            key={s.id}
            whileHover={{ y: -5, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden"
          >
            <img
              src={s.foto}
              alt={s.nama}
              className="w-full h-48 object-cover"
            />
            <div className="p-5">
              <h3 className="text-xl font-semibold mb-2">{s.nama}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 mb-3">
                {s.deskripsi}
              </p>
              <p className="text-sky-600 font-bold mb-4">
                Rp {Number(s.harga).toLocaleString("id-ID")}
              </p>
              <a
                href={s.link}
                target="_blank"
                rel="noreferrer"
                className="inline-block w-full text-center bg-sky-500 hover:bg-sky-600 text-white py-2 rounded-lg transition"
              >
                Hubungi / Lihat Detail
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
