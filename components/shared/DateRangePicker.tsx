"use client";
import React, { useState } from "react";
import { Calendar } from "react-date-range";
import "react-date-range/dist/styles.css"; // Main style file
import "react-date-range/dist/theme/default.css"; // Theme css file

const SingleDatePicker = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div>
      <Calendar
        date={selectedDate}
        onChange={(date) => setSelectedDate(date)}
      />
      <div>
        <p>Selected Date: {selectedDate.toDateString()}</p>
      </div>
    </div>
  );
};

export default SingleDatePicker;
