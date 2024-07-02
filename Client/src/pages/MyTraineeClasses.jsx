import React, { useState, useEffect } from 'react';
import { serverRequests } from '../Api';
import '../css/myClasses.css';
import TraineeClass from '../components/TraineeClass';

export default function MyTraineeClasses({ userData }) {
    const [registeredClasses, setRegisteredClasses] = useState(null);
    const [approvedClasses, setApprovedClasses] = useState(null);

    useEffect(() => {
        const fetchTraineeClasses = async () => {
            const urlRegistered = `my-classes/trainee/registered?trainee_id=${userData.user_id}`;
            const urlApproved = `my-classes/trainee/approved?trainee_id=${userData.user_id}`;


            serverRequests('GET', urlRegistered, null)
                .then(response => {
                    if (!response.ok) {
                        return;
                    }
                    return response.json();
                })
                .then((data) => {
                    setRegisteredClasses(data.classes);

                    serverRequests('GET', urlApproved, null)
                        .then(response => {
                            if (!response.ok) {
                                return;
                            }
                            return response.json();
                        }).then((data) => {
                            if (data) {
                                setApprovedClasses(data.classes);
                            }
                        }).catch(error => {
                            console.error(error);
                        });
                }
                )
                .catch(error => {
                    console.error(error);
                });
        }
        fetchTraineeClasses();
    }, []);

    if (!registeredClasses || !approvedClasses) {
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
    }

    if (registeredClasses.length === 0 && approvedClasses.length === 0) {
        return <h1>No classes found.</h1>;
    }

    const renderClasses = (classes, pastClass) => (
        <div>
            {classes.map(myClass => (
                <div key={myClass.class_id} className={pastClass ? 'past-event' : ''}>
                    <TraineeClass myClass={myClass} pastClass={pastClass} status={myClass.status} />
                </div>
            ))}
        </div>
    );

    return (
        <div>
            <h2>Your classes...</h2>
            <h3>Registered and Not Approved:</h3>
            {renderClasses(registeredClasses, false)}

            <h3>Approved Classes:</h3>
            {renderClasses(approvedClasses, true)}
        </div>
    );
}