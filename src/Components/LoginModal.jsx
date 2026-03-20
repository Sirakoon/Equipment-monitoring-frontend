import { X } from "lucide-react";

export default function LoginModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md relative animate-in fade-in zoom-in duration-300">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-black transition-colors"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Login to System</h2>
        
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 ml-1">Username</label>
            <input 
              type="text" 
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none transition-all"
              placeholder="Enter your username"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 ml-1">Password</label>
            <input 
              type="password" 
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none transition-all"
              placeholder="••••••••"
            />
          </div>
          
          <button className="w-full bg-sky-600 text-white py-3 rounded-xl font-bold hover:bg-sky-700 transition-colors shadow-lg shadow-sky-200 mt-4">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}