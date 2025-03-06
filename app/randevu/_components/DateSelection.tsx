"use client";

import { DateSelectionProps, FormDataProps } from "@/types/type";
import React, { useState, useEffect } from "react";
import { Calendar } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const DateSelection: React.FC<DateSelectionProps> = ({
  formData,
  setFormData,
  willBeUpdatedDay,
}) => {
  const [selectedDate, setSelectedDate] = useState<string>(
    willBeUpdatedDay || new Date().toISOString()
  );

  useEffect(() => {
    if (willBeUpdatedDay) {
      setFormData({ ...formData, date: willBeUpdatedDay });
    } else {
      setFormData({ ...formData, date: new Date().toISOString() });
    }
  }, [willBeUpdatedDay, setFormData]);

  const handleDateChange = (date: Date) => {
    const dateString = date.toISOString();
    console.log(dateString);
    setSelectedDate(dateString);
    setFormData({ ...formData, date: dateString });
  };

  return (
    <div className="">
      <Calendar
        date={new Date(selectedDate)}
        onChange={(date) => handleDateChange(date)}
        minDate={new Date()}
      />
      <div>
        <p>Selected Date: {new Date(selectedDate).toDateString()}</p>
      </div>
    </div>
  );
};

export default DateSelection;
