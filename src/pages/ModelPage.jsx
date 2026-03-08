import { useEffect, useState, useMemo } from "react";
import { useSearchParams, useLocation, useNavigate } from "react-router-dom";
import { useRepair } from "../context/PhonesContext";
import CustomSelect from "../components/ui/customSelect";

const ITEMS_PER_PAGE = 12;

const RepairsPage = () => {
  const { getBrands, getPhoneModels } = useRepair();
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  
  const brandFromUrl = searchParams.get("brand");
  const { brandName: brandNameFromState } = location.state || {};

  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  // Don't initialize from URL immediately - wait for data to load
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedModel, setSelectedModel] = useState("");

  // Fetch data on mount
  useEffect(() => {
    let mounted = true;
    setLoading(true);

    Promise.all([getBrands(), getPhoneModels()])
      .then(([brandsRes, modelsRes]) => {
        if (!mounted) return;
        
        const brandsData = brandsRes?.data || brandsRes || [];
        const modelsData = modelsRes?.data || modelsRes || [];
        
        setBrands(brandsData);
        setModels(modelsData);
        
        // NOW set the selected brand after data is loaded
        if (brandFromUrl) {
          setSelectedBrand(brandFromUrl);
        }
      })
      .catch(err => {
        console.error("Failed to fetch data:", err);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [getBrands, getPhoneModels]); // Remove brandFromUrl from here

  // Handle URL changes after initial load
  useEffect(() => {
    if (!loading && brandFromUrl !== selectedBrand) {
      setSelectedBrand(brandFromUrl || "");
      setSelectedModel("");
      setPage(1);
    }
  }, [brandFromUrl, loading]); // Add selectedBrand to deps if needed

  const handleBrandChange = (value) => {
    setSelectedBrand(value);
    setSelectedModel("");
    setPage(1);
    
    if (value) {
      setSearchParams({ brand: value });
    } else {
      setSearchParams({});
    }
  };

  const filteredModels = useMemo(() => {
    if (!selectedBrand) return models;
    
    return models.filter(model => {
      const modelBrandId = (model.brandId || model.BrandId)?.toString();
      return modelBrandId === selectedBrand;
    });
  }, [models, selectedBrand]);

  const totalPages = Math.ceil(filteredModels.length / ITEMS_PER_PAGE);

  const paginatedModels = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return filteredModels.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredModels, page]);

  useEffect(() => {
    setPage(1);
  }, [selectedBrand, selectedModel]);

  const getBrandName = (brandId) => {
    const brand = brands.find(b => 
      (b.id || b.Id)?.toString() === brandId
    );
    return brand?.name || brand?.Name || brandNameFromState || "Unknown Brand";
  };

  const handleModelClick = (modelId) => {
    navigate(`/repairs/${modelId}`);
  };

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-8">
        <h2 className="text-2xl font-bold">
          {selectedBrand ? `${getBrandName(selectedBrand)} Repairs` : "Select your device"}
        </h2>
        {selectedBrand && (
          <p className="text-gray-500 mt-1 text-sm">
            Showing {filteredModels.length} models for {getBrandName(selectedBrand)}
          </p>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-10 max-w-xl">
  <div className="flex-1">
    <CustomSelect
      label="Brand"
      placeholder="All brands"
      value={selectedBrand}
      onChange={handleBrandChange}
      options={[
        { value: "", label: "All brands" },
        ...brands.map(b => ({
          value: (b.id || b.Id)?.toString(),
          label: b.name || b.Name,
        })),
      ]}
      disabled={loading}
    />
  </div>

  <div className="flex-1">
    <CustomSelect
      label="Model"
      placeholder="All models"
      value={selectedModel}
      onChange={value => {
        setSelectedModel(value)
        setPage(1)
      }}
      options={[
        { value: "", label: "All models" },
        ...models
          .filter(m => {
            if (!selectedBrand) return true
            const modelBrandId = (m.brandId || m.BrandId)?.toString()
            return modelBrandId === selectedBrand
          })
          .map(m => ({
            value: (m.id || m.Id)?.toString(),
            label: m.name || m.Name,
          })),
      ]}
      disabled={loading}
    />
  </div>
</div>

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
            <ModelSkeleton key={i} />
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {paginatedModels.map(model => (
              <div
                key={model.id || model.Id}
                onClick={() => handleModelClick(model.id || model.Id)}
                className="border rounded-xl p-4 cursor-pointer hover:border-indigo-500 hover:shadow-md transition-all duration-200 bg-white group"
              >
                <div className="relative overflow-hidden rounded-lg bg-gray-50">
                  <img
                    src={model.imageUrl || model.ImageUrl || "/placeholder-phone.png"}
                    alt={model.name || model.Name}
                    className="h-32 mx-auto object-contain group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.src = "/placeholder-phone.png";
                    }}
                  />
                </div>
                <p className="text-center mt-3 text-sm font-medium text-gray-800 line-clamp-2">
                  {model.name || model.Name}
                </p>
              </div>
            ))}
          </div>

          {!paginatedModels.length && (
            <div className="text-center py-16">
              <p className="text-gray-500 mb-2">No models found for this selection</p>
              {selectedBrand && (
                <button
                  onClick={() => handleBrandChange("")}
                  className="text-indigo-600 hover:text-indigo-700 text-sm font-medium hover:underline"
                >
                  View all brands
                </button>
              )}
            </div>
          )}

          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-10">
              <button
                disabled={page === 1}
                onClick={() => setPage(p => p - 1)}
                className="px-4 py-2 border rounded-lg disabled:opacity-40 hover:bg-gray-50 transition disabled:cursor-not-allowed"
              >
                Previous
              </button>

              <span className="text-sm text-gray-600">
                Page {page} of {totalPages}
              </span>

              <button
                disabled={page === totalPages}
                onClick={() => setPage(p => p + 1)}
                className="px-4 py-2 border rounded-lg disabled:opacity-40 hover:bg-gray-50 transition disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
};

function ModelSkeleton() {
  return (
    <div className="border rounded-xl p-4 animate-pulse bg-white">
      <div className="h-32 bg-gray-200 rounded-lg mb-4" />
      <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto" />
    </div>
  );
}

export default RepairsPage;