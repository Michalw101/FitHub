import React, { useState, useEffect } from 'react';
import { serverRequests } from '../Api';
import Calendar from 'react-awesome-calendar';
import '../css/classes.css'

const Classes = () => {
    const [classes, setClasses] = useState([]);
    const [events, setEvents] = useState([]);
    const [eventClicked, setEventClicked] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);


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
                    const [hours, minutes, seconds] = classItem.hour.split(':');
                    fromDate.setHours(parseInt(hours, 10), parseInt(minutes, 10), parseInt(seconds, 10));
                }

                const toDate = new Date(fromDate);
                toDate.setHours(fromDate.getHours() + 1);

                return {
                    id: classItem.class_id,
                    color: randomColor,
                    from: fromDate.toISOString(),
                    to: toDate.toISOString(),
                    title: classItem.description
                };
            }).filter(event => event !== null);
            setEvents(newEvents);
        }
    }, [classes]);

    const handleEventClick = (event) => {
        if (selectedEvent)
            setSelectedEvent(null);
        else
            setSelectedEvent(event);
    };

    return (
        <div className="calendar-container">
          <div className="calendar-wrapper">
            <Calendar events={events} onClickEvent={handleEventClick} />
            {selectedEvent && (
              <div className="wrapper">
                <details open>
                  <div>
                    <p><strong>Class ID:</strong> {selectedEvent.id}</p>
                    <p><strong>Description:</strong> {selectedEvent.title}</p>
                    <p><strong>Hour:</strong> {selectedEvent.from}</p>
                  </div>
                </details>
              </div>
            )}
          </div>
        </div>
      );
      
};

export default Classes;
