import { useState } from "react";
import { ChevronDown } from "lucide-react";

const Accordion = ({ header, children }) => {

  return (
    <div className="bg-secondary border border-sm shadow-md">
      <button
        className="w-full bg-secondary p-4 flex items-center justify-between text-left"
      >
        {header}

        <ChevronDown
          size={20}
          className="transition-transform text-advanced -rotate-90"
        />
      </button>
    </div>
  );
};

export default Accordion;
