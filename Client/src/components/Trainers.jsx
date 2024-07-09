import React, { useState, useEffect } from 'react';
import { serverRequests } from '../Api';
import TrainerSmallProfile from './TrainerSmallProfile';
import { useNavigate } from 'react-router-dom';
import '../css/trainers.css';


const Trainers = (userData) => {

  const navigate = useNavigate();
  const [allTrainers, setAllTrainers] = useState(null);
  const [filteredTrainers, setFilteredTrainers] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [gender, setGender] = useState('');

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
    let filtered = allTrainers;

    if (filtered && searchTerm && searchTerm.trim() !== '') {
      filtered = filtered.filter(trainer =>
        trainer.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        trainer.last_name.toLowerCase().includes(searchTerm.toLowerCase())

      );
    }

    if (filtered && specialty && specialty.trim() !== '') {
      filtered = filtered.filter(trainer =>
        trainer.specialization.toLowerCase().includes(specialty.toLowerCase())
      );
    }

    if (filtered && gender && gender !== '') {
      filtered = filtered.filter(trainer =>
        trainer.gender.toLowerCase() === gender.toLowerCase()
      );
    }

    setFilteredTrainers(filtered);
  }, [searchTerm, specialty, gender, allTrainers]);

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

  const backBtnClick = () => {
    navigate('/');
  }

  return (
    <div>

      <button className="button3" onClick={backBtnClick}>
        <div className="button-box">
          <span className="button-elem">
            <svg viewBox="0 0 46 40" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M46 20.038c0-.7-.3-1.5-.8-2.1l-16-17c-1.1-1-3.2-1.4-4.4-.3-1.2 1.1-1.2 3.3 0 4.4l11.3 11.9H3c-1.7 0-3 1.3-3 3s1.3 3 3 3h33.1l-11.3 11.9c-1 1-1.2 3.3 0 4.4 1.2 1.1 3.3.8 4.4-.3l16-17c.5-.5.8-1.1.8-1.9z"
              ></path>
            </svg>
          </span>
          <span className="button-elem">
            <svg viewBox="0 0 46 40">
              <path
                d="M46 20.038c0-.7-.3-1.5-.8-2.1l-16-17c-1.1-1-3.2-1.4-4.4-.3-1.2 1.1-1.2 3.3 0 4.4l11.3 11.9H3c-1.7 0-3 1.3-3 3s1.3 3 3 3h33.1l-11.3 11.9c-1 1-1.2 3.3 0 4.4 1.2 1.1 3.3.8 4.4-.3l16-17c.5-.5.8-1.1.8-1.9z"
              ></path>
            </svg>
          </span>
        </div>
      </button>

      <div className="input2-container">
        <div className="search">
          <input
            type="text"
            className="search__input"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <button className="search__button">
            <svg className="search__icon" aria-hidden="true" viewBox="0 0 24 24">
              <g>
                <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
              </g>
            </svg>
          </button>
        </div>

        <div className="search">
          <input
            type="text"
            className="search__input"
            placeholder="Search by speciality..."
            value={specialty}
            onChange={e => setSpecialty(e.target.value)}
          />
          <button className="search__button">
            <svg className="search__icon" aria-hidden="true" viewBox="0 0 24 24">
              <g>
                <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
              </g>
            </svg>
          </button>
        </div>

        <div className="select-container">
          <select
            className="custom-select"
            value={gender}
            onChange={e => setGender(e.target.value)}
          >
            <option value="">All Genders</option>
            <option value="male">Boys only</option>
            <option value="female">Girls only</option>
          </select>
        </div>
      </div>

      <div id='trainers'>
        {filteredTrainers && filteredTrainers.length === 0 ? (
          <h2>No trainers found.</h2>
        ) : (
          filteredTrainers.map(trainer => (
            <div key={trainer.trainer_id}>
              <TrainerSmallProfile trainer={trainer} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Trainers;
