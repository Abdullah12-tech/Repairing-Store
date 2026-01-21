import { Menu, X } from "lucide-react";
import { useState } from "react";
import { DiVisualstudio } from "react-icons/di";
import { Link } from "react-router-dom";

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Top accent bar */}
      <div className="sticky top-0 z-50">
        <div className="h-4 bg-primary" />

        <header className="bg-secondary border-b">
          <div className="max-w-[1450px] mx-auto px-6 md:px-16 h-20 flex items-center justify-between">

            {/* Logo */}
            <div className="text-2xl font-black tracking-tight text-primary">
              ThePhoneLab<span className="text-black">®</span>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex gap-10 text-advanced font-medium">
              {["Repairs", "About Us", "Prices", "Support", "Business"].map((item) => (
                <span
                  key={item}
                  className="relative cursor-pointer group"
                >
                  {item}
                  <span className="absolute left-1/2 bottom-[-6px] h-[2px] w-0 bg-primary transition-all duration-300 group-hover:w-full group-hover:left-0" />
                </span>
              ))}
            </nav>

            {/* CTA + Hamburger */}
            <div className="flex items-center gap-4">
              <Link
                className="hidden sm:inline-flex px-5 py-2  bg-primary text-secondary transition-all"
              >
                Book Appointment
              </Link>

              {/* Hamburger */}
              <div
                role="button"
                tabIndex={0}
                onClick={() => setOpen(!open)}
                onKeyDown={(e) => e.key === "Enter" && setOpen(!open)}
                className="lg:hidden w-10 h-10 border-none active:border-none bg-secondary flex items-center justify-center"
              >
                {open ? (
                  <X size={40} className="text-advanced transition" />
                ) : (
                  <Menu size={40} className="text-advanced transition" />
                )}
              </div>
            </div>
          </div>
        </header>
      </div>

      {/* Mobile Radial Menu */}
      <div
        className={`fixed inset-0 z-40 bg-secondary text-primary transition-all duration-500 ease-in-out
        ${open ? "clip-open" : "clip-closed"}`}
      >
        <nav className="h-full flex flex-col items-center justify-center gap-10 text-3xl font-semibold">
          {["Repairs", "Stores", "Prices", "Support", "Business"].map((item) => (
            <span
              key={item}
              onClick={() => setOpen(false)}
              className="hover:text-tertiary transition cursor-pointer"
            >
              {item}
            </span>
          ))}

          <Link
            onClick={() => setOpen(false)}
            className="mt-8 px-8 py-4 bg-tertiary text-black font-bold"
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
