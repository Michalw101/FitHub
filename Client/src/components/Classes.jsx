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
        let url;
        if (userData.role_id == 2)
            url = "classes";
        else
            url = `classes/by-query?user_id=${userData.user_id}`;

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

                console.log(`classItem: ${classItem}`);

                return {
                    id: classItem.class_id,
                    from: fromDate,
                    to: toDate,
                    title: classItem.description,
                    price: classItem.price,
                    trainer: {
                        first_name: classItem.first_name,
                        last_name: classItem.last_name,
                        phone: classItem.phone,
                        email: classItem.email,
                        twitter_link: classItem.twitter_link,
                        facebook_link: classItem.facebook_link,
                        instegram_link: classItem.instegram_link
                    }
                };
            }).filter(event => event !== null);
            setEvents(newEvents);
        }
    }, [classes]);

    const handleDateChange = (date) => {
        setDate(date);
        console.log("Selected date: ", date);
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

        const url = "waiting-trainee"
        const body = {
            user_id: userData.user_id,
            class_id: event.id
        }
        serverRequests('POST', url, body)
            .then(response => {
                console.log(response);
                if (!response.ok) {
                    alert("you already registered to this class");
                    console.error("you already registered to this class");
                    return;
                }
                return response.json();
            }).then((data) => {
                if (data) {
                    alert(`Hey! To complete the registration process for the ${event.title} class, pay by Bit a $${event.price} payment to the Trainer ${event.trainer.first_name}. A link to the class will be sent to you when the payment is confirmed. ${event.trainer.first_name}'s phone number: ${event.trainer.phone} . Thank you very much!`)
                    navigate('/trainee-home/trainee-classes');
                }
            }).catch(error => {
                console.error(error);
            });

    }

    const handleSeeMoreClick = (id) => {
        setSeeMoreBtn(prev => (prev !== id ? id : 0));
    };

    return (
        <div className="trainer-classes-container">
            <Calendar
                onChange={handleDateChange}
                value={date}
                tileContent={tileContent}
            />
            {selectedEvent && (
                <SingleClass event={selectedEvent} onClose={() => setSelectedEvent(null)} />
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
                                {seeMoreBtn === event.id && (<div>
                                    <p><strong>Other details...</strong></p>
                                    <button onClick={() => handleClassRegistration(event)}>Join class!</button>
                                </div>)}
                            </div>
                        ))}

                    </div>
                </div>
            )}
        </div>
    );
}
