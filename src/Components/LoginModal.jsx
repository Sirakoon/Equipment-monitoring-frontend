import { useState } from "react";
import { X, ArrowLeft } from "lucide-react";
import { useAuthContext } from "../context/AuthContext";
import { authService } from "../service/authService";

export default function LoginModal({ isOpen, onClose }) {
  const [view, setView] = useState("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuthContext();

  if (!isOpen) return null;

  const handleClose = () => {
    setView("login");
    setUsername("");
    setPassword("");
    setError("");
    onClose();
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!username || !password) {
      setError("Username and password are required");
      setLoading(false);
      return;
    }

    try {
      const result = await authService.login(username, password);
      login({ userData: result.user, accessToken: result.token });
      handleClose();
    } catch (err) {
      setError(err.message || "Login failed. Try admin/admin123");
    } finally {
      setLoading(false);
    }
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

            {error && (
              <div className="mb-4 p-3 bg-rose-100 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 rounded-lg text-sm">
                {error}
              </div>
            )}

            <form className="space-y-4" onSubmit={handleLogin}>
              <div>
                <label className="block text-sm font-medium ml-1 text-gray-700 dark:text-zinc-300">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white focus:outline-none focus:border-sky-500"
                  placeholder="admin or tech01"
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium ml-1 text-gray-700 dark:text-zinc-300">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white focus:outline-none focus:border-sky-500"
                  placeholder="••••••••"
                  disabled={loading}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-sky-600 text-white py-3 rounded-xl font-bold hover:bg-sky-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Signing In..." : "Sign In"}
              </button>

              <p className="text-xs text-gray-500 dark:text-zinc-400 text-center mt-4">
                Demo: admin / admin123
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}