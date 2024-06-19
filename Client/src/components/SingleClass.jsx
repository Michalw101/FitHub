import React from 'react';

const SingleClass = ({ event, onClose }) => {
    return (
        <div className="single-class-modal">
            <div className="single-class-content">
                <button className="close-button" onClick={onClose}>❌</button>
                <h2>Class Details</h2><br></br>
                <p><strong>Description:</strong> {event.title}</p>
                <p><strong>Date:</strong> {new Date(event.from).toLocaleDateString()}</p>
                <p><strong>Time:</strong> {`${new Date(event.from).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${new Date(event.to).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`}</p>
                <p><strong>Price:</strong> ${event.price}</p>
                <p><strong>Trainer:</strong> {event.trainer.first_name} {event.trainer.last_name}</p>
            </div>
        </div>
    );
};

export default SingleClass;
