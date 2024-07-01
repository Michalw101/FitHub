import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../App';
import { useNavigate, NavLink } from 'react-router-dom';
import { serverRequests } from '../Api';
import TrainerSmallProfile from './TrainerSmallProfile';
import '../css/trainers.css';

const Trainers = ({ userData, setUserData, searchTerm }) => {
  const navigate = useNavigate();
  const [allTrainers, setAllTrainers] = useState(null);
  const [filteredTrainers, setFilteredTrainers] = useState(null);

  useEffect(() => {
    const url = 'trainers';

    serverRequests('GET', url, null)
      .then(response => {
        console.log(response);
        if (!response.ok) {
          return;
        }
        return response.json();
      })
      .then(data => {
        if (data) {
          setAllTrainers(data.trainers);
          setFilteredTrainers(data.trainers);
        }
      })
      .catch(error => {
        console.error('Error', error);
      });
  }, []);

  useEffect(() => {
    if (allTrainers && searchTerm && searchTerm.trim() !== '') {
      const filtered = allTrainers.filter(trainer =>
        trainer.trainer_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredTrainers(filtered);
    } else {
      setFilteredTrainers(allTrainers);
    }
  }, [searchTerm, allTrainers]);

  if (!allTrainers)
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

  return (
    <div>
      <div id='trainers'>
        {filteredTrainers && filteredTrainers.length === 0 ? (
          <h1>No trainers found.</h1>
        ) : (
          filteredTrainers.map(trainer => (
            <div key={trainer.trainer_id}>
              <TrainerSmallProfile trainer={trainer} setTrainers={setAllTrainers} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Trainers;
