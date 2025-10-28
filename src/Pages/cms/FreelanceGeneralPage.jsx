import CmsSection from "../../Components/CmsSection";

export default function FreelanceGeneralPage() {
  const fields = [
    { name: "foto", label: "URL Foto" },
    { name: "nama", label: "Nama Layanan" },
    { name: "deskripsi", label: "Deskripsi" },
    { name: "harga", label: "Harga" },
    { name: "link", label: "Link Pemesanan" },
  ];
  return <CmsSection title="Freelance Umum CMS" fields={fields} />;
}
