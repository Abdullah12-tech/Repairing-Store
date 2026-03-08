const HeroSection = () => {
  return (
    <section className="relative max-w-[1150px] mx-auto px-5 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24 min-h-[70vh] flex items-center justify-center bg-primary">

      <div className="relative z-10 max-w-3xl text-center flex flex-col items-center">

        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-secondary leading-[1.2]">
          Fast & Reliable{" "}
          <span className="text-tertiary">Phone Repairs</span>
        </h1>

        {/* Description */}
        <p className="mt-5 sm:mt-6 text-base sm:text-lg md:text-xl text-secondary max-w-xl leading-relaxed">
          Screen replacement, battery issues, water damage and more repaired by
          certified technicians you can trust.
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 sm:mt-10 w-full flex flex-col sm:flex-row gap-3 sm:gap-4 sm:max-w-md">

          <a
            href="#"
            className="w-full sm:w-1/2 px-6 py-3 sm:py-3.5 bg-secondary text-advanced text-base sm:text-lg font-semibold rounded-md shadow-sm hover:shadow-lg transition"
          >
            Plan Your Repair
          </a>

          <a
            href="#"
            className="w-full sm:w-1/2 px-6 py-3 sm:py-3.5 bg-tertiary text-advanced text-base sm:text-lg font-semibold rounded-md shadow-sm hover:shadow-lg transition"
          >
            Visit a Store
          </a>

        </div>

      </div>
    </section>
  );
};

export default HeroSection;