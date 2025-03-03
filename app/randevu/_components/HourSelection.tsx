import { FormDataProps } from "@/types/type";
import { Appointment } from "@prisma/client";
import React from "react";

interface HourSelectionProps {
  allSlots: string[]; // Tüm saat dilimlerini temsil eder (örn: "09:00", "10:00", vs.).
  bookedSlots: string[]; // Rezervasyon yapılmış saat dilimleri.
  availableSlots: string[]; // Kullanıcıya sunulabilecek uygun saat dilimleri.
  formData: FormDataProps; // Kullanıcının seçtiği saat dilimi.
  setFormData: React.Dispatch<React.SetStateAction<{ time: string }>>;
}

const HourSelection: React.FC<HourSelectionProps> = ({
  allSlots,
  bookedSlots,
  availableSlots,
  formData,
  setFormData,
}) => {
  const handleSlotSelect = (slot: string) => {
    setFormData({ ...formData, time: slot });
  };

  return (
    <div className="grid grid-cols-4 gap-4 text-gray-900 w-92">
      {allSlots.map((slot) => {
        const isBooked = bookedSlots.includes(slot);
        const isAvailable = availableSlots.includes(slot);
        const isSelected = formData.time === slot;

        return (
          <div
            key={slot}
            className={`p-4 rounded-lg shadow-md 
            ${
              isBooked
                ? "bg-gray-200 cursor-not-allowed text-red-500"
                : isAvailable
                ? "bg-green-100 hover:bg-blue-300 cursor-pointer"
                : "bg-white hover:bg-gray-100 cursor-pointer"
            }
            ${isSelected ? "border-2 border-blue-500 bg-blue-400" : "border border-gray-300"}`}
            onClick={() => !isBooked && isAvailable && handleSlotSelect(slot)}
          >
            <span className="text-lg font-medium">
              {slot} {isBooked && "(Booked)"}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default HourSelection;
