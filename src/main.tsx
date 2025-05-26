import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { AuthProvider, useAuth } from "./AuthContext";
import LoginPage from "./LoginPage";
import "./index.css";

const ProtectedApp = () => {
  const { user, loading, logout } = useAuth();
  if (loading)
    return <div className="text-white p-8">Đang kiểm tra đăng nhập...</div>;
  if (!user) return <LoginPage />;
  return (
    <>
      <App />
      <button
        onClick={logout}
        className="ml-4 px-3 py-1 bg-[#ff0034] text-white rounded"
      >
        Đăng xuất
      </button>
    </>
  );
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <ProtectedApp />
    </AuthProvider>
  </StrictMode>
);
