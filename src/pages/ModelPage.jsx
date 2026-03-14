import { useEffect, useState, useCallback } from "react";
import { useSearchParams, useLocation, useNavigate } from "react-router-dom";
import { useRepair } from "../context/PhonesContext";
import CustomSelect from "../components/ui/customSelect";

const ITEMS_PER_PAGE = 10;

const RepairsPage = () => {
  const { getBrands, getPhoneModels } = useRepair();
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();

  const brandFromUrl = searchParams.get("brand");
  const { brandName: brandNameFromState } = location.state || {};

  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [brandsLoading, setBrandsLoading] = useState(true);
  const [modelsLoading, setModelsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedModel, setSelectedModel] = useState("");

  // Load brands once
  useEffect(() => {
    let mounted = true;
    setBrandsLoading(true);

    getBrands()
      .then((brandsRes) => {
        if (!mounted) return;
        const brandsData = brandsRes?.data || brandsRes || [];
        setBrands(brandsData);

        if (brandFromUrl) {
          setSelectedBrand(brandFromUrl);
        }
      })
      .catch(err => console.error("Failed to fetch brands:", err))
      .finally(() => {
        if (mounted) setBrandsLoading(false);
      });

    return () => { mounted = false; };
  }, []);

  // Load models with pagination
  const loadModels = useCallback(async (brandId, pageNum = 1) => {
    setModelsLoading(true);
    try {
      const params = { page: pageNum, limit: ITEMS_PER_PAGE };
      if (brandId) params.brandId = brandId;

      const response = await getPhoneModels(params);
      const modelsData = response?.data || response || [];
      const total = response?.total || response?.totalCount || modelsData.length;

      setModels(modelsData);
      setTotalPages(Math.max(1, Math.ceil(total / ITEMS_PER_PAGE)));
      setCurrentPage(pageNum);
    } catch (err) {
      console.error("Failed to fetch models:", err);
      setModels([]);
      setTotalPages(1);
    } finally {
      setModelsLoading(false);
    }
  }, [getPhoneModels]);

  // Load models when brand changes
  useEffect(() => {
    loadModels(selectedBrand || null, 1);
    setSelectedModel("");
  }, [selectedBrand, loadModels]);

  // Handle URL changes
  useEffect(() => {
    if (!brandsLoading && brandFromUrl !== selectedBrand) {
      setSelectedBrand(brandFromUrl || "");
    }
  }, [brandFromUrl, brandsLoading]);

  const handleBrandChange = (value) => {
    setSelectedBrand(value);
    if (value) {
      setSearchParams({ brand: value });
    } else {
      setSearchParams({});
    }
  };

  const handlePageChange = (pageNum) => {
    if (pageNum === currentPage) return;
    loadModels(selectedBrand || null, pageNum);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Generate clean page numbers
  const getVisiblePages = () => {
    const delta = 1; // Pages to show around current
    const range = [];
    const rangeWithDots = [];
    let l;

    range.push(1);

    for (let i = currentPage - delta; i <= currentPage + delta; i++) {
      if (i < totalPages && i > 1) {
        range.push(i);
      }
    }

    if (totalPages > 1) range.push(totalPages);

    for (let i of range) {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push('...');
        }
      }
      rangeWithDots.push(i);
      l = i;
    }

    return rangeWithDots;
  };

  const getBrandName = (brandId) => {
    const brand = brands.find(b => (b.id || b.Id)?.toString() === brandId);
    return brand?.name || brand?.Name || brandNameFromState || "Unknown Brand";
  };

  const handleModelClick = (modelId) => {
    navigate(`/repairs/${modelId}`);
  };

  const isLoading = brandsLoading || modelsLoading;
  const filteredModels = selectedModel
  ? models.filter(m => (m.id || m.Id)?.toString() === selectedModel)
  : models;

  return (
    <>
      <style>{`
        select:disabled {
  opacity: 1 !important;
}
      `}</style>
      <section className="max-w-6xl mx-auto px-10 py-12">
        <div className="mb-8">
          <h2 className="text-2xl font-bold">
            {selectedBrand ? `${getBrandName(selectedBrand)} Repairs` : "All Repairs"}
          </h2>
          {!isLoading && (
            <p className="text-gray-500 mt-1 text-sm">
              {models.length} models {selectedBrand && `for ${getBrandName(selectedBrand)}`}
            </p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-10 max-w-xl">

          <div className="flex-1">
            <CustomSelect
              label="Brand"
              placeholder={brandsLoading ? "Loading..." : "All brands"}
              value={selectedBrand}
              onChange={handleBrandChange}
              options={[
                { value: "", label: "All brands" },
                ...brands.map(b => ({
                  value: (b.id || b.Id)?.toString(),
                  label: b.name || b.Name,
                })),
              ]}
              disabled={brandsLoading}
              className="bg-secondary"
            />
          </div>

          <div className="flex-1 relative">
            {!selectedBrand && (
              <div className="absolute inset-0 bg-white/70 z-10 rounded-lg cursor-not-allowed" />
            )}

            <CustomSelect
              label="Model"
              placeholder={modelsLoading ? "Loading..." : "Select model"}
              value={selectedModel}
              onChange={setSelectedModel}
              options={[
                { value: "", label: "All models" },
                ...models.map(m => ({
                  value: (m.id || m.Id)?.toString(),
                  label: m.name || m.Name,
                })),
              ]}
              disabled={!selectedBrand || modelsLoading}
              className="bg-secondary"
            />

            {!selectedBrand && (
              <p className="absolute -bottom-6 left-0 text-xs text-gray-400">
                Select a brand first
              </p>
            )}
          </div>

        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
              <ModelSkeleton key={i} />
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-8">
              {filteredModels.map(model => (
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
                      onError={(e) => { e.target.src = "/placeholder-phone.png"; }}
                    />
                  </div>
                  <p className="text-center mt-3 text-sm font-medium text-gray-800 line-clamp-2">
                    {model.name || model.Name}
                  </p>
                </div>
              ))}
            </div>

            {!models.length && (
              <div className="text-center py-16">
                <p className="text-gray-500 mb-2">No models found</p>
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

            {/* Compact, Clean Pagination */}
            <div className="flex flex-col items-center gap-3">
              <div className="inline-flex items-center gap-1 p-1 bg-gray-100 rounded-lg">
                {/* Prev */}
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1 || modelsLoading}
                  className="w-8 h-8 flex items-center justify-center rounded-md text-sm font-medium text-gray-600
                         hover:bg-white hover:shadow-sm disabled:opacity-40 disabled:hover:bg-transparent disabled:cursor-not-allowed transition-all"
                >
                  ←
                </button>

                {/* Pages */}
                {getVisiblePages().map((page, idx) => (
                  page === '...' ? (
                    <span key={idx} className="w-8 h-8 flex items-center justify-center text-gray-400 text-sm">
                      •••
                    </span>
                  ) : (
                    <button
                      key={idx}
                      onClick={() => handlePageChange(page)}
                      disabled={modelsLoading}
                      className={`w-8 h-8 flex items-center justify-center rounded-md text-sm font-medium transition-all
                      ${currentPage === page
                          ? "bg-white text-indigo-600 shadow-sm ring-1 ring-indigo-100"
                          : "text-gray-600 hover:bg-white hover:shadow-sm"
                        } disabled:opacity-60`}
                    >
                      {page}
                    </button>
                  )
                ))}

                {/* Next */}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages || modelsLoading}
                  className="w-8 h-8 flex items-center justify-center rounded-md text-sm font-medium text-gray-600
                         hover:bg-white hover:shadow-sm disabled:opacity-40 disabled:hover:bg-transparent disabled:cursor-not-allowed transition-all"
                >
                  →
                </button>
              </div>

              <span className="text-xs text-gray-400 font-medium">
                Page {currentPage} of {totalPages}
              </span>
            </div>
          </>
        )}
      </section>
    </>
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