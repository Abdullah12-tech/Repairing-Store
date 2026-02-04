const AboutRepairStore = () => {
  return (
    <section className="bg-slate-50 text-slate-900">
      {/* ================= HERO ================= */}
      <div className="relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1581091215367-59ab6c1d0c45"
          alt="Repair team"
          className="absolute inset-0 h-full w-full object-cover opacity-20"
        />

        <div className="relative max-w-7xl mx-auto px-6 py-28 text-center">
          <span className="inline-block mb-4 text-sm font-semibold tracking-wide text-red-600">
            Phone Repair Done Properly
          </span>

          <h1 className="text-4xl md:text-5xl font-extrabold max-w-3xl mx-auto leading-tight">
            Your phone matters.  
            <span className="block text-red-600">We fix it like it’s ours.</span>
          </h1>

          <p className="mt-6 text-lg text-slate-700 max-w-2xl mx-auto">
            Fast, honest repairs without guesswork, hidden costs, or careless work.
          </p>
        </div>
      </div>

      {/* ================= ABOUT ================= */}
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid md:grid-cols-2 gap-14 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">
              Built on honesty, not shortcuts
            </h2>

            <p className="text-slate-700 leading-relaxed mb-4">
              We started this repair store after seeing too many people get
              frustrated by unclear pricing, rushed fixes, and repairs that
              didn’t last.
            </p>

            <p className="text-slate-700 leading-relaxed mb-4">
              So we built something different. A place where you know exactly
              what’s wrong, what it will cost, and how long it will take before
              we touch your device.
            </p>

            <p className="text-slate-700 leading-relaxed">
              No upselling. No pressure. Just skilled technicians fixing real
              problems with care and accountability.
            </p>
          </div>

          <div className="relative">
            <div className="absolute -top-6 -left-6 h-full w-full rounded-3xl bg-red-100" />
            <img
              src="https://images.unsplash.com/photo-1593642634443-44adaa06623a"
              alt="Repair process"
              className="relative rounded-3xl shadow-lg"
            />
          </div>
        </div>
      </div>

      {/* ================= TEAM ================= */}
      <div className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold">The people behind the repairs</h2>
            <p className="mt-4 text-slate-600 max-w-xl mx-auto">
              Skilled hands, sharp eyes, and people who actually care.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              { name: "Alex Johnson", role: "Lead Technician" },
              { name: "Mariam Yusuf", role: "Repair Specialist" },
              { name: "Daniel Okoro", role: "Diagnostics Expert" },
            ].map((member, i) => (
              <div
                key={i}
                className="group rounded-2xl border bg-slate-50 p-6 hover:bg-white hover:shadow-lg transition"
              >
                <div className="h-32 w-32 rounded-full bg-slate-200 mx-auto mb-6" />

                <h3 className="text-lg font-semibold text-center">
                  {member.name}
                </h3>

                <p className="text-sm text-slate-600 text-center mt-1">
                  {member.role}
                </p>

                <p className="text-sm text-slate-600 text-center mt-4">
                  Focused on precision repairs and clear communication.
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ================= PROMISE ================= */}
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="rounded-3xl bg-slate-900 text-white p-12 md:p-16">
          <h2 className="text-3xl font-bold mb-10">
            Our promise to every customer
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
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
                <span className="mt-1 h-3 w-3 rounded-full bg-red-500 shrink-0" />
                <p className="text-slate-200">{promise}</p>
              </div>
            ))}
          </div>

          <p className="mt-10 text-slate-300 max-w-2xl">
            We don’t measure success by how many phones we fix, but by how many
            people trust us enough to come back and recommend us.
          </p>
        </div>
      </div>
    </section>
  )
}

export default AboutRepairStore
