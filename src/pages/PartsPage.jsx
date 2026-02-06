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

        setParts(partsRes?.data || []);
        setPrices(pricesRes?.data || []);
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
        repairPriceId: price.repairPriceId,
        partName: part.name,
        cost: price.cost,
        duration: price.duration,
      },
    });
  };

  if (loadingParts || loadingPrices) {
    return (
      <section className="max-w-5xl mx-auto px-6 py-16 text-center">
        <p className="text-gray-500">Loading repair options...</p>
      </section>
    );
  }

  if (!parts.length) {
    return (
      <section className="max-w-5xl mx-auto px-6 py-16 text-center">
        <p className="text-gray-500">
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
              className={`border rounded-lg p-4 text-left transition
                ${price ? "hover:shadow cursor-pointer" : "opacity-50 cursor-not-allowed"}
              `}
            >
              <img
                src={part.imageUrl}
                alt={part.name}
                className="h-24 mx-auto object-contain"
              />

              <p className="text-center mt-3 font-medium">
                {part.name}
              </p>

              {price ? (
                <p className="text-center text-sm text-gray-600 mt-1">
                  ${price.cost} · {price.duration} mins
                </p>
              ) : (
                <p className="text-center text-sm text-gray-400 mt-1">
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
