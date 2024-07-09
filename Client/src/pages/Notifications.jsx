import React, { useState, useEffect } from 'react';
import { serverRequests } from '../Api';
import Notification from '../components/Notification';
import '../css/notification.css';

const Notifications = ({ userData }) => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const urlFetch = `notifications?user_id=${userData.user_id}`;
        const urlMarkAsRead = `notifications/markAsRead?user_id=${userData.user_id}`;

        const fetchAndMarkNotifications = () => {
            serverRequests('GET', urlFetch, null)
                .then((response) => response.json())
                .then((data) => {
                    if (data && data.notifications) {
                        setNotifications(data.notifications);
                    } else {
                        setNotifications([]);
                    }
                    return serverRequests('PUT', urlMarkAsRead, null);
                })
                .then((response) => response.json())
                .catch((error) => {
                    console.error('Error', error);
                });
        };

        fetchAndMarkNotifications();

        const intervalId = setInterval(fetchAndMarkNotifications, 5000); 

        return () => clearInterval(intervalId); 
    }, [userData.user_id]);

    return (
        <div className="notifications-container">
            {notifications.length === 0 ? (
                <h2>No notifications yet</h2>
            ) : (
                notifications.map((note) => (
                    <React.Fragment key={note.notification_id}>
                        <Notification note={note.note} id={note.notification_id} date={note.date} hour={note.hour} is_read={note.is_read} />
                        <br />
                    </React.Fragment>
                ))
            )}
        </div>
    );
};

export default Notifications;
