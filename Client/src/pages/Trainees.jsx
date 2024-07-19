import React, { useState, useEffect } from 'react';
import { serverRequests } from '../Api';
import TraineeSmallProfile from '../components/TraineeSmallProfile';
import '../css/trainees.css';
import { useNavigate } from 'react-router-dom';
require('dotenv').config();

const { ADMIN_1_ID, ADMIN_2_ID} = process.env;

const Trainees = () => {

  const navigate = useNavigate();
  const [allTrainees, setAllTrainees] = useState(null);
  const [filteredTrainees, setFilteredTrainees] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [gender, setGender] = useState('');

  useEffect(() => {
    const url = 'trainees';

    serverRequests('GET', url, null)
      .then(response => {
        return response.json();
      })
      .then(data => {
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
          setAllTrainees(data.trainees);
          setFilteredTrainees(data.trainees);
        }
      })
      .catch(error => {
        console.error('Error', error);
      });
  }, []);

  useEffect(() => {
    let filtered = allTrainees;

    if (filtered && searchTerm && searchTerm.trim() !== '') {
      filtered = filtered.filter(trainee =>
        trainee.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        trainee.last_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filtered && gender && gender !== '') {
      filtered = filtered.filter(trainee =>
        trainee.gender.toLowerCase() === gender.toLowerCase()
      );
    }

    setFilteredTrainees(filtered);
  }, [searchTerm, gender, allTrainees]);

  if (!allTrainees)
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
      <div className='trainees-title'>
        <h1>FitHub's Trainees</h1>
        <svg fill="#000000" height="50px" width="50px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 512.389 512.389" xmlSpace="preserve">
          <g transform="translate(-1)">
            <g>
              <g>
                <path d="M342.517,149.53c-11.782,0-21.333,9.551-21.333,21.333v21.333h-128v-21.333c0-11.782-9.551-21.333-21.333-21.333
				c-11.782,0-21.333,9.551-21.333,21.333v85.333c0,11.782,9.551,21.333,21.333,21.333c11.782,0,21.333-9.551,21.333-21.333v-21.333
				h128v21.333c0,11.782,9.551,21.333,21.333,21.333c11.782,0,21.333-9.551,21.333-21.333v-85.333
				C363.851,159.081,354.3,149.53,342.517,149.53z"/>
                <path d="M476.366,76.883c-33.935-35.416-72.099-55.355-115.427-55.355c-41.678,0-78.831,21.529-103.937,55.995
				c-24.925-34.546-61.639-55.995-103.274-55.995c-43.039,0-80.572,19.732-115.259,55.181
				c-52.122,53.311-52.315,152.079,14.922,217.668c13.01,12.687,45.396,45.185,91.085,91.311
				c21.941,22.151,44.681,45.152,67.393,68.152c7.949,8.05,15.327,15.526,21.946,22.234c6.806,6.9,6.806,6.9,8.316,8.431
				c8.355,8.474,22.027,8.474,30.382,0.001c1.51-1.532,1.51-1.532,8.317-8.431c6.619-6.708,13.998-14.184,21.949-22.234
				c22.715-23.001,45.458-46.001,66.722-67.466c46.374-46.811,78.764-79.31,91.772-91.996
				C528.257,229.037,527.781,130.633,476.366,76.883z M431.482,263.835c-13.261,12.932-45.698,45.478-91.615,91.828
				c-21.959,22.167-44.716,45.182-67.446,68.197c-5.305,5.372-10.357,10.488-15.098,15.292c-4.74-4.803-9.79-9.919-15.095-15.291
				c-22.726-23.015-45.481-46.03-66.759-67.513c-46.591-47.035-79.024-79.58-92.287-92.515
				c-50.162-48.933-50.022-120.663-14.211-157.29c27.342-27.943,54.744-42.349,84.757-42.349c35.729,0,67.329,25.299,83.42,65.286
				c7.173,17.826,32.409,17.826,39.582,0c15.986-39.728,48.268-65.286,84.209-65.286c30.303,0,58.086,14.515,84.607,42.194
				C481.057,143.513,481.404,215.137,431.482,263.835z"/>
              </g>
            </g>
          </g>
        </svg>
      </div>
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

      <div className='trainees'>

        {filteredTrainees && filteredTrainees.length === 0 ? (
          <h1>No trainees found.</h1>
        ) : (
          filteredTrainees.map(trainee => (
            <div key={trainee.trainee_id}>
              <TraineeSmallProfile trainee={trainee} setTrainees={setAllTrainees} allTrainees={allTrainees} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Trainees;
