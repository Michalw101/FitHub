import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from '../App'
import { serverRequests } from "../Api"
import '../css/TraineeHome.css'

export default function TraineeHeader({ setUserData, userData }) {

    const navigate = useNavigate();

    const [notificationsCount, setNotificationsCount] = useState(0);

    useEffect(() => {
        const url = `notifications?user_id=${userData.user_id}`;

        serverRequests('GET', url, null)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch notifications');
                }
                return response.json();
            })
            .then(data => {
                if (data && data.notifications) {
                    setNotificationsCount(data.notifications.length);
                } else {
                    setNotificationsCount(0);
                }
            })
            .catch(error => {
                console.error('Error', error);
                setNotificationsCount(0);
            });
    }, [userData.user_id]);

    const profileHandleClick = () => {
        navigate('profile')
    }

    const handleClassesClick = () => {
        navigate('trainee-classes')
    }

    const trainersHandleClick = () => {
        navigate('trainers')
    }
    const handleMyClassesClick=()=>{
        navigate('trainee-my-classes')
    }

    const handleNotificationsClick = () => {
        navigate('notifications')
    }

    const handleLogoutClicked = () => {
        serverRequests('POST', `logout`, {...userData, credentials: 'include'})
            .then(response => {
                console.log(response);
                if (!response.ok) {
                    console.error('Logout failed');
                    return;
                }
                return response.json();
            })
            .then(data => {
                if (data) {
                    setUserData(null);
                    navigate('/');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    return (
        <header>
            <div className="inputNav">
                <button className="value" onClick={profileHandleClick}>
                    <svg
                        data-name="Layer 2"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                    >
                        <path
                            d="m1.5 13v1a.5.5 0 0 0 .3379.4731 18.9718 18.9718 0 0 0 6.1621 1.0269 18.9629 18.9629 0 0 0 6.1621-1.0269.5.5 0 0 0 .3379-.4731v-1a6.5083 6.5083 0 0 0 -4.461-6.1676 3.5 3.5 0 1 0 -4.078 0 6.5083 6.5083 0 0 0 -4.461 6.1676zm4-9a2.5 2.5 0 1 1 2.5 2.5 2.5026 2.5026 0 0 1 -2.5-2.5zm2.5 3.5a5.5066 5.5066 0 0 1 5.5 5.5v.6392a18.08 18.08 0 0 1 -11 0v-.6392a5.5066 5.5066 0 0 1 5.5-5.5z"
                            fill="#7D8590"
                        ></path>
                    </svg>
                    Profile
                </button>

                <button className="value" onClick={trainersHandleClick}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 122.598 122.598"
                        fill="#7D8590"
                    >
                        <g>
                            <circle cx="56.882" cy="31.147" r="10.524" />
                            <path d="M118.648,3.364V1.6H107.23v11.007H15.368V1.6H3.949v1.765H0v24.713h3.949v1.765h11.419V18.835h12.665
                                c-1.311,1.339-1.57,3.45-0.505,5.084L45.287,51.17c0.232,0.354,0.513,0.658,0.824,0.913v22.582c0,1.798,0.559,3.401,1.492,4.757
                                l-12.54,35.12c-0.896,2.513,0.412,5.276,2.925,6.173c0.535,0.189,1.084,0.283,1.622,0.283c1.985,0,3.844-1.232,4.55-3.207
                                l12.092-33.866c0.211,0.011,0.42,0.026,0.631,0.026c0.593,0,1.178-0.051,1.757-0.135l12.132,33.975
                                c0.703,1.975,2.563,3.207,4.547,3.207c0.539,0,1.088-0.094,1.623-0.283c2.512-0.896,3.821-3.66,2.924-6.173L66.878,78.165
                                c0.491-1.058,0.776-2.23,0.776-3.5V51.433c0-0.009,0-0.021,0-0.028c0.059-0.079,0.121-0.151,0.174-0.234L85.59,23.919
                                c1.062-1.634,0.805-3.745-0.505-5.084h22.146v11.007h11.418v-1.765h3.949V3.364H118.648z M78.742,19.455L62.932,43.716
                                c-1.067-0.651-2.236-1.141-3.427-1.434l-2.622,2.64l-2.541-2.668c-0.01,0.002-0.018,0.002-0.026,0.004
                                c-1.386,0.33-2.742,0.929-3.945,1.742L34.375,19.455c-0.148-0.225-0.317-0.432-0.5-0.62h45.367
                                C79.059,19.024,78.891,19.231,78.742,19.455z"
                            />
                        </g>
                    </svg>
                    Trainers
                </button>

                <button className="value" onClick={handleClassesClick}>
                    <svg width="24" height="24" viewBox="-5.4 0 98.4 98.4" xmlns="http://www.w3.org/2000/svg">
                        <g id="Group_4" data-name="Group 4" transform="translate(-822.7 -241.5)">
                            <path id="Path_52" data-name="Path 52" d="M899.4,254.3H833.6a8.92,8.92,0,0,0-8.9,8.9V329a8.92,8.92,0,0,0,8.9,8.9h65.8a8.92,8.92,0,0,0,8.9-8.9V263.2A8.92,8.92,0,0,0,899.4,254.3Z" fill="none" stroke="#7D8590" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="4" />
                            <line id="Line_25" data-name="Line 25" x2="21.2" transform="translate(842.6 283.7)" fill="none" stroke="#7D8590" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="4" />
                            <line id="Line_26" data-name="Line 26" x2="45.9" transform="translate(842.6 302)" fill="none" stroke="#7D8590" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="4" />
                            <line id="Line_27" data-name="Line 27" y2="19.6" transform="translate(853.6 243.5)" fill="none" stroke="#7D8590" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="4" />
                            <line id="Line_28" data-name="Line 28" y2="19.6" transform="translate(879.4 243.5)" fill="none" stroke="#7D8590" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="4" />
                        </g>
                    </svg>
                    Classes
                </button>

                <button className="value" onClick={handleMyClassesClick}>
                    <svg width="24" height="24" viewBox="-5.4 0 98.4 98.4" xmlns="http://www.w3.org/2000/svg">
                        <g id="Group_4" data-name="Group 4" transform="translate(-822.7 -241.5)">
                            <path id="Path_52" data-name="Path 52" d="M899.4,254.3H833.6a8.92,8.92,0,0,0-8.9,8.9V329a8.92,8.92,0,0,0,8.9,8.9h65.8a8.92,8.92,0,0,0,8.9-8.9V263.2A8.92,8.92,0,0,0,899.4,254.3Z" fill="none" stroke="#7D8590" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="4" />
                            <line id="Line_25" data-name="Line 25" x2="21.2" transform="translate(842.6 283.7)" fill="none" stroke="#7D8590" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="4" />
                            <line id="Line_26" data-name="Line 26" x2="45.9" transform="translate(842.6 302)" fill="none" stroke="#7D8590" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="4" />
                            <line id="Line_27" data-name="Line 27" y2="19.6" transform="translate(853.6 243.5)" fill="none" stroke="#7D8590" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="4" />
                            <line id="Line_28" data-name="Line 28" y2="19.6" transform="translate(879.4 243.5)" fill="none" stroke="#7D8590" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="4" />
                        </g>
                    </svg>
                    My Classes
                </button>
                <button className="value notification-button" onClick={handleNotificationsClick}>
                {notificationsCount > 0 && (
                        <span className="badge">{notificationsCount}</span>
                    )}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 25" fill="none">
                        <path
                            fillRule="evenodd"
                            fill="#7D8590"
                            d="m11.9572 4.31201c-3.35401 0-6.00906 2.59741-6.00906 5.67742v3.29037c0 .1986-.05916.3927-.16992.5576l-1.62529 2.4193-.01077.0157c-.18701.2673-.16653.5113-.07001.6868.10031.1825.31959.3528.67282.3528h14.52603c.2546 0 .5013-.1515.6391-.3968.1315-.2343.1117-.4475-.0118-.6093-.0065-.0085-.0129-.0171-.0191-.0258l-1.7269-2.4194c-.121-.1695-.186-.3726-.186-.5809v-3.29037c0-1.54561-.6851-3.023-1.7072-4.00431-1.1617-1.01594-2.6545-1.67311-4.3019-1.67311zm-8.00906 5.67742c0-4.27483 3.64294-7.67742 8.00906-7.67742 2.2055 0 4.1606.88547 5.6378 2.18455.01.00877.0198.01774.0294.02691 1.408 1.34136 2.3419 3.34131 2.3419 5.46596v2.97007l1.5325 2.1471c.6775.8999.6054 1.9859.1552 2.7877-.4464.795-1.3171 1.4177-2.383 1.4177h-14.52603c-2.16218 0-3.55087-2.302-2.24739-4.1777l1.45056-2.1593zm4.05187 11.32257c0-.5523.44772-1 1-1h5.99999c.5523 0 1 .4477 1 1s-.4477 1-1 1h-5.99999c-.55228 0-1-.4477-1-1z"
                            clipRule="evenodd"
                        ></path>
                    </svg>
                    Notifications
                </button>


                <button className="value" onClick={handleLogoutClicked}>
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        stroke="#7D8590"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-log-out"
                    >
                        <path d="M9 21H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5"></path>
                        <polyline points="16 17 21 12 16 7"></polyline>
                        <line x1="21" y1="12" x2="9" y2="12"></line>
                    </svg>
                    Logout
                </button>

            </div>

        </header>
    )
}