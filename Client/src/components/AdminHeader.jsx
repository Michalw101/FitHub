import React, { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from '../App'
import { serverRequests } from "../Api"
import '../css/TraineeHome.css'

export default function AdminHeader({ setUserData, userData }) {

    const navigate = useNavigate();

    const profileHandleClick = () => {
        navigate('admin-profile')
    }

    const trainersHandleClick = () => {
        navigate('new-trainers')
    }
    const traineesHandleClick = () => {
        navigate('all-trainees')
    }
    
    const allTrainersHandleClick = () => {  
        navigate('all-trainers')
    }

    const handleLogoutClicked = () => {
        if (!window.confirm("Are you sure you want to log out?"))
            return;
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

                <button className="value" onClick={traineesHandleClick}>
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
                    Trainees
                </button>

                <button className="value" onClick={allTrainersHandleClick}>
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
                    Trainers
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
                    New Trainers
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