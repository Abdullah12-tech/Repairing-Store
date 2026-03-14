import { Menu, X } from "lucide-react";
import { useState } from "react";
import { DiVisualstudio } from "react-icons/di";
import { Link } from "react-router-dom";
import HeaderLogo from "../assets/images/logo.png";

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Top accent bar */}
      <div className="sticky top-0 z-50">
        <div className="h-4 bg-primary" />

        <header className="bg-secondary border-b">
          <div className="max-w-[1450px] mx-auto px-4 md:px-16 h-16 md:h-20 flex items-center justify-between">

            {/* Logo */}
            <Link to="/" className="flex items-center">
              <img
                src={HeaderLogo}
                alt="logo"
                className="h-10 w-auto"
              />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex gap-10 text-advanced font-medium">
              {[
                { title: "Repairs", desc: "Fix phones & devices", path: "/repairs" },
                { title: "Prices", desc: "Check service costs", path: "/prices" },
                { title: "About Us", desc: "Learn more about us", path: "/aboutus" },
                { title: "Contact Us", desc: "Get in touch with us", path: "/contact" },
              ].map((item) => (
                <Link
                  to={`${item.path.toLowerCase().replace(/\s+/g, "")}`}
                  key={item.title}
                  className="relative cursor-pointer group"
                >
                  {item.title}
                  <span className="absolute left-1/2 bottom-[-6px] h-[2px] w-0 bg-primary transition-all duration-300 group-hover:w-full group-hover:left-0" />
                </Link>
              ))}
            </nav>

            {/* CTA + Hamburger */}
            <div className="flex items-center gap-3">

              <Link
                to="/repairs"
                className="hidden sm:inline-flex px-4 py-3 rounded-lg text-sm bg-primary text-secondary font-medium"
              >
                Book Appointment
              </Link>

              {/* Hamburger */}
              <button
                onClick={() => setOpen(!open)}
                className="lg:hidden bg-secondary  flex items-center justify-center"
              >
                {open ? (
                  <X size={26} className="text-advanced" />
                ) : (
                  <Menu size={26} className="text-advanced" />
                )}
              </button>

            </div>
          </div>
        </header>
      </div>

      {/* Mobile Radial Menu */}
      <div
        className={`fixed inset-0 z-40 flex items-center justify-center transition-all duration-500 ease-in-out
        ${open ? "clip-open" : "clip-closed"}`}
      >
        {/* Background */}
        <div
          className="absolute inset-0 bg-secondary"
          onClick={() => setOpen(false)}
        />

        {/* Menu Panel */}
        <nav className="relative w-[240px] bg-white/5 mt-2 backdrop-blur-xl border border-white/10 rounded-2xl p-4 flex flex-col gap-3 text-center shadow-2xl">

          {[
            { title: "Repairs", desc: "Fix phones & devices", path: "/repairs" },
            { title: "Prices", desc: "Check service costs", path: "/prices" },
            { title: "About Us", desc: "Learn more about us", path: "/aboutus" },
            { title: "Contact Us", desc: "Get in touch with us", path: "/contact" },
          ].map((item) => (
            <Link
              key={item.title}
              to={item.path}
              onClick={() => setOpen(false)}
              className="group py-2 border-b border-white/10 last:border-none"
            >
              <p className="text-base font-semibold text-primary group-hover:text-tertiary transition">
                {item.title}
              </p>

              <span className="text-xs text-advanced opacity-70">
                {item.desc}
              </span>
            </Link>
          ))}

          {/* CTA */}
          <Link
            to="/repairs"
            onClick={() => setOpen(false)}
            className="mt-4 w-[170px] py-2 px-2 m-auto rounded-lg bg-primary text-secondary hover:scale-[1.02] transition"
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
