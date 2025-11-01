import CmsSection from "../../Components/CmsSection";

export default function FreelanceITPage() {
  const fields = [
    { name: "foto", label: "URL Foto" },
    { name: "nama", label: "Nama Layanan" },
    { name: "deskripsi", label: "Deskripsi" },
    { name: "harga", label: "Harga" },
    { name: "link", label: "Link Pemesanan (misal WhatsApp, Shopee, dll)" },
    {
      name: "link_contoh",
      label: "Link Contoh Website (pisahkan dengan koma , )",
      placeholder: "https://example1.com, https://example2.com",
    },
  ];

  return (
    <CmsSection
      title="Freelance IT / Web CMS"
      fields={fields}
      table="freelance_it" // nama tabel di Supabase
    />
  );
}
