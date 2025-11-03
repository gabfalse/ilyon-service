import CmsSection from "../../Components/CmsSection";

export default function DigitalProductPage() {
  const fields = [
    { name: "foto", label: "URL Foto" },
    { name: "nama", label: "Nama Produk" },
    { name: "link", label: "Link Produk" },
    {
      name: "kategori",
      label: "Kategori Produk",
      type: "select",
      options: [
        "Ebook",
        "Template",
        "UI Kit",
        "Source Code",
        "Font",
        "Lainnya",
      ],
    },
  ];

  return (
    <CmsSection
      title="Digital Product CMS"
      fields={fields}
      table="digital_products"
      bucket="digital_product"
    />
  );
}
