import React from 'react';
import '../css/notification.css';

export default function Notification({ note, id, date, hour, is_read }) {
    return (
            <div className={`notification ${is_read ? 'read' : ''}`}>
                <div className="notiglow"></div>
                <div className="notiborderglow"></div>
                <div className="notititle">{date} {hour}</div>
                <div className="notibody">{note}</div>
            </div>
    );
}
