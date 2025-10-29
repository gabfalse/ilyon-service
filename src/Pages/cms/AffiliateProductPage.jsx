import CmsSection from "../../Components/CmsSection";

export default function AffiliateProductPage() {
  const fields = [
    { name: "foto", label: "URL Foto" },
    { name: "nama", label: "Nama Produk Affiliate" },
    { name: "link", label: "Link Affiliate" },
  ];

  return (
    <CmsSection
      title="Affiliate Product CMS"
      fields={fields}
      table="affiliate_products" // nama tabel di Supabase
    />
  );
}
