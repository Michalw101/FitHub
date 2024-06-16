import React, { useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import '../css/trainerClasses.css'

export default function TrainerClasses() {
    const [date, setDate] = useState(new Date());

    const handleDateChange = (date) => {
        setDate(date);
        console.log("Selected date: ", date);
    };

    return (
        <div className="trainer-classes-container">
            <h1>Trainer Classes</h1>
            <Calendar
                onChange={handleDateChange}
                value={date}
            />
        </div>
    );
}
