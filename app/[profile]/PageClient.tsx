"use client";

import { Appointment } from "@prisma/client";
import { Edit2Icon, Loader2Icon, Trash2Icon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useCRUD from "@/hooks/useCRUD";

interface UserProfilProps {
  appointments: Appointment[];
}

const PageClient: React.FC<UserProfilProps> = ({ appointments }) => {
  const router = useRouter();
  const [willDeletedAppointmentId, setWillDeletedAppointmentId] = useState<string>("");
  const [fetchData, { loading, error, responseData: deleteAppointment }] = useCRUD();
  const [deleteMessage, setDeleteMessage] = useState<string | null>(null);

  useEffect(() => {
    if (willDeletedAppointmentId) {
      fetchData(`/api/appointments/${willDeletedAppointmentId}`, "delete", {
        appointmentId: willDeletedAppointmentId,
      });
    }
  }, [willDeletedAppointmentId]);

  useEffect(() => {
    if (deleteAppointment) {
      // Eğer deleteAppointment API'den dönen yanıt verisiyse
      setDeleteMessage(deleteAppointment.message || "Randevu başarıyla silindi.");
    }
  }, [deleteAppointment]);

  const handleDelete = (appointmentId: string) => {
    setWillDeletedAppointmentId(appointmentId);
  };

  const handleUpdate = (appointment: Appointment) => {
    const encodedAppointment = encodeURIComponent(JSON.stringify(appointment));
    router.push(`/form-data?appointmentToBeUpdated=${encodedAppointment}`);
  };

  useEffect(() => {
    if (appointments) {
      sessionStorage.setItem("userAppointments", JSON.stringify(appointments));
    }
  }, [appointments]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
        Randevularım
      </h1>

      {deleteMessage && (
        <p className="mb-4 text-green-600 dark:text-green-400">
          {deleteMessage}
        </p>
      )}

      {appointments && appointments.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {appointments.map((appointment: Appointment) => (
            <div
              key={appointment.id}
              className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 relative hover:shadow-xl transition-shadow"
            >
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Müşteri: {appointment.customerName}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Tarih: {new Date(appointment.date).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Saat: {appointment.time}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Usta: {appointment.barberName}
              </p>
              <div className="absolute bottom-2 right-2 flex space-x-5">
                <button
                  className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-500 transition-colors"
                  onClick={() => handleUpdate(appointment)}
                >
                  <Edit2Icon size={20} />
                </button>
                <button
                  className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-500 transition-colors"
                  onClick={() => handleDelete(appointment.id)}
                >
                  {loading && willDeletedAppointmentId === appointment.id ? (
                    <Loader2Icon className="animate-spin" size={20} />
                  ) : (
                    <Trash2Icon size={20} />
                  )}
                </button>
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

export default PageClient;
