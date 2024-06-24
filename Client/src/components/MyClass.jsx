import React, { useState, useEffect } from 'react';
import '../css/myClass.css';
import { serverRequests } from '../Api';

export default function MyClass({ myClass }) {
    const [registeredUsers, setRegisteredUsers] = useState([]);
    const [approvedUsers, setApprovedUsers] = useState([]);
    const [viewType, setViewType] = useState(null);

    const handleSeeRegisteredUsers = async () => {
        setViewType(viewType === 'registered' ? null : 'registered');
        if (viewType !== 'registered') {
            const users = await serverRequests.getRegisteredUsers(myClass.id);
            setRegisteredUsers(users);
        }
    };

    const handleSeeApprovedUsers = async () => {
        setViewType(viewType === 'approved' ? null : 'approved');
        if (viewType !== 'approved') {
            const users = await serverRequests.getApprovedUsers(myClass.id);
            setApprovedUsers(users);
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
                        <p><strong>Registered Users:</strong></p>
                        <ul>
                            {registeredUsers.map(user => (
                                <li key={user.id}>{user.name}</li>
                            ))}
                        </ul>
                    </div>
                )}
                
                {viewType === 'approved' && (
                    <div>
                        <p><strong>Approved Users:</strong></p>
                        <ul>
                            {approvedUsers.map(user => (
                                <li key={user.id}>{user.name}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}
