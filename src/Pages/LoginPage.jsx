import { useState } from "react";
import { useNavigate } from "react-router-dom";

const dummyUsers = [
  { username: "admin", password: "12345", role: "admin" },
  { username: "user", password: "abcde", role: "user" },
];

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const foundUser = dummyUsers.find(
      (u) => u.username === username && u.password === password
    );

    if (foundUser) {
      localStorage.setItem("sessionUser", JSON.stringify(foundUser));
      navigate("/admin");
    } else {
      setError("Username atau password salah!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 to-sky-200 dark:from-black dark:to-gray-900 text-slate-800 dark:text-slate-100 px-6 py-16 flex flex-col items-center">
      <div className="min-h-screen bg-gradient-to-b from-sky-100 to-sky-200 dark:from-black dark:to-gray-900 text-slate-800 dark:text-slate-100 px-6 py-16 flex flex-col items-center">
        <h1 className="text-2xl font-bold text-center mb-6 dark:text-white">
          Login
        </h1>
        <input
          type="text"
          placeholder="Username"
          className="w-full p-2 mb-3 border rounded-md dark:bg-gray-800 dark:text-white"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-3 border rounded-md dark:bg-gray-800 dark:text-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition"
        >
          Login
        </button>
      </div>
    </div>
  );
}
