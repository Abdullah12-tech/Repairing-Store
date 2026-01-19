const HeroSection = () => {
  return (
    <section
      className="relative w-full min-h-[80vh] flex items-center justify-center bg-center bg-hero bg-cover"
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70"></div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl px-6 text-center flex flex-col items-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
          Fast & Reliable <span className="text-primary">Phone Repairs</span>
        </h1>

        <p className="mt-6 text-lg md:text-xl text-gray-200 max-w-2xl">
          Screen replacement, battery issues, water damage and more — repaired by
          certified technicians you can trust.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <a
            href="#"
            className="px-8 py-4 rounded-lg bg-primary text-white text-lg font-semibold shadow-lg hover:bg-emerald-600 hover:scale-105 transition-all duration-300"
          >
            Plan Your Repair
          </a>

          <a
            href="#"
            className="px-8 py-4 rounded-lg bg-secondary text-white text-lg font-semibold shadow-lg hover:bg-yellow-600 hover:scale-105 transition-all duration-300"
          >
            Visit a Store
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
