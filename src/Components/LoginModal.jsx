import { useState } from "react";
import { X, ArrowLeft } from "lucide-react";

export default function LoginModal({ isOpen, onClose }) {
  const [view, setView] = useState("login");

  if (!isOpen) return null;

  const handleClose = () => {
    setView("login");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
      <div className="w-full max-w-md relative rounded-3xl bg-white dark:bg-zinc-900 p-8 shadow-2xl border border-gray-200 dark:border-zinc-800 animate-in fade-in zoom-in duration-300">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-black dark:hover:text-white transition-colors"
        >
          <X size={24} />
        </button>

        {/* Back Button */}
        {view !== "login" && (
          <button
            onClick={() => setView("login")}
            className="absolute left-4 top-4 text-gray-400 hover:text-black dark:hover:text-white transition-colors"
          >
            <ArrowLeft size={22} />
          </button>
        )}

        {/* LOGIN */}
        {view === "login" && (
          <>
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-zinc-100">
              Login to System
            </h2>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium ml-1 text-gray-700 dark:text-zinc-300">
                  Username
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-zinc-100 placeholder:text-gray-400 dark:placeholder:text-zinc-500 focus:ring-2 focus:ring-sky-500 outline-none transition-all"
                  placeholder="Enter your username"
                />
              </div>

              <div>
                <label className="block text-sm font-medium ml-1 text-gray-700 dark:text-zinc-300">
                  Password
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-zinc-100 placeholder:text-gray-400 dark:placeholder:text-zinc-500 focus:ring-2 focus:ring-sky-500 outline-none transition-all"
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-sky-600 text-white py-3 rounded-xl font-bold hover:bg-sky-700 transition-colors shadow-lg shadow-sky-200/60 dark:shadow-sky-950/30 mt-4"
              >
                Sign In
              </button>

              <div className="flex items-center justify-between pt-2 text-sm">
                <button
                  type="button"
                  onClick={() => setView("forgot")}
                  className="text-sky-600 hover:text-sky-800 dark:text-sky-400 dark:hover:text-sky-300 font-medium"
                >
                  Forgot password?
                </button>

                <button
                  type="button"
                  onClick={() => setView("register")}
                  className="text-sky-600 hover:text-sky-800 dark:text-sky-400 dark:hover:text-sky-300 font-medium"
                >
                  Register
                </button>
              </div>
            </form>
          </>
        )}

        {/* FORGOT PASSWORD */}
        {view === "forgot" && (
          <>
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-zinc-100">
              Reset Password
            </h2>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium ml-1 text-gray-700 dark:text-zinc-300">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-zinc-100 placeholder:text-gray-400 dark:placeholder:text-zinc-500 focus:ring-2 focus:ring-sky-500 outline-none transition-all"
                  placeholder="Enter your email"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-sky-600 text-white py-3 rounded-xl font-bold hover:bg-sky-700 transition-colors shadow-lg shadow-sky-200/60 dark:shadow-sky-950/30"
              >
                Send Reset Link
              </button>
            </form>
          </>
        )}

        {/* REGISTER */}
        {view === "register" && (
          <>
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-zinc-100">
              Create Account
            </h2>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium ml-1 text-gray-700 dark:text-zinc-300">
                  Full Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-zinc-100 placeholder:text-gray-400 dark:placeholder:text-zinc-500 focus:ring-2 focus:ring-sky-500 outline-none transition-all"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium ml-1 text-gray-700 dark:text-zinc-300">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-zinc-100 placeholder:text-gray-400 dark:placeholder:text-zinc-500 focus:ring-2 focus:ring-sky-500 outline-none transition-all"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium ml-1 text-gray-700 dark:text-zinc-300">
                  Username
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-zinc-100 placeholder:text-gray-400 dark:placeholder:text-zinc-500 focus:ring-2 focus:ring-sky-500 outline-none transition-all"
                  placeholder="Choose a username"
                />
              </div>

              <div>
                <label className="block text-sm font-medium ml-1 text-gray-700 dark:text-zinc-300">
                  Password
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-zinc-100 placeholder:text-gray-400 dark:placeholder:text-zinc-500 focus:ring-2 focus:ring-sky-500 outline-none transition-all"
                  placeholder="Create a password"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-sky-600 text-white py-3 rounded-xl font-bold hover:bg-sky-700 transition-colors shadow-lg shadow-sky-200/60 dark:shadow-sky-950/30"
              >
                Create Account
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}