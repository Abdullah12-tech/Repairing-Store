const ServiceCard = ({ icon, title, description, linkText }) => {
  return (
    <div className="bg-secondary border border-sm shadow-md p-6">
      <div className="flex items-center gap-3 mb-3">
        <div>{icon}</div>
        <h3 className="text-lg font-semibold text-advanced">
          {title}
        </h3>
      </div>

      <p className="text-advanced text-sm leading-relaxed">
        {description}
      </p>

      <a
        href="#"
        className="mt-4 inline-flex text-sm font-semibold text-primary hover:underline"
      >
        {linkText} ›
      </a>
    </div>
  );
};

export default ServiceCard;
