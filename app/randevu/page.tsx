import { Appointment, Barber } from "@prisma/client";
import { headers } from "next/headers";

const TakeAppointmentPage = async () => {
  const createAppointment: Appointment = {
    id: "dsfg",
    barberId: "1",
    userId: "cm7rrcfug0000693uq02wad4u",
    date: new Date("2025-02-03"),
    time: "String",
    createdAt: undefined,
    updatedAt: undefined
  };

  try {
    const res = await fetch("http://localhost:3000/api/v1/appointment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...Object.fromEntries(await headers()),
      },
      body: JSON.stringify(createAppointment),
    });

    if (res.ok) {
      const data = await res.json();
      console.log(data);
    } else {
      console.log("Hata durumu:", res);
    }
  } catch (error) {
    console.log("Sunucu hatası:", error);
  }

  return (
    <section className="p-6 bg-gray-900 text-white w-full">
      randevu page
    </section>
  );
};

export default TakeAppointmentPage;
