// src/pages/AppointmentSuccess.jsx
import { useLocation } from "react-router-dom";

const AppointmentSuccess = () => {
  const { state } = useLocation();

  return (
    <section className="max-w-xl mx-auto text-center py-20">
      <h2 className="text-2xl font-bold">Appointment Confirmed</h2>
      <p className="mt-4">
        A confirmation email has been sent to
      </p>
      <p className="font-medium">{state?.email}</p>
    </section>
  );
};

export default AppointmentSuccess;
