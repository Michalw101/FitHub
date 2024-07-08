import React, { useState, useEffect } from 'react';
import { serverRequests } from '../Api';
import '../css/traineeClasses.css';
import TraineeClass from '../components/TraineeClass';

export default function MyTraineeClasses({ userData }) {
    const [registeredClasses, setRegisteredClasses] = useState(null);
    const [approvedClasses, setApprovedClasses] = useState(null);
    const [pastClasses, setPastClasses] = useState(null);
    const [activeTab, setActiveTab] = useState('approved');

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

    const renderClasses = (classes, pastClass, withCancel, isApproved) => (
        <div>
            {classes.map(myClass => (
                <div key={myClass.class_id} className={`single-class-content-new ${pastClass ? 'past-event' : ''}`}>
                    <TraineeClass userData={userData} myClass={myClass} pastClass={pastClass} withCancel={withCancel} setApprovedClasses={setApprovedClasses} approvedClasses={approvedClasses} isApproved={isApproved}/>
                </div>
            ))}
        </div>
    );

    return (
        <div>
            <div className="nav-bar">
                <div className={`nav-item ${activeTab === 'past' ? 'active' : ''}`} onClick={() => setActiveTab('past')}>
                    Past Classes <span className="notification-badge1">{pastClasses.length}</span>
                </div>
                <div className={`nav-item ${activeTab === 'approved' ? 'active' : ''}`} onClick={() => setActiveTab('approved')}>
                    Approved Classes <span className="notification-badge1">{approvedClasses.length}</span>
                </div>
                <div className={`nav-item ${activeTab === 'registered' ? 'active' : ''}`} onClick={() => setActiveTab('registered')}>
                    Registered Classes <span className="notification-badge1">{registeredClasses.length}</span>
                </div>
            </div>

            {activeTab === 'registered' && (
                <div>
                    {registeredClasses.length > 0 ? renderClasses(registeredClasses, false, false, false) : <h2>No {activeTab} classes now.</h2>}
                </div>
            )}
            
            {activeTab === 'approved' && (
                <div>
                    {approvedClasses.length > 0 ? renderClasses(approvedClasses, false, true, true) : <h2>No {activeTab} classes now.</h2>}
                </div>
            )}
            
            {activeTab === 'past' && (
                <div>
                    {pastClasses.length > 0 ? renderClasses(pastClasses, true, false) : <h2>No {activeTab} classes now.</h2>}
                </div>
            )}
        </div>
    );
}
