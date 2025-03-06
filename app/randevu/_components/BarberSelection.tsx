import { BarberSelectionProps } from "@/types/type";
import React from "react";

const BarberSelection: React.FC<BarberSelectionProps> = ({
  barbers,
  formData,
  setFormData,
}) => {
  const handleBarberSelect = (barberId: string) => {
    setFormData({ ...formData, barberId });
  };
  return (
    <div className="flex flex-row flex-wrap items-center justify-center gap-6">
      {barbers?.map((barber) => (
        <div
          key={barber.id}
          className={`flex items-center space-x-4 p-5 border rounded-lg shadow-md cursor-pointer transition-colors ${
            formData.barberId === barber.id
              ? "bg-blue-300 border-blue-500"
              : "bg-white dark:bg-gray-800 border-gray-300"
          }`}
          onClick={() => handleBarberSelect(barber.id)}
        >
          <img
            src={barber.image}
            alt={barber.name}
            className="w-12 h-16 rounded-full object-cover"
          />
          <span className="text-lg font-medium text-gray-700">
            {barber.name}
          </span>
        </div>
      ))}
    </div>
  );
};

export default BarberSelection;
