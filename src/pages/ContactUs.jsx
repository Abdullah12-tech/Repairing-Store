// ContactPage.jsx
import React, { useState } from "react";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    preferredContact: "email",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);

    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const contactInfo = [
    {
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      ),
      label: "Phone",
      value: "470-601-1911",
      href: "tel:470-601-1911",
    },
    {
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      ),
      label: "Email",
      value: "hello@studio.com",
      href: "mailto:hello@studio.com",
    },
    {
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      ),
      label: "Address",
      value: "654 Sycamore Avenue, Meadowville, WA 76543",
      href: "#",
    },
  ];

  return (
    <section className="min-h-screen bg-[rgb(var(--secondary))] py-10 sm:py-12 px-2 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto overflow-x-hidden">
        <div
          className="
            grid grid-cols-1 lg:grid-cols-2 
            gap-6 lg:gap-0 
            rounded-3xl overflow-hidden 
            shadow-2xl 
            bg-[rgba(var(--primary),0.5)] 
            border-none
          "
        >
          {/* Left Side - Contact Info */}
          <div className="relative bg-primary p-5 sm:p-8 lg:p-12 flex flex-col gap-5 min-h-[480px] lg:min-h-auto">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0 pointer-events-none">
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80"
                alt="Office"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-[rgb(var(--primary))] opacity-90" />
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col flex-grow">
              <div className="inline-flex items-center gap-2 mb-5 sm:mb-6">
                <div className="w-8 h-px bg-[rgb(var(--tertiary))]" />
                <span className="text-[rgb(var(--tertiary))] text-xs sm:text-sm font-medium tracking-widest uppercase">
                  Get in Touch
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[rgb(var(--secondary))] leading-tight mb-4">
                Let's Start a<br />
                <span className="text-[rgb(var(--tertiary))]">Conversation</span>
              </h1>

              <p className="text-[rgb(var(--secondary))] opacity-70 text-base sm:text-lg max-w-md leading-relaxed mt-auto lg:mt-0">
                Have a project in mind? We'd love to hear about it. Send us a message and we'll respond as soon as possible.
              </p>

              {/* Contact Cards */}
              <div className="space-y-4 mt-8">
                {contactInfo.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    className="
                      group flex items-center gap-4 p-4 rounded-xl 
                      bg-[rgba(var(--secondary),0.1)] backdrop-blur-sm 
                      border border-[rgba(var(--secondary),0.3)] 
                      hover:bg-[rgba(var(--tertiary),0.15)] 
                      hover:border-[rgb(var(--tertiary))] 
                      transition-all duration-300
                    "
                  >
                    <div className="text-[rgb(var(--tertiary))] group-hover:scale-110 transition-transform duration-300 shrink-0">
                      {item.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[rgb(var(--tertiary))] text-xs font-medium uppercase tracking-wider mb-1">
                        {item.label}
                      </div>
                      <div className="text-[rgb(var(--secondary))] text-sm sm:text-base font-medium truncate">
                        {item.value}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="p-5 sm:p-8 lg:p-12 bg-[rgb(var(--primary))] backdrop-blur-sm">
            <div className="max-w-lg mx-auto w-full">
              <div className="mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-[rgb(var(--secondary))] mb-2">
                  Send a Message
                </h2>
                <p className="text-[rgb(var(--secondary))] opacity-60 text-sm sm:text-base">
                  Fill out the form below and we'll get back to you within 24 hours.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label className="block text-[rgb(var(--tertiary))] text-xs font-medium uppercase tracking-wider mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="
                      w-full px-4 py-3 
                      bg-[rgba(var(--secondary),0.05)] 
                      border border-[rgba(var(--secondary),0.25)] 
                      rounded-lg text-[rgb(var(--secondary))] 
                      placeholder:text-[rgba(var(--secondary),0.4)] 
                      focus:outline-none focus:border-[rgb(var(--tertiary))] 
                      focus:ring-1 focus:ring-[rgb(var(--tertiary))] 
                      transition-all duration-300
                    "
                    placeholder="John Doe"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-[rgb(var(--tertiary))] text-xs font-medium uppercase tracking-wider mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="
                      w-full px-4 py-3 
                      bg-[rgba(var(--secondary),0.05)] 
                      border border-[rgba(var(--secondary),0.25)] 
                      rounded-lg text-[rgb(var(--secondary))] 
                      placeholder:text-[rgba(var(--secondary),0.4)] 
                      focus:outline-none focus:border-[rgb(var(--tertiary))] 
                      focus:ring-1 focus:ring-[rgb(var(--tertiary))] 
                      transition-all duration-300
                    "
                    placeholder="john@example.com"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-[rgb(var(--tertiary))] text-xs font-medium uppercase tracking-wider mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="
                      w-full px-4 py-3 
                      bg-[rgba(var(--secondary),0.05)] 
                      border border-[rgba(var(--secondary),0.25)] 
                      rounded-lg text-[rgb(var(--secondary))] 
                      placeholder:text-[rgba(var(--secondary),0.4)] 
                      focus:outline-none focus:border-[rgb(var(--tertiary))] 
                      focus:ring-1 focus:ring-[rgb(var(--tertiary))] 
                      transition-all duration-300
                    "
                    placeholder="+1 (555) 000-0000"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-[rgb(var(--tertiary))] text-xs font-medium uppercase tracking-wider mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="
                      w-full px-4 py-3 
                      bg-[rgba(var(--secondary),0.05)] 
                      border border-[rgba(var(--secondary),0.25)] 
                      rounded-lg text-[rgb(var(--secondary))] 
                      placeholder:text-[rgba(var(--secondary),0.4)] 
                      focus:outline-none focus:border-[rgb(var(--tertiary))] 
                      focus:ring-1 focus:ring-[rgb(var(--tertiary))] 
                      transition-all duration-300 resize-none
                    "
                    placeholder="Tell us about your project..."
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting || isSubmitted}
                  className="
                    relative w-full py-4 px-6 
                    bg-[rgb(var(--tertiary))] text-[rgb(var(--primary))] 
                    font-semibold rounded-lg overflow-hidden 
                    transition-all duration-500 
                    hover:shadow-[0_0_30px_rgba(var(--tertiary),0.4)] 
                    hover:scale-[1.02] 
                    disabled:cursor-not-allowed disabled:opacity-60
                  "
                >
                  <span
                    className={`flex items-center justify-center gap-2 transition-all duration-500 ${
                      isSubmitting || isSubmitted ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
                    }`}
                  >
                    Send Message
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>

                  {isSubmitting && (
                    <span className="absolute inset-0 flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Sending...
                    </span>
                  )}

                  {isSubmitted && (
                    <span className="absolute inset-0 flex items-center justify-center gap-2 text-green-400">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Sent!
                    </span>
                  )}
                </button>

                {/* Trust badges */}
                <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-xs opacity-50">
                  <div className="flex items-center gap-2 text-[rgb(var(--secondary))]">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                    <span>256-bit SSL</span>
                  </div>
                  <div className="flex items-center gap-2 text-[rgb(var(--secondary))]">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                    <span>Privacy Protected</span>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;