import React, { useState } from 'react';
import '../css/editModal.css';
import { serverRequests } from '../Api';
import { useNavigate } from 'react-router-dom';
const  ADMIN_1_ID =1;
const  ADMIN_2_ID =1;

export default function EditClassModal({ myClass, myClasses, setMyClasses, onClose }) {

    const navigate = useNavigate();
    const [description, setDescription] = useState(myClass.description);
    const [price, setPrice] = useState(myClass.price);
    const [classType, setClassType] = useState(myClass.class_type);
    const [genderLimit, setGenderLimit] = useState(myClass.gender_limit);
    const [healthConditions, setHealthConditions] = useState({
        heart_disease: myClass.heart_disease,
        chest_pain: myClass.chest_pain,
        fainted_or_dizziness: myClass.fainted_or_dizziness,
        asthma: myClass.asthma,
        family_heart_disease_or_sudden_death: myClass.family_heart_disease_or_sudden_death,
        exercise_supervision: myClass.exercise_supervision,
        chronic_disease: myClass.chronic_disease,
        pregnancy_risk: myClass.pregnancy_risk
    });

    const classTypeOptions = [
        'Strength training', 'Crossfit', 'Zumba', 'Aerobics', 'Pilates', 'Yoga', 'Other'
    ];

    const genderOptions = [
        { value: 'male', label: 'Only men' },
        { value: 'female', label: 'Only women' },
        { value: 'both', label: 'Both' }
    ];

    const healthConditionKeys = [
        'heart_disease',
        'chest_pain',
        'fainted_or_dizziness',
        'asthma',
        'family_heart_disease_or_sudden_death',
        'exercise_supervision',
        'chronic_disease',
        'pregnancy_risk'
    ];

    const handleSave = async () => {
        const updatedClass = { ...myClass, description, price, class_type: classType, gender_limit: genderLimit, ...healthConditions };
        const updateClassUrl = `classes/${myClass.class_id}`;
        const registeredTraineesUrl = `trainees/approved?class_id=${myClass.class_id}`;
        const postNotificationUrl = `notifications`;
        const note = `your class ${myClass.description} changed by the trainer to ${updatedClass.description} :(`;

        serverRequests('GET', registeredTraineesUrl, null)
            .then(response => {
                if (!response.ok) {
                    console.error("Error fetching registered trainees");
                    return;
                }
                return response.json();
            })
            .then(data => {
                const usersToNote = data.trainees.map(user => user.user_id);

                serverRequests('PUT', updateClassUrl, updatedClass)
                    .then(response => {
                        console.log(response);
                        if (!response.ok) {
                            return;
                        }
                        return response.json();
                    }).then(data => {
                        if (data.ok == false) {
                            alert(data.res);
                            serverRequests('POST', 'notifications', { users: [ADMIN_1_ID, ADMIN_2_ID], message: data.message })
                                .then(response => {
                                    if (!response.ok) {
                                        return;
                                    }
                                    return response.json();
                                })
                                .catch(error => {
                                    console.error('Error ', error);
                                });
                            navigate('/');
                            return;
                        }
                        if (data) {
                            setMyClasses(myClasses.map(cls => cls.class_id === myClass.class_id ? data.myClass : cls));

                            serverRequests('POST', postNotificationUrl, { users: usersToNote, message: note })
                                .then(response => {
                                    if (!response.ok) {
                                        console.error("Error sending notification");
                                        return;
                                    }
                                    return response.json();
                                });
                            onClose();
                        }
                    }).catch(error => {
                        console.error('Error', error);
                    });
            })

    };

    const toggleHealthCondition = (condition) => {
        setHealthConditions(prevState => ({
            ...prevState,
            [condition]: !prevState[condition]
        }));
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>❌</button>
                <h1>Edit Class</h1><br />
                <label>
                    <h4>Description</h4>
                    <div className='inputGroup'>
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    /></div>
                </label>
                <label>
                   <h4>Price</h4> 
                   <div className='inputGroup'>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    /></div>
                </label>
                <h4>Class Type</h4><br />
                <div className="radio-group inputGroup">
                    {classTypeOptions.map((option) => (
                        <button
                            key={option}
                            className={`class-type-button ${classType === option ? 'selected' : ''}`}
                            onClick={() => setClassType(option)}
                        >
                            {option}
                        </button>
                    ))}
                </div>
                <br />
                <h4>Select the appropriate gender option</h4><br />
                <div className="radio-group inputGroup">
                    {genderOptions.map((option) => (
                        <button
                            key={option.value}
                            className={`gender-button ${genderLimit === option.value ? 'selected' : ''}`}
                            onClick={() => setGenderLimit(option.value)}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
                <br />
                <p>Select which health conditions limit this class...</p><br />
                <p><strong>A mark means that a person with this limitation will not be able to participate in this class!</strong></p>
                <div className="checkbox-group inputGroup">
                    {healthConditionKeys.map((condition) => (
                        <button
                            key={condition}
                            className={`health-button ${healthConditions[condition] ? 'selected' : ''}`}
                            onClick={() => toggleHealthCondition(condition)}
                        >
                            {condition.replace(/_/g, ' ').charAt(0).toUpperCase() + condition.replace(/_/g, ' ').slice(1)}
                        </button>
                    ))}
                </div>
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
