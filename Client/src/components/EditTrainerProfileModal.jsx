import React, { useState } from 'react';
import '../css/editModal.css';
import { serverRequests } from '../Api';
import { useNavigate } from 'react-router-dom';

export default function EditTrainerProfileModal({ formData, setFormData, onClose }) {

    const [editFormData, setEditFormData] = useState({ ...formData })
    const navigate = useNavigate();

    const handleChanged = (e) => {
        const { name, value } = e.target;
        setEditFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSave = async () => {
        const url = `trainers/${editFormData.user_id}`;
        serverRequests('PUT', url, editFormData)
            .then(response => {
                return response.json();
            }).then(data => {
                if (data.ok == false) {
                    alert(data.res);
                    //note to admin
                    navigate('/');
                    return;
                }
                if (data) {
                    setFormData(data.trainer);
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
                <h1>Edit your profile...</h1>
                <br />
                <label>
                    <h4>First name</h4>
                    <div className='inputGroup'>
                        <input
                            type="text"
                            value={editFormData.first_name}
                            name="first_name"
                            onChange={handleChanged}
                        /></div>
                </label>
                <label>
                    <h4>Last name</h4>
                    <div className='inputGroup'>
                        <input
                            type="text"
                            value={editFormData.last_name}
                            name="last_name"
                            onChange={handleChanged}
                        /></div>
                </label>
                <label>
                    <h4>Email</h4>
                    <div className='inputGroup'>
                        <input
                            type="text"
                            value={editFormData.email}
                            name="email"
                            onChange={handleChanged}
                        /></div>
                </label>
                <label>
                    <h4>Phone</h4>
                    <div className='inputGroup'>
                        <input
                            type="text"
                            value={editFormData.phone}
                            name="phone"
                            onChange={handleChanged}
                        /></div>
                </label>
                <label>
                    <h4>Specialization</h4>
                    <div className='inputGroup'>
                        <input
                            type="text"
                            value={editFormData.specialization}
                            name="specialization"
                            onChange={handleChanged}
                        /></div>
                </label>
                <label>
                    <h4>Experience</h4>
                    <div className='inputGroup'>
                        <input
                            type="number"
                            value={editFormData.experience}
                            name="experience"
                            onChange={handleChanged}
                        /></div>
                </label>
                <label>
                    <h4>Twitter Link</h4>
                    <div className='inputGroup'>
                        <input
                            type="text"
                            value={editFormData.twitter_link}
                            name="twitter_link"
                            onChange={handleChanged}
                        /></div>
                </label>
                <label>
                    <h4>Facebook Link</h4>
                    <div className='inputGroup'>
                        <input
                            type="text"
                            value={editFormData.facebook_link}
                            name="facebook_link"
                            onChange={handleChanged}
                        /></div>
                </label>
                <label>
                    <h4>Instegram Link</h4>
                    <div className='inputGroup'>
                        <input
                            type="text"
                            value={editFormData.instegram_link}
                            name="instegram_link"
                            onChange={handleChanged}
                        /></div>
                </label>
                <br />
                <button className="bookmarkBtn" onClick={handleSave}>
                    <span className="IconContainer">
                        <svg viewBox="0 0 384 512" height="0.9em" className="icon">
                            <path
                                d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z"
                            ></path>
                        </svg>
                    </span>
                    <p className="text">Save</p>
                </button>
                <br />
            </div>
        </div>
    );
}