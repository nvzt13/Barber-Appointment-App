"use client";

import BarberSelection from "@/components/shared/BarberSelection";
import DateSelection from "@/components/shared/DateSelection";
import HourSelection from "@/components/shared/HourSelection";
import useCRUD from "@/hooks/useCRUD";
import { Appointment } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Loader2Icon } from "lucide-react";
import { allSlots } from "@/data/data";
import { ClientRandevePageProps } from "@/type/types";

const ClientRandevePage: React.FC<ClientRandevePageProps> = ({ barbers }) => {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [fetchBlogData, { loading: blogDateLoading, error: blogDateError, responseData: blogDate }] = useCRUD();

  // Güncellenmek için yönlendirilecek olan randevuyu al
  const appointmentToBeUpdated = searchParams.get("appointmentToBeUpdated");
  const parseAppointmentToBeUpdated: Appointment = appointmentToBeUpdated
    ? JSON.parse(decodeURIComponent(appointmentToBeUpdated))
    : null;

  const [formData, setFormData] = useState<Appointment>({
    id: parseAppointmentToBeUpdated?.id || "",
    customerId: "",
    barberId: parseAppointmentToBeUpdated?.barberId || "",
    customerName: "",
    barberName: "",
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
    createdAt: parseAppointmentToBeUpdated?.createdAt || new Date(),
    updatedAt: parseAppointmentToBeUpdated?.updatedAt || new Date(),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
      customerId: session?.user.id,
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
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

    const method = parseAppointmentToBeUpdated?.id ? "PUT" : "POST";
    const response = await fetch("/api/appointments/create", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    try {
      if (response.ok) {
        alert(
          parseAppointmentToBeUpdated?.id
            ? "Randevu başarıyla güncellendi!"
            : "Randevu başarıyla oluşturuldu!"
        );
        router.refresh();
      } else {
        alert("Randevu oluşturulamadı client error.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Randevu oluşturulamadı.");
    }
  };

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
    <section className="p-6 bg-gray-900 text-white">
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-semibold text-center mb-6">
          {parseAppointmentToBeUpdated?.id ? "Randevuyu Düzenle" : "Randevu Al"}
        </h2>
        <BarberSelection
          barbers={barbers}
          formData={formData}
          setFormData={setFormData}
        />
        <DateSelection
          handleChange={handleChange}
          willBeUpdatedDay={formData.date}
        />
        <div className="flex justify-center items-center">
          {blogDateLoading ? (
            <Loader2Icon className="flex text-center animate-spin" />
          ) : (
            <HourSelection
              allSlots={allSlots}
              bookedSlots={bookedSlots}
              formData={formData}
              setFormData={setFormData}
              availableSlots={availableSlots}
            />
          )}
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
