"use client";

import BarberSelection from "@/app/randevu/_components/BarberSelection";
import DateSelection from "@/app/randevu/_components/DateSelection";
import HourSelection from "@/app/randevu/_components/HourSelection";
import useCRUD from "@/hooks/useCRUD";
import { Appointment, Barber } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Loader2Icon } from "lucide-react";
import { allSlots } from "@/data/data";
import { FormDataProps } from "@/types/type";
interface ClientRandevePageProps {
  barbers: Barber[];
}

const ClientRandevePage: React.FC<ClientRandevePageProps> = ({ barbers }) => {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const router = useRouter();
 
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [
    fetchBlogData,
    { loading: blogDateLoading, error: blogDateError, responseData: blogDate },
  ] = useCRUD();
  const [
    createOrUpdateAppointment,
    { loading: appointmentLoading, error: appointmentError, responseData: appointmentData },
  ] = useCRUD();

  // Güncellenmek için yönlendirilecek olan randevuyu al
  const appointmentToBeUpdated = searchParams.get("appointmentToBeUpdated");
  const parseAppointmentToBeUpdated: Appointment = appointmentToBeUpdated
    ? JSON.parse(decodeURIComponent(appointmentToBeUpdated))
    : null;
  

  const [formData, setFormData] = useState<FormDataProps>({
    id: parseAppointmentToBeUpdated?.id || "",
    barberId: parseAppointmentToBeUpdated?.barberId || "",
    date:
      parseAppointmentToBeUpdated?.date ||
      new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate()
      )
        .toISOString()
        .split("T")[0],
    time: parseAppointmentToBeUpdated?.time || "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData)
    if (!formData.barberId) {
      alert("Lütfen bir berber seçin!");
      return;
    }
    if (!formData.date) {
      alert("Lütfen bir tarih seçin!");
      return;
    }
    if (!formData.time) {
      alert("Lütfen bir saat seçin!");
      return;
    }
    const method = parseAppointmentToBeUpdated?.id ? "update" : "create";
    createOrUpdateAppointment("/api/appointment/create-update", method, formData)
    console.log(appointmentData, appointmentError, appointmentLoading)
    }

  // berber yada tarih değişince tarih ve saat tablosunu güncelle
  useEffect(() => {
    if (!formData.barberId || !formData.date) return;

    fetchBlogData(
      `/api/barber/blog-date?barberId=${formData.barberId}&date=${formData.date}`,
      "read",
      {}
    );
    if (blogDateError) {
      console.log(blogDateError);
    }
  }, [formData.barberId, formData.date]);

  useEffect(() => {
    if (blogDate) {
      setBookedSlots(blogDate);
    }
  }, [blogDate]);

  const availableSlots = allSlots.filter(
    (slot) => !bookedSlots?.includes(slot)
  );

  return (
    <section className="p-6 bg-gray-900 text-white w-full">
      <form onSubmit={handleSubmit} className="mx-auto flex flex-col">
        <div>
        <h2 className="text-2xl font-semibold text-center mb-6 w-full">
          {parseAppointmentToBeUpdated?.id ? "Randevuyu Düzenle" : "Randevu Al"}
        </h2>
        </div>
       <BarberSelection
          barbers={barbers}
          formData={{ ...formData }}
          setFormData={setFormData}
        />
       <div className="flex flex-row items-center justify-evenly w-full">
        <DateSelection
          formData={{ ...formData }}
          setFormData={setFormData}
          willBeUpdatedDay={formData.date}
        />
        <div className="flex justify-center items-center">
          {blogDateLoading ? (
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

        <div className="text-center">
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold"
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

export default ClientRandevePage;
