import { Button } from "@/components/ui/button";
import {  HourSelectionProps } from "@/types/type";
import React, { useEffect, useState } from "react";

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
        const res = await fetch(
          `/api/v1/barber/${formData.barberId}/${formData.date}`
        );
        if (res.ok) {
          const data = await res.json();
          console.log(data);
          setBookedSlots(data);
        } else {
          console.log(res);
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
    <div className="grid grid-cols-4 gap-4 w-92">
      {allSlots.map((slot) => {
        const isBooked = bookedSlots?.includes(slot);
        const isSelected = formData.time === slot;
        return (
          <Button
            disabled={isBooked}
            type="button"
            key={slot}
            className={`p-4 rounded-lg shadow-md text-gray-900 bg-green-100 hover:bg-blue-300 cursor-pointer
            
            ${
              isSelected
                ? "border-2 border-blue-500 bg-blue-400"
                : "border border-gray-300"
            }`}
            onClick={() => !isBooked && handleSlotSelect(slot)}
          >
            {slot}
          </Button>
        );
      })}
    </div>
  );
};

export default HourSelection;
