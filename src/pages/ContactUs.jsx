// ContactPage.jsx
import React, { useState } from "react";

const ContactPage = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // For demo, just set submitted to true
    setSubmitted(true);
    console.log("Form Data:", form);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[rgb(var(--advanced))] p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-[rgba(var(--primary),0.2)] backdrop-blur-md rounded-2xl p-8 flex flex-col gap-6 border border-[rgba(var(--tertiary),0.5)] shadow-lg"
      >
        <h2
          className="text-3xl font-bold text-[rgb(var(--secondary))] mb-4"
          style={{ textShadow: "0 0 8px rgb(var(--tertiary))" }}
        >
          Get in Touch
        </h2>

        {["name", "email", "message"].map((field) => (
          <div key={field} className="relative">
            <input
              type={field === "email" ? "email" : "text"}
              name={field}
              value={form[field]}
              onChange={handleChange}
              required
              className={`peer w-full bg-transparent border-b-2 border-[rgba(var(--secondary),0.3)] text-[rgb(var(--secondary))] focus:border-[rgb(var(--tertiary))] outline-none py-2 placeholder-transparent transition-all`}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            />
            <label
              className="absolute left-0 -top-3 text-[rgb(var(--tertiary))] text-sm peer-placeholder-shown:top-2 peer-placeholder-shown:text-[rgb(var(--secondary))] peer-placeholder-shown:text-base transition-all"
            >
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
          </div>
        ))}

        <button
          type="submit"
          className="mt-4 py-3 px-6 bg-[rgb(var(--primary))] text-[rgb(var(--secondary))] font-semibold rounded-xl shadow-lg hover:shadow-[0_0_25px_rgb(var(--tertiary))] hover:scale-105 transition-all"
        >
          {submitted ? "Sent!" : "Send Message"}
        </button>

        {submitted && (
          <p className="text-[rgb(var(--tertiary))] text-center mt-2 animate-pulse">
            Thank you! We'll get back to you soon.
          </p>
        )}
      </form>
    </div>
  );
};

export default ContactPage;