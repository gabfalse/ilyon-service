import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <nav className="w-full flex justify-between items-center px-6 py-4 bg-secondary transition-colors duration-500">
      <img
        onClick={() => navigate("/")}
        src="/ilyon.png"
        alt="Ilyon"
        className="w-25 object-contain "
      />

      <button
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        className="px-3 py-1 rounded-lg border border-slate-400 text-sm hover:opacity-80"
      >
        {theme === "light" ? "🌙 Dark" : "☀️ Light"}
      </button>
    </nav>
  );
}
