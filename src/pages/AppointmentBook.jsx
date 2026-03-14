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

  const [step, setStep] = useState(0);
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

  const timeSlots = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
    "15:00", "15:30", "16:00", "16:30"
  ];

  // Real-time validation
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
      if (!form.customerFirstName.trim()) newErrors.customerFirstName = "First name required";
      if (!form.customerLastname.trim()) newErrors.customerLastname = "Last name required";
      if (!form.customerEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.customerEmail)) {
        newErrors.customerEmail = "Valid email required";
      }
      if (!form.customerPhoneNumber || !/^\d{7,15}$/.test(form.customerPhoneNumber?.replace(/\s/g, ''))) {
        newErrors.customerPhoneNumber = "Valid phone required";
      }
    }
    
    if (stepIndex === 1) {
      if (!form.customerAddress.trim()) newErrors.customerAddress = "Address required";
      if (!form.customerCity.trim()) newErrors.customerCity = "City required";
      if (!form.customerState.trim()) newErrors.customerState = "State required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    setStep(0);
    setErrors({});
  };

  const handleSubmit = async () => {
    if (!validateStep(1)) return;
    
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
        backgroundColor: 'rgb(var(--primary))',
        color: 'rgb(var(--secondary))'
      }}
    >
      {/* Ambient glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[120px] opacity-20"
          style={{ backgroundColor: 'rgb(var(--tertiary))' }}
        />
      </div>

      <div className="relative w-full max-w-[420px] z-10">
        
        {/* Header Section Indicator */}
        <div className="mb-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div 
              className="h-1 rounded-full transition-all duration-500"
              style={{ 
                width: step === 0 ? '24px' : '12px',
                backgroundColor: step === 0 ? 'rgb(var(--tertiary))' : 'rgba(var(--secondary), 0.2)'
              }}
            />
            <div 
              className="h-1 rounded-full transition-all duration-500"
              style={{ 
                width: step === 1 ? '24px' : '12px',
                backgroundColor: step === 1 ? 'rgb(var(--tertiary))' : 'rgba(var(--secondary), 0.2)'
              }}
            />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight mb-1">
            {step === 0 ? "Schedule & Contact" : "Location & Confirm"}
          </h1>
          <p className="text-sm opacity-50">
            {step === 0 ? "Step 1 of 2" : "Step 2 of 2"}
          </p>
        </div>

        {/* Service Summary Card - Persistent */}
        <div 
          className="mb-4 p-4 rounded-2xl border backdrop-blur-sm"
          style={{ 
            backgroundColor: 'rgba(var(--secondary), 0.05)',
            borderColor: 'rgba(var(--secondary), 0.1)'
          }}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <p className="text-xs opacity-50 mb-1 uppercase tracking-wider">Service</p>
              <h3 className="font-medium truncate">{state?.name}</h3>
              <p className="text-xs opacity-40 mt-0.5">{state?.dUration} • Same-day</p>
            </div>
            <div className="text-right">
              <p className="text-xs opacity-50 mb-1 uppercase tracking-wider">Price</p>
              <p className="text-xl font-bold" style={{ color: 'rgb(var(--tertiary))' }}>
                NGN{state?.cost}
              </p>
            </div>
          </div>
        </div>

        {/* Error Message */}
        <AnimatePresence>
          {errors.submit && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-4 p-3 rounded-xl text-sm border"
              style={{ 
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                borderColor: 'rgba(239, 68, 68, 0.2)',
                color: '#fca5a5'
              }}
            >
              {errors.submit}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Card */}
        <div 
          className="rounded-3xl p-6 border backdrop-blur-md"
          style={{ 
            backgroundColor: 'rgba(var(--secondary), 0.03)',
            borderColor: 'rgba(var(--secondary), 0.08)',
            minHeight: '480px'
          }}
        >
          <AnimatePresence mode="wait">
            
            {/* STEP 1: Schedule & Contact */}
            {step === 0 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-5"
              >
                {/* Date Section */}
                <div>
                  <label className="block text-xs opacity-50 mb-2 uppercase tracking-wider">Date</label>
                  <input
                    type="date"
                    value={form.appointmentDay}
                    onChange={(e) => setForm({ ...form, appointmentDay: e.target.value })}
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all border"
                    style={{ 
                      backgroundColor: 'rgba(var(--secondary), 0.05)',
                      borderColor: errors.appointmentDay ? 'rgba(239, 68, 68, 0.5)' : 'rgba(var(--secondary), 0.1)',
                      color: 'rgb(var(--secondary))'
                    }}
                  />
                  {errors.appointmentDay && (
                    <span className="text-xs mt-1.5 block text-red-400">{errors.appointmentDay}</span>
                  )}
                </div>

                {/* Time Grid */}
                <div>
                  <label className="block text-xs opacity-50 mb-2 uppercase tracking-wider">Time</label>
                  <div className="grid grid-cols-4 gap-2">
                    {timeSlots.map(time => (
                      <button
                        key={time}
                        onClick={() => setForm({ ...form, appointmentTime: time })}
                        className="py-2.5 rounded-xl text-xs font-medium transition-all border"
                        style={{
                          backgroundColor: form.appointmentTime === time ? 'rgb(var(--secondary))' : 'rgba(var(--secondary), 0.05)',
                          color: form.appointmentTime === time ? 'rgb(var(--primary))' : 'rgba(var(--secondary), 0.7)',
                          borderColor: form.appointmentTime === time ? 'rgb(var(--secondary))' : 'rgba(var(--secondary), 0.1)',
                          transform: form.appointmentTime === time ? 'scale(1.02)' : 'scale(1)'
                        }}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                  {errors.appointmentTime && (
                    <span className="text-xs mt-1.5 block text-red-400">{errors.appointmentTime}</span>
                  )}
                </div>

                {/* Contact Info */}
                <div className="space-y-3 pt-2">
                  <label className="block text-xs opacity-50 uppercase tracking-wider">Your Details</label>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <input
                        placeholder="First name"
                        value={form.customerFirstName}
                        onChange={(e) => setForm({ ...form, customerFirstName: e.target.value })}
                        onBlur={() => handleBlur('customerFirstName')}
                        className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all border placeholder:opacity-30"
                        style={{ 
                          backgroundColor: 'rgba(var(--secondary), 0.05)',
                          borderColor: errors.customerFirstName ? 'rgba(239, 68, 68, 0.5)' : 'rgba(var(--secondary), 0.1)',
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
                        className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all border placeholder:opacity-30"
                        style={{ 
                          backgroundColor: 'rgba(var(--secondary), 0.05)',
                          borderColor: errors.customerLastname ? 'rgba(239, 68, 68, 0.5)' : 'rgba(var(--secondary), 0.1)',
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
                    className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all border placeholder:opacity-30"
                    style={{ 
                      backgroundColor: 'rgba(var(--secondary), 0.05)',
                      borderColor: errors.customerEmail ? 'rgba(239, 68, 68, 0.5)' : 'rgba(var(--secondary), 0.1)',
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
                    className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all border placeholder:opacity-30"
                    style={{ 
                      backgroundColor: 'rgba(var(--secondary), 0.05)',
                      borderColor: errors.customerPhoneNumber ? 'rgba(239, 68, 68, 0.5)' : 'rgba(var(--secondary), 0.1)',
                      color: 'rgb(var(--secondary))'
                    }}
                  />
                  {errors.customerPhoneNumber && (
                    <span className="text-xs mt-1 block text-red-400">{errors.customerPhoneNumber}</span>
                  )}
                </div>

                {/* Continue Button */}
                <div className="pt-4">
                  <button
                    onClick={handleNext}
                    className="w-full py-4 rounded-2xl font-semibold text-base transition-all active:scale-[0.98] hover:opacity-90"
                    style={{ 
                      backgroundColor: 'rgb(var(--tertiary))',
                      color: 'rgb(var(--primary))'
                    }}
                  >
                    Continue
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 2: Location & Confirm */}
            {step === 1 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-5"
              >
                {/* Location Inputs */}
                <div className="space-y-3">
                  <label className="block text-xs opacity-50 uppercase tracking-wider">Service Location</label>
                  
                  <input
                    placeholder="Street address"
                    value={form.customerAddress}
                    onChange={(e) => setForm({ ...form, customerAddress: e.target.value })}
                    className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all border placeholder:opacity-30"
                    style={{ 
                      backgroundColor: 'rgba(var(--secondary), 0.05)',
                      borderColor: errors.customerAddress ? 'rgba(239, 68, 68, 0.5)' : 'rgba(var(--secondary), 0.1)',
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
                        className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all border placeholder:opacity-30"
                        style={{ 
                          backgroundColor: 'rgba(var(--secondary), 0.05)',
                          borderColor: errors.customerCity ? 'rgba(239, 68, 68, 0.5)' : 'rgba(var(--secondary), 0.1)',
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
                        className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all border placeholder:opacity-30"
                        style={{ 
                          backgroundColor: 'rgba(var(--secondary), 0.05)',
                          borderColor: errors.customerState ? 'rgba(239, 68, 68, 0.5)' : 'rgba(var(--secondary), 0.1)',
                          color: 'rgb(var(--secondary))'
                        }}
                      />
                      {errors.customerState && (
                        <span className="text-xs mt-1 block text-red-400">{errors.customerState}</span>
                      )}
                    </div>
                  </div>

                  <textarea
                    placeholder="Additional notes (optional)"
                    value={form.comment}
                    onChange={(e) => setForm({ ...form, comment: e.target.value })}
                    rows={2}
                    className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all border placeholder:opacity-30 resize-none"
                    style={{ 
                      backgroundColor: 'rgba(var(--secondary), 0.05)',
                      borderColor: 'rgba(var(--secondary), 0.1)',
                      color: 'rgb(var(--secondary))'
                    }}
                  />
                </div>

                {/* Booking Summary */}
                <div 
                  className="p-4 rounded-2xl space-y-2.5 text-sm"
                  style={{ backgroundColor: 'rgba(var(--secondary), 0.05)' }}
                >
                  <div className="flex justify-between items-center">
                    <span className="opacity-50">When</span>
                    <span className="font-medium">
                      {formatDate(form.appointmentDay)} at {form.appointmentTime}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="opacity-50">Who</span>
                    <span className="font-medium truncate max-w-[60%]">
                      {form.customerFirstName} {form.customerLastname}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="opacity-50">Contact</span>
                    <span className="font-medium truncate max-w-[60%]">{form.customerEmail}</span>
                  </div>
                  <div 
                    className="h-px my-2"
                    style={{ backgroundColor: 'rgba(var(--secondary), 0.1)' }}
                  />
                  <div className="flex justify-between items-baseline">
                    <span className="opacity-50">Total</span>
                    <span className="text-2xl font-bold" style={{ color: 'rgb(var(--tertiary))' }}>
                      NGN{state?.cost}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={handleBack}
                    className="px-6 py-4 rounded-2xl text-sm font-medium transition-all opacity-50 hover:opacity-100"
                    style={{ 
                      backgroundColor: 'rgba(var(--secondary), 0.1)',
                      color: 'rgb(var(--secondary))'
                    }}
                  >
                    Back
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="flex-1 py-4 rounded-2xl font-semibold text-base transition-all active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-2"
                    style={{ 
                      backgroundColor: 'rgb(var(--tertiary))',
                      color: 'rgb(var(--primary))'
                    }}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                          <circle 
                            className="opacity-25" 
                            cx="12" cy="12" r="10" 
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
                        Processing...
                      </>
                    ) : (
                      "Confirm Booking"
                    )}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Trust indicators */}
        <div className="mt-6 flex items-center justify-center gap-4 text-[10px] opacity-30 uppercase tracking-wider">
          <span>Secure</span>
          <span>•</span>
          <span>Encrypted</span>
          <span>•</span>
          <span>90-Day Warranty</span>
        </div>
      </div>
    </div>
  );
};

export default AppointmentPage;