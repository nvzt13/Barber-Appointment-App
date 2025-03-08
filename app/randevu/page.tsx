import {  Barber } from "@prisma/client";
import { headers } from "next/headers";
import IndexRandevu from "./_components/IndexRandevu";

const TakeAppointmentPage = async () => {
  let barbers: Barber[] = [];

  try {
    const res = await fetch("http://localhost:3000/api/v1/barber", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...Object.fromEntries(await headers()),
      },
    });

    if (res.ok) {
      barbers = await res.json();
    } else {
      console.log("Hata durumu:", res.status);
    }
  } catch (error) {
    console.log("Sunucu hatası:", error);
  }
  return (
    <section className="p-6 bg-gray-900 text-white w-full">
      <IndexRandevu barbers={barbers} />
    </section>
  );
};

export default TakeAppointmentPage;
