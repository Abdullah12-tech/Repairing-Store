// src/pages/AppointmentPage.jsx
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useRepair } from "../context/PhonesContext";
import { motion, AnimatePresence, useAnimation } from "framer-motion";

const AppointmentPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { loading: contextLoading } = useRepair();

  if (!state) {
    navigate("/");
    return null;
  }

  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    repairPriceId: state.repairPriceId,
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

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingPage, setIsLoadingPage] = useState(true);

  const steps = [
    { id: 1, title: "Repair Summary" },
    { id: 2, title: "Date & Time" },
    { id: 3, title: "Your Details" },
    { id: 4, title: "Confirm" },
  ];

  // Simulate initial loading (e.g., if fetching data; adjust as needed)
  useEffect(() => {
    const timer = setTimeout(() => setIsLoadingPage(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const computeValidation = (currentStep) => {
    let valid = true;
    let newErrors = {};
    if (currentStep === 2) {
      if (!form.appointmentDay) {
        newErrors.appointmentDay = "Required";
        valid = false;
      }
      if (!form.appointmentTime) {
        newErrors.appointmentTime = "Required";
        valid = false;
      }
    }
    if (currentStep === 3) {
      if (!form.customerFirstName) {
        newErrors.customerFirstName = "Required";
        valid = false;
      }
      if (!form.customerLastname) {
        newErrors.customerLastname = "Required";
        valid = false;
      }
      if (!form.customerEmail) {
        newErrors.customerEmail = "Required";
        valid = false;
      } else if (!/\S+@\S+\.\S+/.test(form.customerEmail)) {
        newErrors.customerEmail = "Invalid email";
        valid = false;
      }
      if (!form.customerPhoneNumber) {
        newErrors.customerPhoneNumber = "Required";
        valid = false;
      } else if (!/^\d{7,15}$/.test(form.customerPhoneNumber)) {
        newErrors.customerPhoneNumber = "Invalid phone";
        valid = false;
      }
    }
    return { valid, errors: newErrors };
  };

  useEffect(() => {
    const { errors: newErrors } = computeValidation(step);
    setErrors(newErrors);
  }, [step]);

  const next = () => {
    const { valid, errors: newErrors } = computeValidation(step);
    setErrors(newErrors);
    if (valid) {
      setStep((s) => Math.min(s + 1, steps.length));
    } else {
      Object.keys(newErrors).forEach((key) => {
        if (newErrors[key]) controls[key].start("shake");
      });
    }
  };

  const back = () => setStep((s) => Math.max(s - 1, 1));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let newErrors = { ...errors };
    switch (name) {
      case "appointmentDay":
      case "appointmentTime":
      case "customerFirstName":
      case "customerLastname":
        newErrors[name] = value ? "" : "Required";
        break;
      case "customerEmail":
        newErrors[name] = !value
          ? "Required"
          : !/\S+@\S+\.\S+/.test(value)
          ? "Invalid email"
          : "";
        break;
      case "customerPhoneNumber":
        newErrors[name] = !value
          ? "Required"
          : !/^\d{7,15}$/.test(value)
          ? "Invalid phone"
          : "";
        break;
      default:
        break;
    }
    setErrors(newErrors);
  };

  const submitAppointment = async () => {
    setIsSubmitting(true);
    const payload = {
      ...form,
      appointmentDay: new Date(
        `${form.appointmentDay}T${form.appointmentTime}`
      ).toISOString(),
    };

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/Appointments`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) {
        alert("Failed to book appointment");
        return;
      }
      console.log(await res.json());

      navigate("/appointment-success", {
        state: { email: form.customerEmail },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const firstInput = document.querySelector(`.step-${step} input, .step-${step} textarea`);
    if (firstInput) firstInput.focus();
  }, [step]);

  const controls = {
    appointmentDay: useAnimation(),
    appointmentTime: useAnimation(),
    customerFirstName: useAnimation(),
    customerLastname: useAnimation(),
    customerEmail: useAnimation(),
    customerPhoneNumber: useAnimation(),
    customerAddress: useAnimation(),
    customerCity: useAnimation(),
    customerState: useAnimation(),
    comment: useAnimation(),
  };

  const inputVariants = {
    shake: {
      x: [0, -5, 5, -5, 5, 0],
      transition: { duration: 0.5 },
    },
    focus: {
      scale: 1.02,
      borderColor: "rgb(var(--tertiary))",
      boxShadow: "0 0 0 3px rgba(var(--tertiary), 0.3)",
      transition: { duration: 0.2 },
    },
    blur: {
      scale: 1,
      borderColor: "rgb(209, 213, 219)",
      boxShadow: "none",
      transition: { duration: 0.2 },
    },
  };

  const buttonVariants = {
    hover: { scale: 1.05, backgroundColor: "rgba(var(--primary), 0.9)" },
    tap: { scale: 0.95 },
  };

  const loadingOverlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
  };

  const spinnerVariants = {
    spin: {
      rotate: 360,
      transition: { duration: 2, repeat: Infinity, ease: "linear" },
    },
  };

  const pulseVariants = {
    pulse: {
      scale: [1, 1.2, 1],
      opacity: [0.7, 1, 0.7],
      transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
    },
  };

  if (isLoadingPage) {
    return (
      <motion.div
        className="fixed inset-0 bg-[rgb(var(--secondary))] flex flex-col items-center justify-center z-50"
        variants={loadingOverlayVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="text-[rgb(var(--primary))] text-6xl mb-4"
          variants={spinnerVariants}
          animate="spin"
        >
          🔧
        </motion.div>
        <motion.p
          className="text-[rgb(var(--advanced))] text-xl font-semibold"
          variants={pulseVariants}
          animate="pulse"
        >
          Preparing your repair journey...
        </motion.p>
      </motion.div>
    );
  }

  return (
    <section className="max-w-3xl mx-auto px-6 py-12 bg-[rgb(var(--secondary))] rounded-xl shadow-2xl" style={{ backgroundImage: 'linear-gradient(to bottom right, rgba(255,255,255,0.95), rgba(250,204,21,0.05))' }}>
      <h2 className="text-3xl font-extrabold mb-8 text-center text-[rgb(var(--advanced))]">Book Your Repair Appointment</h2>

      <div className="flex justify-between mb-12">
        {steps.map((s, index) => (
          <div key={s.id} className="flex flex-col items-center relative flex-1">
            <motion.div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${
                step >= s.id ? "bg-[rgb(var(--primary))] text-[rgb(var(--secondary))]" : "bg-gray-200 text-gray-500"
              }`}
              whileHover={{ scale: 1.2, rotate: 5 }}
              animate={{ scale: step === s.id ? 1.1 : 1 }}
              transition={{ duration: 0.3 }}
            >
              {s.id}
            </motion.div>
            <p className="mt-2 text-sm font-medium text-[rgb(var(--advanced))]">{s.title}</p>
            {index < steps.length - 1 && (
              <motion.div
                className="absolute top-5 left-1/2 w-full h-0.5"
                style={{ transform: "translateX(50%)" }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: step > s.id ? 1 : 0, backgroundColor: step > s.id ? "rgb(var(--primary))" : "gray" }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />
            )}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className={`step-${step}`}
        >
          {step === 1 && (
            <div className="bg-[rgb(var(--secondary))] p-6 rounded-lg shadow-md border border-[rgb(var(--tertiary))]/30">
              <h3 className="font-semibold text-xl mb-4 text-[rgb(var(--advanced))] flex items-center">
                <motion.span className="mr-2" initial={{ rotate: -10 }} animate={{ rotate: 0 }} transition={{ duration: 0.3 }}>🔧</motion.span> Repair Summary
              </h3>
              <div className="space-y-2 text-[rgb(var(--advanced))]">
                <p className="font-medium">{state.partName}</p>
                <p className="text-lg font-bold text-[rgb(var(--primary))]">${state.cost}</p>
                <p className="text-sm italic">{state.duration} mins estimated</p>
              </div>
              <p className="mt-4 text-sm text-gray-600">We'll get your device back to life in no time!</p>
              <motion.button
                onClick={next}
                className="btn-primary mt-6 w-full flex items-center justify-center"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                Continue <motion.span className="ml-2" animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1 }}>→</motion.span>
              </motion.button>
            </div>
          )}

          {step === 2 && (
            <div className="bg-[rgb(var(--secondary))] p-6 rounded-lg shadow-md border border-[rgb(var(--tertiary))]/30">
              <h3 className="font-semibold text-xl mb-4 text-[rgb(var(--advanced))] flex items-center">
                <motion.span className="mr-2" initial={{ rotate: -10 }} animate={{ rotate: 0 }} transition={{ duration: 0.3 }}>📅</motion.span> Choose Date & Time
              </h3>
              <div className="space-y-4">
                <motion.input
                  type="date"
                  name="appointmentDay"
                  value={form.appointmentDay}
                  onChange={handleChange}
                  className="input w-full"
                  min={new Date().toISOString().split("T")[0]}
                  animate={controls.appointmentDay}
                  variants={inputVariants}
                  onFocus={() => controls.appointmentDay.start("focus")}
                  onBlur={() => controls.appointmentDay.start("blur")}
                />
                {errors.appointmentDay && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[rgb(var(--primary))] text-sm">{errors.appointmentDay}</motion.p>}
                <motion.input
                  type="time"
                  name="appointmentTime"
                  value={form.appointmentTime}
                  onChange={handleChange}
                  className="input w-full"
                  step="1800"
                  animate={controls.appointmentTime}
                  variants={inputVariants}
                  onFocus={() => controls.appointmentTime.start("focus")}
                  onBlur={() => controls.appointmentTime.start("blur")}
                />
                {errors.appointmentTime && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[rgb(var(--primary))] text-sm">{errors.appointmentTime}</motion.p>}
              </div>
              <p className="mt-4 text-sm text-gray-600">Available slots update in real-time. Pick what suits you best.</p>
              <div className="flex gap-4 mt-6">
                <motion.button
                  onClick={back}
                  className="btn-secondary flex-1"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  Back
                </motion.button>
                <motion.button
                  onClick={next}
                  disabled={!form.appointmentDay || !form.appointmentTime}
                  className="btn-primary flex-1"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  Continue
                </motion.button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="bg-[rgb(var(--secondary))] p-6 rounded-lg shadow-md border border-[rgb(var(--tertiary))]/30">
              <h3 className="font-semibold text-xl mb-4 text-[rgb(var(--advanced))] flex items-center">
                <motion.span className="mr-2" initial={{ rotate: -10 }} animate={{ rotate: 0 }} transition={{ duration: 0.3 }}>👤</motion.span> Your Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <motion.input
                    name="customerFirstName"
                    placeholder="First name"
                    value={form.customerFirstName}
                    onChange={handleChange}
                    className="input"
                    animate={controls.customerFirstName}
                    variants={inputVariants}
                    onFocus={() => controls.customerFirstName.start("focus")}
                    onBlur={() => controls.customerFirstName.start("blur")}
                  />
                  {errors.customerFirstName && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[rgb(var(--primary))] text-sm">{errors.customerFirstName}</motion.p>}
                </div>
                <div>
                  <motion.input
                    name="customerLastname"
                    placeholder="Last name"
                    value={form.customerLastname}
                    onChange={handleChange}
                    className="input"
                    animate={controls.customerLastname}
                    variants={inputVariants}
                    onFocus={() => controls.customerLastname.start("focus")}
                    onBlur={() => controls.customerLastname.start("blur")}
                  />
                  {errors.customerLastname && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[rgb(var(--primary))] text-sm">{errors.customerLastname}</motion.p>}
                </div>
                <div className="md:col-span-2">
                  <motion.input
                    name="customerEmail"
                    placeholder="Email"
                    value={form.customerEmail}
                    onChange={handleChange}
                    className="input"
                    type="email"
                    animate={controls.customerEmail}
                    variants={inputVariants}
                    onFocus={() => controls.customerEmail.start("focus")}
                    onBlur={() => controls.customerEmail.start("blur")}
                  />
                  {errors.customerEmail && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[rgb(var(--primary))] text-sm">{errors.customerEmail}</motion.p>}
                </div>
                <div className="md:col-span-2">
                  <motion.input
                    name="customerPhoneNumber"
                    placeholder="Phone"
                    value={form.customerPhoneNumber}
                    onChange={handleChange}
                    className="input"
                    type="tel"
                    animate={controls.customerPhoneNumber}
                    variants={inputVariants}
                    onFocus={() => controls.customerPhoneNumber.start("focus")}
                    onBlur={() => controls.customerPhoneNumber.start("blur")}
                  />
                  {errors.customerPhoneNumber && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[rgb(var(--primary))] text-sm">{errors.customerPhoneNumber}</motion.p>}
                </div>
                <div className="md:col-span-2">
                  <motion.input
                    name="customerAddress"
                    placeholder="Address"
                    value={form.customerAddress}
                    onChange={handleChange}
                    className="input"
                    animate={controls.customerAddress}
                    variants={inputVariants}
                    onFocus={() => controls.customerAddress.start("focus")}
                    onBlur={() => controls.customerAddress.start("blur")}
                  />
                </div>
                <div>
                  <motion.input
                    name="customerCity"
                    placeholder="City"
                    value={form.customerCity}
                    onChange={handleChange}
                    className="input"
                    animate={controls.customerCity}
                    variants={inputVariants}
                    onFocus={() => controls.customerCity.start("focus")}
                    onBlur={() => controls.customerCity.start("blur")}
                  />
                </div>
                <div>
                  <motion.input
                    name="customerState"
                    placeholder="State"
                    value={form.customerState}
                    onChange={handleChange}
                    className="input"
                    animate={controls.customerState}
                    variants={inputVariants}
                    onFocus={() => controls.customerState.start("focus")}
                    onBlur={() => controls.customerState.start("blur")}
                  />
                </div>
              </div>
              <motion.textarea
                name="comment"
                placeholder="Any notes? (e.g., device issues or preferences)"
                value={form.comment}
                onChange={handleChange}
                className="input mt-4 w-full h-24"
                animate={controls.comment}
                variants={inputVariants}
                onFocus={() => controls.comment.start("focus")}
                onBlur={() => controls.comment.start("blur")}
              />
              <p className="mt-4 text-sm text-gray-600">We respect your privacy—details are secure and used only for this booking.</p>
              <div className="flex gap-4 mt-6">
                <motion.button
                  onClick={back}
                  className="btn-secondary flex-1"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  Back
                </motion.button>
                <motion.button
                  onClick={next}
                  disabled={
                    !form.customerFirstName ||
                    !form.customerLastname ||
                    !form.customerEmail ||
                    !form.customerPhoneNumber ||
                    (form.customerEmail && !/\S+@\S+\.\S+/.test(form.customerEmail)) ||
                    (form.customerPhoneNumber && !/^\d{7,15}$/.test(form.customerPhoneNumber))
                  }
                  className="btn-primary flex-1"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  Review
                </motion.button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="bg-[rgb(var(--secondary))] p-6 rounded-lg shadow-md border border-[rgb(var(--tertiary))]/30">
              <h3 className="font-semibold text-xl mb-4 text-[rgb(var(--advanced))] flex items-center">
                <motion.span className="mr-2" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.3, type: "spring" }}>✅</motion.span> Confirm Your Booking
              </h3>
              <div className="space-y-3 text-[rgb(var(--advanced))]">
                <p className="font-medium">{form.customerFirstName} {form.customerLastname}</p>
                <p>{form.customerEmail} · {form.customerPhoneNumber}</p>
                <p>{form.customerAddress}, {form.customerCity}, {form.customerState}</p>
                <p className="text-lg font-bold">{form.appointmentDay} at {form.appointmentTime}</p>
                <p className="text-sm italic">Repair: {state.partName} (${state.cost})</p>
                {form.comment && <p className="text-sm">Note: {form.comment}</p>}
              </div>
              <p className="mt-4 text-sm text-gray-600">Everything look good? Let's lock it in!</p>
              <div className="flex gap-4 mt-6">
                <motion.button
                  onClick={back}
                  className="btn-secondary flex-1"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  Edit
                </motion.button>
                <motion.button
                  onClick={submitAppointment}
                  disabled={isSubmitting || contextLoading}
                  className="btn-primary flex-1 flex items-center justify-center"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  {isSubmitting ? (
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      ⏳
                    </motion.span>
                  ) : (
                    "Confirm"
                  )}{" "}
                  <motion.span className="ml-2" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2 }}>🎉</motion.span>
                </motion.button>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {isSubmitting && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center z-50"
          variants={loadingOverlayVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className="text-white text-6xl mb-4"
            variants={spinnerVariants}
            animate="spin"
          >
            🔧
          </motion.div>
          <motion.p
            className="text-white text-xl font-semibold"
            variants={pulseVariants}
            animate="pulse"
          >
            Securing your slot... Hang tight!
          </motion.p>
        </motion.div>
      )}
    </section>
  );
};

export default AppointmentPage;