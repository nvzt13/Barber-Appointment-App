"use client";

import BarberSelection from "@/app/randevu/_components/BarberSelection";
import DateSelection from "@/app/randevu/_components/DateSelection";
import HourSelection from "@/app/randevu/_components/HourSelection";
import { Appointment, Barber } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Loader2Icon } from "lucide-react";
import { allSlots } from "@/data/data";
interface ClientRandevePageProps {
  barbers: Barber[];
}
const IndexRandevu: React.FC<ClientRandevePageProps> = ({ barbers }) => {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);

  // Güncellenmek için yönlendirilecek olan randevuyu al
  const appointmentToBeUpdated = searchParams.get("appointmentToBeUpdated");
  const parseAppointmentToBeUpdated: Appointment = appointmentToBeUpdated
    ? JSON.parse(decodeURIComponent(appointmentToBeUpdated))
    : null;

  const [formData, setFormData] = useState({
      userId: parseAppointmentToBeUpdated?.userId || session?.user?.id || "",
      barberId: parseAppointmentToBeUpdated?.barberId || "",
      date: parseAppointmentToBeUpdated?.date
        ? new Date(parseAppointmentToBeUpdated.date)
        : new Date(),
      time: parseAppointmentToBeUpdated?.time || "",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    if (!formData.barberId) {
      alert("Lütfen bir berber seçin!");
      return;
    }
    if (!formData.time) {
      alert("Lütfen bir saat seçin!");
      return;
    }
    const method = parseAppointmentToBeUpdated?.id ? "PUT" : "POST";
    try {
      const response = await fetch("/api/v1/appointment", {
        method,
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert(
          method === "PUT"
            ? "Randevunuz başarıyla güncellendi!"
            : "Randevunuz başarıyla oluşturuldu!"
        );
      } else {
        alert(
          method === "PUT"
            ? "Randevunuz güncellenirken bir hata oluştu!"
            : "Randevunuz oluşturulurken bir hata oluştu!"
        );
        console.log(await response.json() + "-------------------")
      }
    } catch (error) {
      console.log(error);
    }
  };

  const availableSlots = allSlots.filter(
    (slot) => !bookedSlots?.includes(slot)
  );

  return (
    <section className="p-6 bg-gray-900 text-white w-full">
      <form onSubmit={handleSubmit} className="mx-auto flex flex-col">
        <div>
          <h2 className="text-2xl font-semibold text-center mb-6 w-full">
            {parseAppointmentToBeUpdated?.id
              ? "Randevuyu Düzenle"
              : "Randevu Al"}
          </h2>
        </div>
        <BarberSelection
          barbers={barbers}
          formData={{ ...formData }}
          setFormData={setFormData}
        />
        <div className="flex flex-col items-center justify-center mb-4">
          <DateSelection
            formData={{ ...formData }}
            setFormData={setFormData}
            willBeUpdatedDay={formData.date}
          />
          <HourSelection
            allSlots={allSlots}
            bookedSlots={bookedSlots}
            availableSlots={availableSlots}
            formData={{ ...formData }}
            setFormData={setFormData}
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 hover:bg-gray-700 rounded-lg text-white font-semibold"
          >
            {parseAppointmentToBeUpdated?.id
              ? "Randevuyu Güncelle"
              : "Randevuyu Onayla"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default IndexRandevu;

/*
     <div className="flex flex-row items-center justify-evenly w-full">
        <DateSelection
          formData={{ ...formData }}
          setFormData={setFormData}
          willBeUpdatedDay={formData.date}
        />
        <div className="flex justify-center items-center">
          {loading ? (
            <Loader2Icon className="flex text-center animate-spin" />
          ) : (
            <HourSelection
              allSlots={allSlots}
              bookedSlots={bookedSlots}
              availableSlots={availableSlots}
              formData={{ ...formData }}
              setFormData={setFormData}
            />
          )}
        </div>
       </div>
  */
