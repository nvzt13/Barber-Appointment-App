"use client"
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

function createAppointments(openingTime, closingTime) {
  const appointments = [];
  let currentTime = openingTime;

  while (currentTime < closingTime) {
    let nextTime = currentTime + 1;
    appointments.push(`${currentTime}:00 - ${nextTime}:00`);
    currentTime++;
  }

  return appointments;
}

const Appointment = () => {
  const openingTime = 9;
  const closingTime = 22;
  const availableAppointments = createAppointments(openingTime, closingTime);

  const { data: session } = useSession();
  const [barbers, setBarbers] = useState([]);
  const [formData, setFormData] = useState({
    userId: session?.user?.id || "",
    barberId: "",
    date: "",
    hour: "", // Store the selected hour here
  });

  useEffect(() => {
    // Fetch barbers from API
    async function fetchBarbers() {
      try {
        const response = await fetch("/api/barbers", {
          method: "GET", // GET method
        });
    
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
    
        const data = await response.json();
        setBarbers(data); // Set fetched barbers to state
      } catch (error) {
        console.error("Failed to fetch barbers:", error);
      }
    }

    fetchBarbers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send appointment data to the backend
    try {
      const response = await fetch("/api/appointments/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to create appointment");
      }

      const result = await response.json();
      alert("Randevu başarıyla alındı!");
    } catch (error) {
      alert("Bir hata oluştu: " + error.message);
    }
  };

  return (
    <section className="p-6 bg-gray-900 text-white">
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-semibold text-center mb-6">Randevu Al</h2>
        {session && (
          <div>
            <p>Hoşgeldin {session.user?.name}</p>
          </div>
        )}

        <div className="form-group mb-6">
          <h3 className="text-lg font-medium mb-4 text-center">Usta Seç</h3>
          <div className="flex justify-center space-x-4">
            {barbers.length > 0 ? (
              barbers.map((barber) => (
                <div key={barber.id} className="flex flex-col items-center">
                  <input
                    type="radio"
                    id={barber.id}
                    name="barberId"
                    value={barber.id}
                    onChange={handleChange}
                    checked={formData.barberId === barber.id}
                    className="hidden"
                  />
                  <label htmlFor={barber.id} className="cursor-pointer">
                    <span>{barber.name}</span>
                  </label>
                </div>
              ))
            ) : (
              <p>Berberler yükleniyor...</p>
            )}
          </div>
        </div>

        <div className="form-group mb-6">
          <label htmlFor="date" className="block mb-2 text-lg font-medium">
            Tarih
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-gray-800 text-white"
          />
        </div>

        <div className="form-group mb-6">
          <h3 className="text-lg font-medium mb-4">Saat Seçimi</h3>
          <div className="grid grid-cols-4 gap-4">
            {availableAppointments.map((hour, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setFormData({ ...formData, hour })}
                className={`p-3 rounded-lg ${formData.hour === hour ? 'bg-blue-600' : 'bg-gray-800'} hover:bg-gray-700 text-center`}
              >
                {hour}
              </button>
            ))}
          </div>
        </div>

        <div className="text-center">
          <button type="submit" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg">
            Randevuyu Onayla
          </button>
        </div>
      </form>
    </section>
  );
};

export default Appointment;
