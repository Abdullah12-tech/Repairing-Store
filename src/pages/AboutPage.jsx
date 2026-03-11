const AboutRepairStore = () => {
  return (
    <section className="bg-[rgb(var(--secondary))] text-[rgb(var(--advanced))]">
      {/* ================= HERO ================= */}
      <div className="relative overflow-hidden min-h-[60vh] flex items-center justify-center">
        <img
          src="https://images.unsplash.com/photo-1581091215367-59ab6c1d0c45"
          alt="Repair team working on devices"
          className="absolute inset-0 h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[rgb(var(--secondary))]/80" />

        <div className="relative max-w-7xl mx-auto px-6 text-center z-10">
          <span className="inline-block mb-6 text-sm font-semibold tracking-wide uppercase text-[rgb(var(--tertiary))]">
            Phone Repair Done Properly
          </span>

          <h1 className="text-4xl md:text-6xl font-extrabold max-w-4xl mx-auto leading-tight tracking-tight">
            Your phone matters.  
            <span className="block text-[rgb(var(--tertiary))]">We fix it like it’s ours.</span>
          </h1>

          <p className="mt-8 text-xl text-[rgb(var(--advanced))]/80 max-w-3xl mx-auto leading-relaxed">
            Fast, honest repairs without guesswork, hidden costs, or careless work.
          </p>

          <div className="mt-10">
            <a
              href="/repairs"
              className="inline-block px-8 py-4 bg-[rgb(var(--primary))] text-secondary font-semibold rounded-full shadow-lg hover:bg-[rgb(var(--primary,0))] transition duration-300"
            >
              Book a Repair Now
            </a>
          </div>
        </div>
      </div>

      {/* ================= ABOUT ================= */}
      <div className="max-w-7xl mx-auto px-6 py-28">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-4xl font-bold mb-8 leading-tight">
              Built on honesty, not shortcuts
            </h2>

            <p className="text-[rgb(var(--advanced))]/80 leading-relaxed mb-6 text-lg">
              We started this repair store after seeing too many people get
              frustrated by unclear pricing, rushed fixes, and repairs that
              didn’t last.
            </p>

            <p className="text-[rgb(var(--advanced))]/80 leading-relaxed mb-6 text-lg">
              So we built something different. A place where you know exactly
              what’s wrong, what it will cost, and how long it will take before
              we touch your device.
            </p>

            <p className="text-[rgb(var(--advanced))]/80 leading-relaxed text-lg">
              No upselling. No pressure. Just skilled technicians fixing real
              problems with care and accountability.
            </p>
          </div>

          <div className="order-1 md:order-2 relative">
            <div className="absolute -top-8 -left-8 h-full w-full rounded-3xl bg-[rgb(var(--tertiary))]/10 shadow-md" />
            <img
              src="https://images.unsplash.com/photo-1593642634443-44adaa06623a"
              alt="Detailed view of repair process"
              className="relative rounded-3xl shadow-xl object-cover w-full h-full"
            />
          </div>
        </div>
      </div>

      {/* ================= TEAM ================= */}
      <div id="team" className="bg-[rgb(var(--advanced))]/5 py-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">The people behind the repairs</h2>
            <p className="mt-4 text-[rgb(var(--advanced))]/70 max-w-xl mx-auto text-lg">
              Skilled hands, sharp eyes, and people who actually care.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {[
              { name: "Alex Johnson", role: "Lead Technician", description: "Specializes in complex hardware repairs with over 10 years of experience." },
              { name: "Mariam Yusuf", role: "Repair Specialist", description: "Expert in software diagnostics and quick turnaround fixes." },
              { name: "Daniel Okoro", role: "Diagnostics Expert", description: "Focuses on precise problem identification and customer education." },
            ].map((member, i) => (
              <div
                key={i}
                className="group rounded-2xl border border-[rgb(var(--advanced))]/10 bg-white p-8 hover:shadow-2xl transition duration-300 transform hover:-translate-y-2"
              >
                <div className="h-40 w-40 rounded-full bg-[rgb(var(--secondary))] mx-auto mb-6 overflow-hidden">
                  {/* Placeholder for image; replace with actual profile photos for better UX */}
                  <img
                    src={`https://source.unsplash.com/random/160x160/?portrait&${i}`}
                    alt={`${member.name}'s profile`}
                    className="h-full w-full object-cover"
                  />
                </div>

                <h3 className="text-xl font-semibold text-center">
                  {member.name}
                </h3>

                <p className="text-sm text-[rgb(var(--tertiary))] text-center mt-1 font-medium">
                  {member.role}
                </p>

                <p className="text-sm text-[rgb(var(--advanced))]/70 text-center mt-4">
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ================= PROMISE ================= */}
      <div className="max-w-7xl mx-auto px-6 py-28">
        <div className="rounded-3xl bg-[rgb(var(--advanced))]/5 text-[rgb(var(--advanced))] p-12 md:p-20 shadow-lg">
          <h2 className="text-4xl font-bold mb-12 text-center">
            Our promise to every customer
          </h2>

          <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto">
            {[
              "Clear pricing before any repair begins",
              "Quality parts and careful workmanship",
              "Honest advice, even if repair isn’t worth it",
              "Respect for your time, data, and device",
              "Repairs we confidently stand behind",
            ].map((promise, i) => (
              <div
                key={i}
                className="flex items-start gap-4"
              >
                <span className="mt-1.5 h-4 w-4 rounded-full bg-[rgb(var(--tertiary))] shrink-0" />
                <p className="text-[rgb(var(--advanced))]/90 text-lg">{promise}</p>
              </div>
            ))}
          </div>

          <p className="mt-12 text-[rgb(var(--advanced))]/80 max-w-3xl mx-auto text-center text-lg">
            We don’t measure success by how many phones we fix, but by how many
            people trust us enough to come back and recommend us.
          </p>
        </div>
      </div>
    </section>
  )
}

export default AboutRepairStore