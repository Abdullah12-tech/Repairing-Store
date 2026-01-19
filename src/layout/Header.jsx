import { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Top accent bar */}
      <div className="sticky top-0 z-50">
        <div className="h-4 bg-red-500" />

        <header className="bg-white/80 backdrop-blur-xl border-b">
          <div className="max-w-7xl mx-auto px-6 md:px-16 h-20 flex items-center justify-between">
            
            {/* Logo */}
            <div className="text-2xl font-black tracking-tight text-red-600">
              ThePhoneLab<span className="text-black">®</span>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex gap-10 text-gray-700 font-medium">
              {["Repairs", "Stores", "Prices", "Support", "Business"].map((item) => (
                <span
                  key={item}
                  className="relative cursor-pointer group"
                >
                  {item}
                  <span className="absolute left-1/2 bottom-[-6px] h-[2px] w-0 bg-red-500 transition-all duration-300 group-hover:w-full group-hover:left-0" />
                </span>
              ))}
            </nav>

            {/* CTA + Hamburger */}
            <div className="flex items-center gap-4">
              <Link
                className="hidden sm:inline-flex px-5 py-2 rounded-full bg-black text-white hover:bg-yellow-400 hover:text-black transition-all"
              >
                Book Appointment
              </Link>

              {/* Hamburger */}
              <button
                onClick={() => setOpen(!open)}
                className="lg:hidden relative w-10 h-10 flex items-center justify-center"
              >
                <span
                  className={`absolute h-[2px] w-6 bg-black transition-all duration-300 ${
                    open ? "rotate-45 translate-y-0" : "-translate-y-2"
                  }`}
                />
                <span
                  className={`absolute h-[2px] w-6 bg-black transition-all duration-300 ${
                    open ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`absolute h-[2px] w-6 bg-black transition-all duration-300 ${
                    open ? "-rotate-45 translate-y-0" : "translate-y-2"
                  }`}
                />
              </button>
            </div>
          </div>
        </header>
      </div>

      {/* Mobile Radial Menu */}
      <div
        className={`fixed inset-0 z-40 bg-black text-white transition-all duration-500 ease-in-out
        ${open ? "clip-open" : "clip-closed"}`}
      >
        <nav className="h-full flex flex-col items-center justify-center gap-10 text-3xl font-semibold">
          {["Repairs", "Stores", "Prices", "Support", "Business"].map((item) => (
            <span
              key={item}
              onClick={() => setOpen(false)}
              className="hover:text-yellow-400 transition cursor-pointer"
            >
              {item}
            </span>
          ))}

          <Link
            onClick={() => setOpen(false)}
            className="mt-8 px-8 py-3 rounded-full bg-yellow-400 text-black font-bold"
          >
            Book Appointment
          </Link>
        </nav>
      </div>

      {/* Clip-path styles */}
      <style>{`
        .clip-closed {
          clip-path: circle(0% at 95% 5%);
        }

        .clip-open {
          clip-path: circle(150% at 95% 5%);
        }
      `}</style>
    </>
  );
};

export default Header;
