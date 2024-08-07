import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../App';
import { serverRequests } from '../Api';
import '../css/trainerDetailsProfile.css';
import EditTrainerProfileModal from './EditTrainerProfileModal'

export default function TrainerProfile() {

    const userData = useContext(UserContext);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({ ...userData });
    const [changePassword, setChangePassword] = useState(false);
    const [newPassword, setNewPassword] = useState({ new: "", verify: "", old: "" })
    const [newPasswordError, setChangePasswordError] = useState("");
    const [salt, setSalt] = useState('');
    let birthDate = new Date(formData.birth_date);
    let formattedDate = birthDate.toLocaleDateString('he-IL');


    useEffect(() => {
        if (userData) {
            setFormData({ ...userData });
        }
    }, [userData]);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleNewPaswordChanged = (e) => {
        const { name, value } = e.target;
        setNewPassword((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    }

    const handlePasswordClicked = () => {
        if (newPassword.new !== newPassword.verify) {
            setChangePasswordError("Passwords must match");
            return;
        }

        serverRequests('GET', `login/${formData.user_id}`, null)
            .then(response => response.json())
            .then(data => {
                if (data && data.salt) {
                    setSalt(data.salt);
                } else {
                    setChangePasswordError("Error fetching salt");
                }
            })
            .catch(error => {
                console.error('Error:', error);
                setChangePasswordError("Error fetching salt");
            });
    }


    useEffect(() => {
        if (salt) {

            serverRequests('POST', 'login', { password: newPassword.old, salt: salt, user_id: formData.user_id })
                .then(response => {
                    console.log(response);
                    if (!response.ok) {
                        setChangePasswordError("Incorrect old password");
                        setSalt('')
                        return;
                    }
                    return response.json();
                })
                .then(data => {
                    if (data) {
                        serverRequests('PUT', `users/password/${formData.user_id}`, { password: newPassword.new })
                            .then(response => {
                                return response.json()
                            })
                            .then(data => {
                                if (data) {
                                    alert(data.message);
                                    setChangePasswordError('');
                                    setChangePassword(false);
                                    setNewPassword({ new: "", verify: "", old: "" });
                                }
                            })
                            .catch(error => {
                                console.error('Error:', error);
                                setChangePasswordError(error.message);
                            });
                    }
                })
                .catch(error => {
                    setLoginError('Error', error);
                });
        }
    }, [salt]);


    return (
        <div className="card">
            <div className="card__img"></div>
            <div className="card__descr-wrapper">
                <button className="editBtn" onClick={handleEditClick}>
                    <svg height="1em" viewBox="0 0 512 512">
                        <path
                            d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"
                        ></path>
                    </svg>
                </button><br />
                {isEditing && (
                    <EditTrainerProfileModal
                        formData={formData}
                        setFormData={setFormData}
                        onClose={() => setIsEditing(false)}
                    />
                )}
                <div className='nameDiv'>
                    <svg fill="#000000" height="35px" width="35px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
                        viewBox="0 0 512 512" xmlSpace="preserve">
                        <g>
                            <g>
                                <path d="M484.267,239.303v-50.351c0-27.906-22.707-50.61-50.62-50.61c-6.088,0-11.929,1.081-17.341,3.06c-1.623-26.465-23.656-47.502-50.52-47.502c-27.915,0-50.625,22.713-50.625,50.631v94.778H196.834v-94.778c0-27.918-22.71-50.631-50.626-50.631c-26.863,0-48.897,21.036-50.519,47.502c-5.412-1.979-11.253-3.06-17.341-3.06c-27.912,0-50.62,22.703-50.62,50.61v50.358H0v33.391h27.729v50.337c0,27.918,22.707,50.631,50.62,50.631c6.088,0,11.93-1.082,17.342-3.061c1.627,26.46,23.659,47.492,50.518,47.492c27.916,0,50.626-22.713,50.626-50.631v-94.768h118.327v94.768c0,27.918,22.71,50.631,50.625,50.631c26.86,0,48.891-21.032,50.518-47.492c5.412,1.98,11.253,3.061,17.342,3.061c27.912,0,50.62-22.713,50.62-50.631v-50.343l27.725,0.007L512,239.31L484.267,239.303z M95.583,323.038c0,9.505-7.731,17.24-17.234,17.24c-9.5,0-17.229-7.733-17.229-17.24V188.952c0-9.494,7.728-17.219,17.229-17.219c9.503,0,17.234,7.723,17.234,17.219V323.038z M163.445,367.468c0,9.506-7.731,17.24-17.235,17.24c-9.503,0-17.234-7.733-17.234-17.24v-44.431V188.952v-44.42c0-9.506,7.731-17.24,17.234-17.24c9.504,0,17.235,7.733,17.235,17.24V367.468z M383.022,188.952v134.086v44.43c0,9.506-7.731,17.24-17.234,17.24s-17.234-7.733-17.234-17.24V144.532c0-9.506,7.731-17.24,17.234-17.24s17.234,7.733,17.234,17.24V188.952z M450.876,323.037c0,9.506-7.728,17.24-17.229,17.24c-9.503,0-17.234-7.733-17.234-17.24V188.952c0-9.494,7.731-17.219,17.234-17.219c9.5,0,17.229,7.723,17.229,17.219V323.037z" />
                            </g>
                        </g>
                    </svg>
                    <p className="card__title">
                        {formData.first_name} {formData.last_name}
                    </p>
                </div>

                <div className='emailDiv'>
                    <svg width="22px" height="22px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12ZM16 12V13.5C16 14.8807 17.1193 16 18.5 16V16C19.8807 16 21 14.8807 21 13.5V12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21H16" stroke="#000000" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <p className="card__email">
                        {formData.email}
                    </p>
                </div>

                <div className='phoneDiv'>
                    <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M14.795 2h-5.59c-1.115 0-1.519.116-1.926.334a2.272 2.272 0 0 0-.945.945C6.116 3.686 6 4.09 6 5.205v13.59c0 1.114.116 1.519.334 1.926.218.407.538.727.945.945.407.218.811.334 1.926.334h5.59c1.114 0 1.519-.116 1.926-.334.407-.218.727-.538.945-.945.218-.407.334-.811.334-1.926V5.205c0-1.115-.116-1.519-.334-1.926a2.272 2.272 0 0 0-.945-.945C16.314 2.116 15.91 2 14.795 2zM8 17.995V6.005h8v11.99H8z" fill="#000000" /></svg>
                    <p className="card__phone">
                        {formData.phone}
                    </p>
                </div>
                <div className='aboutDiv'>
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M2 8C2 7.44772 2.44772 7 3 7H21C21.5523 7 22 7.44772 22 8C22 8.55228 21.5523 9 21 9H3C2.44772 9 2 8.55228 2 8Z"
                            fill="#000000"
                        />
                        <path
                            d="M2 12C2 11.4477 2.44772 11 3 11H21C21.5523 11 22 11.4477 22 12C22 12.5523 21.5523 13 21 13H3C2.44772 13 2 12.5523 2 12Z"
                            fill="#000000"
                        />
                        <path
                            d="M3 15C2.44772 15 2 15.4477 2 16C2 16.5523 2.44772 17 3 17H15C15.5523 17 16 16.5523 16 16C16 15.4477 15.5523 15 15 15H3Z"
                            fill="#000000"
                        />
                    </svg>
                    <p className="card__descr">
                        The best about me:
                    </p>
                    <p className="card__descr">
                        {formData.specialization}
                    </p>
                </div>
                <br />
                <div className='genderDiv'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" viewBox="0 0 42 32">
                        <g fill="#808184">
                            <path d="M10.946 4.352c-3.455 0-6.266 2.811-6.266 6.266s2.811 6.265 6.266 6.265 6.266-2.811 6.266-6.265-2.811-6.266-6.266-6.266zm0 11.53c-2.903 0-5.266-2.362-5.266-5.265s2.362-5.266 5.266-5.266 5.266 2.362 5.266 5.266-2.362 5.265-5.266 5.265z" />
                            <path d="M39.822.282l-5.85 1.594c-0.518 0.141-0.912 0.535-1.053 1.053-0.142 0.518-0.002 1.057 0.373 1.442l0.522 0.536-1.603 1.49c-1.757-1.222-3.791-1.865-5.909-1.865-2.031 0-3.994 0.588-5.715 1.707C18.72 2.12 14.285-0.437 9.723 0.067 4.791 0.615 0.862 4.594 0.38 9.528-0.14 14.855 2.979 19.421 8 20.77V23H6.595c-1.313 0-2.422 1.145-2.422 2.5S5.282 28 6.595 28H8v1.578C8 30.891 9.145 32 10.5 32s2.5-1.109 2.5-2.422V28h1.282c1.313 0 2.422-1.145 2.422-2.5S15.595 23 14.282 23H13v-1.999c1.53-0.236 2.583-0.719 3.676-1.443 0.727 1.626 1.81 3 3.227 4.088 1.784 1.37 4.032 2.125 6.329 2.125 2.521 0 4.958-0.885 6.858-2.493 4.012-3.392 4.968-8.792 2.397-13.261L37.224 8.4l0.344 0.353c0.285 0.292 0.665 0.453 1.069 0.453 0.683 0 1.28-0.46 1.454-1.118l1.575-5.976c0.12-0.453 0.025-0.925-0.26-1.295-0.308-0.407-0.946-0.624-1.527-0.466zM39.125 7.833c-0.068 0.258-0.294 0.373-0.487 0.373-0.094 0-0.231-0.026-0.353-0.151L37.6 7.352c-0.19-0.195-0.5-0.203-0.699-0.017l-2.391 2.227c-0.175 0.163-0.21 0.428-0.083 0.63 2.562 4.103 1.748 9.169-1.981 12.323-1.721 1.456-3.927 2.257-6.213 2.257-2.079 0-4.11-0.681-5.72-1.918-1.435-1.102-2.492-2.527-3.143-4.236-0.055-0.145-0.174-0.255-0.323-0.3-0.148-0.045-0.309-0.018-0.435 0.071-1.296 0.925-2.344 1.466-4.169 1.679C12.19 20.097 12 20.311 12 20.564V23.5c0 0.276 0.224 0.5 0.5 0.5h1.782c0.771 0 1.422 0.687 1.422 1.5S15.052 27 14.282 27H12.5c-0.276 0-0.5 0.224-0.5 0.5v2.078C12 30.349 11.313 31 10.5 31S9 30.349 9 29.578V27.5C9 27.224 8.776 27 8.5 27H6.595c-0.771 0-1.422-0.687-1.422-1.5S5.824 24 6.595 24H8.5C8.776 24 9 23.776 9 23.5v-3.121c0-0.233-0.161-0.435-0.387-0.487-4.744-1.097-7.72-5.319-7.237-10.268 0.436-4.466 3.993-8.067 8.458-8.563 4.415-0.494 8.522 2.083 10.064 6.117 0.056 0.146 0.176 0.257 0.326 0.301 0.149 0.045 0.311 0.016 0.437-0.077 1.668-1.224 3.62-1.872 5.643-1.872 2.037 0 3.989 0.661 5.647 1.911 0.192 0.145 0.463 0.132 0.641-0.033l2.279-2.119c0.099-0.092 0.156-0.219 0.16-0.354 0.003-0.135-0.048-0.265-0.142-0.361l-0.88-0.902c-0.18-0.185-0.147-0.397-0.125-0.48 0.023-0.083 0.103-0.283 0.351-0.351l5.85-1.594c0.198-0.053 0.405 0.019 0.529 0.18 0.056 0.072 0.141 0.223 0.086 0.43L39.125 7.833z" />
                            <path d="M26.319 8.943c-1.673 0-3.247 0.651-4.43 1.835-1.184 1.183-1.835 2.757-1.835 4.43s0.652 3.247 1.835 4.43c1.183 1.184 2.757 1.835 4.43 1.835s3.247-0.652 4.43-1.835c1.184-1.183 1.835-2.757 1.835-4.43s-0.651-3.247-1.835-4.43c-1.183-1.184-2.757-1.835-4.43-1.835zm3.723 9.989c-0.995 0.995-2.317 1.542-3.723 1.542s-2.729-0.548-3.723-1.542-1.542-2.317-1.542-3.723 0.548-2.729 1.542-3.723 2.317-1.542 3.723-1.542 2.729 0.547 3.723 1.542 1.542 2.317 1.542 3.723-0.548 2.729-1.542 3.723z" />
                        </g>
                    </svg>

                    <p className="card__descr">
                        Gender: {formData.gender}
                    </p>
                </div>
                <br />
                <div className='genderDiv'>
                    <svg width="22px" height="22px" viewBox="0 -5 64 64" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">

                        <title>Birthday-cake</title>
                        <desc>Created with Sketch.</desc>
                        <defs>

                        </defs>
                        <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" sketch:type="MSPage">
                            <g id="Birthday-cake" sketch:type="MSLayerGroup" transform="translate(1.000000, 1.000000)" stroke="#6B6C6E" strokeWidth="2">
                                <path d="M60,28 L60,50 C60,51.1 59.1,52 58,52 L4,52 C2.9,52 2,51.1 2,50 L2,28" id="Shape" sketch:type="MSShapeGroup">

                                </path>
                                <path d="M47,29.8 C39,34.8 38.8,29.1 31,29.1 C23.2,29.1 21,34.8 14,29.8 C1.1,35 0,22 0,22 C0,20.9 0.4,18 2,18 C2,18 7,16 31.1,16 C55.2,16 60,18 60,18 C61.6,18 62,20.9 62,22 C62,22 61.1,34.9 47,29.8 L47,29.8 Z" id="Shape" sketch:type="MSShapeGroup">

                                </path>
                                <path d="M2.3,37 L59.9,36.945" id="Shape" sketch:type="MSShapeGroup">

                                </path>
                                <path d="M2.3,44 L59.9,43.945" id="Shape" sketch:type="MSShapeGroup">

                                </path>
                                <path d="M9,16.9 L9,10" id="Shape" sketch:type="MSShapeGroup">

                                </path>
                                <path d="M53,16.9 L53,10" id="Shape" sketch:type="MSShapeGroup">

                                </path>
                                <path d="M42,15.9 L42,10" id="Shape" sketch:type="MSShapeGroup">

                                </path>
                                <path d="M31,15.9 L31,10" id="Shape" sketch:type="MSShapeGroup">

                                </path>
                                <path d="M20,15.9 L20,10" id="Shape" sketch:type="MSShapeGroup">

                                </path>
                                <path d="M11.9,6.8 C11.9,8.5 10.6,9.8 8.9,9.8 C7.3,9.8 5.9,8.4 5.9,6.8 C5.9,5.1 7.2,0 8.9,0 C10.6,0 11.9,5.1 11.9,6.8 L11.9,6.8 Z" id="Shape" sketch:type="MSShapeGroup">

                                </path>
                                <path d="M23,7 C23,8.7 21.7,10.1 20,10.1 C18.3,10.1 17,8.7 17,7 C17,5.3 18.3,0 20,0 C21.7,0 23,5.3 23,7 L23,7 Z" id="Shape" sketch:type="MSShapeGroup">

                                </path>
                                <path d="M34,7 C34,8.7 32.7,10.1 31,10.1 C29.3,10.1 28,8.7 28,7 C28,5.3 29.3,0 31,0 C32.7,0 34,5.3 34,7 L34,7 Z" id="Shape" sketch:type="MSShapeGroup">

                                </path>
                                <path d="M44.9,7 C44.9,8.7 43.6,10.1 41.9,10.1 C40.3,10.1 38.9,8.7 38.9,7 C38.9,5.3 40.2,0 41.9,0 C43.6,0 44.9,5.3 44.9,7 L44.9,7 Z" id="Shape" sketch:type="MSShapeGroup">

                                </path>
                                <path d="M55.9,7 C55.9,8.7 54.6,10.1 52.9,10.1 C51.3,10.1 49.9,8.7 49.9,7 C49.9,5.3 51.2,0 52.9,0 C54.6,0 55.9,5.2 55.9,7 L55.9,7 Z" id="Shape" sketch:type="MSShapeGroup">

                                </path>
                            </g>
                        </g>
                    </svg>

                    <p className="card__descr">
                        Bithday: {formattedDate}
                    </p>
                </div>
                <br /><div className='genderDiv'>
                    <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21.0802 8.58003V15.42C21.0802 16.54 20.4802 17.58 19.5102 18.15L13.5702 21.58C12.6002 22.14 11.4002 22.14 10.4202 21.58L4.48016 18.15C3.51016 17.59 2.91016 16.55 2.91016 15.42V8.58003C2.91016 7.46003 3.51016 6.41999 4.48016 5.84999L10.4202 2.42C11.3902 1.86 12.5902 1.86 13.5702 2.42L19.5102 5.84999C20.4802 6.41999 21.0802 7.45003 21.0802 8.58003Z" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path opacity="0.4" d="M11.9999 10.9998C13.2867 10.9998 14.3299 9.95662 14.3299 8.6698C14.3299 7.38298 13.2867 6.33984 11.9999 6.33984C10.7131 6.33984 9.66992 7.38298 9.66992 8.6698C9.66992 9.95662 10.7131 10.9998 11.9999 10.9998Z" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path opacity="0.4" d="M16 16.6599C16 14.8599 14.21 13.3999 12 13.3999C9.79 13.3999 8 14.8599 8 16.6599" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>

                    <p className="card__descr">
                        Experience: {formData.experience} years
                    </p>
                </div>
                <br />

                
                

                <h3 className="card__descr">
                    My social Trainer's Life
                </h3>

                <div className="wrapper_">
                    <a className="icon facebook" href={formData.facebook_link}>
                        <span className="tooltip">{formData.facebook_link}</span>
                        <svg
                            viewBox="0 0 320 512"
                            height="1.2em"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"
                            ></path>
                        </svg>
                    </a>
                    <a className="icon twitter" href={formData.twitter_link}>
                        <span className="tooltip">{formData.twitter_link}</span>
                        <svg
                            height="1.8em"
                            fill="currentColor"
                            viewBox="0 0 48 48"
                            xmlns="http://www.w3.org/2000/svg"
                            className="twitter"
                        >
                            <path
                                d="M42,12.429c-1.323,0.586-2.746,0.977-4.247,1.162c1.526-0.906,2.7-2.351,3.251-4.058c-1.428,0.837-3.01,1.452-4.693,1.776C34.967,9.884,33.05,9,30.926,9c-4.08,0-7.387,3.278-7.387,7.32c0,0.572,0.067,1.129,0.193,1.67c-6.138-0.308-11.582-3.226-15.224-7.654c-0.64,1.082-1,2.349-1,3.686c0,2.541,1.301,4.778,3.285,6.096c-1.211-0.037-2.351-0.374-3.349-0.914c0,0.022,0,0.055,0,0.086c0,3.551,2.547,6.508,5.923,7.181c-0.617,0.169-1.269,0.263-1.941,0.263c-0.477,0-0.942-0.054-1.392-0.135c0.94,2.902,3.667,5.023,6.898,5.086c-2.528,1.96-5.712,3.134-9.174,3.134c-0.598,0-1.183-0.034-1.761-0.104C9.268,36.786,13.152,38,17.321,38c13.585,0,21.017-11.156,21.017-20.834c0-0.317-0.01-0.633-0.025-0.945C39.763,15.197,41.013,13.905,42,12.429"
                            ></path>
                        </svg>
                    </a>
                    <a className="icon instagram" href={formData.instegram_link}>
                        <span className="tooltip">{formData.instegram_link}</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="1.2em"
                            fill="currentColor"
                            className="bi bi-instagram"
                            viewBox="0 0 16 16"
                        >
                            <path
                                d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"
                            ></path>
                        </svg>
                    </a>
                </div>
<br/>
                <p>Change Password</p>
                <label className="container" onClick={() => { setChangePassword((prev) => !prev) }}>
                    <input type="checkbox" defaultChecked={true} onChange={() => { setChangePassword((prev) => !prev) }} />
                    <svg className="chevron-right" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"></path></svg>
                    <svg className="chevron-down" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"></path></svg>
                </label>

                {changePassword && (<div>
                    <div className='inputGroup'>
                        <label>Your old password</label>
                        <input
                            type="text"
                            required=""
                            autoComplete="off"
                            name="old"
                            value={newPassword.old}
                            onChange={handleNewPaswordChanged}
                        />
                    </div>
                    <div className='inputGroup'>

                        <label>Your new password</label>

                        <input
                            type="text"
                            required=""
                            autoComplete="off"
                            name="new"
                            value={newPassword.new}
                            onChange={handleNewPaswordChanged}
                        />
                    </div>
                    <div className='inputGroup'>

                        <label>verify new password</label>

                        <input
                            type="text"
                            required=""
                            autoComplete="off"
                            name="verify"
                            value={newPassword.verify}
                            onChange={handleNewPaswordChanged}
                        />
                    </div>
                    {newPasswordError && <p className="error">{newPasswordError}</p>}


                    <button className="bookmarkBtn" onClick={handlePasswordClicked}>
                        <span className="IconContainer">
                            <svg viewBox="0 0 384 512" height="0.9em" className="icon">
                                <path
                                    d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z"
                                ></path>
                            </svg>
                        </span>
                        <p className="text">Save</p>
                    </button>

                </div>)}
            </div>
        </div>
    );
}