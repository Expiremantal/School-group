import React, { useState } from 'react';
import CalendarComponent from 'react-calendar'; // Import the calendar component
import 'react-calendar/dist/Calendar.css'; // Import the default styles for the calendar
import './styles/Calendar.css'; // Optional: Custom styles for your calendar

const Calendar = () => {
  const [date, setDate] = useState(new Date()); // State to hold the selected date

  const handleDateChange = (selectedDate) => {
    setDate(selectedDate); // Update the state with the selected date
    console.log('Selected date:', selectedDate); // You can add additional logic here
  };

  return (
    <div className="calendar">
      <h2>Calendar</h2>
      <CalendarComponent 
        onChange={handleDateChange} 
        value={date} // Controlled component to manage the date
      />
      <p>Selected Date: {date.toDateString()}</p> {/* Display the selected date */}
    </div>
  );
};

export default Calendar;
