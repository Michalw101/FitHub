import React, { useState } from 'react';
import '../css/editModal.css';
import { serverRequests } from '../Api';

export default function EditTrainerProfileModal({ formData, setFormData, onClose }) {

    const [editFormData, setEditFormData] = useState({ ...formData })
    const [showMore, SetShowMore] = useState(false);

    const handleChanged = (e) => {
        const { name, value } = e.target;
        setEditFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };
    const handleClicked = (event) => {
        const { name, value } = event.target;
        handleChanged({ target: { name, value: +value } });
    };

    const handleSave = async () => {
        const url = `trainees/${editFormData.user_id}`;
        serverRequests('PUT', url, editFormData)
            .then(response => {
                console.log(response);
                if (!response.ok) {
                    return;
                }
                return response.json();
            }).then(data => {
                if (data) {
                    setFormData(data.trainee);
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
                            type="tel"
                            value={editFormData.phone}
                            name="phone"
                            onChange={handleChanged} /></div>
                </label>
                <label className="container" onClick={() => { SetShowMore((prev) => !prev) }}>
                    <input type="checkbox" defaultChecked={true} onChange={() => { SetShowMore((prev) => !prev) }} />
                    <svg className="chevron-right" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"></path></svg>
                    <svg className="chevron-down" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"></path></svg>
                </label>
                {showMore && (<div>
                    <label htmlFor="heart_disease">Do you have heart disease?</label>
                    <div className='radio-inputs'>
                        <label className='radio'>
                            <input
                                type="radio"
                                id="heart_disease_yes"
                                name="heart_disease"
                                value={1}
                                checked={editFormData.heart_disease === 1}
                                onChange={handleClicked}
                            />
                            <span htmlFor="heart_disease_yes" className='name'>Yes</span>
                        </label>
                        <label className='radio'>
                            <input
                                type="radio"
                                id="heart_disease_no"
                                name="heart_disease"
                                value={0}
                                checked={editFormData.heart_disease === 0}
                                onChange={handleClicked}
                            />
                            <span htmlFor="heart_disease_no" className='name'>No</span>
                        </label>
                    </div>
                    <br /><br />

                    <label htmlFor="chest_pain_at_rest">Do you experience chest pain at rest?</label>
                    <div className='radio-inputs'>
                        <label className='radio'>
                            <input
                                type="radio"
                                id="chest_pain_at_rest_yes"
                                name="chest_pain_at_rest"
                                value={1}
                                checked={editFormData.chest_pain_at_rest === 1}
                                onChange={handleClicked}
                            />
                            <span htmlFor="chest_pain_at_rest_yes" className='name'>Yes</span>
                        </label>
                        <label className='radio'>
                            <input
                                type="radio"
                                id="chest_pain_at_rest_no"
                                name="chest_pain_at_rest"
                                value={0}
                                checked={editFormData.chest_pain_at_rest === 0}
                                onChange={handleClicked}
                            />
                            <span htmlFor="chest_pain_at_rest_no" className='name'>No</span>
                        </label>
                    </div>
                    <br /><br />

                    <label htmlFor="chest_pain_daily_activity">Do you experience chest pain during daily activity?</label>
                    <div className='radio-inputs'>
                        <label className="radio">
                            <input
                                type="radio"
                                id="chest_pain_daily_activity_yes"
                                name="chest_pain_daily_activity"
                                value={1}
                                checked={editFormData.chest_pain_daily_activity === 1}
                                onChange={handleClicked}
                            />
                            <span htmlFor="chest_pain_daily_activity_yes" className='name'>Yes</span>
                        </label>
                        <label className="radio">
                            <input
                                type="radio"
                                id="chest_pain_daily_activity_no"
                                name="chest_pain_daily_activity"
                                value={0}
                                checked={editFormData.chest_pain_daily_activity === 0}
                                onChange={handleClicked}
                            />
                            <span htmlFor="chest_pain_daily_activity_no" className='name'>No</span>
                        </label>
                    </div>
                    <br /><br />


                    <label htmlFor="chest_pain_exercise">Do you experience chest pain during exercise?</label>
                    <div className='radio-inputs'>
                        <label className="radio">
                            <input
                                type="radio"
                                id="chest_pain_exercise_yes"
                                name="chest_pain_exercise"
                                value={1}
                                checked={editFormData.chest_pain_exercise === 1}
                                onChange={handleClicked}
                            />
                            <span htmlFor="chest_pain_exercise_yes" className='name'>Yes</span>
                        </label>
                        <label className="radio">
                            <input
                                type="radio"
                                id="chest_pain_exercise_no"
                                name="chest_pain_exercise"
                                value={0}
                                checked={editFormData.chest_pain_exercise === 0}
                                onChange={handleClicked}
                            />
                            <span htmlFor="chest_pain_exercise_no" className='name'>No</span>
                        </label>
                    </div>
                    <br /><br />

                    <label htmlFor="dizziness_balance_loss">Do you experience dizziness or balance loss?</label>
                    <div className='radio-inputs'>
                        <label className="radio">
                            <input
                                type="radio"
                                id="dizziness_balance_loss_yes"
                                name="dizziness_balance_loss"
                                value={1}
                                checked={editFormData.dizziness_balance_loss === 1}
                                onChange={handleClicked}
                            />
                            <span htmlFor="dizziness_balance_loss_yes" className='name'>Yes</span>
                        </label>
                        <label className="radio">
                            <input
                                type="radio"
                                id="dizziness_balance_loss_no"
                                name="dizziness_balance_loss"
                                value={0}
                                checked={editFormData.dizziness_balance_loss === 0}
                                onChange={handleClicked}
                            />
                            <span htmlFor="dizziness_balance_loss_no" className='name'>No</span>
                        </label>
                    </div>
                    <br /><br />

                    <label htmlFor="fainting">Have you fainted before?</label>
                    <div className='radio-inputs'>
                        <label className="radio">
                            <input
                                type="radio"
                                id="fainting_yes"
                                name="fainting"
                                value={1}
                                checked={editFormData.fainting === 1}
                                onChange={handleClicked}
                            />
                            <span htmlFor="fainting_yes" className='name'>Yes</span>
                        </label>
                        <label className="radio">
                            <input
                                type="radio"
                                id="fainting_no"
                                name="fainting"
                                value={0}
                                checked={editFormData.fainting === 0}
                                onChange={handleClicked}
                            />
                            <span htmlFor="fainting_no" className='name'>No</span>
                        </label>
                    </div>
                    <br /><br />

                    <label htmlFor="asthma_medication">Do you take medication for asthma?</label>
                    <div className='radio-inputs'>
                        <label className="radio">
                            <input
                                type="radio"
                                id="asthma_medication_yes"
                                name="asthma_medication"
                                value={1}
                                checked={editFormData.asthma_medication === 1}
                                onChange={handleClicked}
                            />
                            <span htmlFor="asthma_medication_yes" className='name'>Yes</span>
                        </label>
                        <label className="radio">
                            <input
                                type="radio"
                                id="asthma_medication_no"
                                name="asthma_medication"
                                value={0}
                                checked={editFormData.asthma_medication === 0}
                                onChange={handleClicked}
                            />
                            <span htmlFor="asthma_medication_no" className='name'>No</span>
                        </label>
                    </div>
                    <br /><br />

                    <label htmlFor="asthma_symptoms">Do you experience asthma symptoms? <br />
                        Asthma symptoms include shortness of breath, wheezing, persistent cough, and chest tightness.
                    </label>
                    <div className='radio-inputs'>
                        <label className="radio">
                            <input
                                type="radio"
                                id="asthma_symptoms_yes"
                                name="asthma_symptoms"
                                value={1}
                                checked={editFormData.asthma_symptoms === 1}
                                onChange={handleClicked}
                            />
                            <span htmlFor="asthma_symptoms_yes" className='name'>Yes</span>
                        </label>
                        <label className="radio">
                            <input
                                type="radio"
                                id="asthma_symptoms_no"
                                name="asthma_symptoms"
                                value={0}
                                checked={editFormData.asthma_symptoms === 0}
                                onChange={handleClicked}
                            />
                            <span htmlFor="asthma_symptoms_no" className='name'>No</span>
                        </label>
                    </div>
                    <br /><br />

                    <label htmlFor="family_heart_disease">Is there a family history of heart disease?</label>
                    <div className='radio-inputs'>
                        <label className="radio">
                            <input
                                type="radio"
                                id="family_heart_disease_yes"
                                name="family_heart_disease"
                                value={1}
                                checked={editFormData.family_heart_disease === 1}
                                onChange={handleClicked}
                            />
                            <span htmlFor="family_heart_disease_yes" className='name'>Yes</span>
                        </label>
                        <label className="radio">
                            <input
                                type="radio"
                                id="family_heart_disease_no"
                                name="family_heart_disease"
                                value={0}
                                checked={editFormData.family_heart_disease === 0}
                                onChange={handleClicked}
                            />
                            <span htmlFor="family_heart_disease_no" className='name'>No</span>
                        </label>
                    </div>
                    <br /><br />

                    <label htmlFor="family_sudden_death">Is there a family history of sudden death?</label>
                    <div className='radio-inputs'>
                        <label className="radio">
                            <input
                                type="radio"
                                id="family_sudden_death_yes"
                                name="family_sudden_death"
                                value={1}
                                checked={editFormData.family_sudden_death === 1}
                                onChange={handleClicked}
                            />
                            <span htmlFor="family_sudden_death_yes" className='name'>Yes</span>
                        </label>
                        <label className="radio">
                            <input
                                type="radio"
                                id="family_sudden_death_no"
                                name="family_sudden_death"
                                value={0}
                                checked={editFormData.family_sudden_death === 0}
                                onChange={handleClicked}
                            />
                            <span htmlFor="family_sudden_death_no" className='name'>No</span>
                        </label>
                    </div>
                    <br /><br />

                    <label htmlFor="exercise_supervision">Do you require supervision during exercise?</label>
                    <div className='radio-inputs'>
                        <label className="radio">
                            <input
                                type="radio"
                                id="exercise_supervision_yes"
                                name="exercise_supervision"
                                value={1}
                                checked={editFormData.exercise_supervision === 1}
                                onChange={handleClicked}
                            />
                            <span htmlFor="exercise_supervision_yes" className='name'>Yes</span>
                        </label>
                        <label className="radio">
                            <input
                                type="radio"
                                id="exercise_supervision_no"
                                name="exercise_supervision"
                                value={0}
                                checked={editFormData.exercise_supervision === 0}
                                onChange={handleClicked}
                            />
                            <span htmlFor="exercise_supervision_no" className='name'>No</span>
                        </label>
                    </div>
                    <br /><br />

                    <label htmlFor="chronic_disease">Do you have any chronic diseases?</label>
                    <div className='radio-inputs'>
                        <label className="radio">
                            <input
                                type="radio"
                                id="chronic_disease_yes"
                                name="chronic_disease"
                                value={1}
                                checked={editFormData.chronic_disease === 1}
                                onChange={handleClicked}
                            />
                            <span htmlFor="chronic_disease_yes" className='name'>Yes</span>
                        </label>
                        <label className="radio">
                            <input
                                type="radio"
                                id="chronic_disease_no"
                                name="chronic_disease"
                                value={0}
                                checked={editFormData.chronic_disease === 0}
                                onChange={handleClicked}
                            />
                            <span htmlFor="chronic_disease_no" className='name'>No</span>
                        </label>
                    </div>
                    <br /><br />

                    <label htmlFor="pregnancy_risk">Are you at risk of pregnancy complications?</label>
                    <div className='radio-inputs'>
                        <label className="radio">
                            <input
                                type="radio"
                                id="pregnancy_risk_yes"
                                name="pregnancy_risk"
                                value={1}
                                checked={editFormData.pregnancy_risk === 1}
                                onChange={handleClicked}
                            />
                            <span htmlFor="pregnancy_risk_yes" className='name'>Yes</span>
                        </label>
                        <label className="radio">
                            <input
                                type="radio"
                                id="pregnancy_risk_no"
                                name="pregnancy_risk"
                                value={0}
                                checked={editFormData.pregnancy_risk === 0}
                                onChange={handleClicked}
                            />
                            <span htmlFor="pregnancy_risk_no" className='name'>No</span>
                        </label>


                    </div>
                </div>)}
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


            </div>
        </div>

    );
}
