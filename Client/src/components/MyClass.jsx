import React, { useState, useEffect } from 'react';
import '../css/myClass.css';
import { serverRequests } from '../Api';

export default function MyClass({ myClass }) {
    const [registeredUsers, setRegisteredUsers] = useState([]);
    const [approvedUsers, setApprovedUsers] = useState([]);
    const [viewType, setViewType] = useState(null);
    const [isApproved, setIsApproved] = useState(false);
    const [registeredUsersLoaded, setRegisteredUsersLoaded] = useState(false);
    const [approvedUsersLoaded, setApprovedUsersLoaded] = useState(false);

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

    const handleSeeRegisteredUsers = async () => {
        setViewType(viewType === 'registered' ? null : 'registered');

        if (!registeredUsersLoaded) {
            const URL = `trainees/waiting?class_id=${myClass.class_id}`;

            serverRequests('GET', URL, null)
                .then(response => {
                    if (!response.ok) {
                        return;
                    }
                    return response.json();
                })
                .then(data => {
                    setRegisteredUsers(data.trainees);
                    setRegisteredUsersLoaded(true);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
    };

    const handleSeeApprovedUsers = async () => {
        setViewType(viewType === 'approved' ? null : 'approved');

        if (!approvedUsersLoaded) {
            const URL = `trainees/approved?class_id=${myClass.class_id}`;

            serverRequests('GET', URL, null)
                .then(response => {
                    if (!response.ok) {
                        return;
                    }
                    return response.json();
                })
                .then(data => {
                    setApprovedUsers(data.trainees);
                    setApprovedUsersLoaded(true);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
    };

    return (
        <div className="single-class-content">
            <div key={myClass.id} className="class-details">
                <p><strong>Description:</strong> {myClass.description}</p>
                <p><strong>Price:</strong> ${myClass.price}</p>
                <p><strong>At:</strong> {`${new Date(myClass.date).toLocaleDateString('he-IL')}`}</p>

                <button onClick={handleSeeRegisteredUsers}>
                    {viewType === 'registered' ? 'Hide Registered Trainees' : 'Show Registered Trainees'}
                </button>
                <button onClick={handleSeeApprovedUsers}>
                    {viewType === 'approved' ? 'Hide Approved Trainees' : 'Show Approved Trainees'}
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
            </div>
        </div>
    );
}
