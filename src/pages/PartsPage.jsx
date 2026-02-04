// src/pages/SelectParts.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRepair } from "../context/PhonesContext";

const SelectParts = () => {
  const { modelId } = useParams();
  const { getPhoneParts, getPrices } = useRepair();

  const [parts, setParts] = useState([]);
  const [prices, setPrices] = useState([]);

  useEffect(() => {
    getPhoneParts().then(res => setParts(res.data || []));
    getPrices({ PhoneModelId: modelId }).then(res =>
      setPrices(res.data || [])
    );
  }, [modelId]);

  const getPartPrice = (partId) =>
    prices.find(p => p.phonePartId === partId);

  return (
    <section className="max-w-5xl mx-auto px-6 py-12">
      <h2 className="text-2xl font-bold mb-6">
        What needs to be repaired?
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {parts.map(part => {
          const price = getPartPrice(part.id);

          return (
            <div
              key={part.id}
              className="border rounded-lg p-4 hover:shadow cursor-pointer"
            >
              <img
                src={part.imageUrl}
                alt={part.name}
                className="h-24 mx-auto object-contain"
              />

              <p className="text-center mt-3 font-medium">
                {part.name}
              </p>

              {price && (
                <p className="text-center text-sm text-gray-600 mt-1">
                  ${price.cost} · {price.duration} mins
                </p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default SelectParts;
