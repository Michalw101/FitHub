import React from 'react';
import '../css/myClass.css';
import { serverRequests } from '../Api';

export default function TraineeClass({ userData, myClass, withCancel, pastClass, setApprovedClasses, approvedClasses, isApproved }) {

    function formatHourRange(startHour) {
        const [hours, minutes] = startHour.split(':').map(Number);
        const endHour = (hours + 1) % 24;
        const formattedStartHour = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
        const formattedEndHour = `${String(endHour).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;

        return `${formattedStartHour} - ${formattedEndHour}`;
    }

    const noteText = `Hi, ${userData.first_name} ${userData.last_name} canceled his participation in ${myClass.description} class. Please cancel the transfer of the Bit payment in the amount of $${myClass.price} to his number ${userData.phone}`;

    const handleCancel = (classId) => {
        const urlCancel = `trainees/cancel?trainee_id=${userData.user_id}&class_id=${classId}`;
        serverRequests('DELETE', urlCancel, userData)
            .then(response => {
                if (!response.ok) {
                    return;
                }
                setApprovedClasses(approvedClasses.filter(myClass => myClass.class_id !== classId));
            }).then(() => {
                serverRequests('POST', 'notifications', { users: [myClass.trainer_id], message: noteText })
                    .then(response => {
                        if (!response.ok) {
                            return;
                        }
                        return response.json();
                    })
                    .catch(error => {
                        console.error('Error creating class', error);
                    });
            })
            .catch(error => {
                console.error(error);
            });
    };

    return (
        <div className="single-class-content">
            <div key={myClass.class_id} className="class-details">
                <p><strong>Type:</strong> {myClass.class_type}</p>
                <p><strong>Price:</strong> ${myClass.price}</p>
                <p><strong>Trainer:</strong> {myClass.trainer_first_name} {myClass.trainer_last_name}</p>
                <p><strong>At:</strong> {`${new Date(myClass.date).toLocaleDateString('he-IL')}`} {formatHourRange(myClass.hour)}</p>
                {isApproved && (
                    <p><strong>Link:</strong> {myClass.link}</p>
                )}
                {!pastClass && withCancel && (
                    <button onClick={() => handleCancel(myClass.class_id)}>Cancel</button>
                )}
            </div>
        </div>
    );
}
