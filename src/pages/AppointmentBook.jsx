// src/pages/AppointmentPage.jsx
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useRepair } from "../context/PhonesContext";

const AppointmentPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { loading } = useRepair();

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

  const next = () => setStep(s => s + 1);
  const back = () => setStep(s => s - 1);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitAppointment = async () => {
    const payload = {
      ...form,
      appointmentDay: new Date(
        `${form.appointmentDay}T${form.appointmentTime}`
      ).toISOString(),
    };

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
    console.log(res.json);
    
    navigate("/appointment-success", {
      state: { email: form.customerEmail },
    });
  };

  return (
    <section className="max-w-3xl mx-auto px-6 py-12">
      <h2 className="text-2xl font-bold mb-6">Book Appointment</h2>

      {step === 1 && (
        <div>
          <h3 className="font-semibold mb-3">Repair Summary</h3>
          <p>{state.partName}</p>
          <p>${state.cost} · {state.duration} mins</p>

          <button onClick={next} className="btn-primary mt-6">
            Continue
          </button>
        </div>
      )}

      {step === 2 && (
        <div>
          <h3 className="font-semibold mb-3">Choose Date & Time</h3>

          <input
            type="date"
            name="appointmentDay"
            onChange={handleChange}
            className="input"
          />

          <input
            type="time"
            name="appointmentTime"
            onChange={handleChange}
            className="input mt-3"
          />

          <div className="flex gap-4 mt-6">
            <button onClick={back}>Back</button>
            <button onClick={next} className="btn-primary">
              Continue
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <h3 className="font-semibold mb-3">Your Details</h3>

          <input name="customerFirstName" placeholder="First name" onChange={handleChange} className="input" />
          <input name="customerLastname" placeholder="Last name" onChange={handleChange} className="input mt-3" />
          <input name="customerEmail" placeholder="Email" onChange={handleChange} className="input mt-3" />
          <input name="customerPhoneNumber" placeholder="Phone" onChange={handleChange} className="input mt-3" />

          <textarea name="comment" placeholder="Any note?" onChange={handleChange} className="input mt-3" />

          <div className="flex gap-4 mt-6">
            <button onClick={back}>Back</button>
            <button onClick={next} className="btn-primary">
              Review
            </button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div>
          <h3 className="font-semibold mb-3">Confirm</h3>

          <p>{form.customerFirstName} {form.customerLastname}</p>
          <p>{form.customerEmail}</p>
          <p>{form.appointmentDay} at {form.appointmentTime}</p>

          <div className="flex gap-4 mt-6">
            <button onClick={back}>Back</button>
            <button
              onClick={submitAppointment}
              disabled={loading}
              className="btn-primary"
            >
              {loading ? "Booking..." : "Confirm Appointment"}
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default AppointmentPage;
