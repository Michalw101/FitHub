import React, { useState, useEffect } from 'react';
import '../css/editModal.css';
import { serverRequests } from '../Api';
import { useNavigate } from 'react-router-dom';


export default function EditTrainerProfileModal({ userData, setUserData, onClose }) {

    const navigate= useNavigate();
    const [firstName, setFirstName] = useState(userData.first_name);
    const [lastName, setLastName] = useState(userData.last_name);
    const [email, setEmail] = useState(userData.email);
    const [phone, setPhone] = useState(userData.phone);
    const [specialization, setSpecialization] = useState(userData.specialization);
    const [experience, setExperience] = useState(userData.experience);
    const [twitterLink, setTwitterLink] = useState(userData.twitter_link);
    const [facebookLink, setFacebookLink] = useState(userData.facebook_link);
    const [instegramLink, setInstegramLink] = useState(userData.instegram_link);

    const handleSave = async () => {
        const updatedUser = { ...userData, firstName, lastName, email, phone, specialization, experience, twitterLink, facebookLink, instegramLink };
        const url = `trainers/${userData.user_id}`;
        serverRequests('PUT', url, updatedUser)
            .then(response => {
                console.log(response);
                if (!response.ok) {
                    return;
                }
                return response.json();
            }).then(data => {
                if (data) {
                    setUserData(data.userDetails);
                    navigate("/trainer-home/trainer-profile")
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
                <h2>Edit your profile...</h2>
                <label>
                    First name:
                    <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </label>
                <br /><br />
                <label>
                    Last name:
                    <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </label>
                <br /><br />
                <label>
                    Email:
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>
                <br /><br />
                <label>
                    Phone:
                    <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </label>
                <br /><br /><label>
                    Specialization:
                    <input
                        type="text"
                        value={specialization}
                        onChange={(e) => setSpecialization(e.target.value)}
                    />
                </label>
                <br /><br />
                <label>
                    Experience:
                    <input
                        type="number"
                        value={experience}
                        onChange={(e) => setExperience(e.target.value)}
                    />
                </label>
                <br /><br /><label>
                    Twitter Link:
                    <input
                        type="text"
                        value={twitterLink}
                        onChange={(e) => setTwitterLink(e.target.value)}
                    />
                </label>
                <br /><br />
                <label>
                    Facebook Link:
                    <input
                        type="text"
                        value={facebookLink}
                        onChange={(e) => setFacebookLink(e.target.value)}
                    />
                </label>
                <br /><br />
                <label>
                    Instegram Link:
                    <input
                        type="text"
                        value={instegramLink}
                        onChange={(e) => setInstegramLink(e.target.value)}
                    />
                </label>
                <br /><br />
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

            </div>
        </div>
    );
}