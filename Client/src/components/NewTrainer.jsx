import React, { useState, useEffect, useContext } from 'react';
import '../css/newTrainer.css'
import { serverRequests } from '../Api';

export default function NewTrainer({ trainer, setTrainers, trainers }) {
    const [acceptingTrainer, setAcceptingTrainer]= useState(false);

    const handleDeleteClick = () => {

        if (confirm(`Are you sure you want to delete ${trainer.first_name} forever 🥺?`)) {
            const url = `new-trainers/${trainer.user_id}`;
            serverRequests('DELETE', url, {...trainer, sendMail:true})
                .then(response => {
                    console.log(response);
                    if (!response.ok) {
                        console.error("error")
                        return;
                    }
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
            serverRequests('DELETE', url, {...trainer, sendMail:false})
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
        } else
            return;
    }

    useEffect(() => {
        if (acceptingTrainer) {
    
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
        <div className="trainer-container">
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


// instegram_link varchar(255)
// facebook_link varchar(255)
// twitter_link