import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Code } from "lucide-react";
import supabase from "../supabaseClient";

export default function FreelanceWeb() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from("freelance_it").select("*");
      if (!error) setServices(data);
      else console.error(error);
    };
    fetchData();
  }, []);

  // fungsi untuk mengambil gambar dari link affiliate
  const getImageUrl = (s) => {
    if (s.foto && s.foto.trim() !== "") return s.foto;

    // auto ambil gambar untuk Shopee, TikTok, dll
    if (s.link?.includes("shopee")) {
      const id = s.link.split("/").pop().split("?")[0];
      return `https://down-id.img.susercontent.com/file/${id}`;
    } else if (s.link?.includes("tiktok")) {
      return "https://seeklogo.com/images/T/tiktok-icon-black-logo-EE0E01A5A6-seeklogo.com.png";
    } else if (s.link?.includes("blibli")) {
      return "https://cdn.blibli.com/sprite/favicon_blibli.png";
    }

    // fallback image
    return "https://placehold.co/600x400?text=Freelance+Web";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 to-sky-200 dark:from-black dark:to-gray-900 text-slate-800 dark:text-slate-100 px-6 py-16 flex flex-col items-center">
      <h1 className="text-4xl font-extrabold mb-10 text-center tracking-tight">
        Freelance Web & IT
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
              src={getImageUrl(s)}
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
                href={s.link || `https://wa.me/+6289517026332`}
                target="_blank"
                rel="noreferrer"
                className="inline-block w-full text-center bg-sky-500 hover:bg-sky-600 text-white py-2 rounded-lg transition"
              >
                {s.link ? "Lihat Detail" : "Tanyakan Detail"}
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
