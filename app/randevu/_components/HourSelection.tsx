import { FormDataProps } from "@/types/type";
import React, { useEffect, useState } from "react";

interface HourSelectionProps {
  formData: FormDataProps; // Kullanıcının seçtiği saat dilimi.
  setFormData: React.Dispatch<React.SetStateAction<{ time: string }>>;
}


const generateAllSlots = (start: number, end: number) => {
  const slots: string[] = [];
  for (let hour = start; hour <= end; hour++) {
    const formattedHour = hour < 10 ? `0${hour}:00` : `${hour}:00`;
    slots.push(formattedHour);
  }
  return slots;
};

const allSlots = generateAllSlots(9, 20);
const HourSelection: React.FC<HourSelectionProps> = ({
  formData,
  setFormData,
}) => {
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);

  useEffect(() => {
    const fetchAvailableSlots = async () => {
      if (!formData.barberId || !formData.date) {
        return;
      }
      try {
        const res = await fetch(`/api/v1/barber/${formData.barberId}/${formData.date}`);
        if (res.ok) {
          const data = await res.json(); 
          console.log(data)
          setBookedSlots(data.bookedSlots)
        } else {
          console.log(res)
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAvailableSlots();
  }, [formData.barberId, formData.date]);

  const handleSlotSelect = (slot: string) => {
    setFormData({ ...formData, time: slot });
  };

  return (
    <div className="grid grid-cols-4 gap-4 text-gray-900 w-92">
      {allSlots.map((slot) => {
        const isBooked = bookedSlots?.includes(slot);
        const isSelected = formData.time === slot;

        return (
          <div
            key={slot}
            className={`p-4 rounded-lg shadow-md 
            ${
              isBooked
                ? "bg-gray-900 cursor-not-allowed text-red-500"
                : "bg-green-100 hover:bg-blue-300 cursor-pointer"
            }
            ${isSelected ? "border-2 border-blue-500 bg-blue-400" : "border border-gray-300"}`}
            onClick={() => !isBooked && handleSlotSelect(slot)}
          >
            <span className="text-lg font-medium">
              {slot} {isBooked && "(Dolu)"}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default HourSelection;