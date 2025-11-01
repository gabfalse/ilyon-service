import CmsSection from "../../Components/CmsSection";

export default function AffiliateProductPage() {
  const fields = [
    { name: "foto", label: "URL Foto" },
    { name: "nama", label: "Nama Produk Affiliate" },
    { name: "link", label: "Link Affiliate" },
    {
      name: "platform",
      label: "Platform",
      type: "select",
      options: ["Shopee", "TikTok", "Blibli", "Lazada"],
    },
    {
      name: "kategori",
      label: "Kategori Produk",
      type: "select",
      options: [
        "Elektronik",
        "Fashion Pria",
        "Fashion Wanita",
        "Kecantikan",
        "Kesehatan",
        "Makanan & Minuman",
        "Aksesoris",
        "Hobi",
        "Alat Rumah Tangga",
        "Lainnya",
      ],
    },
  ];

  return (
    <CmsSection
      title="Affiliate Product CMS"
      fields={fields}
      table="affiliate_products" // nama tabel di Supabase
    />
  );
}
