import React from 'react';
import '../css/notification.css';

export default function Notification({ note }) {
    return (
        <div className="notification">
            <p>{note}</p>
        </div>
    );
}
