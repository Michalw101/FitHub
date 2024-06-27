import React, { useState, useEffect } from 'react';
import '../css/editModal.css';
import { serverRequests } from '../Api';

export default function EditClassModal({ myClass,myClasses, setMyClasses, onClose }) {
    const [description, setDescription] = useState(myClass.description);
    const [price, setPrice] = useState(myClass.price);

    const handleSave = async () => {
        const updatedClass = { ...myClass, description, price };
        const url = `classes/${myClass.class_id}`;
        serverRequests('PUT', url, updatedClass)
            .then(response => {
                console.log(response);
                if (!response.ok) {
                    return;
                }
                return response.json();
            }).then(data => {
                if (data) {
                    setMyClasses(myClasses.filter(cls => cls.class_id !== myClass.class_id));
                    setMyClasses(prevMyClasses => [...prevMyClasses, data.myClass]);
                    onClose();
                }
            }).catch(error => {
                console.error('Error', error);
            });
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>❌</button>
                <h2>Edit Class</h2><br/>
                <label>
                    Description:
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </label>
                <br/><br/>
                <label>
                    Price:
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </label>
                <br/><br/>
                <button onClick={handleSave}>Save</button>
            </div>
        </div>
    );
}