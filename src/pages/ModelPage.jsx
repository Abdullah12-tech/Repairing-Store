import { useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useRepair } from "../context/PhonesContext"
import CustomSelect from "../components/ui/customSelect"

const ITEMS_PER_PAGE = 12

const SelectModel = () => {
  const { getBrands, getPhoneModels } = useRepair()
  const navigate = useNavigate()

  const [brands, setBrands] = useState([])
  const [models, setModels] = useState([])

  const [selectedBrand, setSelectedBrand] = useState("")
  const [selectedModel, setSelectedModel] = useState("")
  const [page, setPage] = useState(1)

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    setLoading(true)

    Promise.all([getBrands(), getPhoneModels()])
      .then(([brandsRes, modelsRes]) => {
        if (!mounted) return
        setBrands(brandsRes.data || [])
        setModels(modelsRes.data || [])
      })
      .finally(() => {
        if (mounted) setLoading(false)
      })

    return () => {
      mounted = false
    }
  }, [getBrands, getPhoneModels])

  const filteredModels = useMemo(() => {
    return models.filter(model => {
      const byBrand =
        !selectedBrand || model.brandId === selectedBrand
      const byModel =
        !selectedModel || model.id === selectedModel
      return byBrand && byModel
    })
  }, [models, selectedBrand, selectedModel])

  const totalPages = Math.ceil(filteredModels.length / ITEMS_PER_PAGE)

  const paginatedModels = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE
    return filteredModels.slice(start, start + ITEMS_PER_PAGE)
  }, [filteredModels, page])

  useEffect(() => {
    setPage(1)
  }, [selectedBrand, selectedModel])

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <h2 className="text-2xl font-bold mb-8">
        Select your device
      </h2>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-10 max-w-xl">
        <div className="flex-1">
          <CustomSelect
            label="Brand"
            placeholder="All brands"
            value={selectedBrand}
            onChange={value => {
              setSelectedBrand(value)
              setSelectedModel("")
            }}
            options={[
              { value: "", label: "All brands" },
              ...brands.map(b => ({
                value: b.id,
                label: b.name,
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
            onChange={value => setSelectedModel(value)}
            options={[
              { value: "", label: "All models" },
              ...models
                .filter(
                  m => !selectedBrand || m.brandId === selectedBrand
                )
                .map(m => ({
                  value: m.id,
                  label: m.name,
                })),
            ]}
            disabled={loading}
          />
        </div>
      </div>

      {/* Loading Skeleton */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
            <ModelSkeleton key={i} />
          ))}
        </div>
      ) : (
        <>
          {/* Models Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {paginatedModels.map(model => (
              <div
                key={model.id}
                onClick={() => navigate(`/repairs/${model.id}`)}
                className="border rounded-xl p-4 cursor-pointer
                           hover:border-red-500 hover:shadow-sm
                           transition bg-white"
              >
                <img
                  src={model.imageUrl}
                  alt={model.name}
                  className="h-32 mx-auto object-contain"
                />
                <p className="text-center mt-3 text-sm font-medium">
                  {model.name}
                </p>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {!paginatedModels.length && (
            <p className="text-center text-gray-500 mt-12">
              No models found for this selection
            </p>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-10">
              <button
                disabled={page === 1}
                onClick={() => setPage(p => p - 1)}
                className="px-4 py-2 border rounded disabled:opacity-40"
              >
                Previous
              </button>

              <span className="text-sm">
                Page {page} of {totalPages}
              </span>

              <button
                disabled={page === totalPages}
                onClick={() => setPage(p => p + 1)}
                className="px-4 py-2 border rounded disabled:opacity-40"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </section>
  )
}

export default SelectModel

/* ---------------- skeleton ---------------- */

function ModelSkeleton() {
  return (
    <div className="border rounded-xl p-4 animate-pulse bg-white">
      <div className="h-32 bg-gray-200 rounded mb-4" />
      <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto" />
    </div>
  )
}
