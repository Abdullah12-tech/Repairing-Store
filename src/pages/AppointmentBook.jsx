// src/pages/AppointmentPage.jsx
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useRepair } from "../context/PhonesContext";
import { motion, AnimatePresence } from "framer-motion";

const AppointmentPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    navigate("/");
    return null;
  }

  console.log(state);
  
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
  const [shake, setShake] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const steps = [
    { id: "service", label: "Service" },
    { id: "when", label: "Schedule" },
    { id: "who", label: "Details" },
    { id: "where", label: "Location" },
    { id: "lock", label: "Confirm" },
  ];

  const timeSlots = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "12:00", "12:30", "13:00", "13:30", "14:00", "14:30"
  ];

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
      setErrorMsg("");
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
      setErrorMsg("");
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setErrorMsg("");

    // Build payload exactly as API expects
    const payload = {
      repairPriceId: form.repairPriceId, // Keep as string (GUID)
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

    console.log("Sending payload:", JSON.stringify(payload, null, 2));

    try {
      const url = `${import.meta.env.VITE_BASE_URL}/api/Appointments`;
      
      const res = await fetch(url, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const responseData = await res.json();
      console.log("Response:", responseData);

      if (!res.ok) {
        let errorMessage = "Validation failed";
        
        if (responseData.errors) {
          const errors = Object.entries(responseData.errors)
            .map(([key, value]) => `${key}: ${Array.isArray(value) ? value.join(", ") : value}`)
            .join("; ");
          errorMessage = errors;
        } else if (responseData.title) {
          errorMessage = responseData.title;
        } else if (responseData.message) {
          errorMessage = responseData.message;
        }
        
        throw new Error(errorMessage);
      }

      navigate("/appointment-success", {
        state: { email: form.customerEmail },
      });
      
    } catch (err) {
      console.error("Booking failed:", err);
      setErrorMsg(err.message || "Failed to book appointment");
    } finally {
      setIsSubmitting(false);
    }
  };

  const validateStep = () => {
    if (step === 1) {
      if (!form.appointmentDay || !form.appointmentTime) {
        setShake(true);
        setTimeout(() => setShake(false), 400);
        return false;
      }
    }
    if (step === 2) {
      const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.customerEmail);
      const phoneValid = /^\d{7,15}$/.test(form.customerPhoneNumber?.replace(/\s/g, ''));
      if (!form.customerFirstName || !form.customerLastname || !emailValid || !phoneValid) {
        setShake(true);
        setTimeout(() => setShake(false), 400);
        return false;
      }
    }
    if (step === 3) {
      if (!form.customerAddress || !form.customerCity || !form.customerState) {
        setShake(true);
        setTimeout(() => setShake(false), 400);
        return false;
      }
    }
    return true;
  };

  const handleContinue = () => {
    if (validateStep()) {
      handleNext();
    }
  };

  return (
    <div className="min-h-screen bg-primary text-secondary flex items-center justify-center p-4">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[100px]" />
      </div>

      <div className="relative w-full max-w-md z-10">
        {/* Progress */}
        <div className="flex items-center justify-center gap-1 mb-6">
          {steps.map((s, i) => (
            <div key={s.id} className="flex items-center">
              <div className={`w-1.5 h-1.5 rounded-full transition-colors ${
                i === step ? "bg-white scale-125" : i < step ? "bg-emerald-500" : "bg-white/20"
              }`} />
              {i < 4 && <div className={`w-6 h-px mx-0.5 ${i < step ? "bg-emerald-500" : "bg-white/10"}`} />}
            </div>
          ))}
          <span className="ml-2 text-xs text-white/40">{step + 1}/5</span>
        </div>

        {/* Error Message */}
        {errorMsg && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-xl text-sm text-red-200"
          >
            <p className="text-xs break-words">{errorMsg}</p>
          </motion.div>
        )}

        {/* Card */}
        <div className="bg-white/5 backdrop-blur border border-white/10 rounded-3xl p-6 min-h-[520px] relative overflow-hidden">
          <AnimatePresence mode="wait">
            
            {/* Step 0: Service */}
            {step === 0 && (
              <motion.div
                key="step0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="h-full flex flex-col"
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-4 text-xl">
                  🔧
                </div>
                <h2 className="text-2xl font-semibold mb-1">{state?.partName}</h2>
                <p className="text-white/50 text-sm mb-6">{state?.duration} min • Same-day</p>
                <div className="bg-black/20 rounded-2xl p-4 mb-6">
                  <div className="flex justify-between items-baseline">
                    <span className="text-white/60 text-sm">Total</span>
                    <span className="text-3xl font-bold">${state?.cost}</span>
                  </div>
                  <div className="h-px bg-white/10 my-3" />
                  <div className="flex gap-4 text-xs text-white/40">
                    <span>✓ Certified parts</span>
                    <span>✓ 90-day warranty</span>
                  </div>
                </div>
                <div className="mt-auto">
                  <button
                    onClick={handleNext}
                    className="w-full py-4 bg-white text-black rounded-2xl font-semibold hover:bg-white/90 active:scale-[0.98] transition-all"
                  >
                    Book this repair
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 1: Schedule */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className={`h-full flex flex-col ${shake ? "animate-pulse" : ""}`}
              >
                <h3 className="text-lg font-medium mb-4">When?</h3>
                <input
                  type="date"
                  value={form.appointmentDay}
                  onChange={(e) => setForm({ ...form, appointmentDay: e.target.value })}
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-sm mb-4 focus:border-white/30 outline-none"
                />
                <div className="grid grid-cols-4 gap-2 mb-6">
                  {timeSlots.map(time => (
                    <button
                      key={time}
                      onClick={() => setForm({ ...form, appointmentTime: time })}
                      className={`py-2.5 rounded-xl text-xs font-medium transition-all ${
                        form.appointmentTime === time ? "bg-white text-black" : "bg-white/5 text-white/70 hover:bg-white/10"
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
                <div className="mt-auto flex gap-3">
                  <button onClick={handleBack} className="px-6 py-4 text-white/50 hover:text-white text-sm">Back</button>
                  <button onClick={handleContinue} className="flex-1 py-4 bg-white text-black rounded-2xl font-semibold">Continue</button>
                </div>
              </motion.div>
            )}

            {/* Step 2: Details */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className={`h-full flex flex-col ${shake ? "animate-pulse" : ""}`}
              >
                <h3 className="text-lg font-medium mb-4">Your details</h3>
                <div className="space-y-3 mb-4">
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      placeholder="First"
                      value={form.customerFirstName}
                      onChange={(e) => setForm({ ...form, customerFirstName: e.target.value })}
                      className="bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none placeholder:text-white/30"
                    />
                    <input
                      placeholder="Last"
                      value={form.customerLastname}
                      onChange={(e) => setForm({ ...form, customerLastname: e.target.value })}
                      className="bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none placeholder:text-white/30"
                    />
                  </div>
                  <input
                    type="email"
                    placeholder="Email"
                    value={form.customerEmail}
                    onChange={(e) => setForm({ ...form, customerEmail: e.target.value })}
                    className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none placeholder:text-white/30"
                  />
                  <input
                    type="tel"
                    placeholder="Phone"
                    value={form.customerPhoneNumber}
                    onChange={(e) => setForm({ ...form, customerPhoneNumber: e.target.value })}
                    className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none placeholder:text-white/30"
                  />
                </div>
                <div className="mt-auto flex gap-3">
                  <button onClick={handleBack} className="px-6 py-4 text-white/50 hover:text-white text-sm">Back</button>
                  <button onClick={handleContinue} className="flex-1 py-4 bg-white text-black rounded-2xl font-semibold">Continue</button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Location (NEW) */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className={`h-full flex flex-col ${shake ? "animate-pulse" : ""}`}
              >
                <h3 className="text-lg font-medium mb-4">Where?</h3>
                <div className="space-y-3 mb-4">
                  <input
                    placeholder="Street address"
                    value={form.customerAddress}
                    onChange={(e) => setForm({ ...form, customerAddress: e.target.value })}
                    className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none placeholder:text-white/30"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      placeholder="City"
                      value={form.customerCity}
                      onChange={(e) => setForm({ ...form, customerCity: e.target.value })}
                      className="bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none placeholder:text-white/30"
                    />
                    <input
                      placeholder="State"
                      value={form.customerState}
                      onChange={(e) => setForm({ ...form, customerState: e.target.value })}
                      className="bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none placeholder:text-white/30"
                    />
                  </div>
                  <textarea
                    placeholder="Notes (optional)"
                    value={form.comment}
                    onChange={(e) => setForm({ ...form, comment: e.target.value })}
                    rows={2}
                    className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none placeholder:text-white/30 resize-none"
                  />
                </div>
                <div className="mt-auto flex gap-3">
                  <button onClick={handleBack} className="px-6 py-4 text-white/50 hover:text-white text-sm">Back</button>
                  <button onClick={handleContinue} className="flex-1 py-4 bg-white text-black rounded-2xl font-semibold">Review</button>
                </div>
              </motion.div>
            )}

            {/* Step 4: Confirm */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="h-full flex flex-col"
              >
                <h3 className="text-lg font-medium mb-4">Confirm</h3>
                <div className="space-y-2 text-sm flex-1 overflow-y-auto">
                  <div className="flex justify-between py-1.5 border-b border-white/10">
                    <span className="text-white/50">Service</span>
                    <span className="truncate max-w-[60%]">{state?.partName}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-white/10">
                    <span className="text-white/50">When</span>
                    <span>{form.appointmentDay} {form.appointmentTime}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-white/10">
                    <span className="text-white/50">Who</span>
                    <span>{form.customerFirstName} {form.customerLastname}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-white/10">
                    <span className="text-white/50">Where</span>
                    <span className="truncate max-w-[60%]">{form.customerCity}</span>
                  </div>
                  <div className="flex justify-between items-baseline pt-2">
                    <span className="text-white/50">Total</span>
                    <span className="text-2xl font-bold">${state?.cost}</span>
                  </div>
                </div>
                <div className="mt-auto flex gap-3 pt-4">
                  <button onClick={handleBack} className="px-6 py-4 text-white/50 hover:text-white text-sm">Edit</button>
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="flex-1 py-4 bg-emerald-500 text-white rounded-2xl font-semibold disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
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
      </div>
    </div>
  );
};

export default AppointmentPage;