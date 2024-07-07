import { useState, useEffect } from 'react';
import '../css/trainerProfile.css';
import { serverRequests } from '../Api';
import { useNavigate } from 'react-router-dom';

const TrainerSmallProfileAdmin = ({ trainer, setTrainers, allTrainers }) => {

    const navigate = useNavigate();
    const colors = ['#FF6F61', '#6B5B95', '#88B04B', '#F7CAC9', '#92A8D1', '#00a18c', '#B565A7', '#009B77'];
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
        if (!window.confirm(`Are you sure you want to delete ${trainer.first_name} forever?`))
            return;
        const deleteUrl = `trainers/${trainer.user_id}`;
        const fetchUsersUrl = `trainees/trainer/${trainer.trainer_id}`;
        const postNotificationUrl = `notifications`;
        const note = `Trainer ${trainer.first_name} ${trainer.last_name} has been deleted`;

        serverRequests('GET', fetchUsersUrl, null)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch users');
                }
                return response.json();
            })
            .then(data => {
                const userIds = data.trainees.map(user => user.user_id);

                serverRequests('DELETE', deleteUrl, { ...trainer, sendMail: true })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Failed to delete trainer');
                        }
                        return response.json();
                    })
                    .then(data => {
                        if (data.ok == false) {
                            alert(data.res);
                            navigate('/');
                            return;
                        }
                        setTrainers(allTrainers.filter(currentTrainer => currentTrainer.user_id !== trainer.user_id));

                        serverRequests('POST', postNotificationUrl, { users: userIds, message: note })
                            .then(response => {
                                if (!response.ok) {
                                    console.error("Error sending notification");
                                    return;
                                }
                                return response.json();
                            })
                            .catch(error => {
                                console.error('Error sending notifications:', error);
                            });
                    })
                    .catch(error => {
                        console.error('Error deleting trainer:', error);
                    });
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });

    };


    const renderClasses = (classes) => (
        <ul>
            {classes.length > 0 ? (
                classes.map(myClass => (
                    <li key={myClass.class_id} style={{ color: 'black' }}>
                        <p><strong>Type:</strong> {myClass.class_type}</p>
                        <p><strong>Price:</strong> ${myClass.price}</p>
                        <p><strong>At:</strong> {new Date(myClass.date).toLocaleDateString('he-IL')} {formatHourRange(myClass.hour)}</p>
                    </li>
                ))
            ) : (
                <li style={{ color: 'black' }}>No classes yet</li>
            )}
        </ul>
    );

    return (
        <div className="card-client" style={{ backgroundColor }}>
            <button className="deleteBtn" onClick={handleDeleteClick}>
                <svg viewBox="0 0 448 512" className="svgIcon"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path></svg>
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
