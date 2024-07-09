import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/myClass.css';
import { serverRequests } from '../Api';
import EditClassModal from './EditClassModal'
import toast, { Toaster } from 'react-hot-toast';


export default function MyClass({ myClass, myClasses, setMyClasses, pastClass }) {
    const [registeredUsers, setRegisteredUsers] = useState([]);
    const [approvedUsers, setApprovedUsers] = useState([]);
    const [viewType, setViewType] = useState(null);
    const [isApproved, setIsApproved] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate();

    const notify = () => toast.success('Trainee added successfully!');

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
                        notify();

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
            .then((data) => {
                const usersToNote = data.trainees.map(user => user.user_id);

                return serverRequests('DELETE', deleteClassUrl, myClass)
                    .then(response => {

                        return response.json();
                    })
                    .then((data) => {
                        if (data.ok == false) {
                            alert(data.res);
                            serverRequests('POST', 'notifications', { users: [214955064, 214859415], message: data.message })
                                .then(response => {
                                    if (!response.ok) {
                                        return;
                                    }
                                    return response.json();
                                })
                                .catch(error => {
                                    console.error('Error ', error);
                                });
                            navigate('/');
                            return;
                        }
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
            {!pastClass && (
                <div className='buttonDiv'>
                    <button className="editBtn" onClick={handleEditClick}>
                        <svg height="1em" viewBox="0 0 512 512">
                            <path
                                d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"
                            ></path>
                        </svg>
                    </button>

                    <button className="deleteClass" onClick={handleDeleteClick}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 69 14"
                            className="svgIcon bin-top"
                        >
                            <g clipPath="url(#clip0_35_24)">
                                <path
                                    fill="black"
                                    d="M20.8232 2.62734L19.9948 4.21304C19.8224 4.54309 19.4808 4.75 19.1085 4.75H4.92857C2.20246 4.75 0 6.87266 0 9.5C0 12.1273 2.20246 14.25 4.92857 14.25H64.0714C66.7975 14.25 69 12.1273 69 9.5C69 6.87266 66.7975 4.75 64.0714 4.75H49.8915C49.5192 4.75 49.1776 4.54309 49.0052 4.21305L48.1768 2.62734C47.3451 1.00938 45.6355 0 43.7719 0H25.2281C23.3645 0 21.6549 1.00938 20.8232 2.62734ZM64.0023 20.0648C64.0397 19.4882 63.5822 19 63.0044 19H5.99556C5.4178 19 4.96025 19.4882 4.99766 20.0648L8.19375 69.3203C8.44018 73.0758 11.6746 76 15.5712 76H53.4288C57.3254 76 60.5598 73.0758 60.8062 69.3203L64.0023 20.0648Z"
                                ></path>
                            </g>
                            <defs>
                                <clipPath id="clip0_35_24">
                                    <rect fill="white" height="14" width="69"></rect>
                                </clipPath>
                            </defs>
                        </svg>

                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 69 57"
                            className="svgIcon bin-bottom"
                        >
                            <g clipPath="url(#clip0_35_22)">
                                <path
                                    fill="black"
                                    d="M20.8232 -16.3727L19.9948 -14.787C19.8224 -14.4569 19.4808 -14.25 19.1085 -14.25H4.92857C2.20246 -14.25 0 -12.1273 0 -9.5C0 -6.8727 2.20246 -4.75 4.92857 -4.75H64.0714C66.7975 -4.75 69 -6.8727 69 -9.5C69 -12.1273 66.7975 -14.25 64.0714 -14.25H49.8915C49.5192 -14.25 49.1776 -14.4569 49.0052 -14.787L48.1768 -16.3727C47.3451 -17.9906 45.6355 -19 43.7719 -19H25.2281C23.3645 -19 21.6549 -17.9906 20.8232 -16.3727ZM64.0023 1.0648C64.0397 0.4882 63.5822 0 63.0044 0H5.99556C5.4178 0 4.96025 0.4882 4.99766 1.0648L8.19375 50.3203C8.44018 54.0758 11.6746 57 15.5712 57H53.4288C57.3254 57 60.5598 54.0758 60.8062 50.3203L64.0023 1.0648Z"
                                ></path>
                            </g>
                            <defs>
                                <clipPath id="clip0_35_22">
                                    <rect fill="white" height="57" width="69"></rect>
                                </clipPath>
                            </defs>
                        </svg>
                    </button>

                </div>
            )}

            <br />
            <p className="class_title">{myClass.description}</p>
            <p className="class_title">{myClass.class_type}</p>
            <p className='class_title'>{`${new Date(myClass.date).toLocaleDateString('he-IL')}`} {formatHourRange(myClass.hour)}</p>
            {!pastClass && (
                <p className="class_title">
                    <a
                        href={myClass.link}
                        target="_blank"
                        rel="noopener noreferrer">
                        {myClass.link}
                    </a>
                </p>
            )}
            <br />
            <div className='divBtn'>
                {!pastClass && (
                    <div>
                        <button onClick={handleSeeRegisteredUsers} className='registered_btn'>
                            {viewType === 'registered' ? 'Hide Registered Trainees' : 'Show Registered Trainees'}
                            {registeredUsers.length > 0 && <span className="badge">{registeredUsers.length}</span>}
                        </button>
                    </div>
                )}
                <button onClick={handleSeeApprovedUsers} className='registered_btn'>
                    {viewType === 'approved' ? 'Hide Approved Trainees' : 'Show Approved Trainees'}
                    {approvedUsers.length > 0 && <span className={pastClass ? "past-badge" : "badge"}>{approvedUsers.length}</span>}
                </button>
            </div>
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
<Toaster/>
            {isEditing && (
                <EditClassModal
                    myClass={myClass}
                    myClasses={myClasses}
                    setMyClasses={setMyClasses}
                    onClose={() => setIsEditing(false)}
                />
            )}

        </div >
    );
}
