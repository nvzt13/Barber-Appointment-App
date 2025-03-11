"use client";

import { Appointment } from "@prisma/client";
import { Edit2Icon, Loader2Icon, Trash2Icon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const IndexProfile: React.FC = () => {

  const router = useRouter();
  const [loadingIds, setLoadingIds] = useState<string[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>(); // Appointments state eklendi

  const {data: session} = useSession()

useEffect(() => {
  const fetchAppointments = async() => {
    try {
      const res = await fetch(`/api/v1/user/${session?.user?.id}/appointment`);
  
      if (res.ok) {
        console.log("Randevular getirildi!");
        const response = await res.json();
        setAppointments(response.data)
        console.log(res)
      } else {
        console.log("Randevular getirilirken bir hata oluştu!");
        console.log(res)
      }
    } catch (error) {
      console.log(error);
    }
  }
  fetchAppointments()
}, [])

  const handleDelete = (appointmentId: string) => {
    const deleteAppointment = async () => {
      try {
        setLoadingIds((prev) => [...prev, appointmentId]); // Sadece bu id için loading başlat
        const res = await fetch(`/api/v1/appointment/${appointmentId}`, {
          method: "DELETE",
        });
        if (res.ok) {
          setAppointments((prev) => prev.filter((appt) => appt.id !== appointmentId)); // Silinen randevuyu UI'dan çıkar
        } else {
          alert("An error occurred when deleting the appointment!");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingIds((prev) => prev.filter((id) => id !== appointmentId)); // Loading state'i kaldır
      }
    };
    deleteAppointment();
  };

  const handleUpdate = (appointment: Appointment) => {
    const encodedAppointment = encodeURIComponent(JSON.stringify(appointment));
    router.push(`/randevu?appointmentToBeUpdated=${encodedAppointment}`);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
        Randevularım
      </h1>

      {appointments && appointments.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {appointments.map((appointment: Appointment) => (
            <div
              key={appointment.id}
              className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 relative hover:shadow-xl transition-shadow"
            >
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Müşteri: {appointment.userName}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Tarih: {new Date(appointment.date).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Saat: {appointment.time}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Usta: {appointment.barberId}
              </p>
              <div className="absolute bottom-2 right-2 flex space-x-5">
                <Edit2Icon
                  onClick={() => handleUpdate(appointment)}
                  size={20}
                  className="cursor-pointer"
                />
                <Trash2Icon
                  onClick={() => handleDelete(appointment.id)}
                  size={20}
                  className="cursor-pointer"
                />
                {loadingIds.includes(appointment.id) && (
                  <span>
                    <Loader2Icon className="animate-spin" />
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600 dark:text-gray-400">Henüz randevu yok.</p>
      )}
    </div>
  );
};

export default IndexProfile;
