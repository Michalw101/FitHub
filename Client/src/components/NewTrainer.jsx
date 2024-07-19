import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { serverRequests } from '../Api';
import '../css/newTrainer.css'
require('dotenv').config();

const { ADMIN_1_ID, ADMIN_2_ID} = process.env;

export default function NewTrainer({ trainer, setTrainers, trainers }) {
    const [acceptingTrainer, setAcceptingTrainer] = useState(false);
    const navigate = useNavigate();

    const handleDeleteClick = () => {

        if (confirm(`Are you sure you want to delete ${trainer.first_name} from here?`)) {
            const url = `new-trainers/${trainer.user_id}`;
            serverRequests('DELETE', url, { ...trainer, sendMail: true })
                .then(response => {
                    console.log(response);
                    return response.json();
                }).then((data) => {
                    if (data.ok == false) {
                        alert(data.res);
                        serverRequests('POST', 'notifications', { users: [ADMIN_1_ID, ADMIN_2_ID], message: data.message })
                            .then(response => {
                                if (!response.ok) {
                                    return;
                                }
                                return response.json();
                            })
                            .catch(error => {
                                console.error('Error ', error);
                            }); navigate('/');
                        return;
                    }
                    setTrainers(trainers.filter(currentTrainer => currentTrainer.user_id !== trainer.user_id));
                }).catch(error => {
                    console.error(error);
                });
        } else
            return;

    }

    const handleAcceptClick = () => {
        if (confirm(`Are you sure you want to accept ${trainer.first_name} to FitHub Trainers Team?`)) {
            const url = `new-trainers/${trainer.user_id}`;
            serverRequests('DELETE', url, { ...trainer, sendMail: false })
                .then(response => {
                    console.log(response);
                    if (!response.ok) {
                        console.error("error")
                        return;
                    }
                    return response.json();
                }).then(() => {
                    setAcceptingTrainer(true);
                }).catch(error => {
                    console.error(error);
                });
        }
    }

    useEffect(() => {

        if (acceptingTrainer) {
            console.log('Sending POST request for trainer:', trainer);

            serverRequests('POST', "trainers", trainer)
                .then(response => {
                    console.log(response);
                    if (!response.ok) {
                        console.error("error in creating trainer");
                        return;
                    }
                    return response.json();
                })
                .then(data => {
                    if (data) {
                        setTrainers(trainers.filter(currentTrainer => currentTrainer.user_id !== trainer.user_id));
                        setAcceptingTrainer(false);
                    }
                })
                .catch(error => {
                    console.error('Error', error);
                });
        }
    }, [acceptingTrainer]);

    return (
        <div>
            <br />
            <div className="card1">
                <div className="card__img">
                    <svg xmlns="http://www.w3.org/2000/svg" width="100%">
                        <rect fill="#ffffff" width="540" height="450"></rect>
                        <defs>
                            <linearGradient id="a" gradientUnits="userSpaceOnUse" x1="0" x2="0" y1="0" y2="100%" gradientTransform="rotate(222,648,379)">
                                <stop offset="0" stopColor="#ffffff"></stop>
                                <stop offset="1" stopColor="#2adac2"></stop>
                            </linearGradient>
                            <pattern patternUnits="userSpaceOnUse" id="b" width="300" height="250" x="0" y="0" viewBox="0 0 1080 900">
                                <g fillOpacity="0.5">
                                    <polygon fill="#22b19e" points="90 150 0 300 180 300"></polygon>
                                    <polygon points="90 150 180 0 0 0"></polygon>
                                    <polygon fill="#2adac2" points="270 150 360 0 180 0"></polygon>
                                    <polygon fill="#22b19e" points="450 150 360 300 540 300"></polygon>
                                    <polygon fill="#2adac2" points="450 150 540 0 360 0"></polygon>
                                    <polygon points="630 150 540 300 720 300"></polygon>
                                    <polygon fill="#2adac2" points="630 150 720 0 540 0"></polygon>
                                    <polygon fill="#22b19e" points="810 150 720 300 900 300"></polygon>
                                    <polygon fill="#2adac2" points="810 150 900 0 720 0"></polygon>
                                    <polygon fill="#22b19e" points="990 150 900 300 1080 300"></polygon>
                                    <polygon fill="#2adac2" points="990 150 1080 0 900 0"></polygon>
                                    <polygon fill="#22b19e" points="90 450 0 600 180 600"></polygon>
                                    <polygon points="90 450 180 300 0 300"></polygon>
                                    <polygon fill="#2adac2" points="270 450 180 600 360 600"></polygon>
                                    <polygon fill="#22b19e" points="270 450 360 300 180 300"></polygon>
                                    <polygon fill="#2adac2" points="450 450 360 600 540 600"></polygon>
                                    <polygon fill="#22b19e" points="450 450 540 300 360 300"></polygon>
                                    <polygon fill="#2adac2" points="630 450 540 600 720 600"></polygon>
                                    <polygon fill="#22b19e" points="630 450 720 300 540 300"></polygon>
                                    <polygon points="810 450 720 600 900 600"></polygon>
                                    <polygon fill="#2adac2" points="810 450 900 300 720 300"></polygon>
                                    <polygon fill="#22b19e" points="990 450 900 600 1080 600"></polygon>
                                    <polygon fill="#2adac2" points="990 450 1080 300 900 300"></polygon>
                                    <polygon fill="#22b19e" points="90 750 0 900 180 900"></polygon>
                                    <polygon points="270 750 180 900 360 900"></polygon>
                                    <polygon fill="#2adac2" points="270 750 360 600 180 600"></polygon>
                                    <polygon points="450 750 540 600 360 600"></polygon>
                                    <polygon points="630 750 540 900 720 900"></polygon>
                                    <polygon fill="#22b19e" points="630 750 720 600 540 600"></polygon>
                                    <polygon fill="#2adac2" points="810 750 720 900 900 900"></polygon>
                                    <polygon fill="#22b19e" points="810 750 900 600 720 600"></polygon>
                                    <polygon fill="#2adac2" points="990 750 900 900 1080 900"></polygon>
                                    <polygon fill="#2adac2" points="180 0 90 150 270 150"></polygon>
                                    <polygon fill="#22b19e" points="360 0 270 150 450 150"></polygon>
                                    <polygon fill="#2adac2" points="540 0 450 150 630 150"></polygon>
                                    <polygon points="900 0 810 150 990 150"></polygon>
                                    <polygon fill="#2adac2" points="0 300 -90 450 90 450"></polygon>
                                    <polygon fill="#2adac2" points="0 300 90 150 -90 150"></polygon>
                                    <polygon fill="#2adac2" points="180 300 90 450 270 450"></polygon>
                                    <polygon fill="#22b19e" points="180 300 270 150 90 150"></polygon>
                                    <polygon fill="#2adac2" points="360 300 270 450 450 450"></polygon>
                                    <polygon fill="#22b19e" points="360 300 450 150 270 150"></polygon>
                                    <polygon fill="#2adac2" points="540 300 450 450 630 450"></polygon>
                                    <polygon fill="#22b19e" points="540 300 630 150 450 150"></polygon>
                                    <polygon fill="#2adac2" points="720 300 630 450 810 450"></polygon>
                                    <polygon fill="#22b19e" points="720 300 810 150 630 150"></polygon>
                                    <polygon fill="#2adac2" points="900 300 810 450 990 450"></polygon>
                                    <polygon fill="#22b19e" points="900 300 990 150 810 150"></polygon>
                                    <polygon points="0 600 -90 750 90 750"></polygon>
                                    <polygon fill="#22b19e" points="0 600 90 450 -90 450"></polygon>
                                    <polygon fill="#2adac2" points="180 600 90 750 270 750"></polygon>
                                    <polygon fill="#22b19e" points="180 600 270 450 90 450"></polygon>
                                    <polygon fill="#2adac2" points="360 600 270 750 450 750"></polygon>
                                    <polygon fill="#22b19e" points="360 600 450 450 270 450"></polygon>
                                    <polygon fill="#22b19e" points="540 600 630 450 450 450"></polygon>
                                    <polygon fill="#2adac2" points="720 600 630 750 810 750"></polygon>
                                    <polygon fill="#2adac2" points="900 600 810 750 990 750"></polygon>
                                    <polygon fill="#22b19e" points="900 600 990 450 810 450"></polygon>
                                    <polygon fill="#2adac2" points="0 900 90 750 -90 750"></polygon>
                                    <polygon fill="#22b19e" points="180 900 270 750 90 750"></polygon>
                                    <polygon fill="#2adac2" points="360 900 450 750 270 750"></polygon>
                                    <polygon fill="#22b19e" points="540 900 630 750 450 750"></polygon>
                                    <polygon fill="#2adac2" points="720 900 810 750 630 750"></polygon>
                                    <polygon fill="#22b19e" points="900 900 990 750 810 750"></polygon>
                                    <polygon fill="#22b19e" points="1080 300 990 450 1170 450"></polygon>
                                    <polygon fill="#2adac2" points="1080 300 1170 150 990 150"></polygon>
                                    <polygon points="1080 600 990 750 1170 750"></polygon>
                                    <polygon fill="#22b19e" points="1080 600 1170 450 990 450"></polygon>
                                    <polygon fill="#2adac2" points="1080 900 1170 750 990 750"></polygon>
                                </g>
                            </pattern>
                        </defs>
                        <rect x="0" y="0" fill="url(#a)" width="100%" height="100%"></rect>
                        <rect x="0" y="0" fill="url(#b)" width="100%" height="100%"></rect>
                    </svg>
                </div>
                <div className="card__body">
                    <div className="card__title">{trainer.first_name} {trainer.last_name}</div>
                    <div className="card__subtitle">{trainer.specialization}</div>
                    <div className="card__description">{trainer.first_name} {trainer.last_name} ({trainer.gender}) with {trainer.experience} years of experience of {trainer.specialization}. Received a professional certificate at {trainer.place_of_study}. Recently worked at {trainer.last_work_place}.</div>
                    <button className="card__btn" onClick={handleAcceptClick}>ACCEPT</button>
                    <button className="card__btn" onClick={handleDeleteClick}>DON'T ACCEPT</button>
                    <div className="social-media">
                        <a href={trainer.twitter_link}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path>
                            </svg>
                            <span className="tooltip-social">Twitter</span>
                        </a>
                        <a href={trainer.instegram_link}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path>
                            </svg>
                            <span className="tooltip-social">Instagram</span>
                        </a>
                        <a href={trainer.instegram_link}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                <path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"></path>
                            </svg>
                            <span className="tooltip-social">Facebook</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>

    );
}