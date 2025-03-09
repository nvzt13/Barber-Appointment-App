"use client";

import { DateSelectionProps } from "@/types/type";
import React, { useState, useEffect, useCallback } from "react";
import { Calendar } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";


const DateSelection: React.FC<DateSelectionProps> = ({
  setFormData,
  willBeUpdatedDay,
}) => {
  const [selectedDate, setSelectedDate] = useState<string>(
    willBeUpdatedDay || new Date().toISOString()
  );

  const updateFormData = useCallback(() => {
    if (willBeUpdatedDay) {
      setFormData((prevFormData) => ({ ...prevFormData, date: willBeUpdatedDay }));
    } else {
      setFormData((prevFormData) => ({ ...prevFormData, date: new Date().toISOString() }));
    }
  }, [willBeUpdatedDay, setFormData]);

  useEffect(() => {
    updateFormData();
  }, [updateFormData]);

  const handleDateChange = (date: Date) => {
    const dateString = date.toISOString();
    setSelectedDate(dateString);
    setFormData((prevFormData) => ({ ...prevFormData, date: dateString }));
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
