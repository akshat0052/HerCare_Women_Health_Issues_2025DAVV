import React, { useState } from "react";
import { doctor } from "./DoctorDetials";

const TIME_SLOTS = [
  "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM",
];

const EMPTY_FORM = {
  name: "",
  phone: "",
  date: "",
  time: "",
  problem: "",
};

export default function Doctors() {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  const openModal = (doc) => {
    setSelectedDoctor(doc);
    setForm(EMPTY_FORM);
    setErrors({});
    setSubmitted(false);
  };

  const closeModal = () => {
    setSelectedDoctor(null);
    setForm(EMPTY_FORM);
    setErrors({});
    setSubmitted(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const err = {};
    if (!form.name.trim()) err.name = "Full name is required.";
    if (!/^\d{10}$/.test(form.phone)) err.phone = "Enter a valid 10-digit phone number.";
    if (!form.date) err.date = "Please select an appointment date.";
    if (!form.time) err.time = "Please select a time slot.";
    if (!form.problem.trim()) err.problem = "Please describe your health concern.";
    return err;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = validate();
    if (Object.keys(err).length > 0) {
      setErrors(err);
      return;
    }
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-pink-50 pt-30 pb-10 px-4">
      <h1 className="text-3xl font-bold text-center text-pink-600 mb-2">
        👩‍⚕️ Our Doctors
      </h1>
      <p className="text-center text-gray-500 text-sm mb-10">
        Book an appointment with our trusted women's health specialists
      </p>

      {/* Doctor Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {doctor.map((doc, index) => (
          <div
            key={index}
            className="bg-white p-5 rounded-2xl shadow-md flex items-center gap-4 hover:shadow-xl transition duration-300"
          >
            <img
              src={doc.image}
              alt={doc.name}
              className="w-32 h-32 rounded-full object-cover border-4 border-pink-200 flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <h2 className="text-base font-semibold text-pink-600 truncate">
                {doc.name}
              </h2>
              <p className="text-gray-600 text-sm">{doc.specialization}</p>
              <p className="text-gray-500 text-xs">🩺 {doc.experience}</p>
              <p className="text-gray-500 text-xs">📍 {doc.location}</p>
              <p className="text-yellow-500 text-xs mb-3">⭐ {doc.rating}</p>
              <button
                onClick={() => openModal(doc)}
                className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-1.5 rounded-full text-sm font-medium transition"
              >
                Book Appointment
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Booking Modal */}
      {selectedDoctor && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4"
          onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
        >
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative max-h-[92vh] overflow-y-auto">

            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold leading-none z-10"
            >
              ×
            </button>

            {submitted ? (
              /* ── Success Screen ── */
              <div className="text-center py-10 px-6">
                <div className="text-6xl mb-4">✅</div>
                <h2 className="text-2xl font-bold text-pink-600 mb-2">
                  Appointment Confirmed!
                </h2>
                <p className="text-gray-600 text-sm mb-1">
                  Hi <strong>{form.name}</strong>, your appointment is booked with
                </p>
                <p className="text-pink-600 font-semibold text-base">
                  {selectedDoctor.name}
                </p>
                <p className="text-gray-500 text-sm">
                  {selectedDoctor.specialization}
                </p>

                <div className="bg-pink-50 rounded-xl p-4 mt-4 text-sm text-gray-700 space-y-1">
                  <p>📅 <strong>Date:</strong> {form.date}</p>
                  <p>🕐 <strong>Time:</strong> {form.time}</p>
                  <p>📞 <strong>Contact:</strong> {form.phone}</p>
                </div>

                <p className="text-gray-400 text-xs mt-4">
                  We will confirm your appointment via call.
                </p>

                <button
                  onClick={closeModal}
                  className="mt-6 bg-pink-500 hover:bg-pink-600 text-white px-8 py-2.5 rounded-full text-sm font-medium transition"
                >
                  Done
                </button>
              </div>
            ) : (
              /* ── Booking Form ── */
              <div className="p-6">
                <h2 className="text-xl font-bold text-pink-600 mb-4">
                  Book Appointment
                </h2>

                {/* Doctor info strip */}
                <div className="flex items-center gap-3 bg-pink-50 rounded-xl p-3 mb-5">
                  <img
                    src={selectedDoctor.image}
                    alt={selectedDoctor.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-pink-300"
                  />
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">
                      {selectedDoctor.name}
                    </p>
                    <p className="text-gray-500 text-xs">
                      {selectedDoctor.specialization} · ⭐ {selectedDoctor.rating} · 📍 {selectedDoctor.location}
                    </p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">

                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-pink-300 focus:outline-none focus:border-pink-400 ${
                        errors.name ? "border-red-400" : "border-gray-300"
                      }`}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="10-digit mobile number"
                      type="tel"
                      maxLength={10}
                      className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-pink-300 focus:outline-none focus:border-pink-400 ${
                        errors.phone ? "border-red-400" : "border-gray-300"
                      }`}
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                    )}
                  </div>

                  {/* Date */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Appointment Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      name="date"
                      value={form.date}
                      onChange={handleChange}
                      type="date"
                      min={today}
                      className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-pink-300 focus:outline-none focus:border-pink-400 ${
                        errors.date ? "border-red-400" : "border-gray-300"
                      }`}
                    />
                    {errors.date && (
                      <p className="text-red-500 text-xs mt-1">{errors.date}</p>
                    )}
                  </div>

                  {/* Time Slot */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Time Slot <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {TIME_SLOTS.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => {
                            setForm((prev) => ({ ...prev, time: slot }));
                            setErrors((prev) => ({ ...prev, time: "" }));
                          }}
                          className={`text-xs py-2 rounded-lg border transition ${
                            form.time === slot
                              ? "bg-pink-500 text-white border-pink-500"
                              : "bg-white text-gray-700 border-gray-300 hover:border-pink-400"
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                    {errors.time && (
                      <p className="text-red-500 text-xs mt-1">{errors.time}</p>
                    )}
                  </div>

                  {/* Problem */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Health Concern <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="problem"
                      value={form.problem}
                      onChange={handleChange}
                      placeholder="Briefly describe your health concern..."
                      rows={3}
                      className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-pink-300 focus:outline-none focus:border-pink-400 resize-none ${
                        errors.problem ? "border-red-400" : "border-gray-300"
                      }`}
                    />
                    {errors.problem && (
                      <p className="text-red-500 text-xs mt-1">{errors.problem}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-xl font-semibold transition text-sm"
                  >
                    Confirm Appointment
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
