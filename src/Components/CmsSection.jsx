import { useState } from "react";

export default function CmsSection({ title, fields }) {
  const [form, setForm] = useState({});
  const [dataList, setDataList] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    if (Object.values(form).some((v) => !v))
      return alert("Lengkapi semua kolom!");
    setDataList([...dataList, form]);
    setForm({});
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-10 px-6 transition-colors">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-6 text-center dark:text-white">
          {title}
        </h1>

        <div className="grid sm:grid-cols-2 gap-4 mb-6">
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

        <button
          onClick={handleAdd}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md mb-6"
        >
          Tambah Data
        </button>

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
              </tr>
            </thead>
            <tbody>
              {dataList.map((item, i) => (
                <tr
                  key={i}
                  className="border-t border-gray-300 dark:border-gray-600"
                >
                  {fields.map((f) => (
                    <td
                      key={f.name}
                      className="p-2 text-gray-800 dark:text-gray-100"
                    >
                      {item[f.name]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
