import React from 'react';
import DatePicker from 'react-datepicker';
import { serverRequests } from '../Api';
import 'react-datepicker/dist/react-datepicker.css';
import '../css/addClass.css';
import { useNavigate } from 'react-router-dom';


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
                if (!response.ok) {
                    console.error('Error creating class');
                    return;
                }
                return response.json();
            })
            .then(data => {
                if (data) {
                    setClasses([...classes, data.class]);
                    alert(`class added succesfuly on ${newClass.date} at ${newClass.hour}`);
                    onClose();
                }
            })
            .catch(error => {
                console.error('Error creating class', error);
            });
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>❌</button>
                <h2>Add Class</h2><br />
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
                    <p>Class date</p><br />
                    <DatePicker
                        selected={newClass.date ? new Date(newClass.date) : null}
                        onChange={handleDateChange}
                        dateFormat="dd/MM/yyyy"
                        placeholderText="DD/MM/YYYY"
                        minDate={new Date()}
                    /><br />
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
                    <button onClick={handleCreateClass}>Create Class</button>
                </div>
            </div>
        </div>
    );
};

export default AddClass;
