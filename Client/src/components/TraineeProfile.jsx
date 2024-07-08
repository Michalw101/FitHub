import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../App';
import '../css/traineeProfile.css';

import EditTraineeProfileModal from './EditTraineeProfileModal'

const TraineeProfile = () => {
    const userData = useContext(UserContext);

    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({ ...userData });
    const [showMore, setShowMore] = useState(false);

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
                    <EditTraineeProfileModal
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
                <br />
                <div className='genderDiv'>

                    {showMore && (
                        <div>
                            <p className="card__descr"><strong>Asthma Symptoms:</strong> {formData.asthma_symptoms ? 'Yes' : 'No'}</p>
                            <p className="card__descr"><strong>Chest Pain at Rest:</strong> {formData.chest_pain_at_rest ? 'Yes' : 'No'}</p>
                            <p className="card__descr"><strong>Chest Pain During Daily Activity:</strong> {formData.chest_pain_daily_activity ? 'Yes' : 'No'}</p>
                            <p className="card__descr"><strong>Chest Pain During Exercise:</strong> {formData.chest_pain_exercise ? 'Yes' : 'No'}</p>
                            <p className="card__descr"><strong>Chronic Disease:</strong> {formData.chronic_disease ? 'Yes' : 'No'}</p>
                            <p className="card__descr"><strong>Dizziness or Balance Loss:</strong> {formData.dizziness_balance_loss ? 'Yes' : 'No'}</p>
                            <p className="card__descr"><strong>Exercise Supervision:</strong> {formData.exercise_supervision ? 'Yes' : 'No'}</p>
                            <p className="card__descr"><strong>Fainting:</strong> {formData.fainting ? 'Yes' : 'No'}</p>
                            <p className="card__descr"><strong>Family History of Heart Disease:</strong> {formData.family_heart_disease ? 'Yes' : 'No'}</p>
                            <p className="card__descr"><strong>Family History of Sudden Death:</strong> {formData.family_sudden_death ? 'Yes' : 'No'}</p>
                            <p className="card__descr"><strong>Heart Disease:</strong> {formData.heart_disease ? 'Yes' : 'No'}</p>

                            {formData.gender == "Female" && <div>
                                {formData.gender === "Female" && (<p className="card__descr"><strong>Pregnancy Risk:</strong> {formData.pregnancy_risk ? 'Yes' : 'No'}</p>)}
                            </div>
                            }
                            <br />
                        </div>)}
                </div>
                <br />
                <label className="container" onClick={() => { setShowMore((prev) => !prev) }}>
                    <input type="checkbox" defaultChecked={true} onChange={() => { setShowMore((prev) => !prev) }} />
                    <svg className="chevron-right" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"></path></svg>
                    <svg className="chevron-down" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"></path></svg>
                </label>
                <br />

            </div>
        </div >
    );
};

export default TraineeProfile;
