import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import '../css/trainerClasses.css';
import { serverRequests } from '../Api';
import SingleClass from '../components/SingleClass';

export default function TrainerClasses() {
    const [date, setDate] = useState(new Date());
    const [classes, setClasses] = useState([]);
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [selectedDayEvents, setSelectedDayEvents] = useState([]);

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
        if (classes.length > 0) {
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
                    price: classItem.price
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

    return (
        <div className="trainer-classes-container">
            <h1 className="trainer-classes-title">Trainer Classes</h1>
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
                                {/* <button onClick={() => handleEventClick(event)}>View Details</button> */}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
