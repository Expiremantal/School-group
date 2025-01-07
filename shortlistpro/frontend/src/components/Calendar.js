import React from 'react';
import CalendarComponent from 'react-calendar';
import './styles/Calendar.css'
import 'react-calendar/dist/Calendar.css';

const Calendar = ({ selectedDate, setSelectedDate, interviewDates = [] }) => { // Default to empty array
    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    return (
        <div className="calendar-container">
            <h3>Interview Calendar</h3>
            <CalendarComponent
                onChange={handleDateChange}
                value={selectedDate}
                tileClassName={({ date }) => {
                    // Highlight days with interviews
                    const interview = interviewDates.find(
                        (interview) => interview.date === date.toDateString()
                    );
                    return interview ? 'highlight' : null;
                }}
            />
            {interviewDates?.length > 0 && (
                <div>
                    <h4>Scheduled Interviews:</h4>
                    <ul>
                        {interviewDates
                            .filter((interview) => interview.date === selectedDate.toDateString())
                            .map((interview, index) => (
                                <li key={index}>
                                    {interview.name} - {interview.time}
                                </li>
                            ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Calendar;
