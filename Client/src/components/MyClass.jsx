import React, { useState, useEffect } from 'react';
import '../css/myClass.css';
import { serverRequests } from '../Api';

export default function MyClass({ myClass }) {
    const [registeredUsers, setRegisteredUsers] = useState([]);
    const [approvedUsers, setApprovedUsers] = useState([]);
    const [viewType, setViewType] = useState(null);

    const handleSeeRegisteredUsers = async () => {
        setViewType(viewType === 'registered' ? null : 'registered');

        const URL = `trainees/waiting?class_id=${myClass.class_id}`

        if (viewType !== 'registered') {
            if (registeredUsers.length === 0) {

                serverRequests('GET', URL, null)
                    .then(response => {
                        console.log(response);
                        if (!response.ok) {
                            return;
                        }
                        return response.json();
                    })
                    .then(data => {

                        setRegisteredUsers(data.trainees);
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
            }
        }
    };

    const handleSeeApprovedUsers = async () => {
        setViewType(viewType === 'approved' ? null : 'approved');

        const URL = `trainees/approved?class_id=${myClass.class_id}`

        if (viewType !== 'approved') {

            if (approvedUsers.length === 0) {

                serverRequests('GET', URL, null)
                    .then(response => {
                        console.log(response);
                        if (!response.ok) {
                            return;
                        }
                        return response.json();
                    })
                    .then(data => {

                        setApprovedUsers(data.trainees);
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
            }
        }
    };

    return (
        <div className="single-class-content">
            <h2>Your class...</h2>
            <div key={myClass.id} className="class-details">
                <p><strong>Description:</strong> {myClass.description}</p>
                <p><strong>Price:</strong> ${myClass.price}</p>

                <button onClick={handleSeeRegisteredUsers}>
                    {viewType === 'registered' ? 'Hide Registered Users' : 'Show Registered Users'}
                </button>
                <button onClick={handleSeeApprovedUsers}>
                    {viewType === 'approved' ? 'Hide Approved Users' : 'Show Approved Users'}
                </button>

                {viewType === 'registered' && (
                    <div>
                        <p><strong>Registered Trainees:</strong></p>
                        <ul>
                            {registeredUsers ? (registeredUsers.map(user => (
                                <li key={user.id}>{user.first_name}</li>
                            ))): <div>No Registered Trainees</div> }
                        </ul>
                    </div>
                )}

                {viewType === 'approved' && (
                    <div>
                        <p><strong>Approved Trainees:</strong></p>
                        <ul>
                            {approvedUsers ? (approvedUsers.map(user => (
                                <li key={user.id}>{user.first_name}</li>
                            ))) : <div>No Approved Trainees</div>}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}
