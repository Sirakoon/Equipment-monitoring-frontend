import { useState } from "react";
import { X, ArrowLeft } from "lucide-react";
import { useAuthContext } from "../context/AuthContext";

export default function LoginModal({ isOpen, onClose }) {
  const [view, setView] = useState("login");
  const { login } = useAuthContext();

  if (!isOpen) return null;

  const handleClose = () => {
    setView("login");
    onClose();
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    // mock response ก่อน
    const fakeResponse = {
      userData: {
        id: 1,
        username: "admin",
        fullName: "System Administrator",
        role: "Administrator",
        department: "IT",
      },
      accessToken: "mock-jwt-token-123456",
    };

    login(fakeResponse);
    handleClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
      <div className="w-full max-w-md relative rounded-3xl bg-white dark:bg-zinc-900 p-8 shadow-2xl border border-gray-200 dark:border-zinc-800">
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-black dark:hover:text-white transition-colors"
        >
          <X size={24} />
        </button>

        {view !== "login" && (
          <button
            onClick={() => setView("login")}
            className="absolute left-4 top-4 text-gray-400 hover:text-black dark:hover:text-white transition-colors"
          >
            <ArrowLeft size={22} />
          </button>
        )}

        {view === "login" && (
          <>
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-zinc-100">
              Login to System
            </h2>

            <form className="space-y-4" onSubmit={handleLogin}>
              <div>
                <label className="block text-sm font-medium ml-1 text-gray-700 dark:text-zinc-300">
                  Username
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                  placeholder="Enter your username"
                />
              </div>

              <div>
                <label className="block text-sm font-medium ml-1 text-gray-700 dark:text-zinc-300">
                  Password
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-sky-600 text-white py-3 rounded-xl font-bold hover:bg-sky-700 transition-colors"
              >
                Sign In
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}