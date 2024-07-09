import React, { useState, useEffect } from 'react';
import { serverRequests } from '../Api';
import Notification from '../components/Notification';
import '../css/notification.css';

const Notifications = ({ userData }) => {
    const [notifications, setNotifications] = useState([]);

    const fetchNotifications = () => {
        const urlFetch = `notifications?user_id=${userData.user_id}`;

        serverRequests('GET', urlFetch, null)
            .then(response => response.json())
            .then(data => {
                if (data && data.notifications) {
                    const sortedNotifications = data.notifications.sort((a, b) => new Date(b.hour) - new Date(a.hour)).reverse();
                    setNotifications(sortedNotifications);
                } else {
                    setNotifications([]);
                }
            })
            .catch(error => {
                console.error('Error', error);
            });
    };

    const updateNotifications = () => {
        if (notifications.length === 0) return;

        const url = `notifications`;
        const notificationsId = notifications.map(note => note.notification_id);

        serverRequests('PUT', url, { notifications: notificationsId })
            .then(response => response.json())
            .then(data => {
                if (!data || data.ok === false) {
                    alert("Error updating notifications");
                }
            })
            .catch(error => {
                console.error('Error', error);
            });
    };

    useEffect(() => {
        const fetchAndMarkNotifications = async () => {
            await fetchNotifications();
            updateNotifications();
        };

        fetchAndMarkNotifications();

        const intervalId = setInterval(fetchNotifications, 5000);

        return () => clearInterval(intervalId);
    }, [userData.user_id]);

    const formatDate = (date) => {
        const d = new Date(date);
        const day = d.getDate();
        const month = d.getMonth() + 1;
        const year = d.getFullYear();

        return `${day}.${month}.${year}`;
    };

    return (
        <div className="notifications-container">
            {notifications.length === 0 ? (
                <h2>No notifications yet</h2>
            ) : (
                notifications.map((note) => (
                    <div key={note.notification_id} className="notification-item">
                        <Notification
                            note={note.note}
                            id={note.notification_id}
                            date={formatDate(note.date)}
                            hour={note.hour}
                            is_read={note.is_read}
                        />
                        <br />
                    </div>
                ))
            )}
        </div>
    );
};

export default Notifications;
