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
        const waitingURL = `trainees/waiting?class_id=${myClass.class_id}`;
        serverRequests('GET', waitingURL, null)
            .then(response => {
                if (!response.ok) {
                    return;
                }
                return response.json();
            })
            .then((data) => {
                setRegisteredUsers(data.trainees);
            })
            .catch(error => {
                console.error(error);
            });

    }, [myClass.class_id]);

    useEffect(() => {
        const approvedURL = `trainees/approved?class_id=${myClass.class_id}`;
        serverRequests('GET', approvedURL, null)
            .then(response => {
                if (!response.ok) {
                    return;
                }
                return response.json();
            }).then((data) => {
                if (data) {
                    setApprovedUsers(data.trainees)
                }
            }).catch(error => {
                console.error(error);
            });
    }, [myClass.class_id])

    const handlePayedCheckboxChange = (user) => {
        const deleteUserUrl = `trainees/waiting?trainee_id=${user.user_id}&class_id=${myClass.class_id}`;
        const addUserUrl = `trainees/approved`;
        const postNotificationUrl = `notifications`;
        const note = `you've been approved to class ${myClass.description}`;

        serverRequests('DELETE', deleteUserUrl, user)
            .then(response => {
                if (!response.ok) {
                    console.error("error");
                    return;
                }
                return response.json();
            })
            .then(() => {
                serverRequests('POST', addUserUrl, { trainee_id: user.user_id, class_id: myClass.class_id })
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

                        serverRequests('POST', postNotificationUrl, { users: [user.user_id], message: note })
                            .then(response => {
                                if (!response.ok) {
                                    console.error("Error sending notification");
                                    return;
                                }
                                return response.json();
                            });
                    })
                    .catch(error => {
                        console.error(error);
                    });
            })
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


    function isClassWithinNextHour() {
        const now = new Date();
        const classDateTime = new Date(myClass.date);
        const [classHour, classMinute] = myClass.hour.split(':').map(Number);
        classDateTime.setHours(classHour, classMinute, 0, 0);

        const timeDifference = (classDateTime - now) / (1000 * 60);
        return timeDifference <= 60 && timeDifference >= 0;
    }


    const handleDeleteClick = () => {
        if (isClassWithinNextHour()) {
            alert("You cannot cancel the class as it is scheduled to start within the next hour.");
            return;
        }

        const confirmed = confirm(`Are you sure you want to cancel the class you will hold on ${new Date(myClass.date).toLocaleDateString('he-IL')}? We recommend that you cancel a lesson only if you really have to!`);
        if (!confirmed) return;

        const registeredTraineesUrl = `trainees/approved?class_id=${myClass.class_id}`;
        const deleteClassUrl = `classes/${myClass.class_id}`;
        const postNotificationUrl = `notifications`;
        const note = `your class ${myClass.description} canceled by the trainer :(`;

        serverRequests('GET', registeredTraineesUrl, null)
            .then(response => {
                if (!response.ok) {
                    console.error("Error fetching registered trainees");
                    return;
                }
                return response.json();
            })
            .then(data => {
                const usersToNote = data.trainees.map(user => user.user_id);

                return serverRequests('DELETE', deleteClassUrl, myClass)
                    .then(response => {
                        if (!response.ok) {
                            console.error("Error deleting class");
                            return;
                        }
                        return response.json();
                    })
                    .then(() => {
                        setMyClasses(myClasses.filter(cls => cls.class_id !== myClass.class_id));

                        serverRequests('POST', postNotificationUrl, { users: usersToNote, message: note })
                            .then(response => {
                                if (!response.ok) {
                                    console.error("Error sending notification");
                                    return;
                                }
                                return response.json();
                            });
                    })
            })
            .catch(error => {
                console.error("An error occurred:", error);
            });
    };




    return (
        <div className="single-class-content">
            <div key={myClass.id} className="class-details">
                {!pastClass && (
                    <div>
                        <button onClick={handleEditClick}>Edit Class</button>
                        <button onClick={handleDeleteClick}>Delete Class</button>
                    </div>
                )}

                <p><strong>Description:</strong> {myClass.description}</p>
                <p><strong>Price:</strong> ${myClass.price}</p>
                <p><strong>At:</strong> {`${new Date(myClass.date).toLocaleDateString('he-IL')}`} {formatHourRange(myClass.hour)}</p>

                {!pastClass && (
                    <div>
                        <p><strong>Link:</strong> {myClass.link}</p>
                        <button onClick={handleSeeRegisteredUsers}>
                            {viewType === 'registered' ? 'Hide Registered Trainees' : 'Show Registered Trainees'}
                            {registeredUsers.length > 0 && <span className="badge">{registeredUsers.length}</span>}
                            

                        </button>
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
