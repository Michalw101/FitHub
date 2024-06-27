import React, { useState, useEffect, useContext } from 'react';
import '../css/newTrainer.css'
import { serverRequests } from '../Api';

export default function NewTrainer({ trainer, setTrainers, trainers }) {
    const [acceptingTrainer, setAcceptingTrainer] = useState(false);

    const handleDeleteClick = () => {

        if (confirm(`Are you sure you want to delete ${trainer.first_name} forever 🥺?`)) {
            const url = `new-trainers/${trainer.user_id}`;
            serverRequests('DELETE', url, { ...trainer, sendMail: true })
                .then(response => {
                    console.log(response);
                    return response.json();
                }).then(() => {
                    alert(`${trainer.first_name} is not here 😈`);
                    setTrainers(trainers.filter(currentTrainer => currentTrainer.user_id !== trainer.user_id));

                }).catch(error => {
                    console.error(error);
                });
        } else
            return;

    }

    const handleAcceptClick = () => {
        if (confirm(`Are you sure you want to accept ${trainer.first_name}?`)) {
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
                    alert(`${trainer.first_name} is here 😈`);
                    setAcceptingTrainer(true);
                }).catch(error => {
                    console.error(error);
                });
        }}

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


            <div className="card1">
                <span className="card__hover">{trainer.first_name} {trainer.last_name}</span>

                <figure className="card__figure">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        style={{ fill: 'rgba(255, 255, 255, 1)' }}
                    >
                        <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8 0-1.168.258-2.275.709-3.276.154.09.308.182.456.276.396.25.791.5 1.286.688.494.187 1.088.312 1.879.312.792 0 1.386-.125 1.881-.313s.891-.437 1.287-.687.792-.5 1.287-.688c.494-.187 1.088-.312 1.88-.312s1.386.125 1.88.313c.495.187.891.437 1.287.687s.792.5 1.287.688c.178.067.374.122.581.171.191.682.3 1.398.3 2.141 0 4.411-3.589 8-8 8z"></path>
                        <circle cx="8.5" cy="12.5" r="1.5"></circle>
                        <circle cx="15.5" cy="12.5" r="1.5"></circle>
                    </svg>
                </figure>

                <div className="card__info">
                    <span className="card__name">{trainer.first_name} {trainer.last_name}</span>
                    <span className="card__ocupation">{trainer.email}</span>
                    <span className="card__ocupation">{trainer.phone}</span>

                    <div className="card__links">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            style={{ fill: 'rgba(255, 255, 255, 1)' }}
                        >
                            <path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z"></path>
                        </svg>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            style={{ fill: 'rgba(255, 255, 255, 1)' }}
                        >
                            <path d="M11.999 7.377a4.623 4.623 0 1 0 0 9.248 4.623 4.623 0 0 0 0-9.248zm0 7.627a3.004 3.004 0 1 1 0-6.008 3.004 3.004 0 0 1 0 6.008z"></path>
                            <circle cx="16.806" cy="7.207" r="1.078"></circle>
                            <path d="M20.533 6.111A4.605 4.605 0 0 0 17.9 3.479a6.606 6.606 0 0 0-2.186-.42c-.963-.042-1.268-.054-3.71-.054s-2.755 0-3.71.054a6.554 6.554 0 0 0-2.184.42 4.6 4.6 0 0 0-2.633 2.632 6.585 6.585 0 0 0-.419 2.186c-.043.962-.056 1.267-.056 3.71 0 2.442 0 2.753.056 3.71.015.748.156 1.486.419 2.187a4.61 4.61 0 0 0 2.634 2.632 6.584 6.584 0 0 0 2.185.45c.963.042 1.268.055 3.71.055s2.755 0 3.71-.055a6.615 6.615 0 0 0 2.186-.419 4.613 4.613 0 0 0 2.633-2.633c.263-.7.404-1.438.419-2.186.043-.962.056-1.267.056-3.71s0-2.753-.056-3.71a6.581 6.581 0 0 0-.421-2.217zm-1.218 9.532a5.043 5.043 0 0 1-.311 1.688 2.987 2.987 0 0 1-1.712 1.711 4.985 4.985 0 0 1-1.67.311c-.95.044-1.218.055-3.654.055-2.438 0-2.687 0-3.655-.055a4.96 4.96 0 0 1-1.669-.311 2.985 2.985 0 0 1-1.719-1.711 5.08 5.08 0 0 1-.311-1.669c-.043-.95-.053-1.218-.053-3.654 0-2.437 0-2.686.053-3.655a5.038 5.038 0 0 1 .311-1.687c.305-.789.93-1.41 1.719-1.712a5.01 5.01 0 0 1 1.669-.311c.951-.043 1.218-.055 3.655-.055s2.687 0 3.654.055a4.96 4.96 0 0 1 1.67.311 2.991 2.991 0 0 1 1.712 1.712 5.08 5.08 0 0 1 .311 1.669c.043.951.054 1.218.054 3.655 0 2.436 0 2.698-.043 3.654h-.011z"></path>
                        </svg>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            style={{ fill: 'rgba(255, 255, 255, 1)' }}
                        >
                            <path d="M19.633 7.997c.013.175.013.349.013.523 0 5.325-4.053 11.461-11.46 11.461-2.282 0-4.402-.661-6.186-1.809.324.037.636.05.973.05a8.07 8.07 0 0 0 5.001-1.721 4.036 4.036 0 0 1-3.767-2.793c.249.037.499.062.761.062.361 0 .724-.05 1.061-.137a4.027 4.027 0 0 1-3.23-3.953v-.05c.537.299 1.16.486 1.82.511a4.022 4.022 0 0 1-1.796-3.354c0-.748.199-1.434.548-2.032a11.457 11.457 0 0 0 8.306 4.215c-.062-.3-.1-.611-.1-.923a4.026 4.026 0 0 1 4.028-4.028c1.16 0 2.207.486 2.943 1.272a7.957 7.957 0 0 0 2.556-.973 4.02 4.02 0 0 1-1.771 2.22 8.073 8.073 0 0 0 2.319-.624 8.645 8.645 0 0 1-2.019 2.083z"></path>
                        </svg>
                    </div>
                </div>
            </div>

            <h1>{trainer.first_name} {trainer.last_name}</h1>
            <h2>
                <a href={`mailto:${trainer.email}`} className="clickable-email">{trainer.email}</a>
            </h2>
            <h2>{trainer.phone}</h2>
            <h3>{trainer.gender}</h3>
            <h3>{trainer.degree_link}</h3>
            <h3>{trainer.experience}</h3>
            <h3>{trainer.last_work_place}</h3>
            <button className='button11' onClick={handleAcceptClick}>
                <div className="svg-wrapper-1">
                    <div className="svg-wrapper">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="24"
                            height="24"
                        >
                            <path fill="none" d="M0 0h24v24H0z"></path>
                            <path
                                fill="currentColor"
                                d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                            ></path>
                        </svg>
                    </div>
                </div>
                <span>We want you</span>
            </button>
            <button className="deleteButton" onClick={handleDeleteClick}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 50 59"
                    className="bin"
                >
                    <path
                        fill="#B5BAC1"
                        d="M0 7.5C0 5.01472 2.01472 3 4.5 3H45.5C47.9853 3 50 5.01472 50 7.5V7.5C50 8.32843 49.3284 9 48.5 9H1.5C0.671571 9 0 8.32843 0 7.5V7.5Z"
                    ></path>
                    <path
                        fill="#B5BAC1"
                        d="M17 3C17 1.34315 18.3431 0 20 0H29.3125C30.9694 0 32.3125 1.34315 32.3125 3V3H17V3Z"
                    ></path>
                    <path
                        fill="#B5BAC1"
                        d="M2.18565 18.0974C2.08466 15.821 3.903 13.9202 6.18172 13.9202H43.8189C46.0976 13.9202 47.916 15.821 47.815 18.0975L46.1699 55.1775C46.0751 57.3155 44.314 59.0002 42.1739 59.0002H7.8268C5.68661 59.0002 3.92559 57.3155 3.83073 55.1775L2.18565 18.0974ZM18.0003 49.5402C16.6196 49.5402 15.5003 48.4209 15.5003 47.0402V24.9602C15.5003 23.5795 16.6196 22.4602 18.0003 22.4602C19.381 22.4602 20.5003 23.5795 20.5003 24.9602V47.0402C20.5003 48.4209 19.381 49.5402 18.0003 49.5402ZM29.5003 47.0402C29.5003 48.4209 30.6196 49.5402 32.0003 49.5402C33.381 49.5402 34.5003 48.4209 34.5003 47.0402V24.9602C34.5003 23.5795 33.381 22.4602 32.0003 22.4602C30.6196 22.4602 29.5003 23.5795 29.5003 24.9602V47.0402Z"
                        clipRule="evenodd"
                        fillRule="evenodd"
                    ></path>
                    <path fill="#B5BAC1" d="M2 13H48L47.6742 21.28H2.32031L2 13Z"></path>
                </svg>
                <span className="tooltip">Delete</span>
            </button>

        </div>
    );
}