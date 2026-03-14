import { useState } from "react";
import { FiMessageCircle, FiMessageSquare } from "react-icons/fi";

export default function WhatsAppSupport() {
  const [open, setOpen] = useState(false);

  const phone = "2347039705647"; // your whatsapp number
  const message = "Hello, I need support";

  return (
    <>
      {/* Chat Popup */}
      <div
        className={`fixed bottom-20 right-5 sm:right-6 w-[260px] bg-white rounded-xl shadow-xl p-4 z-30 transition-all duration-300
        ${open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}
      >
        <p className="text-sm font-semibold text-gray-800">
          👋 Hi there
        </p>

        <p className="text-xs text-gray-600 mt-1">
          Need help? Our live support is ready on WhatsApp.
        </p>

        <a
          href={`https://wa.me/${phone}?text=${encodeURIComponent(message)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="block mt-3 text-center bg-primary text-white text-sm py-2 rounded-lg hover:scale-[1.02] transition"
        >
          Chat on WhatsApp
        </a>
      </div>

      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed z-50 bottom-5 right-5 sm:bottom-6 sm:right-6
        w-12 h-12 sm:w-14 sm:h-14
        flex items-center justify-center
        bg-yellow-400 text-black
        rounded-full shadow-lg
        hover:scale-105 active:scale-95 transition"
      >
        <FiMessageSquare size={22} />
      </button>
    </>
  );
}