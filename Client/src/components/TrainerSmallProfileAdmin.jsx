import { useState, useEffect } from 'react';
import '../css/trainerProfile.css';
import { serverRequests } from '../Api';

const TrainerSmallProfileAdmin = ({ trainer, setTrainers, allTrainers }) => {
    const colors = ['#FF6F61', '#6B5B95', '#88B04B', '#F7CAC9', '#92A8D1', '#955251', '#B565A7', '#009B77'];
    const [backgroundColor, setBackgroundColor] = useState('');
    const [showMore, setShowMore] = useState(false);
    const [trainerClasses, setTrainerClasses] = useState([]);

    useEffect(() => {
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        setBackgroundColor(randomColor);
    }, []);

    useEffect(() => {
        const urlClass = `my-classes?trainer_id=${trainer.user_id}`;
        
        if (trainerClasses.length === 0) {
            serverRequests('GET', urlClass, null)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to fetch classes');
                    }
                    return response.json();
                })
                .then(data => {
                    const currentDate = new Date();
                    const pastClasses = data.classes.filter(myClass => new Date(myClass.date) < currentDate);
                    const futureClasses = data.classes.filter(myClass => new Date(myClass.date) >= currentDate);

                    // Sort classes by date
                    pastClasses.sort((a, b) => new Date(b.date) - new Date(a.date));
                    futureClasses.sort((a, b) => new Date(a.date) - new Date(b.date));

                    setTrainerClasses([...pastClasses, ...futureClasses]);
                })
                .catch(error => {
                    console.error('Error fetching classes:', error);
                });
        }
    }, [showMore, trainer.user_id, trainerClasses.length]);

    function formatHourRange(startHour) {
        const [hours, minutes] = startHour.split(':').map(Number);
        const endHour = (hours + 1) % 24;
        const formattedStartHour = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
        const formattedEndHour = `${String(endHour).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;

        return `${formattedStartHour} - ${formattedEndHour}`;
    }

    const handleDeleteClick = () => {
        if (window.confirm(`Are you sure you want to delete ${trainer.first_name} forever?`)) {
            const url = `trainers/${trainer.user_id}`;
            serverRequests('DELETE', url, { ...trainer, sendMail: true })
                .then(response => {
                    console.log(response);
                    return response.json();
                })
                .then(() => {
                    setTrainers(allTrainers.filter(currentTrainer => currentTrainer.user_id !== trainer.user_id));
                })
                .catch(error => {
                    console.error('Error deleting trainer:', error);
                });
        }
    };

    const renderClasses = (classes) => (
        <ul>
            {classes.map(myClass => (
                <li key={myClass.class_id} style={{ color: 'black' }}>
                    <p><strong>Type:</strong> {myClass.class_type}</p>
                    <p><strong>Price:</strong> ${myClass.price}</p>
                    <p><strong>Trainer:</strong> {myClass.trainer_first_name} {myClass.trainer_last_name} </p>
                    <p><strong>At:</strong> {new Date(myClass.date).toLocaleDateString('he-IL')} {formatHourRange(myClass.hour)}</p>
                </li>
            ))}
        </ul>
    );

    return (
        <div className="card-client" style={{ backgroundColor }}>
            <button className="deleteButton" onClick={handleDeleteClick}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 50 59" className="bin">
                    <path fill="#B5BAC1" d="M0 7.5C0 5.01472 2.01472 3 4.5 3H45.5C47.9853 3 50 5.01472 50 7.5V7.5C50 8.32843 49.3284 9 48.5 9H1.5C0.671571 9 0 8.32843 0 7.5V7.5Z"></path>
                    <path fill="#B5BAC1" d="M17 3C17 1.34315 18.3431 0 20 0H29.3125C30.9694 0 32.3125 1.34315 32.3125 3V3H17V3Z"></path>
                    <path fill="#B5BAC1" d="M2.18565 18.0974C2.08466 15.821 3.903 13.9202 6.18172 13.9202H43.8189C46.0976 13.9202 47.916 15.821 47.815 18.0975L46.1699 55.1775C46.0751 57.3155 44.314 59.0002 42.1739 59.0002H7.8268C5.68661 59.0002 3.92559 57.3155 3.83073 55.1775L2.18565 18.0974ZM18.0003 49.5402C16.6196 49.5402 15.5003 48.4209 15.5003 47.0402V24.9602C15.5003 23.5795 16.6196 22.4602 18.0003 22.4602C19.381 22.4602 20.5003 23.5795 20.5003 24.9602V47.0402C20.5003 48.4209 19.381 49.5402 18.0003 49.5402ZM29.5003 47.0402C29.5003 48.4209 30.6196 49.5402 32.0003 49.5402C33.381 49.5402 34.5003 48.4209 34.5003 47.0402V24.9602C34.5003 23.5795 33.381 22.4602 32.0003 22.4602C30.6196 22.4602 29.5003 23.5795 29.5003 24.9602V47.0402Z" clipRule="evenodd" fillRule="evenodd"></path>
                    <path fill="#B5BAC1" d="M2 13H48L47.6742 21.28H2.32031L2 13Z"></path>
                </svg>
                <span className="tooltip">Delete</span>
            </button>
            <br />
            <div className="user-picture">
                <svg viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
                    <path d="M224 256c70.7 0 128-57.31 128-128s-57.3-128-128-128C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3c0 19.14 15.52 34.67 34.66 34.67h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304z"></path>
                </svg>
            </div>
            <p className="name-client">
                {`${trainer.first_name} ${trainer.last_name}`}
                <span>{trainer.specialization}</span>
                <span>{trainer.email}</span>
                <span>{trainer.phone}</span>
            </p>
            <br />
            <label className="container" onClick={() => { setShowMore(prev => !prev) }}>
                <input type="checkbox" defaultChecked={true} onChange={() => { setShowMore(prev => !prev) }} />
                <svg className="chevron-right" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"></path></svg>
                <svg className="chevron-down" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"></path></svg>
            </label>
            <br />
            {showMore && (
                <div className="classes-container">
                    <h3>Classes:</h3>
                    <h4>Past Classes:</h4>
                    {renderClasses(trainerClasses.filter(myClass => new Date(myClass.date) < new Date()))}
                    <h4>Future Classes:</h4>
                    {renderClasses(trainerClasses.filter(myClass => new Date(myClass.date) >= new Date()))}
                </div>
            )}
        </div>
    );
};

export default TrainerSmallProfileAdmin;
