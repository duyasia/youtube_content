import React, { useState } from "react";
import { useAuth } from "./AuthContext";

const LoginPage: React.FC = () => {
  const { login, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await login(email, password);
    } catch (err: any) {
      setError(err.message || "Có lỗi xảy ra");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <form
        onSubmit={handleSubmit}
        className="bg-[#111] p-8 rounded-lg w-96 shadow-lg flex flex-col gap-4"
      >
        <h2 className="text-2xl font-bold text-white mb-2">Đăng nhập</h2>
        <input
          type="email"
          placeholder="Email"
          className="p-3 rounded bg-[#222] text-white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          className="p-3 rounded bg-[#222] text-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <div className="text-red-500">{error}</div>}
        <button
          type="submit"
          className="bg-[#ff0034] text-white py-2 rounded hover:bg-[#e6002c]"
          disabled={loading}
        >
          {loading ? "Đang đăng nhập..." : "Đăng nhập"}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
