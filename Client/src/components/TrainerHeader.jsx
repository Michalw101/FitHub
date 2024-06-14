import React, { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from '../App'
import { serverRequests } from "../Api"
import '../css/TraineeHome.css'

export default function AdminHeader({ setUserData, userData }) {

    const navigate = useNavigate();

    const profileHandleClick = () => {
        navigate('trainer-profile')
    }

    const handleClassesClick = () => {
        navigate('trainer-classes')
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
                    My Classes
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