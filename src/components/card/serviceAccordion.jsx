import Accordion from "../ui/accordion";

const ServiceAccordion = ({ icon, title, description, linkText }) => {
  return (
    <Accordion
      header={
        <div className="flex items-center gap-3">
          <div>{icon}</div>
          <h3 className="text-lg font-semibold text-advanced">
            {title}
          </h3>
        </div>
      }
    >
    </Accordion>
  );
};

export default ServiceAccordion;
