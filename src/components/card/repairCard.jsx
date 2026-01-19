import { useState } from "react";
import { ChevronDown } from "lucide-react";

const ServiceCard = ({ icon, title, description, linkText }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white border border-gray-200 rounded-md shadow-sm transition">
      {/* Header (clickable on small screens) */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full p-6 bg-white flex items-center justify-between text-left md:cursor-default"
      >
        <div className="flex items-center gap-3">
          <div className="text-gray-500">{icon}</div>
          <h3 className="text-lg font-semibold text-gray-900">
            {title}
          </h3>
        </div>

        {/* Chevron only on small screens */}
        <ChevronDown
          size={20}
          className={`md:hidden transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Content */}
      <div
        className={`
          px-6 pb-6
          ${open ? "block" : "hidden"}
          md:block
        `}
      >
        <p className="text-gray-700 text-sm leading-relaxed">
          {description}
        </p>

        <a
          href="#"
          className="mt-4 inline-flex text-sm font-semibold text-red-600 hover:underline items-center gap-1"
        >
          {linkText}
          <span>›</span>
        </a>
      </div>
    </div>
  );
};

export default ServiceCard;
