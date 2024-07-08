import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import '../css/classes.css';
import { serverRequests } from '../Api';
import SingleClass from './SingleClass';

const Filters = ({ priceFilter, setPriceFilter, classTypeFilter, setClassTypeFilter }) => (
    <div className="filter-buttons">
        <div className="price-filter">
            {["below30", "between30and70", "above70", null].map(filter => (
                <button
                    key={filter}
                    className={`filter-button ${priceFilter === filter ? 'active' : ''}`}
                    onClick={() => setPriceFilter(filter)}
                >
                    {filter ? filter.replace(/([A-Z])/g, ' $1') : 'Clear Price Filter'}
                </button>
            ))}
        </div>
        <div className="class-type-filter">
            {["Strength training", "Crossfit", "Zumba", "Aerobics", "Pilates", "Yoga", "Other", null].map(type => (
                <button
                    key={type}
                    className={`filter-button ${classTypeFilter === type ? 'active' : ''}`}
                    onClick={() => setClassTypeFilter(type)}
                >
                    {type ? type : 'Clear Class Type Filter'}
                </button>
            ))}
        </div>
    </div>
);

const Classes = ({ setClasses, classes, userData }) => {
    const navigate = useNavigate();
    const [date, setDate] = useState(new Date());
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [selectedDayEvents, setSelectedDayEvents] = useState([]);
    const [priceFilter, setPriceFilter] = useState(null);
    const [classTypeFilter, setClassTypeFilter] = useState(null);
    const [registrationError, setRegistrationError] = useState('');
    const [isDetailsVisible, setIsDetailsVisible] = useState(false);
    const [seeMoreBtn, setSeeMoreBtn] = useState(0);


    const handleSeeMoreClick = (id) => {
        setRegistrationError('');
        setSeeMoreBtn(prev => (prev !== id ? id : 0));
    };


    const fetchClasses = async () => {
        let url = userData.role_id === 2 ? "classes" : `classes/by-query?user_id=${userData.user_id}`;
        try {
            const response = await serverRequests('GET', url, null);
            if (!response.ok) throw new Error("Failed to fetch classes");
            const data = await response.json();
            if (data.ok == false) {
                alert(data.res);
                navigate('/');
            } else if (data && data.classes) {
                setClasses(data.classes);
            }
        } catch (error) {
            console.error('Error fetching classes:', error);
        }
    };

    useEffect(() => {
        fetchClasses();
    }, [userData, navigate, setClasses]);

    useEffect(() => {
        const filterEvents = () => {
            if (!classes) return;

            let newEvents = classes.map(classItem => {
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
                        id: classItem.trainee_id,
                        first_name: classItem.first_name,
                        last_name: classItem.last_name,
                        phone: classItem.phone,
                        email: classItem.email,
                        twitter_link: classItem.twitter_link,
                        facebook_link: classItem.facebook_link,
                        instegram_link: classItem.instegram_link
                    },
                    gender_limit: classItem.gender_limit,
                    heart_disease: classItem.heart_disease,
                    chest_pain: classItem.chest_pain,
                    fainted_or_dizziness: classItem.fainted_or_dizziness,
                    asthma: classItem.asthma,
                    family_heart_disease_or_sudden_death: classItem.family_heart_disease_or_sudden_death,
                    exercise_supervision: classItem.exercise_supervision,
                    chronic_disease: classItem.chronic_disease,
                    pregnancy_risk: classItem.pregnancy_risk
                };
            }).filter(event => event !== null);

            if (priceFilter !== null) {
                newEvents = newEvents.filter(event => {
                    switch (priceFilter) {
                        case 'below30': return event.price < 30;
                        case 'between30and70': return event.price >= 30 && event.price <= 70;
                        case 'above70': return event.price > 70;
                        default: return true;
                    }
                });
            }

            if (classTypeFilter !== null) {
                newEvents = newEvents.filter(event => event.classType === classTypeFilter);
            }

            setEvents(newEvents);
        };

        filterEvents();
    }, [classes, priceFilter, classTypeFilter]);

    const handleDateChange = (date) => setDate(date);

    const handleEventClick = (event) => setSelectedEvent(event);

    const handleDayClick = (date) => {
        const dayEvents = events.filter(event => new Date(event.from).toDateString() === date.toDateString());
        setSelectedDayEvents(dayEvents);
    };

    const tileContent = ({ date, view }) => {
        if (view === 'month') {
            const dayEvents = events.filter(event => new Date(event.from).toDateString() === date.toDateString());
            return dayEvents.length > 1 ? (
                <div className="event-container" onClick={() => handleDayClick(date)}>
                    <div className="event">+{dayEvents.length}</div>
                </div>
            ) : (
                <div className="event-container">
                    {dayEvents.map(event => (
                        <div key={event.id} className="event" onClick={() => handleEventClick(event)}>
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
            .then(response => response.ok ? response.json() : setRegistrationError(null))
            .then(data => {
                if (data && data.isApproved) {
                    setRegistrationError("You are already registered and approved for this class");
                } else {
                    const url = "trainees/waiting";
                    const body = {
                        trainee_id: userData.user_id,
                        class_id: event.id
                    };
                    serverRequests('POST', url, body)
                        .then(response => response.ok ? response.json() : setRegistrationError("You already registered for this class"))
                        .then(data => {
                            if (data) {
                                alert(`Hey! To complete the registration process for the ${event.title} class, pay by Bit a $${event.price} payment to the Trainer ${event.trainer.first_name}. A link to the class will be sent to you when the payment is confirmed. ${event.trainer.first_name}'s phone number: ${event.trainer.phone}. Thank you very much!`);
                                navigate('/trainee-home/trainee-classes');
                                setSelectedDayEvents([]);
                                setRegistrationError(null);
                            }
                        }).catch(() => setRegistrationError("An error occurred while registering for the class"));
                }
            })
            .catch(() => setRegistrationError("An error occurred while checking registration status"));
    };
    let notForFields;
    selectedDayEvents.map(event => {
        notForFields = [
            { label: "Asthma Symptoms", value: event.asthma },
            { label: "Chest Pain", value: event.chest_pain },
            { label: "Chronic Disease", value: event.chronic_disease },
            { label: "Dizziness or Fainting", value: event.fainted_or_dizziness },
            { label: "Exercise Supervision", value: event.exercise_supervision },
            { label: "Family History of Sudden Death or Heart Disease", value: event.family_heart_disease_or_sudden_death },
            { label: "Heart Disease", value: event.heart_disease },
            { label: "Pregnancy Risk", value: event.pregnancy_risk }
        ].filter(field => !field.value);
    });


    return (
        <div className="trainer-classes-container">
            <br />
            <Filters
                priceFilter={priceFilter}
                setPriceFilter={setPriceFilter}
                classTypeFilter={classTypeFilter}
                setClassTypeFilter={setClassTypeFilter}
            />
            <Calendar onChange={handleDateChange} value={date} tileContent={tileContent} />
            {selectedEvent && (
                <SingleClass
                    userData={userData}
                    event={selectedEvent}
                    handleClassRegistration={handleClassRegistration}
                    onClose={() => { setSelectedEvent(null) }}
                />
            )}
            {selectedDayEvents.length > 0 && (
                <div>
                    <div className="single-class-modal">
                        <div className="single-class-content">
                            <h2>What's on today? {new Date(date).toLocaleDateString()}</h2><br />

                            {selectedDayEvents.map(event => {
                                const currentDateTime = new Date();
                                const eventHasPassed = currentDateTime > event.from;
                                return (
                                    <div key={event.id} className="event-details">
                                        <h3>{event.title}</h3><br />
                                        <p>{`${new Date(event.from).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${new Date(event.to).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`}</p><br />
                                        <p><strong>Only ${event.price}</strong></p>
                                        <button onClick={() => handleSeeMoreClick(event.id)}>
                                            {seeMoreBtn === event.id ? 'See less...' : 'See more...'}
                                        </button>
                                        {seeMoreBtn === event.id && (
                                            <>
                                                <br />
                                                <p><strong>For (gender):</strong> {event.gender_limit}</p>
                                                <p><strong>This class is not for someone who has:</strong></p>
                                                {notForFields.length > 0 ? (
                                                    <ul>
                                                        {notForFields.map((field, index) => (
                                                            <li key={index}>{field.label}</li>
                                                        ))}
                                                    </ul>
                                                ) : (
                                                    <p>No restrictions.</p>
                                                )}
                                                <br />
                                                {userData.role_id === 3 && !eventHasPassed && (
                                                    <button className="contactButton" onClick={() => handleClassRegistration(event)}>
                                                        Join Now
                                                        <div className="iconButton">
                                                            <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M0 0h24v24H0z" fill="none"></path>
                                                                <path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z" fill="currentColor"></path>
                                                            </svg>
                                                        </div>
                                                    </button>
                                                )}
                                                <br />
                                                {registrationError && (
                                                    <p style={{ color: 'red' }}>{registrationError}</p>
                                                )}
                                                <br />
                                                <p>Contact {event.trainer.first_name}!</p><br />
                                                <p><strong>{event.trainer.phone}</strong></p>
                                                <p><strong>{event.trainer.email}</strong></p><br />

                                                <p>Find {event.trainer.first_name}...</p>
                                                <div className="wrapper">
                                                    <a className="icon facebook" href={event.trainer.facebook_link}>
                                                        <span className="tooltip">{event.trainer.facebook_link}</span>
                                                        <svg
                                                            viewBox="0 0 320 512"
                                                            height="1.2em"
                                                            fill="currentColor"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path
                                                                d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"
                                                            ></path>
                                                        </svg>
                                                    </a>
                                                    <a className="icon twitter" href={event.trainer.twitter_link}>
                                                        <span className="tooltip">{event.trainer.twitter_link}</span>
                                                        <svg
                                                            height="1.8em"
                                                            fill="currentColor"
                                                            viewBox="0 0 48 48"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            className="twitter"
                                                        >
                                                            <path
                                                                d="M42,12.429c-1.323,0.586-2.746,0.977-4.247,1.162c1.526-0.906,2.7-2.351,3.251-4.058c-1.428,0.837-3.01,1.452-4.693,1.776C34.967,9.884,33.05,9,30.926,9c-4.08,0-7.387,3.278-7.387,7.32c0,0.572,0.067,1.129,0.193,1.67c-6.138-0.308-11.582-3.226-15.224-7.654c-0.64,1.082-1,2.349-1,3.686c0,2.541,1.301,4.778,3.285,6.096c-1.211-0.037-2.351-0.374-3.349-0.914c0,0.022,0,0.055,0,0.086c0,3.551,2.547,6.508,5.923,7.181c-0.617,0.169-1.269,0.263-1.941,0.263c-0.477,0-0.942-0.054-1.392-0.135c0.94,2.902,3.667,5.023,6.898,5.086c-2.528,1.96-5.712,3.134-9.174,3.134c-0.598,0-1.183-0.034-1.761-0.104C9.268,36.786,13.152,38,17.321,38c13.585,0,21.017-11.156,21.017-20.834c0-0.317-0.01-0.633-0.025-0.945C39.763,15.197,41.013,13.905,42,12.429"
                                                            ></path>
                                                        </svg>
                                                    </a>
                                                    <a className="icon instagram" href={event.trainer.instagram_link}>
                                                        <span className="tooltip">{event.trainer.instagram_link}</span>
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            height="1.2em"
                                                            fill="currentColor"
                                                            className="bi bi-instagram"
                                                            viewBox="0 0 16 16"
                                                        >
                                                            <path
                                                                d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-1.088-.332-2.328-.494-3.779-.54-.647-.02-2.22-.033-3.47-.033z"
                                                            ></path>
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M8 4.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zM5.5 8a2.5 2.5 0 1 1 5 0 2.5 2.5 0 0 1-5 0z"
                                                            ></path>
                                                            <path
                                                                d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"
                                                            ></path>
                                                        </svg>
                                                    </a>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    {registrationError && <div className="error">{registrationError}</div>}
                </div>
            )}
        </div>
    );

};

export default Classes;
