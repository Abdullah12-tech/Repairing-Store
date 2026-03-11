// src/pages/AppointmentPage.jsx
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const AppointmentPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    navigate("/");
    return null;
  }

  const [step, setStep] = useState(0); // 0=Time, 1=Details, 2=Summary
  const [form, setForm] = useState({
    repairPriceId: state?.repairPriceId || "",
    appointmentDay: "",
    appointmentTime: "",
    customerFirstName: "",
    customerLastname: "",
    customerEmail: "",
    customerPhoneNumber: "",
    customerAddress: "",
    customerCity: "",
    customerState: "",
    comment: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const steps = [
    { id: "time", label: "Time" },
    { id: "details", label: "Details" },
    { id: "confirm", label: "Book" },
  ];

  const timeSlots = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
    "15:00", "15:30", "16:00", "16:30"
  ];

  useEffect(() => {
    const newErrors = {};
    
    if (touched.customerEmail && form.customerEmail) {
      const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.customerEmail);
      if (!emailValid) newErrors.customerEmail = "Valid email required";
    }
    
    if (touched.customerPhoneNumber && form.customerPhoneNumber) {
      const phoneValid = /^\d{7,15}$/.test(form.customerPhoneNumber?.replace(/\s/g, ''));
      if (!phoneValid) newErrors.customerPhoneNumber = "Valid phone required";
    }
    setErrors(prev => ({ ...prev, ...newErrors }));
  }, [form, touched]);

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const validateStep = (stepIndex) => {
    const newErrors = {};
    
    if (stepIndex === 0) {
      if (!form.appointmentDay) newErrors.appointmentDay = "Select a date";
      if (!form.appointmentTime) newErrors.appointmentTime = "Select a time";
    }
    
    if (stepIndex === 1) {
      if (!form.customerFirstName.trim()) newErrors.customerFirstName = "First name required";
      if (!form.customerLastname.trim()) newErrors.customerLastname = "Last name required";
      if (!form.customerEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.customerEmail)) {
        newErrors.customerEmail = "Valid email required";
      }
      if (!form.customerPhoneNumber || !/^\d{7,15}$/.test(form.customerPhoneNumber?.replace(/\s/g, ''))) {
        newErrors.customerPhoneNumber = "Valid phone required";
      }
      if (!form.customerAddress.trim()) newErrors.customerAddress = "Address required";
      if (!form.customerCity.trim()) newErrors.customerCity = "City required";
      if (!form.customerState.trim()) newErrors.customerState = "State required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1);
      setErrors({});
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
      setErrors({});
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const payload = {
      repairPriceId: form.repairPriceId,
      appointmentDay: new Date(`${form.appointmentDay}T${form.appointmentTime}`).toISOString(),
      appointmentTime: form.appointmentTime,
      customerFirstName: form.customerFirstName,
      customerLastname: form.customerLastname,
      customerEmail: form.customerEmail,
      customerPhoneNumber: form.customerPhoneNumber,
      customerAddress: form.customerAddress,
      customerCity: form.customerCity,
      customerState: form.customerState,
      comment: form.comment || "",
    };

    try {
      const url = `${import.meta.env.VITE_BASE_URL}/api/Appointments`;
      
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const responseData = await res.json();
      if (!res.ok) {
        let errorMessage = "Booking failed";
        if (responseData.errors) {
          const errors = Object.entries(responseData.errors)
            .map(([key, value]) => `${key}: ${Array.isArray(value) ? value.join(", ") : value}`)
            .join("; ");
          errorMessage = errors;
        } else if (responseData.title) {
          errorMessage = responseData.title;
        }
        throw new Error(errorMessage);
      }
      navigate("/appointment-success", { state: { email: form.customerEmail } });
    } catch (err) {
      setErrors({ submit: err.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        backgroundColor: 'rgb(var(--primary))',   // Navy background (kept)
        color: 'rgb(var(--secondary))'            // White text
      }}
    >
      {/* Ambient glow – refined opacity for elegance */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] rounded-full blur-[130px] opacity-25"
          style={{ backgroundColor: 'rgb(var(--tertiary))' }}   // Gold glow
        />
      </div>

      <div className="relative w-full max-w-[420px] z-10">
        
        {/* Service Summary - Compact & richer contrast */}
        <div
          className="mb-6 p-3 rounded-2xl border backdrop-blur-sm flex items-center justify-between"
          style={{
            backgroundColor: 'rgba(var(--secondary), 0.08)',   // Improved visibility
            borderColor: 'rgba(var(--secondary), 0.18)'
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-lg shadow-inner"
              style={{ 
                backgroundColor: 'rgba(var(--tertiary), 0.25)',  // Stronger gold accent
                color: 'rgb(var(--primary))'
              }}
            >
              🔧
            </div>
            <div>
              <h3 className="font-medium text-sm">{state?.name}</h3>
              <p className="text-xs opacity-50">${state?.cost} • {state?.dUration}</p>
            </div>
          </div>
        </div>

        {/* Progress Indicator – cleaner hierarchy */}
        <div className="flex items-center justify-center gap-1 mb-6">
          {steps.map((s, i) => (
            <div key={s.id} className="flex items-center">
              <div
                className="w-1.5 h-1.5 rounded-full transition-all duration-300"
                style={{
                  backgroundColor: i === step
                    ? 'rgb(var(--secondary))'           // Active = white
                    : i < step
                      ? 'rgb(var(--tertiary))'          // Completed = gold
                      : 'rgba(var(--secondary), 0.35)', // Future = softer white
                  transform: i === step ? 'scale(1.35)' : 'scale(1)'
                }}
              />
              {i < 2 && (
                <div
                  className="w-8 h-px mx-1 transition-all duration-300"
                  style={{
                    backgroundColor: i < step
                      ? 'rgb(var(--tertiary))'           // Gold line when done
                      : 'rgba(var(--secondary), 0.18)'   // Subtle future line
                  }}
                />
              )}
            </div>
          ))}
          <span className="ml-3 text-xs opacity-50 font-medium tracking-wider">
            {steps[step].label}
          </span>
        </div>

        {/* Error Message – kept red but softer for premium feel */}
        <AnimatePresence>
          {errors.submit && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-4 p-3 rounded-xl text-sm border"
              style={{
                backgroundColor: 'rgba(239, 68, 68, 0.12)',
                borderColor: 'rgba(239, 68, 68, 0.25)',
                color: '#fca5a5'
              }}
            >
              {errors.submit}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Card – improved glassmorphism with better depth */}
        <div
          className="rounded-3xl p-6 border backdrop-blur-md"
          style={{
            backgroundColor: 'rgba(var(--secondary), 0.07)',   // Richer card background
            borderColor: 'rgba(var(--secondary), 0.16)',
            minHeight: '520px'
          }}
        >
          <AnimatePresence mode="wait">
            
            {/* STEP 0: Time */}
            {step === 0 && (
              <motion.div
                key="time"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.25 }}
                className="h-full flex flex-col"
              >
                <h2 className="text-lg font-medium mb-6 opacity-90">When should we arrive?</h2>
                
                <div className="space-y-5 flex-1">
                  <div>
                    <label className="block text-xs opacity-50 mb-2 uppercase tracking-wider">Date</label>
                    <input
                      type="date"
                      value={form.appointmentDay}
                      onChange={(e) => setForm({ ...form, appointmentDay: e.target.value })}
                      min={new Date().toISOString().split("T")[0]}
                      className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all border"
                      style={{
                        backgroundColor: 'rgba(var(--secondary), 0.08)',
                        borderColor: errors.appointmentDay 
                          ? 'rgba(239, 68, 68, 0.5)' 
                          : 'rgba(var(--secondary), 0.2)',
                        color: 'rgb(var(--secondary))'
                      }}
                    />
                    {errors.appointmentDay && (
                      <span className="text-xs mt-1.5 block text-red-400">{errors.appointmentDay}</span>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs opacity-50 mb-3 uppercase tracking-wider">Time</label>
                    <div className="grid grid-cols-4 gap-2">
                      {timeSlots.map(time => (
                        <button
                          key={time}
                          onClick={() => setForm({ ...form, appointmentTime: time })}
                          className="py-3 rounded-xl text-xs font-medium transition-all border active:scale-95"
                          style={{
                            backgroundColor: form.appointmentTime === time
                              ? 'rgb(var(--tertiary))'                    // Gold selected
                              : 'rgba(var(--secondary), 0.08)',           // Subtle unselected
                            color: form.appointmentTime === time
                              ? 'rgb(var(--primary))'                     // Navy text on gold
                              : 'rgba(var(--secondary), 0.85)',
                            borderColor: form.appointmentTime === time
                              ? 'rgb(var(--tertiary))'
                              : 'rgba(var(--secondary), 0.2)',
                          }}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                    {errors.appointmentTime && (
                      <span className="text-xs mt-2 block text-red-400">{errors.appointmentTime}</span>
                    )}
                  </div>
                </div>

                <div className="mt-auto pt-6">
                  <button
                    onClick={handleNext}
                    className="w-full py-4 rounded-2xl font-semibold text-base transition-all active:scale-[0.98] hover:brightness-110"
                    style={{
                      backgroundColor: 'rgb(var(--tertiary))',   // Gold CTA
                      color: 'rgb(var(--primary))'               // Navy text
                    }}
                  >
                    Continue
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 1: Details */}
            {step === 1 && (
              <motion.div
                key="details"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.25 }}
                className="h-full flex flex-col space-y-4 max-h-[440px] pr-1"
              >
                <h2 className="text-lg font-medium mb-2 opacity-90">Your details</h2>
                
                {/* Contact Section */}
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <input
                        placeholder="First name"
                        value={form.customerFirstName}
                        onChange={(e) => setForm({ ...form, customerFirstName: e.target.value })}
                        onBlur={() => handleBlur('customerFirstName')}
                        className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all border placeholder:opacity-40"
                        style={{
                          backgroundColor: 'rgba(var(--secondary), 0.08)',
                          borderColor: errors.customerFirstName 
                            ? 'rgba(239, 68, 68, 0.5)' 
                            : 'rgba(var(--secondary), 0.2)',
                          color: 'rgb(var(--secondary))'
                        }}
                      />
                      {errors.customerFirstName && (
                        <span className="text-xs mt-1 block text-red-400">{errors.customerFirstName}</span>
                      )}
                    </div>
                    <div>
                      <input
                        placeholder="Last name"
                        value={form.customerLastname}
                        onChange={(e) => setForm({ ...form, customerLastname: e.target.value })}
                        onBlur={() => handleBlur('customerLastname')}
                        className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all border placeholder:opacity-40"
                        style={{
                          backgroundColor: 'rgba(var(--secondary), 0.08)',
                          borderColor: errors.customerLastname 
                            ? 'rgba(239, 68, 68, 0.5)' 
                            : 'rgba(var(--secondary), 0.2)',
                          color: 'rgb(var(--secondary))'
                        }}
                      />
                      {errors.customerLastname && (
                        <span className="text-xs mt-1 block text-red-400">{errors.customerLastname}</span>
                      )}
                    </div>
                  </div>

                  <input
                    type="email"
                    placeholder="Email address"
                    value={form.customerEmail}
                    onChange={(e) => setForm({ ...form, customerEmail: e.target.value })}
                    onBlur={() => handleBlur('customerEmail')}
                    className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all border placeholder:opacity-40"
                    style={{
                      backgroundColor: 'rgba(var(--secondary), 0.08)',
                      borderColor: errors.customerEmail 
                        ? 'rgba(239, 68, 68, 0.5)' 
                        : 'rgba(var(--secondary), 0.2)',
                      color: 'rgb(var(--secondary))'
                    }}
                  />
                  {errors.customerEmail && (
                    <span className="text-xs mt-1 block text-red-400">{errors.customerEmail}</span>
                  )}

                  <input
                    type="tel"
                    placeholder="Phone number"
                    value={form.customerPhoneNumber}
                    onChange={(e) => setForm({ ...form, customerPhoneNumber: e.target.value })}
                    onBlur={() => handleBlur('customerPhoneNumber')}
                    className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all border placeholder:opacity-40"
                    style={{
                      backgroundColor: 'rgba(var(--secondary), 0.08)',
                      borderColor: errors.customerPhoneNumber 
                        ? 'rgba(239, 68, 68, 0.5)' 
                        : 'rgba(var(--secondary), 0.2)',
                      color: 'rgb(var(--secondary))'
                    }}
                  />
                  {errors.customerPhoneNumber && (
                    <span className="text-xs mt-1 block text-red-400">{errors.customerPhoneNumber}</span>
                  )}
                </div>

                {/* Location Section */}
                <div className="space-y-3 pt-2">
                  <label className="block text-xs opacity-50 uppercase tracking-wider">Service Location</label>
                  
                  <input
                    placeholder="Street address"
                    value={form.customerAddress}
                    onChange={(e) => setForm({ ...form, customerAddress: e.target.value })}
                    className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all border placeholder:opacity-40"
                    style={{
                      backgroundColor: 'rgba(var(--secondary), 0.08)',
                      borderColor: errors.customerAddress 
                        ? 'rgba(239, 68, 68, 0.5)' 
                        : 'rgba(var(--secondary), 0.2)',
                      color: 'rgb(var(--secondary))'
                    }}
                  />
                  {errors.customerAddress && (
                    <span className="text-xs mt-1 block text-red-400">{errors.customerAddress}</span>
                  )}

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <input
                        placeholder="City"
                        value={form.customerCity}
                        onChange={(e) => setForm({ ...form, customerCity: e.target.value })}
                        className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all border placeholder:opacity-40"
                        style={{
                          backgroundColor: 'rgba(var(--secondary), 0.08)',
                          borderColor: errors.customerCity 
                            ? 'rgba(239, 68, 68, 0.5)' 
                            : 'rgba(var(--secondary), 0.2)',
                          color: 'rgb(var(--secondary))'
                        }}
                      />
                      {errors.customerCity && (
                        <span className="text-xs mt-1 block text-red-400">{errors.customerCity}</span>
                      )}
                    </div>
                    <div>
                      <input
                        placeholder="State"
                        value={form.customerState}
                        onChange={(e) => setForm({ ...form, customerState: e.target.value })}
                        className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all border placeholder:opacity-40"
                        style={{
                          backgroundColor: 'rgba(var(--secondary), 0.08)',
                          borderColor: errors.customerState 
                            ? 'rgba(239, 68, 68, 0.5)' 
                            : 'rgba(var(--secondary), 0.2)',
                          color: 'rgb(var(--secondary))'
                        }}
                      />
                      {errors.customerState && (
                        <span className="text-xs mt-1 block text-red-400">{errors.customerState}</span>
                      )}
                    </div>
                  </div>

                  <textarea
                    placeholder="Notes (optional)"
                    value={form.comment}
                    onChange={(e) => setForm({ ...form, comment: e.target.value })}
                    rows={2}
                    className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all border placeholder:opacity-40 resize-none"
                    style={{
                      backgroundColor: 'rgba(var(--secondary), 0.08)',
                      borderColor: 'rgba(var(--secondary), 0.2)',
                      color: 'rgb(var(--secondary))'
                    }}
                  />
                </div>

                <div className="mt-auto pt-4 flex gap-3">
                  <button
                    onClick={handleBack}
                    className="px-6 py-4 rounded-2xl text-sm font-medium transition-all hover:brightness-110"
                    style={{
                      backgroundColor: 'rgba(var(--secondary), 0.15)',   // Better contrast back button
                      color: 'rgb(var(--secondary))'
                    }}
                  >
                    Back
                  </button>
                  <button
                    onClick={handleNext}
                    className="flex-1 py-4 rounded-2xl font-semibold text-base transition-all active:scale-[0.98] hover:brightness-110"
                    style={{
                      backgroundColor: 'rgb(var(--tertiary))',
                      color: 'rgb(var(--primary))'
                    }}
                  >
                    Review
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 2: Summary & Book */}
            {step === 2 && (
              <motion.div
                key="confirm"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.25 }}
                className="h-full flex flex-col"
              >
                <h2 className="text-lg font-medium mb-6 opacity-90">Review & confirm</h2>
                
                <div className="space-y-4 flex-1">
                  {/* Summary Card */}
                  <div
                    className="p-4 rounded-2xl space-y-3 text-sm"
                    style={{ 
                      backgroundColor: 'rgba(var(--secondary), 0.08)', 
                      border: '1px solid rgba(var(--secondary), 0.12)'
                    }}
                  >
                    <div className="flex justify-between items-center py-1">
                      <span className="opacity-50">Service</span>
                      <span className="font-medium text-right max-w-[60%]">{state?.name}</span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="opacity-50">When</span>
                      <span className="font-medium">
                        {formatDate(form.appointmentDay)} at {form.appointmentTime}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="opacity-50">Customer</span>
                      <span className="font-medium">
                        {form.customerFirstName} {form.customerLastname}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="opacity-50">Contact</span>
                      <span className="font-medium text-right max-w-[50%] text-xs">{form.customerEmail}</span>
                    </div>
                    <div className="flex justify-between items-start py-1">
                      <span className="opacity-50">Location</span>
                      <span className="font-medium text-right max-w-[60%] text-xs leading-relaxed">
                        {form.customerAddress}, {form.customerCity}, {form.customerState}
                      </span>
                    </div>
                    {form.comment && (
                      <div className="flex justify-between items-start py-1">
                        <span className="opacity-50">Notes</span>
                        <span className="font-medium text-right max-w-[60%] text-xs leading-relaxed">
                          {form.comment}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Total – premium highlight */}
                  <div
                    className="p-4 rounded-2xl flex justify-between items-center"
                    style={{
                      backgroundColor: 'rgba(var(--tertiary), 0.12)',
                      border: '1px solid rgba(var(--tertiary), 0.3)'
                    }}
                  >
                    <span className="text-sm opacity-70">Total amount</span>
                    <span className="text-3xl font-bold" style={{ color: 'rgb(var(--tertiary))' }}>
                      ${state?.cost}
                    </span>
                  </div>

                  {/* Trust badges */}
                  <div className="flex items-center justify-center gap-4 text-[10px] opacity-40 pt-2">
                    <span className="flex items-center gap-1">✓ Certified parts</span>
                    <span className="flex items-center gap-1">✓ 90-day warranty</span>
                  </div>
                </div>

                <div className="mt-auto pt-6 flex gap-3">
                  <button
                    onClick={handleBack}
                    className="px-6 py-4 rounded-2xl text-sm font-medium transition-all hover:brightness-110"
                    style={{
                      backgroundColor: 'rgba(var(--secondary), 0.15)',
                      color: 'rgb(var(--secondary))'
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="flex-1 py-4 rounded-2xl font-semibold text-base transition-all active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-2 hover:brightness-110"
                    style={{
                      backgroundColor: 'rgb(var(--tertiary))',
                      color: 'rgb(var(--primary))'
                    }}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Processing...
                      </>
                    ) : (
                      "Confirm booking"
                    )}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom trust text */}
        <div className="mt-6 text-center text-[10px] opacity-35 uppercase tracking-wider">
          Secure SSL encrypted payment
        </div>
      </div>
    </div>
  );
};

export default AppointmentPage;