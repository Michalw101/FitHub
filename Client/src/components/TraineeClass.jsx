import React from 'react';
import '../css/myClass.css';

export default function TraineeClass({ myClass }) {
    function formatHourRange(startHour) {
        const [hours, minutes] = startHour.split(':').map(Number);
        const endHour = (hours + 1) % 24;
        const formattedStartHour = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
        const formattedEndHour = `${String(endHour).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;

        return `${formattedStartHour} - ${formattedEndHour}`;
    }

    return (
        <div className="single-class-content">
            <div key={myClass.class_id} className="class-details">
                <p><strong>Type:</strong> {myClass.class_type}</p>
                <p><strong>Price:</strong> ${myClass.price}</p>
                <p><strong>Trainer:</strong> {myClass.trainer_first_name} {myClass.trainer_last_name} </p>

                <p><strong>At:</strong> {`${new Date(myClass.date).toLocaleDateString('he-IL')}`} {formatHourRange(myClass.hour)}</p>
            </div>
        </div>
    );
}
