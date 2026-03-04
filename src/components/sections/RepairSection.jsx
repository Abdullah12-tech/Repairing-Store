import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRepair } from "../../context/PhonesContext";
import ServiceCard from "../card/repairCard";
import ServiceAccordion from "../card/serviceAccordion";
import UncommonSkeletonCard from "../card/UncommonSkeleton";

const RepairSection = () => {
  const navigate = useNavigate();
  const { getBrands, loadingBrands, error } = useRepair();
  const [brands, setBrands] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);

  const getBrandIcon = (brandName) => {
    const iconMap = {
      Apple: "https://cdn.simpleicons.org/apple/000000",
      Samsung: "https://cdn.simpleicons.org/samsung/1428A0",
      Google: "https://cdn.simpleicons.org/google/4285F4",
      Huawei: "https://cdn.simpleicons.org/huawei/FF0000",
      OnePlus: "https://cdn.simpleicons.org/oneplus/EB0028",
      Xiaomi: "https://cdn.simpleicons.org/xiaomi/FF6900",
    };
    return iconMap[brandName] || "https://cdn.simpleicons.org/android/3DDC84";
  };

  const handleBrandClick = (brandId, brandName) => {
    navigate(`/repairs?brand=${brandId}`, {
      state: { brandName, brandId },
    });
  };

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await getBrands();
        let data = response;

        if (response?.data && Array.isArray(response.data)) {
          data = response.data;
        } else if (response?.result && Array.isArray(response.result)) {
          data = response.result;
        }

        if (!Array.isArray(data)) {
          throw new Error("Invalid data format received from server");
        }

        const formattedBrands = data.map((brand, index) => ({
          id: brand.id || brand.Id || index,
          brand: brand.name || brand.Name || "Unknown",
          title: `${brand.name || brand.Name || "Unknown"} Repair`,
          icon: getBrandIcon(brand.name || brand.Name),
          description:
            brand.description ||
            `Professional ${brand.name || brand.Name} repair services with high-quality parts and expert technicians.`,
          linkText: `See all ${brand.name || brand.Name} repairs`,
          rawId: brand.id || brand.Id,
        }));

        setBrands(formattedBrands);
      } catch (err) {
        console.error("Failed to fetch brands:", err);
        setBrands([]);
      } finally {
        setIsInitialized(true);
      }
    };

    if (!isInitialized) {
      fetchBrands();
    }
  }, [getBrands, isInitialized]);

  // 🔥 Loading state
  if (!isInitialized || loadingBrands) {
    return (
      <section className="bg-secondary py-10">
        <div className="max-w-[1300px] px-3 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <UncommonSkeletonCard key={index} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  // ❌ Error state
  if (error) {
    return (
      <section className="bg-secondary py-10">
        <div className="max-w-[1300px] px-3 mx-auto text-center text-red-500">
          Failed to load repair brands. Please try again.
        </div>
      </section>
    );
  }

  return (
    <section className="bg-secondary py-10">
      <div className="max-w-[1300px] px-3 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Mobile */}
          <div className="contents md:hidden">
            {brands.map((service) => (
              <div
                key={service.id}
                onClick={() =>
                  handleBrandClick(service.rawId, service.brand)
                }
              >
                <ServiceAccordion
                  {...service}
                  icon={
                    <img
                      src={service.icon}
                      alt={service.brand}
                      className="w-8 h-8"
                    />
                  }
                />
              </div>
            ))}
          </div>

          {/* Desktop */}
          <div className="hidden md:contents">
            {brands.map((service) => (
              <div
                key={service.id}
                onClick={() =>
                  handleBrandClick(service.rawId, service.brand)
                }
              >
                <ServiceCard
                  {...service}
                  icon={
                    <img
                      src={service.icon}
                      alt={service.brand}
                      className="w-8 h-8"
                    />
                  }
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RepairSection;