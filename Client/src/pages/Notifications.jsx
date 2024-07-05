import React, { useState, useEffect } from 'react';
import { serverRequests } from '../Api';
import Notification from '../components/Notification';
import '../css/notification.css';

const Notifications = ({ userData }) => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const url = `notifications?user_id=${userData.user_id}`;

        serverRequests('GET', url, null)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch notifications');
                }
                return response.json();
            })
            .then(data => {
                if (data && data.notifications) {
                    const notificationsWithRead = data.notifications.map(notification => ({
                        ...notification,
                        read: false
                    }));
                    setNotifications(notificationsWithRead);
                } else {
                    setNotifications([]);
                }
            })
            .catch(error => {
                console.error('Error', error);
                setNotifications([]);
            });
    }, [userData.user_id]);

    return (
        <div className="notifications-container">
            {notifications.length === 0 ? (
                <h2>No notifications yet</h2>
            ) : (
                notifications.map((note) => (
                    <Notification key={note.notification_id} note={note.note} />
                ))
            )}
        </div>
    );
};

export default Notifications;
