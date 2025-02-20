"use client";
import DateRangePicker from "@/components/shared/DateRangePicker";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";



const Appointment = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const { data: session, status } = useSession();
  const [barbers, setBarbers] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([]);

  console.log(session?.user.id, session?.user.email);
  const [formData, setFormData] = useState({
    customerId: "",
    barberId: "",
    status: "pending",
    date: new Date(),
    time: "12:00",
  });

  useEffect(() => {
    async function fetchBarbers() {
      try {
        const response = await fetch("/api/barbers", { method: "GET" });
        if (!response.ok)
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        const data = await response.json();
        setBarbers(data);
      } catch (error) {
        console.error("Failed to fetch barbers:", error);
      }
    }
    fetchBarbers();
  }, []);

  useEffect(() => {
    async function fetchAvailableSlots() {
      if (!formData.barberId || !selectedDate) return;

      try {
        const response = await fetch(
          `/api/barbers/${formData.barberId}/available-slots?date=${selectedDate}`
        );
        if (!response.ok) throw new Error('Failed to fetch available slots');
        const slots = await response.json();
        setAvailableSlots(slots);
      } catch (error) {
        console.error('Error fetching available slots:', error);
      }
    }

    fetchAvailableSlots();
  }, [formData.barberId, selectedDate]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Eğer tarih inputuysa selectedDate'i güncelle
    if (name === "date") setSelectedDate(value);

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
      customerId: session?.user.id, // Müşteri id'sini ekle
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log("Submitting appointment:", formData);
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert("Appointment created successfully!");
        // Reset form or redirect
      } else {
        alert("Failed to create appointment");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("Failed to create appointment");
    }
  };

  if (status === "unauthenticated") {
    return (
      <div className="p-6 bg-gray-900 text-white text-center">
        <p>Please login to make an appointment</p>
      </div>
    );
  }

  return (
    <section className="p-6 bg-gray-900 text-white">
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-semibold text-center mb-6">Randevu Al</h2>

        {session && (
          <div className="text-center mb-6">
            <p className="text-lg">
              Hoşgeldin{" "}
              <span className="font-semibold">{session.user?.name}</span>
            </p>
          </div>
        )}

        <div className="form-group mb-6">
          <h3 className="text-lg font-medium mb-4 text-center">Usta Seç</h3>
          <div className="flex justify-center space-x-4">
            {barbers.length > 0 ? (
              barbers.map((barber) => (
                <div
                  key={barber.id}
                  className={`flex flex-col items-center p-4 rounded-lg cursor-pointer ${
                    formData.barberId === barber.id
                      ? "bg-blue-600"
                      : "bg-gray-800"
                  } hover:bg-gray-700`}
                  onClick={() =>
                    setFormData({ ...formData, barberId: barber.id })
                  }
                >
                  <input
                    type="radio"
                    id={barber.id}
                    name="barberId"
                    value={barber.id}
                    onChange={handleChange}
                    checked={formData.barberId === barber.id}
                    className="hidden"
                  />
                  <img
                    src={barber.imageUrl}
                    alt={barber.name}
                    className="w-16 h-16 rounded-full mb-2"
                  />
                  <label htmlFor={barber.id} className="text-center">
                    <span className="block font-medium">{barber.name}</span>
                  </label>
                </div>
              ))
            ) : (
              <p>Berberler yükleniyor...</p>
            )}
          </div>
        </div>
        <DateRangePicker />
        <div className="form-group mb-6">
          <h3 className="text-lg font-medium mb-4">Saat Seçimi</h3>
          <div className="grid grid-cols-4 gap-4">
            {availableSlots.map((hour, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setFormData({ ...formData, time: hour })}
                className={`p-3 rounded-lg text-center ${
                  formData.time === hour ? "bg-blue-600" : "bg-gray-800"
                } hover:bg-gray-700`}
                disabled={!formData.barberId || !selectedDate}
              >
                {hour}
              </button>
            ))}
          </div>
          {availableSlots.length === 0 && selectedDate && formData.barberId && (
            <p className="text-center mt-4 text-yellow-400">
              Bu tarihte müsait randevu saati bulunmamaktadır.
            </p>
          )}
        </div>
        {selectedDate && (
          <><div className="mt-6 text-center"></div><p className="text-lg">
            Seçilen Tarih:{" "}
            <span className="font-semibold">{selectedDate}</span>
          </p></>
        )}
        <div className="text-center">
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold"
          >
            Randevuyu Onayla
          </button>
        </div>
      </form>
    </section>
  );
};

export default Appointment;
