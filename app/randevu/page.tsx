import { Appointment, Barber } from "@prisma/client";
import { headers } from "next/headers";

const TakeAppointmentPage = async () => {


    const createAppointment: Appointment = {
      id: "14gdvgjee4ujfdvhje",
      userId: "cengiz",
      barberId: "yok",
      date: new Date("2025-03-01T00:00:00Z"),
      startTime: new Date("2025-03-01T00:00:00Z"),
      endTime: new Date("2025-03-01T00:00:00Z"),
      createdAt: new Date("2025-03-01T00:00:00Z"),
      updatedAt: new Date("2025-03-01T00:00:00Z"),
    };
    try {
      const res = await fetch("http://localhost:3000/api/v1/appointment", {
        method: "POST",
        headers: await headers(),
        body: JSON.stringify(createAppointment),
      });

    if (res.ok) {
      const data = await res.json(); // JSON verisini burada alıyorsunuz
      console.log(data); // Veriyi console'a basıyoruz
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

/*
    const createAppointment: Appointment = {
      id: "14gdvgjee4ujfdvhje",
      userId: "cengiz",
      barberId: "yok",
      date: new Date("2025-03-01T00:00:00Z"),
      startTime: new Date("2025-03-01T00:00:00Z"),
      endTime: new Date("2025-03-01T00:00:00Z"),
      createdAt: new Date("2025-03-01T00:00:00Z"),
      updatedAt: new Date("2025-03-01T00:00:00Z"),
    };
    try {
      const res = await fetch("http://localhost:3000/api/v1/appointment", {
        method: "POST",
        headers: await headers(),
        body: JSON.stringify(createAppointment),
      });

    if (res.ok) {
      const data = await res.json(); // JSON verisini burada alıyorsunuz
      console.log(data); // Veriyi console'a basıyoruz
    } else {
      console.log("Hata durumu:", res.status);
    }
  } catch (error) {
    co



      const createBarber: Barber = {
    id: "dfhdfgjj2",
    name: "mert",
    image: "null",
    createdAt: new Date("2025-03-01T00:00:00Z"),
    updatedAt: new Date("2025-03-01T00:00:00Z"),
  };

  try {
    const res = await fetch("http://localhost:3000/api/v1/barber", {
      method: "POST",
      headers: await headers(),
      body: JSON.stringify(createBarber),
    });

    if (res.ok) {
      const data = await res.json(); // JSON verisini burada alıyorsunuz
      console.log(data); // Veriyi console'a basıyoruz
    } else {
      console.log("Hata durumu:", res.status);
    }
  } catch (error) {
    console.log("Sunucu hatası:", error);
  }
*/
