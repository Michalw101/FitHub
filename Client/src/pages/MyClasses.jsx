import React, { useState, useEffect, useContext } from 'react';
import MyClass from '../components/MyClass'
import { serverRequests } from '../Api';

export default function MyClasses({ userData }) {

    const [myClasses, setMyClasses] = useState(null);

    useEffect(() => {

        const url = `classes?trainer_id=${userData.user_id}`;

        serverRequests('GET', url, null)
            .then(response => {
                console.log(response);
                if (!response.ok) {
                    return;
                }
                return response.json();
            }).then(data => {
                if (data) {
                    setMyClasses(data.classes);
                }
            }).catch(error => {
                console.error('Error', error);
            });
    }, []);

    if (!myClasses)
        return <div className="loader">
            <div className="wrapper">
                <div className="circle"></div>
                <div className="line-1"></div>
                <div className="line-2"></div>
                <div className="line-3"></div>
                <div className="line-4"></div>
            </div>
        </div>;

    if (myClasses.length === 0)
        return <h1>No classes found.</h1>


    return (
        <div>
            {myClasses.map((myClass) => (
                <div key={myClass.class_id}>
                    {/* {myClass.class_id} */}
                    <MyClass myClass={myClass} />
                </div>
            ))}
        </div>
    )
}