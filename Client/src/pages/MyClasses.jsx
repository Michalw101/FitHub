import React, { useState, useEffect } from 'react';
import MyClass from '../components/MyClass';
import { serverRequests } from '../Api';
import '../css/myClasses.css';
import { useNavigate } from 'react-router-dom';

export default function MyClasses({ userData }) {
    const [myClasses, setMyClasses] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const url = `my-classes?trainer_id=${userData.user_id}`;

        serverRequests('GET', url, null)
            .then(response => {
                console.log(response);
                return response.json();
            }).then(data => {
                if (data.ok === false) {
                    alert(data.res);
                    serverRequests('POST', 'notifications', { users: [214955064, 214859415], message: data.message })
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
                if (data) {
                    setMyClasses(data.classes);
                }
            }).catch(error => {
                console.error('Error', error);
            });
    }, [userData.user_id, navigate]);

    if (!myClasses)
        return (
            <div className="loader">
                <div className="wrapper">
                    <div className="circle"></div>
                    <div className="line-1"></div>
                    <div className="line-2"></div>
                    <div className="line-3"></div>
                    <div className="line-4"></div>
                </div>
            </div>
        );

    if (myClasses.length === 0)
        return <h1>No classes found.</h1>;

    const sortedClasses = myClasses.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);

        if (dateA.getTime() === dateB.getTime()) {
            const hourA = new Date(`1970-01-01T${a.hour}`);
            const hourB = new Date(`1970-01-01T${b.hour}`);
            return hourA - hourB;
        }
        return dateA - dateB;
    });

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const currentHour = new Date().getHours();
    const currentMinutes = new Date().getMinutes();

    const timeToMinutes = (time) => {
        const [hours, minutes] = time.split(':').map(Number);
        return hours * 60 + minutes;
    };

    const currentTotalMinutes = currentHour * 60 + currentMinutes;

    const futureClasses = sortedClasses.filter(myClass => {
        const classDate = new Date(myClass.date);
        classDate.setHours(0, 0, 0, 0);
        const classTotalMinutes = timeToMinutes(myClass.hour);

        if (classDate > today) {
            return true;
        } else if (classDate.getTime() === today.getTime() && classTotalMinutes >= currentTotalMinutes) {
            return true;
        }
        return false;
    });

    const pastClasses = sortedClasses.filter(myClass => {
        const classDate = new Date(myClass.date);
        classDate.setHours(0, 0, 0, 0);
        const classTotalMinutes = timeToMinutes(myClass.hour);

        if (classDate < today) {
            return true;
        } else if (classDate.getTime() === today.getTime() && classTotalMinutes < currentTotalMinutes) {
            return true;
        }
        return false;
    });

    return (
        <div>
            {futureClasses.map((myClass) => (
                <div key={myClass.class_id}>
                    <MyClass
                        myClass={myClass}
                        myClasses={myClasses}
                        setMyClasses={setMyClasses}
                        pastClass={false}
                    />
                </div>
            ))}
            {pastClasses.map((myClass) => (
                <div key={myClass.class_id} className='past-event'>
                    <MyClass
                        myClass={myClass}
                        myClasses={myClasses}
                        setMyClasses={setMyClasses}
                        pastClass={true}
                    />
                </div>
            ))}
        </div>
    );
}
