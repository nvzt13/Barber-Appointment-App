"use client";

import { Appointment } from "@prisma/client";
import { Edit2Icon, Loader2Icon, Trash2Icon } from "lucide-react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";


interface UserProfilProps {
  appointments: Appointment[];
}

const IndexProfile: React.FC<UserProfilProps> = ({ appointments = [] }) => {
  console.log(appointments)
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false)

  const handleDelete = (appointmentId: string) => {
    const deleteAppointment = async () => {
      try{
        setLoading(true)
      const res = await fetch(`/api/v1/appointment/${appointmentId}`, {
        method: "DELETE"
      })
      if(res.ok){
        alert("Appointment deleted successfully")
        setLoading(false)
      }else {
        alert("An error accour when deleted appointment!")
        setLoading(false)
      }
    }catch(error){
      console.log(error)
      setLoading(false)
    }
    }
    deleteAppointment()
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
                Müşteri: {appointment.userId}
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
              
                  <Edit2Icon onClick={() => handleUpdate(appointment)} size={20} />
                  <Trash2Icon onClick={()=>
                  handleDelete(appointment.id)}size={20} /> { 
                  loading ? 
                  <span>
                  <Loader2Icon className="animate-spin" />
                  </span> : ""
                  }
              
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
