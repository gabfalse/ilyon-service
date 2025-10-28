import CmsSection from "../../Components/CmsSection";

export default function DigitalProductPage() {
  const fields = [
    { name: "foto", label: "URL Foto" },
    { name: "nama", label: "Nama Produk" },
    { name: "link", label: "Link Produk" },
  ];
  return <CmsSection title="Digital Product CMS" fields={fields} />;
}
