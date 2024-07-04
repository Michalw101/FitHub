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
    const [priceFilter, setPriceFilter] = useState(null);
    const [classTypeFilter, setClassTypeFilter] = useState(null);
    const [registrationError, setRegistrationError] = useState('');


    useEffect(() => {
        let url;
        if (userData.role_id === 2)
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
            let newEvents = classes.map((classItem) => {
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
                    from: fromDate,
                    to: toDate,
                    title: classItem.description,
                    classType: classItem.class_type,
                    price: classItem.price,
                    trainer: {
                        first_name: classItem.trainer_first_name,
                        last_name: classItem.trainer_last_name,
                        phone: classItem.trainer_phone,
                        email: classItem.trainer_email,
                        twitter_link: classItem.twitter_link,
                        facebook_link: classItem.facebook_link,
                        instegram_link: classItem.instegram_link
                    }
                };
            }).filter(event => event !== null);

            if (priceFilter !== null) {
                newEvents = newEvents.filter(event => {
                    switch (priceFilter) {
                        case 'below30':
                            return event.price < 30;
                        case 'between30and70':
                            return event.price >= 30 && event.price <= 70;
                        case 'above70':
                            return event.price > 70;
                        default:
                            return true;
                    }
                });
            }

            if (classTypeFilter !== null) {
                newEvents = newEvents.filter(event => event.classType === classTypeFilter);
            }

            setEvents(newEvents);
        }
    }, [classes, priceFilter, classTypeFilter]);

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
                            {event.classType}
                        </div>
                    ))}
                </div>
            );
        }
    };

    const handleClassRegistration = (event) => {

        const currentDateTime = new Date();
        if (currentDateTime > event.from) {
            setRegistrationError("You cannot register for a class that has already taken place.");
            return;
        }

        const checkUrl = `trainees/approved?user_id=${userData.user_id}&class_id=${event.id}`;

        serverRequests('GET', checkUrl, null)
            .then(response => {
                if (!response.ok) {
                    setRegistrationError("Error checking registration status");
                    return;
                }
                return response.json();
            })
            .then(data => {
                if (data && data.isApproved) {
                    setRegistrationError("You are already registered and approved for this class");
                } else {
                    const url = "waiting-trainee";
                    const body = {
                        trainee_id: userData.user_id,
                        class_id: event.id
                    };
                    serverRequests('POST', url, body)
                        .then(response => {
                            if (!response.ok) {
                                setRegistrationError("You already registered for this class");
                                console.error("You already registered for this class");
                                return;
                            }
                            return response.json();
                        }).then((data) => {
                            if (data) {
                                alert(`Hey! To complete the registration process for the ${event.title} class, pay by Bit a $${event.price} payment to the Trainer ${event.trainer.first_name}. A link to the class will be sent to you when the payment is confirmed. ${event.trainer.first_name}'s phone number: ${event.trainer.phone}. Thank you very much!`);
                                navigate('/trainee-home/trainee-classes');
                                setSelectedDayEvents([]);
                                setRegistrationError(null);
                            }
                        }).catch(error => {
                            console.error(error);
                            setRegistrationError("An error occurred while registering for the class");
                        });
                }
            })
            .catch(error => {
                console.error(error);
                setRegistrationError("An error occurred while checking registration status");
            });
    };

    const handleSeeMoreClick = (id) => {
        setRegistrationError('');
        setSeeMoreBtn(prev => (prev !== id ? id : 0));
    };

    const handlePriceFilter = (filter) => {
        setPriceFilter(filter);
    };

    const handleClassTypeFilter = (type) => {
        setClassTypeFilter(type);
    };

    return (
        <div className="trainer-classes-container">
            <br />
            <div className="filter-buttons">
                <div className="price-filter">
                    <button
                        className={`filter-button ${priceFilter === 'below30' ? 'active' : ''}`}
                        onClick={() => handlePriceFilter('below30')}
                    >
                        Below $30
                    </button>
                    <button
                        className={`filter-button ${priceFilter === 'between30and70' ? 'active' : ''}`}
                        onClick={() => handlePriceFilter('between30and70')}
                    >
                        Between $30 and $70
                    </button>
                    <button
                        className={`filter-button ${priceFilter === 'above70' ? 'active' : ''}`}
                        onClick={() => handlePriceFilter('above70')}
                    >
                        Above $70
                    </button>
                    <button
                        className={`filter-button ${priceFilter === null ? 'active' : ''}`}
                        onClick={() => handlePriceFilter(null)}
                    >
                        Clear Price Filter
                    </button>
                </div>
                <div className="class-type-filter">
                    <button
                        className={`filter-button ${classTypeFilter === 'Strength training' ? 'active' : ''}`}
                        onClick={() => handleClassTypeFilter('Strength training')}
                    >
                        Strength training
                    </button>
                    <button
                        className={`filter-button ${classTypeFilter === 'Crossfit' ? 'active' : ''}`}
                        onClick={() => handleClassTypeFilter('Crossfit')}
                    >
                        Crossfit
                    </button>
                    <button
                        className={`filter-button ${classTypeFilter === 'Zumba' ? 'active' : ''}`}
                        onClick={() => handleClassTypeFilter('Zumba')}
                    >
                        Zumba
                    </button>
                    <button
                        className={`filter-button ${classTypeFilter === 'Aerobics' ? 'active' : ''}`}
                        onClick={() => handleClassTypeFilter('Aerobics')}
                    >
                        Aerobics
                    </button>
                    <button
                        className={`filter-button ${classTypeFilter === 'Pilates' ? 'active' : ''}`}
                        onClick={() => handleClassTypeFilter('Pilates')}
                    >
                        Pilates
                    </button>
                    <button
                        className={`filter-button ${classTypeFilter === 'Yoga' ? 'active' : ''}`}
                        onClick={() => handleClassTypeFilter('Yoga')}
                    >
                        Yoga
                    </button>
                    <button
                        className={`filter-button ${classTypeFilter === 'Other' ? 'active' : ''}`}
                        onClick={() => handleClassTypeFilter('Other')}
                    >
                        Other
                    </button>
                    <button
                        className={`filter-button ${classTypeFilter === null ? 'active' : ''}`}
                        onClick={() => handleClassTypeFilter(null)}
                    >
                        Clear Class Type Filter
                    </button>
                </div>
            </div>
            <Calendar
                onChange={handleDateChange}
                value={date}
                tileContent={tileContent}
            />
            {selectedEvent && (
                <SingleClass userData={userData}   registrationError={registrationError} handleClassRegistration={handleClassRegistration} event={selectedEvent} onClose={() => setSelectedEvent(null)} />
            )}
            {selectedDayEvents.length > 0 && (
                <div className="single-class-modal">
                    <div className="single-class-content">
                        <button className="close-button" onClick={() => setSelectedDayEvents([])}>❌</button>
                        <h2>Classes on {new Date(selectedDayEvents[0].from).toLocaleDateString()}</h2>
                        {selectedDayEvents.map(event => {
                            const currentDateTime = new Date();
                            const eventHasPassed = currentDateTime > event.from;
                            return (
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
                                            {!eventHasPassed && (
                                                <button onClick={() => handleClassRegistration(event)}>Join class!</button>
                                            )}
                                            {registrationError && (
                                                <p style={{ color: 'red' }}>{registrationError}</p>
                                            )}
                                        </div>
                                    )}
                                </div>
                            );
                        })}

                    </div>
                </div>
            )}
        </div>
    );

}
