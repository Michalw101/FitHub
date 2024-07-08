import React from 'react';
import '../css/traineeClasses.css';
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
        <div className="class_card">
            {!isApproved && (<div className="class_icon">
                <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" height="38px" width="38px" version="1.1" id="heart" viewBox="0 0 471.701 471.701" xmlSpace="preserve">
                    <linearGradient id="gradientColor">
                        <stop offset="5%" stopColor="#7eaaff"></stop>
                        <stop offset="95%" stopColor="#ff48fb"></stop>
                    </linearGradient>
                    <g>
                        <path d="M433.601,67.001c-24.7-24.7-57.4-38.2-92.3-38.2s-67.7,13.6-92.4,38.3l-12.9,12.9l-13.1-13.1   c-24.7-24.7-57.6-38.4-92.5-38.4c-34.8,0-67.6,13.6-92.2,38.2c-24.7,24.7-38.3,57.5-38.2,92.4c0,34.9,13.7,67.6,38.4,92.3   l187.8,187.8c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-3.9l188.2-187.5c24.7-24.7,38.3-57.5,38.3-92.4   C471.801,124.501,458.301,91.701,433.601,67.001z M414.401,232.701l-178.7,178l-178.3-178.3c-19.6-19.6-30.4-45.6-30.4-73.3   s10.7-53.7,30.3-73.2c19.5-19.5,45.5-30.3,73.1-30.3c27.7,0,53.8,10.8,73.4,30.4l22.6,22.6c5.3,5.3,13.8,5.3,19.1,0l22.4-22.4   c19.6-19.6,45.7-30.4,73.3-30.4c27.6,0,53.6,10.8,73.2,30.3c19.6,19.6,30.3,45.6,30.3,73.3   C444.801,187.101,434.001,213.101,414.401,232.701z"></path>
                    </g>
                </svg>
            </div>)}
            <p className="class_title">{myClass.class_type}</p>
            <p className="class_title">{`${new Date(myClass.date).toLocaleDateString('he-IL')}`} {formatHourRange(myClass.hour)}</p>
            {isApproved && (
                <p className="class_title">Go to the link when the class starts: 
                    <a
                        href={myClass.link}
                        target="_blank"
                        rel="noopener noreferrer">
                        {myClass.link}
                    </a>
                </p>
            )}
            
            
            <p className="class_text">{myClass.trainer_first_name} {myClass.trainer_last_name}</p>
            <br />
            {!pastClass && withCancel && (
                <button className="card_btn" onClick={() => handleCancel(myClass.class_id)}>Cancel participation</button>
            )}<br />
        </div>
    );
}
