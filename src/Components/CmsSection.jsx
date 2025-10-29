import { useState, useEffect } from "react";
import supabase from "../supabaseClient";

export default function CmsSection({ title, fields, table }) {
  const [form, setForm] = useState({});
  const [dataList, setDataList] = useState([]);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  // 🔹 Ambil data dari database
  const fetchData = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from(table)
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      console.error("Error fetch data:", error);
      alert("Gagal memuat data.");
    } else {
      setDataList(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [table]);

  // 🔹 Input handler
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔹 Tambah atau update data
  const handleSave = async () => {
    if (Object.values(form).some((v) => !v))
      return alert("Lengkapi semua kolom terlebih dahulu.");

    setSaving(true);

    // Hapus id dari form supaya tidak ikut dikirim (karena kolom auto increment)
    const { id, ...cleanForm } = form;

    if (editId) {
      // Update data
      const { error } = await supabase
        .from(table)
        .update(cleanForm)
        .eq("id", editId);

      if (error) {
        console.error("Error update:", error);
        alert("Gagal memperbarui data! " + error.message);
      } else {
        alert("Data berhasil diperbarui.");
        setForm({});
        setEditId(null);
        fetchData();
      }
    } else {
      // Insert data baru
      const { error } = await supabase.from(table).insert([cleanForm]);
      if (error) {
        console.error("Error insert:", error);
        alert("Gagal menambah data! " + error.message);
      } else {
        alert("Data berhasil ditambahkan.");
        setForm({});
        fetchData();
      }
    }

    setSaving(false);
  };

  // 🔹 Hapus data
  const handleDelete = async (id) => {
    if (!confirm("Yakin ingin menghapus data ini?")) return;
    const { error } = await supabase.from(table).delete().eq("id", id);
    if (error) {
      console.error("Error delete:", error);
      alert("Gagal menghapus data! " + error.message);
    } else {
      fetchData();
    }
  };

  // 🔹 Edit data
  const handleEdit = (item) => {
    setForm(item);
    setEditId(item.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancel = () => {
    setForm({});
    setEditId(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-10 px-6 transition-colors">
      <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-6 text-center dark:text-white">
          {title}
        </h1>

        {/* 🔸 Form Input */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          {fields.map((f) => (
            <input
              key={f.name}
              type="text"
              name={f.name}
              placeholder={f.label}
              value={form[f.name] || ""}
              onChange={handleChange}
              className="p-2 border rounded-md dark:bg-gray-700 dark:text-white"
            />
          ))}
        </div>

        {/* 🔸 Tombol Aksi */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={handleSave}
            disabled={saving}
            className={`px-4 py-2 rounded-md text-white ${
              editId
                ? "bg-green-600 hover:bg-green-700"
                : "bg-blue-600 hover:bg-blue-700"
            } ${saving ? "opacity-70 cursor-not-allowed" : ""}`}
          >
            {saving
              ? "Menyimpan..."
              : editId
              ? "Simpan Perubahan"
              : "Tambah Data"}
          </button>
          {editId && (
            <button
              onClick={handleCancel}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md"
            >
              Batal
            </button>
          )}
        </div>

        {/* 🔸 Loading state */}
        {loading && <p className="text-center text-gray-500">Memuat data...</p>}

        {/* 🔸 Tabel Data */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-700">
                {fields.map((f) => (
                  <th
                    key={f.name}
                    className="p-2 text-left text-gray-700 dark:text-gray-200"
                  >
                    {f.label}
                  </th>
                ))}
                <th className="p-2 text-left text-gray-700 dark:text-gray-200">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {dataList.map((item) => (
                <tr
                  key={item.id}
                  className="border-t border-gray-300 dark:border-gray-600"
                >
                  {fields.map((f) => (
                    <td
                      key={f.name}
                      className="p-2 text-gray-800 dark:text-gray-100 break-words"
                    >
                      {item[f.name]}
                    </td>
                  ))}
                  <td className="p-2 flex gap-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-sm"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
              {dataList.length === 0 && !loading && (
                <tr>
                  <td
                    colSpan={fields.length + 1}
                    className="text-center text-gray-500 py-4"
                  >
                    Belum ada data.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
