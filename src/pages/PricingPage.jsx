import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useRepair } from "../context/PhonesContext";

export default function PricingPage() {
  const { getBrands, getPrices, getPhoneModels, loadingBrands } = useRepair();

  const [brands, setBrands] = useState([]);
  const [brandPrices, setBrandPrices] = useState({});
  const [loadingMap, setLoadingMap] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      try {
        // 1. fetch brands
        const res = await getBrands();
        if (!mounted) return;

        const brandList = res.data || [];
        setBrands(brandList);

        // 2. fetch models & prices per brand
        const brandPromises = brandList.map(async (brand) => {
          setLoadingMap((prev) => ({ ...prev, [brand.id]: true }));
          try {
            const [pricesRes, modelsRes] = await Promise.all([
              getPrices({ BrandId: brand.id }),
              getPhoneModels({ BrandId: brand.id }),
            ]);

            const prices = pricesRes.data || [];
            const models = modelsRes.data || [];

            // Map models by id for easy lookup
            const modelMap = {};
            models.forEach((m) => (modelMap[m.id] = m));

            // Enrich prices with model names
            const enrichedPrices = prices.map((p) => {
              const modelId = p.phoneModelId || p.phoneModel?.id;
              if (modelId && modelMap[modelId] && !p.phoneModelName) {
                p.phoneModelName = modelMap[modelId].name;
              }
              return p;
            });

            return { brandId: brand.id, prices: enrichedPrices };
          } finally {
            setLoadingMap((prev) => ({ ...prev, [brand.id]: false }));
          }
        });

        const results = await Promise.all(brandPromises);
        if (!mounted) return;

        const priceMap = {};
        results.forEach((r) => (priceMap[r.brandId] = r.prices));
        setBrandPrices(priceMap);
      } catch (err) {
        setError(err.message || "Failed to load pricing");
      }
    };

    fetchData();
    return () => { mounted = false; };
  }, [getBrands, getPrices, getPhoneModels]);

  if (loadingBrands) {
    return (
      <div className="flex flex-col items-center justify-center py-28 space-y-4">
        <Spinner large />
        <p className="text-gray-600 text-lg">Fetching brands...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-lg rounded-lg border border-red-300 bg-red-50 p-6 text-red-800">
        {error}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 space-y-12">
      {brands.map((brand) => {
        const prices = brandPrices[brand.id] || [];

        // Group prices by model
        const groupedModels = prices.reduce((acc, p) => {
          const modelId = p.phoneModelId || p.phoneModel?.id || p.id;
          if (!modelId) return acc;

          if (!acc[modelId]) {
            acc[modelId] = {
              model: { id: modelId, name: p.phoneModelName || "Unknown Model" },
              parts: [],
            };
          }
          acc[modelId].parts.push(p);
          return acc;
        }, {});

        return (
          <section
            key={brand.id}
            className="rounded-2xl border border-gray-200 bg-white shadow hover:shadow-lg transition-shadow duration-200"
          >
            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
              <h3 className="text-lg font-semibold text-gray-900">{brand.name}</h3>
              {loadingMap[brand.id] && (
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Spinner small />
                  Loading prices...
                </div>
              )}
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-50 text-gray-600">
                  <tr>
                    <th className="px-6 py-3 text-left font-medium">Model</th>
                    <th className="px-6 py-3 text-left font-medium">Screen</th>
                    <th className="px-6 py-3 text-left font-medium">Battery</th>
                    <th className="px-6 py-3 text-left font-medium">Other Repairs</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {Object.values(groupedModels).map((g) => (
                    <tr key={g.model.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-gray-900">
                        <Link
                          to={`/repairs/${g.model.id}`}
                          state={{ brandName: brand.name, modelName: g.model.name }}
                          className="text-indigo-600 hover:underline"
                        >
                          {g.model.name}
                        </Link>
                      </td>
                      <td className="px-6 py-4 text-gray-700">{getPartCost(g.parts, "Screen")}</td>
                      <td className="px-6 py-4 text-gray-700">{getPartCost(g.parts, "Battery")}</td>
                      <td className="px-6 py-4">
                        <Link
                          to={`/repairs/${g.model.id}`}
                          state={{ brandName: brand.name, modelName: g.model.name }}
                          className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-700"
                        >
                          See all repairs →
                        </Link>
                      </td>
                    </tr>
                  ))}
                  {!Object.values(groupedModels).length && (
                    <tr>
                      <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                        No pricing available for this brand
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        );
      })}
    </div>
  );
}

/* ---------------- Helpers ---------------- */
function getPartCost(parts, partName) {
  const part = parts.find((x) => (x.phonePartName || x.phonePart?.name) === partName);
  if (!part) return "—";
  return part.cost ? `€${part.cost}` : "—";
}

function Spinner({ small, large }) {
  const size = large ? "w-12 h-12" : small ? "w-4 h-4" : "w-6 h-6";
  return (
    <div className={`animate-spin border-2 border-t-indigo-600 border-gray-300 rounded-full ${size}`} />
  );
}
