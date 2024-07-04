import React, { useState, useEffect } from 'react';
import { serverRequests } from '../Api';
import '../css/myClasses.css';
import TraineeClass from '../components/TraineeClass';

export default function MyTraineeClasses({ userData }) {
    const [registeredClasses, setRegisteredClasses] = useState(null);
    const [approvedClasses, setApprovedClasses] = useState(null);
    const [pastClasses, setPastClasses] = useState(null);

    useEffect(() => {
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
                            const currentClasses = [];
                            const pastClasses = [];
                            const currentDate = new Date();

                            data.classes.forEach(myClass => {
                                const classDate = new Date(myClass.date);
                                if (classDate < currentDate) {
                                    pastClasses.push(myClass);
                                } else {
                                    currentClasses.push(myClass);
                                }
                            });

                            setApprovedClasses(currentClasses);
                            setPastClasses(pastClasses);
                        }
                    }).catch(error => {
                        console.error(error);
                    });
            })
            .catch(error => {
                console.error(error);
            });
    }, [userData.user_id]);


    if (!registeredClasses || !approvedClasses || !pastClasses) {
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

    if (registeredClasses.length === 0 && approvedClasses.length === 0 && pastClasses.length === 0) {
        return <h1>No classes found.</h1>;
    }

    const renderClasses = (classes, pastClass, withCancel) => (
        <div>
            {classes.map(myClass => (
                <div key={myClass.class_id} className={pastClass ? 'past-event' : ''}>
                    <TraineeClass userData={userData} myClass={myClass} pastClass={pastClass} withCancel={withCancel} setApprovedClasses={setApprovedClasses} approvedClasses={approvedClasses}/>
                </div>
            ))}
        </div>
    );

    return (
        <div>
            <h2>Your classes...</h2>
            <h3>Registered and Not Approved:</h3>
            {renderClasses(registeredClasses, false, false)}

            <h3>Approved Classes:</h3>
            {renderClasses(approvedClasses, false, true)}

            <h3>Past Classes:</h3>
            {renderClasses(pastClasses, true, false)}
        </div>
    );
}
