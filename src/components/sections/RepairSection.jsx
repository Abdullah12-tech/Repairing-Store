import ServiceCard from "../card/repairCard";
import ServiceAccordion from "../card/serviceAccordion";


const repairServices = [
  {
    id: 1,
    brand: "Apple",
    title: "iPhone Repair",
    icon: "https://cdn.simpleicons.org/apple/000000",
    description:
      "Screen cracked? Battery draining too fast? We repair all iPhone models with high-quality parts and quick turnaround.",
    linkText: "See all iPhone repairs",
  },
   {
    id: 2,
    brand: "Samsung",
    title: "Samsung Repair",
    icon: "https://cdn.simpleicons.org/samsung/1428A0",
    description:
      "We replace screens, batteries, cameras, and charging ports for Samsung phones. Fast service and safe data protection included.",
    linkText: "See all Samsung repairs",
  },
  {
    id: 3,
    brand: "Google",
    title: "Pixel Repair",
    icon: "https://cdn.simpleicons.org/google/4285F4",
    description:
      "Pixel screen repair, battery replacement, or speaker issues? We fix it all using high-quality parts and expert technicians.",
    linkText: "See all Pixel repairs",
  },
  {
    id: 4,
    brand: "Huawei",
    title: "Huawei Repair",
    icon: "https://cdn.simpleicons.org/huawei/FF0000",
    description:
      "Broken screen or charging problems? We provide fast Huawei repairs with premium parts and professional service.",
    linkText: "See all Huawei repairs",
  },
  {
    id: 5,
    brand: "OnePlus",
    title: "OnePlus Repair",
    icon: "https://cdn.simpleicons.org/oneplus/EB0028",
    description:
      "OnePlus screen cracked or battery issues? We repair OnePlus phones quickly and safely with top-quality replacement parts.",
    linkText: "See all OnePlus repairs",
  },
  {
    id: 6,
    brand: "Xiaomi",
    title: "Xiaomi Repair",
    icon: "https://cdn.simpleicons.org/xiaomi/FF6900",
    description:
      "Fast Xiaomi repairs for screen, battery, camera, or software issues. We use quality parts and provide professional support.",
    linkText: "See all Xiaomi repairs",
  }
];

const RepairSection = () => {
  return (
    <section className="bg-secondary py-2">
      <div className="max-w-[1300px] px-3 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {repairServices.map((service) => (
            <div key={service.id}>
              {/* Mobile accordion */}
              <div className="md:hidden">
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
            </div>
          ))}
          {repairServices.map((service) => (
            <div key={service.id}>
              {/* Desktop card */}
              <div className="">
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RepairSection;
