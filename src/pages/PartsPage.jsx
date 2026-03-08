import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRepair } from "../context/PhonesContext";

const SelectParts = () => {
  const navigate = useNavigate();
  const { modelId } = useParams();
  const { getPhoneParts, getPrices, loadingPrices } = useRepair();

  const [parts, setParts] = useState([]);
  const [prices, setPrices] = useState([]);
  const [loadingParts, setLoadingParts] = useState(true);

  useEffect(() => {
    let active = true;

    const fetchData = async () => {
      try {
        setLoadingParts(true);

        const [partsRes, pricesRes] = await Promise.all([
          getPhoneParts(),
          getPrices({ PhoneModelId: modelId }),
        ]);

        if (!active) return;
        console.log(pricesRes?.data);
        setParts(partsRes?.data || []);
        setPrices(pricesRes?.data || []);
        console.log("Fetched parts:", partsRes?.data);
        
        
      } catch (err) {
        console.error("Failed to load parts or prices", err);
      } finally {
        if (active) setLoadingParts(false);
      }
    };

    fetchData();

    return () => {
      active = false;
    };
  }, [modelId]);

  const getPriceForPart = partId =>
    prices.find(p => p.phonePartId === partId);

  const handleSelectPart = (part) => {
    const price = getPriceForPart(part.id);

    if (!price) return;

    navigate("/appointment", {
      state: {
        phoneModelId: modelId,
        phonePartId: part.id,
        repairPriceId: price.id,
        name: part.name,
        cost: price.cost,
        dUration: price.dUration,
      },
    });
  };

  if (loadingParts || loadingPrices) {
    return (
      <section className="max-w-5xl mx-auto px-6 py-16 flex items-center justify-center min-h-[40vh]">

        <div className="relative flex items-center justify-center">

          {/* Outer Rotating Ring */}
          <div className="w-20 h-20 rounded-full border-2 border-[var(--tertiary)]/20 animate-spin"></div>

          {/* Inner Reverse Spin Ring */}
          <div className="absolute w-14 h-14 rounded-full border-2 border-transparent border-t-[var(--tertiary)] border-r-[var(--tertiary)] animate-[spin_1.2s_linear_reverse_infinite]"></div>

          {/* Pulsing Core */}
          <div className="absolute w-4 h-4 bg-[var(--tertiary)] rounded-full animate-ping opacity-75"></div>

          {/* Solid Core */}
          <div className="absolute w-3 h-3 bg-[var(--tertiary)] rounded-full"></div>

        </div>

      </section>
    );
  }

  if (!parts.length) {
    return (
      <section className="max-w-5xl mx-auto px-6 py-16 text-center">
        <p className="text-tertiary">
          No repair parts available for this model.
        </p>
      </section>
    );
  }

  return (
    <section className="max-w-5xl mx-auto px-6 py-12">
      <h2 className="text-2xl font-bold mb-6">
        What needs to be repaired?
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {parts.map(part => {
          const price = getPriceForPart(part.id);

          return (
            <button
              key={part.id}
              onClick={() => handleSelectPart(part)}
              disabled={!price}
              className={`border bg-secondary rounded-lg p-4 text-left transition shadow-sm
                ${price ? "hover:shadow-md cursor-pointer" : "opacity-50 cursor-not-allowed"}
              `}
            >
              <img
                src={part.imageUrl}
                alt={part.name}
                className="h-24 mx-auto object-contain"
              />

              <p className="text-center text-advanced mt-3 font-medium">
                {part.name}
              </p>

              {price ? (
                <p className="text-center text-sm text-tertiary mt-1">
                  ${price.cost} · {price.dUration}
                </p>
              ) : (
                <p className="text-center text-sm text-tertiary mt-1">
                  Not available
                </p>
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default SelectParts;
