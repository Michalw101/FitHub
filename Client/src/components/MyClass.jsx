import React, { useState, useEffect } from 'react';
import '../css/myClass.css';
import { serverRequests } from '../Api';
import EditClassModal from './EditClassModal'

export default function MyClass({ myClass, myClasses, setMyClasses, pastClass }) {
    const [registeredUsers, setRegisteredUsers] = useState([]);
    const [approvedUsers, setApprovedUsers] = useState([]);
    const [viewType, setViewType] = useState(null);
    const [isApproved, setIsApproved] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const fetchRegisteredUsers = async () => {
            const URL = `trainees/waiting?class_id=${myClass.class_id}`;
            try {
                const response = await serverRequests('GET', URL, null);
                if (response.ok) {
                    const data = await response.json();
                    setRegisteredUsers(data.trainees);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        const fetchApprovedUsers = async () => {
            const URL = `trainees/approved?class_id=${myClass.class_id}`;
            try {
                const response = await serverRequests('GET', URL, null);
                if (response.ok) {
                    const data = await response.json();
                    setApprovedUsers(data.trainees);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchRegisteredUsers();
        fetchApprovedUsers();
    }, [myClass.class_id]);

    const handlePayedCheckboxChange = (user) => {
        const deleteUserUrl = `trainees/waiting?trainee_id=${user.user_id}&class_id=${myClass.class_id}`;
        const addUserUrl = `trainees/approved`;

        serverRequests('DELETE', deleteUserUrl, user)
            .then(response => {
                if (!response.ok) {
                    console.error("error");
                    return;
                }
                return response.json();
            })
            .then(() => {
                return serverRequests('POST', addUserUrl, { trainee_id: user.user_id, class_id: myClass.class_id });
            })
            .then(response => {
                if (!response.ok) {
                    console.error("error");
                    return;
                }
                return response.json();
            })
            .then(() => {
                setRegisteredUsers(registeredUsers.filter(trainee => trainee.user_id !== user.user_id));
                setApprovedUsers([...approvedUsers, user]);
                setIsApproved(true);
            })
            .catch(error => {
                console.error(error);
            });
    };

    useEffect(() => {
        if (isApproved) {
            setIsApproved(false);
        }
    }, [isApproved]);

    const handleSeeRegisteredUsers = () => {
        setViewType(viewType === 'registered' ? null : 'registered');
    };

    const handleSeeApprovedUsers = () => {
        setViewType(viewType === 'approved' ? null : 'approved');
    };

    function formatHourRange(startHour) {
        const [hours, minutes] = startHour.split(':').map(Number);
        const endHour = (hours + 1) % 24; 
        const formattedStartHour = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
        const formattedEndHour = `${String(endHour).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
      
        return `${formattedStartHour} - ${formattedEndHour}`;
    }

    const handleEditClick = () => {
        setIsEditing(true);
    };

    return (
        <div className="single-class-content">
            <div key={myClass.id} className="class-details">
                <p><strong>Description:</strong> {myClass.description}</p>
                <p><strong>Price:</strong> ${myClass.price}</p>
                <p><strong>At:</strong> {`${new Date(myClass.date).toLocaleDateString('he-IL')}`} {formatHourRange(myClass.hour)}</p>

                {!pastClass && (
                    <div>
                        <button onClick={handleSeeRegisteredUsers}>
                            {viewType === 'registered' ? 'Hide Registered Trainees' : 'Show Registered Trainees'}
                            {registeredUsers.length > 0 && <span className="badge">{registeredUsers.length}</span>}
                        </button>
                        <button onClick={handleEditClick}>Edit Class</button>
                    </div>
                )}
                <button onClick={handleSeeApprovedUsers}>
                    {viewType === 'approved' ? 'Hide Approved Trainees' : 'Show Approved Trainees'}
                    {approvedUsers.length > 0 && <span className={pastClass ? "past-badge" : "badge"}>{approvedUsers.length}</span>}
                </button>

                {viewType === 'registered' && (
                    <div>
                        <p><strong>Registered Trainees:</strong></p>
                        <div>
                            {registeredUsers.length !== 0 ? (
                                registeredUsers.map(user => (
                                    <div key={user.id}>
                                        <li>
                                            {user.first_name} {user.last_name} want to be in this class.
                                            <br />
                                            <input
                                                type='checkbox'
                                                onChange={() => handlePayedCheckboxChange(user)}
                                            />
                                            Did {user.first_name} Pay?
                                        </li>
                                        <br />
                                    </div>
                                ))
                            ) : (
                                <div>No Registered Trainees</div>
                            )}
                        </div>
                    </div>
                )}

                {viewType === 'approved' && (
                    <div>
                        <p><strong>Approved Trainees:</strong></p>
                        <div>
                            {approvedUsers.length !== 0 ? (
                                approvedUsers.map(user => (
                                    <div key={user.id}>{user.first_name}</div>
                                ))
                            ) : (
                                <div>No Approved Trainees</div>
                            )}
                        </div>
                    </div>
                )}

                {isEditing && (
                    <EditClassModal
                        myClass={myClass}
                        myClasses={myClasses}
                        setMyClasses={setMyClasses}
                        onClose={() => setIsEditing(false)}
                    />
                )}
            </div>
        </div>
    );
}
