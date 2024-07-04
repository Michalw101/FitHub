import React, { useState, useEffect } from 'react';
import { serverRequests } from '../Api';

const Notifications = ({ userData }) => {

    const [notifications, setNotifications] = useState([]);

    useEffect(() => {

        const url = `notifications?user_id=${userData.user_id}`;

        serverRequests('GET', url, null)
            .then(response => {
                if (!response.ok) {
                    return;
                }
                return response.json();
            })
            .then(data => {
                if (data) {
                    setNotifications(data.notifications);
                }
            })
            .catch(error => {
                console.error('Error', error);
            });
    }, []);


    return (
        <div>
            {notifications.map((note) => {
                return (<h2>{note.note} </h2>)
            })}
        </div>
    );
};

export default Notifications;
