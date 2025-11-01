import { useState, useEffect } from "react";
import supabase from "../supabaseClient";

export default function CmsSection({ title, fields, table }) {
  const [form, setForm] = useState({});
  const [dataList, setDataList] = useState([]);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (Object.values(form).some((v) => !v))
      return alert("Lengkapi semua kolom terlebih dahulu.");

    setSaving(true);
    const { id, ...cleanForm } = form;

    const action = editId
      ? supabase.from(table).update(cleanForm).eq("id", editId)
      : supabase.from(table).insert([cleanForm]);

    const { error } = await action;

    if (error) {
      console.error("Error saving:", error);
      alert("Gagal menyimpan data! " + error.message);
    } else {
      alert(
        editId ? "Data berhasil diperbarui." : "Data berhasil ditambahkan."
      );
      setForm({});
      setEditId(null);
      fetchData();
    }
    setSaving(false);
  };

  const handleDelete = async (id) => {
    if (!confirm("Yakin ingin menghapus data ini?")) return;
    const { error } = await supabase.from(table).delete().eq("id", id);
    if (error) alert("Gagal menghapus data! " + error.message);
    else fetchData();
  };

  const handleEdit = (item) => {
    setForm(item);
    setEditId(item.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancel = () => {
    setForm({});
    setEditId(null);
  };

  // 🔹 Fungsi bantu untuk slice teks panjang
  const sliceText = (text, maxLength = 50) => {
    if (!text) return "";
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-10 px-4 sm:px-6 transition-colors">
      <div className="max-w-6xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 sm:p-6 overflow-hidden">
        <h1 className="text-2xl font-bold mb-6 text-center dark:text-white">
          {title}
        </h1>

        {/* 🔸 Form Input */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          {fields.map((f) =>
            f.type === "select" ? (
              <select
                key={f.name}
                name={f.name}
                value={form[f.name] || ""}
                onChange={handleChange}
                className="p-2 border rounded-md dark:bg-gray-700 dark:text-white w-full"
              >
                <option value="">Pilih {f.label}</option>
                {f.options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            ) : (
              <input
                key={f.name}
                type="text"
                name={f.name}
                placeholder={f.label}
                value={form[f.name] || ""}
                onChange={handleChange}
                className="p-2 border rounded-md dark:bg-gray-700 dark:text-white w-full"
              />
            )
          )}
        </div>

        {/* 🔸 Tombol Aksi */}
        <div className="flex flex-wrap gap-3 mb-6">
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

        {/* 🔸 Loading State */}
        {loading && <p className="text-center text-gray-500">Memuat data...</p>}

        {/* 🔸 Tabel Data */}
        <div className="overflow-x-auto rounded-lg border border-gray-300 dark:border-gray-700">
          <table className="w-full border-collapse text-sm md:text-base">
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
                  className="border-t border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                >
                  {fields.map((f) => (
                    <td
                      key={f.name}
                      className="p-2 text-gray-800 dark:text-gray-100 max-w-[200px] truncate"
                      title={item[f.name] || ""}
                    >
                      {sliceText(item[f.name], 60)}
                    </td>
                  ))}
                  <td className="p-2 flex flex-wrap gap-2">
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
