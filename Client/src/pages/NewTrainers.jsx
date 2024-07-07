import React, { useState, useEffect } from 'react';
import NewTrainer from '../components/NewTrainer';
import { serverRequests } from '../Api';
import '../css/newTrainers.css';
import { useNavigate } from 'react-router-dom';

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
          //note to admin
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
    return <h1>No trainers found.</h1>


  return (
    <div>
      <h1>New Trainers To FitHub's Trainers Team</h1>
      <div className="trainers-container">
        {trainers.map((trainer) => (
          <div key={trainer.user_id}>
            {console.log('trainer: ', trainer)}
            <NewTrainer trainer={trainer} setTrainers={setTrainers} trainers={trainers}/>
          </div>
        ))}
      </div>
    </div>
  )
}