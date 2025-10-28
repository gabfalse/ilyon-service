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
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-primary text-primary px-4 sm:px-6 py-16">
      <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center">
        Freelance Umum
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {services.map((s) => (
          <motion.div
            key={s.id}
            whileHover={{ scale: 1.03 }}
            className="p-5 bg-card dark:bg-card-dark rounded-xl shadow border border-slate-300 dark:border-slate-700"
          >
            {s.image_url ? (
              <img
                src={s.image_url}
                alt={s.name}
                className="w-full h-40 object-cover rounded-lg mb-3"
              />
            ) : (
              <div className="w-full h-40 flex items-center justify-center bg-slate-100 dark:bg-slate-800 rounded-lg mb-3">
                <Briefcase className="text-slate-400" size={32} />
              </div>
            )}
            <h3 className="font-semibold text-lg mb-2">{s.name}</h3>
            <p className="text-sm text-secondary mb-2">{s.description}</p>
            <p className="font-semibold mb-3 text-sky-500">
              Rp {s.price?.toLocaleString()}
            </p>
            <a
              href={s.link}
              target="_blank"
              className="text-sm text-white bg-sky-500 px-4 py-2 rounded-md hover:bg-sky-600"
            >
              Hubungi / Lihat Detail
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
