import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import supabase from "../supabaseClient";

export default function FreelanceWeb() {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null); // 👈 modal state

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from("freelance_it").select("*");
      if (!error) setServices(data);
      else console.error(error);
    };
    fetchData();
  }, []);

  const getImageUrl = (s) => {
    if (s.foto && s.foto.trim() !== "") return s.foto;

    if (s.link?.includes("shopee")) {
      const id = s.link.split("/").pop().split("?")[0];
      return `https://down-id.img.susercontent.com/file/${id}`;
    } else if (s.link?.includes("tiktok")) {
      return "https://seeklogo.com/images/T/tiktok-icon-black-logo-EE0E01A5A6-seeklogo.com.png";
    } else if (s.link?.includes("blibli")) {
      return "https://cdn.blibli.com/sprite/favicon_blibli.png";
    }

    return "https://placehold.co/600x400?text=Freelance+Web";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 to-sky-200 dark:from-black dark:to-gray-900 text-slate-800 dark:text-slate-100 px-4 sm:px-6 py-16 flex flex-col items-center">
      <h1 className="text-4xl font-extrabold mb-10 text-center tracking-tight">
        Freelance Web & IT
      </h1>

      {/* Responsive grid */}
      <div
        className="grid gap-6 sm:gap-8 max-w-6xl mx-auto w-full
        grid-cols-[repeat(auto-fit,minmax(180px,1fr))] sm:grid-cols-[repeat(auto-fit,minmax(220px,1fr))]"
      >
        {services.map((s) => (
          <motion.div
            key={s.id}
            whileHover={{ y: -5, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden flex flex-col"
          >
            <img
              src={getImageUrl(s)}
              alt={s.nama}
              className="w-full h-40 sm:h-48 object-cover"
            />
            <div className="p-4 sm:p-5 flex flex-col flex-grow">
              <h3 className="text-lg sm:text-xl font-semibold mb-2 line-clamp-1">
                {s.nama}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 mb-3 line-clamp-3">
                {s.deskripsi}
              </p>
              <p className="text-sky-600 font-bold mb-4">
                Rp {Number(s.harga).toLocaleString("id-ID")}
              </p>

              <button
                onClick={() => setSelectedService(s)} // 👈 buka modal
                className="mt-auto inline-block w-full text-center bg-sky-500 hover:bg-sky-600 text-white py-2 rounded-lg transition"
              >
                Lihat Detail
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      {selectedService && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-slate-900 rounded-2xl max-w-md w-full shadow-2xl overflow-hidden"
          >
            <img
              src={getImageUrl(selectedService)}
              alt={selectedService.nama}
              className="w-full h-56 object-cover"
            />
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-3">
                {selectedService.nama}
              </h2>
              <p className="text-slate-700 dark:text-slate-300 mb-4 whitespace-pre-line">
                {selectedService.deskripsi}
              </p>
              <p className="text-sky-600 font-semibold mb-6">
                Rp {Number(selectedService.harga).toLocaleString("id-ID")}
              </p>

              <div className="flex flex-col gap-3">
                <a
                  href={selectedService.link || `https://wa.me/+6289517026332`}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-sky-500 hover:bg-sky-600 text-white text-center py-2 rounded-lg transition"
                >
                  Tanyakan Detail
                </a>
                <button
                  onClick={() => setSelectedService(null)}
                  className="bg-gray-300 dark:bg-slate-700 text-gray-800 dark:text-gray-200 py-2 rounded-lg hover:bg-gray-400 dark:hover:bg-slate-600 transition"
                >
                  Tutup
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
