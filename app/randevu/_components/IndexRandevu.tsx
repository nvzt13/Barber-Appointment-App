"use client";

import BarberSelection from "@/app/randevu/_components/BarberSelection";
import DateSelection from "@/app/randevu/_components/DateSelection";
import HourSelection from "@/app/randevu/_components/HourSelection";
import { Appointment, Barber } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Loader2Icon } from "lucide-react";
interface ClientRandevuPageProps {
  barbers: Barber[];
}
const IndexRandevu: React.FC<ClientRandevuPageProps> = ({ barbers }) => {
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
    id: parseAppointmentToBeUpdated?.id || "",
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
    console.log(method)
    try {
      setLoading(true)
      const response = await fetch(`/api/v1/appointment/${formData.id}`, {
        method,
        body: JSON.stringify(formData),
      });
      if (response.ok) {
      setLoading(false)
        alert(
          method === "PUT"
            ? "Randevunuz başarıyla güncellendi!"
            : "Randevunuz başarıyla oluşturuldu!"
        );
      } else {
      setLoading(false)
        alert(
          method === "PUT"
            ? "Randevunuz güncellenirken bir hata oluştu!"
            : "Randevunuz oluşturulurken bir hata oluştu!"
        );
        console.log(await response.json() + "-------------------")
      }
    } catch (error) {
      setLoading(false)
      console.log(error);
    }
  };

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
            formData={{ ...formData }}
            setFormData={setFormData}
          />
        </div>
        <div className="text-center">
        
          <button
            type="submit"
            className="flex items-center justify-center px-6 py-3 bg-blue-600
            hover:bg-gray-700 rounded-lg text-white font-semibold text-center
            mx-auto"
          >
            <p>Randevuyu Onayla</p> {
              loading ? <span><Loader2Icon className="animate-spin mx-4" /></span>: ""
            }
          </button>
        </div>
      </form>
    </section>
  );
};

export default IndexRandevu;

