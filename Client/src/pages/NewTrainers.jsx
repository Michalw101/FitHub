import React, { useState, useEffect } from 'react';
import NewTrainer from '../components/NewTrainer';
import { serverRequests } from '../Api';
import '../css/newTrainers.css';
import { useNavigate } from 'react-router-dom';
require('dotenv').config();

const { ADMIN_1_ID, ADMIN_2_ID} = process.env;


export default function NewTrainers() {

  const [trainers, setTrainers] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {

    const url = `new-trainers`;

    serverRequests('GET', url, null)
      .then(response => {
        return response.json();
      }).then(data => {
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
            });
          navigate('/');
          return;
        }
        if (data) {
          setTrainers(data.trainers);
        }
      }).catch(error => {
        console.error('Error', error);
      });
  }, []);

  if (!trainers)
    return <div className="loader">
      <div className="wrapper">
        <div className="circle"></div>
        <div className="line-1"></div>
        <div className="line-2"></div>
        <div className="line-3"></div>
        <div className="line-4"></div>
      </div>
    </div>;

  if (trainers.length === 0)
    return <h2>No trainers found.</h2>


  return (
    <div>
      <h2>New Trainers To FitHub's Trainers Team</h2>
      <div className="trainers-container">
        {trainers.map((trainer) => (
          <div key={trainer.user_id}>
            {console.log('trainer: ', trainer)}
            <NewTrainer trainer={trainer} setTrainers={setTrainers} trainers={trainers} />
          </div>
        ))}
      </div>
    </div>
  )
}