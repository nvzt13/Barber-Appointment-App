import { seniorBarber } from "@/data/data";
import Image from "next/image";
import React from "react";

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

  return (
    <section className="p-6 bg-gray-900 text-white">
      <form action="" className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-semibold text-center mb-6">Randevu Al</h2>
        
        <div className="form-group mb-6">
          <h3 className="text-lg font-medium mb-4 text-center">Usta Seç</h3>
          <div className="flex justify-center space-x-4">
            {seniorBarber.map((barber, index) => (
              <div key={index} className="flex flex-col items-center">
                <Image
                  src={barber.image}
                  alt={barber.name}
                  width={100}
                  height={100}
                  className="h-24 w-24 object-cover rounded-full mb-2"
                />
                <span>{barber.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="form-group mb-6">
          <label htmlFor="date" className="block mb-2 text-lg font-medium">Tarih</label>
          <input
            type="date"
            id="date"
            className="w-full p-3 rounded-lg bg-gray-800 text-white"
          />
        </div>

        <div className="form-group mb-6">
          <h3 className="text-lg font-medium mb-4">Saat Seçimi</h3>
          <div className="grid grid-cols-4 gap-4">
            {availableAppointments.map((hour, index) => (
              <button
                key={index}
                className="p-3 rounded-lg bg-gray-800 hover:bg-gray-700 text-center"
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