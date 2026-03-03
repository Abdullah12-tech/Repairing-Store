// src/pages/AppointmentSuccess.jsx
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const AppointmentSuccess = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [showConfetti, setShowConfetti] = useState(false);
  const [particles, setParticles] = useState([]);

  const email = state?.email || "your email";

  useEffect(() => {
    // Generate confetti particles
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      color: ["#6366f1", "#8b5cf6", "#ec4899", "#10b981", "#f59e0b"][Math.floor(Math.random() * 5)],
      size: Math.random() * 8 + 4,
      delay: Math.random() * 2,
      duration: Math.random() * 3 + 2,
    }));
    setParticles(newParticles);
    setShowConfetti(true);

    // Auto-hide confetti after animation
    const timer = setTimeout(() => setShowConfetti(false), 6000);
    return () => clearTimeout(timer);
  }, []);

  const handlePrint = () => window.print();

  const addToCalendar = () => {
    // Generate ICS file or open Google Calendar
    const event = {
      title: "Phone Repair Appointment",
      description: "Your device repair appointment",
      startTime: new Date(),
      duration: 60,
    };
    alert("Calendar integration would open here");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-white relative overflow-hidden">
      {/* Animated Background Mesh */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 30, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-violet-200/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -20, 0],
            y: [0, 20, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Confetti Layer */}
      <AnimatePresence>
        {showConfetti && (
          <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
            {particles.map((p) => (
              <motion.div
                key={p.id}
                className="absolute rounded-sm"
                style={{
                  left: `${p.x}%`,
                  top: `-10%`,
                  width: p.size,
                  height: p.size,
                  backgroundColor: p.color,
                }}
                initial={{ y: 0, rotate: 0, opacity: 1 }}
                animate={{
                  y: ["0vh", "120vh"],
                  rotate: [0, 720, 1440],
                  x: [0, (Math.random() - 0.5) * 200, (Math.random() - 0.5) * 100],
                }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: p.duration,
                  delay: p.delay,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="w-full max-w-md"
        >
          {/* Success Card */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-white/50 overflow-hidden">
            
            {/* Top Section with Animated Icon */}
            <div className="relative bg-gradient-to-br from-indigo-600 to-violet-600 p-8 text-center overflow-hidden">
              {/* Animated Rings */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute rounded-full border-2 border-white/20"
                    style={{
                      width: 120 + i * 40,
                      height: 120 + i * 40,
                    }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{
                      scale: [0, 1.2, 1],
                      opacity: [0, 0.3, 0],
                    }}
                    transition={{
                      duration: 2,
                      delay: 0.5 + i * 0.2,
                      repeat: Infinity,
                      repeatDelay: 1,
                    }}
                  />
                ))}
              </motion.div>

              {/* Success Icon */}
              <motion.div
                className="relative z-10 w-20 h-20 mx-auto bg-white rounded-2xl flex items-center justify-center shadow-lg"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                  delay: 0.2,
                }}
              >
                <motion.svg
                  className="w-10 h-10 text-indigo-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <motion.path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.4, delay: 0.6 }}
                  />
                </motion.svg>
              </motion.div>

              <motion.h2
                className="relative z-10 text-white text-2xl font-bold mt-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                You're All Set!
              </motion.h2>
            </div>

            {/* Details Section */}
            <div className="p-8 space-y-6">
              {/* Email Notification */}
              <motion.div
                className="bg-indigo-50/50 rounded-2xl p-4 border border-indigo-100"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Confirmation sent to</p>
                    <p className="font-semibold text-gray-900 break-all">{email}</p>
                  </div>
                </div>
              </motion.div>

              {/* What Happens Next */}
              <motion.div
                className="space-y-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">What happens next</p>
                
                {[
                  { icon: "📱", text: "Bring your device to the shop" },
                  { icon: "⏱️", text: "We'll diagnose in 15 minutes" },
                  { icon: "🔧", text: "Repair completed same day" },
                ].map((step, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center gap-3 text-sm text-gray-600"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + i * 0.1 }}
                  >
                    <span className="w-6 h-6 bg-gray-100 rounded-lg flex items-center justify-center text-xs">
                      {step.icon}
                    </span>
                    <span>{step.text}</span>
                  </motion.div>
                ))}
              </motion.div>

              {/* Primary CTA */}
              <motion.button
                onClick={() => navigate("/")}
                className="w-full py-4 bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-xl font-semibold shadow-lg shadow-indigo-200 hover:shadow-xl transition-shadow relative overflow-hidden group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Back to Home
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    →
                  </motion.span>
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-violet-600 to-indigo-600"
                  initial={{ x: "100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            </div>
          </div>

          {/* Trust Badge */}
          <motion.p
            className="text-center text-xs text-gray-400 mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            Secured by 256-bit encryption • Refundable deposit
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
};

export default AppointmentSuccess;