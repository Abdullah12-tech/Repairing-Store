const HeroSection = () => {
  return (
    <section
      className="relative max-w-[1300px] m-auto min-h-[75vh] flex items-center justify-center bg-primary"
    >
      {/* Gradient Overlay */}

      {/* Content */}
      <div className="relative z-10 max-w-5xl px-6 text-center flex flex-col items-center">
        <h1 className="text-4xl md:text-6xl font-bold text-secondary leading-tight">
          Fast & Reliable <span className="text-advanced">Phone Repairs</span>
        </h1>

        <p className="mt-6 text-lg md:text-xl text-secondary max-w-2xl">
          Screen replacement, battery issues, water damage and more — repaired by
          certified technicians you can trust.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 m-auto flex w-full flex-col sm:flex-row gap-4 sm:gap-0 sm:max-w-2xl">
          <a
            href="#"
            className="px-8 py-3 bg-secondary w-full sm:w-1/2 text-advanced text-lg font-semibold shadow-sm hover:shadow-lg hover:scale-100  transition-all duration-300"
          >
            Plan Your Repair
          </a>

          <a
            href="#"
            className="px-8 py-3 bg-tertiary w-full sm:w-1/2 text-advanced text-lg font-semibold shadow-sm hover:shadow-lg hover:scale-100 hover:bg-tertiary  transition-all duration-300"
          >
            Visit a Store
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
