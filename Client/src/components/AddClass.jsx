import React from 'react';
import DatePicker from 'react-datepicker';
import { useNavigate } from 'react-router-dom';
import { serverRequests } from '../Api';
import 'react-datepicker/dist/react-datepicker.css';
import '../css/addClass.css';


const  ADMIN_1_ID =1;
const  ADMIN_2_ID =1;



const AddClass = ({ onClose, newClass, handleChanged, setClasses, classes }) => {
    const navigate = useNavigate();

    const formatDateToSQL = (date) => {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = (`0${d.getMonth() + 1}`).slice(-2);
        const day = (`0${d.getDate()}`).slice(-2);
        return `${year}-${month}-${day}`;
    };

    const handleDateChange = (date) => {
        handleChanged({ target: { name: 'date', value: formatDateToSQL(date) } });
    };

    const handleCreateClass = () => {
        serverRequests('POST', 'classes', newClass)
            .then(response => {
                console.log(response);
                return response.json();
            })
            .then(data => {
                if (data) {
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
                    setClasses([...classes, data.class]);
                    alert(`Class added succesfuly on ${newClass.date} at ${newClass.hour}`);
                    onClose();
                }
            })
            .catch(error => {
                console.error('Error creating class', error);
            });
    };

    const toggleHealthCondition = (condition) => {
        handleChanged({
            target: {
                name: condition,
                value: !newClass[condition]
            }
        });
    };


    const genderOptions = [
        { value: 'male', label: 'Only men' },
        { value: 'female', label: 'Only women' },
        { value: 'both', label: 'Both' }
    ];

    const classTypeOptions = [
        'Strength training', 'Crossfit', 'Zumba', 'Aerobics', 'Pilates', 'Yoga', 'Other'
    ];

    const healthConditions = [
        'heart_disease',
        'chest_pain',
        'fainted_or_dizziness',
        'asthma',
        'family_heart_disease_or_sudden_death',
        'exercise_supervision',
        'chronic_disease',
        'pregnancy_risk'
    ];

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>❌</button>
                <h1>Create Class</h1><br />
                <div>
                    <p>Class Description</p>
                    <div className='inputGroup'>
                        <input
                            type="text"
                            required=""
                            autoComplete="off"
                            name="description"
                            value={newClass.description}
                            onChange={handleChanged}
                        />
                    </div>
                    <p>Class date</p>
                    <div className="inputGroup">
                    <DatePicker
                        selected={newClass.date ? new Date(newClass.date) : null}
                        onChange={handleDateChange}
                        dateFormat="dd/MM/yyyy"
                        placeholderText="DD/MM/YYYY"
                        minDate={new Date(Date.now() + 86400000)}
                     className="customDatePicker"
                    /><br />
                    </div>
                    <p>Class hour</p>
                    <div className='inputGroup'>
                        <input
                            type="time"
                            required=""
                            autoComplete="off"
                            name="hour"
                            value={newClass.hour}
                            onChange={handleChanged}
                        />
                    </div>
                    <p>Class price</p>
                    <div className='inputGroup'>
                        <input
                            type="text"
                            required=""
                            autoComplete="off"
                            name="price"
                            value={newClass.price}
                            onChange={handleChanged}
                        />
                    </div>
                    <p>Google Meet link</p>
                    <div className='inputGroup'>
                        <input
                            type="url"
                            required=""
                            autoComplete="off"
                            name="link"
                            value={newClass.link}
                            onChange={handleChanged}
                        />
                    </div>
                    <h4>You need to set limits on this class</h4><br />
                    <p>Select the appropriate option</p><br />
                    <div className="radio-group inputGroup">
                        {genderOptions.map((option) => (
                            <button
                                key={option.value}
                                className={`gender-button ${newClass.gender_limit === option.value ? 'selected' : ''}`}
                                onClick={() => handleChanged({ target: { name: 'gender_limit', value: option.value } })}
                            >
                                {option.label}
                            </button>
                        ))}
                    </div>
                    <p>Class Type</p><br />
                    <div className="radio-group inputGroup">
                        {classTypeOptions.map((option) => (
                            <button
                                key={option}
                                className={`class-type-button ${newClass.class_type === option ? 'selected' : ''}`}
                                onClick={() => handleChanged({ target: { name: 'class_type', value: option } })}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                    <p>Select which health limits your class has...</p><br />
                    <p><strong>A mark means that a person with this limitation will not be able to participate in this class!</strong></p>
                    <div className="checkbox-group inputGroup">
                        {healthConditions.map((condition) => (
                            <button
                                key={condition}
                                className={`health-button ${newClass[condition] ? 'selected' : ''}`}
                                onClick={() => toggleHealthCondition(condition)}
                            >
                                {condition.replace(/_/g, ' ').charAt(0).toUpperCase() + condition.replace(/_/g, ' ').slice(1)}
                            </button>
                        ))}
                    </div>
                    <button className="card__btn" onClick={handleCreateClass}>CREATE CLASS</button>
                </div>
            </div>
        </div>
    );
};

export default AddClass;
