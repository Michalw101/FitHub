import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import '../css/classes.css';
import { serverRequests } from '../Api';
import SingleClass from './SingleClass';

export default function Classes({ setClasses, classes, userData }) {
    const navigate = useNavigate();
    const [date, setDate] = useState(new Date());
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [selectedDayEvents, setSelectedDayEvents] = useState([]);
    const [seeMoreBtn, setSeeMoreBtn] = useState(0);
    const [registrationMassege, setRegistrationMassege] = useState(false);

    useEffect(() => {
        const url = `classes`;

        serverRequests('GET', url, null)
            .then(response => {
                if (!response.ok) {
                    return;
                }
                return response.json();
            })
            .then(data => {
                if (data) {
                    setClasses(data.classes);
                }
            })
            .catch(error => {
                console.error('Error', error);
            });
    }, []);

    useEffect(() => {
        if (classes && classes.length > 0) {
            const newEvents = classes.map((classItem) => {
                const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);

                if (!classItem.date) {
                    console.error('Invalid date:', classItem);
                    return null;
                }

                let fromDate = new Date(classItem.date);
                if (isNaN(fromDate.getTime())) {
                    console.error('Invalid Date object:', fromDate, 'for class item:', classItem);
                    return null;
                }

                if (classItem.hour) {
                    const [hours, minutes] = classItem.hour.split(':');
                    fromDate.setHours(parseInt(hours, 10), parseInt(minutes, 10));
                }

                const toDate = new Date(fromDate);
                toDate.setHours(fromDate.getHours() + 1);

                return {
                    id: classItem.class_id,
                    color: randomColor,
                    from: fromDate,
                    to: toDate,
                    title: classItem.description,
                    price: classItem.price,
                    trainer: {
                        first_name: classItem.first_name,
                        last_name: classItem.last_name,
                        phone: classItem.phone
                    }
                };
            }).filter(event => event !== null);
            setEvents(newEvents);
        }
    }, [classes]);

    const handleDateChange = (date) => {
        setDate(date);
    };

    const handleEventClick = (event) => {
        setSelectedEvent(event);
    };

    const handleDayClick = (date) => {
        const dayEvents = events.filter(
            event => new Date(event.from).toDateString() === date.toDateString()
        );
        setSelectedDayEvents(dayEvents);
    };

    const tileContent = ({ date, view }) => {
        if (view === 'month') {
            const dayEvents = events.filter(
                event => new Date(event.from).toDateString() === date.toDateString()
            );
            if (dayEvents.length > 1) {
                return (
                    <div className="event-container" onClick={() => handleDayClick(date)}>
                        {dayEvents.length > 0 && <div className="event">+{dayEvents.length}</div>}
                    </div>
                );
            }
            return (
                <div className="event-container">
                    {dayEvents.map(event => (
                        <div
                            key={event.id}
                            className="event"
                            onClick={() => handleEventClick(event)}
                        >
                            {event.title}
                        </div>
                    ))}
                </div>
            );
        }
    };

    const handleClassRegistration = (event) => {
        const url = "waiting-trainee";
        const body = {
            user_id: userData.user_id,
            class_id: event.id
        };
        serverRequests('POST', url, body)
            .then(response => {
                if (!response.ok) {
                    console.error("error");
                    return;
                }
                return response.json();
            }).then((data) => {
                navigate('/trainee-home/trainee-classes');
            }).catch(error => {
                console.error(error);
            });
        alert(`Hey! To complete the registration process for the ${event.title} class, pay by Bit a $${event.price} payment to the Trainer ${event.trainer.first_name}. A link to the class will be sent to you when the payment is confirmed. ${event.trainer.first_name}'s phone number: ${event.trainer.phone} . Thank you very much!`);
    };

    const handleSeeMoreClick = (id) => {
        setSeeMoreBtn(prev => (prev !== id ? id : 0));
    };

    const isPastEvent = (event) => {
        const now = new Date();
        return event.to < now;
    };

    return (
        <div className="trainer-classes-container">
            <Calendar
                onChange={handleDateChange}
                value={date}
                tileContent={tileContent}
            />
            {selectedEvent && (
                <SingleClass userData={userData} event={selectedEvent} onClose={() => setSelectedEvent(null)} seeMoreBtn={seeMoreBtn} handleSeeMoreClick={handleSeeMoreClick} handleClassRegistration={handleClassRegistration} />
            )}
            {selectedDayEvents.length > 0 && (
                <div className="single-class-modal">
                    <div className="single-class-content">
                        <button className="close-button" onClick={() => setSelectedDayEvents([])}>❌</button>
                        <h2>Classes on {new Date(selectedDayEvents[0].from).toLocaleDateString()}</h2>
                        {selectedDayEvents.map(event => (
                            <div key={event.id} className="event-details">
                                <p><strong>Description:</strong> {event.title}</p>
                                <p><strong>Time:</strong> {`${new Date(event.from).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${new Date(event.to).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`}</p>
                                <p><strong>Price:</strong> ${event.price}</p>
                                <p><strong>Trainer:</strong> {event.trainer.first_name} {event.trainer.last_name}</p>
                                {userData.role_id === 3 && (
                                    <button onClick={() => handleSeeMoreClick(event.id)}>
                                        {seeMoreBtn === event.id ? 'See less...' : 'See more...'}
                                    </button>
                                )}
                                {seeMoreBtn === event.id && (
                                    <div>
                                        <p><strong>Other details...</strong></p>
                                        {!isPastEvent(event) ? (
                                            <button onClick={() => handleClassRegistration(event)}>Join class!</button>
                                        ) : (
                                            <p style={{ color: 'red' }}><strong>This class has already ended.</strong></p>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
