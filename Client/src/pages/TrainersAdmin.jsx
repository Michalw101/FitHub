import React, { useState, useEffect } from 'react';
import { serverRequests } from '../Api';
import TrainerSmallProfileAdmin from '../components/TrainerSmallProfileAdmin';
import '../css/trainers.css';


const TrainersAdmin = () => {
  const [allTrainers, setAllTrainers] = useState(null);
  const [filteredTrainers, setFilteredTrainers] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
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

    if (filtered && gender && gender !== '') {
      filtered = filtered.filter(trainer =>
        trainer.gender.toLowerCase() === gender.toLowerCase()
      );
    }

    setFilteredTrainers(filtered);
  }, [searchTerm, gender, allTrainers]);

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
      <div className='trainers-title'>
        <h1>FitHub's Trainers Team</h1>
        <svg fill="#000000" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
          width="70px" height="70px" viewBox="0 0 202.074 202.074"
          xmlSpace="preserve">
          <g>
            <g>
              <polygon points="117.17,83.26 143.049,23.406 119.643,0 101.025,46.566 		" />
              <polygon points="102.861,28.439 114.236,0 80.124,0 92.631,28.439 		" />
              <polygon points="114.248,90.025 74.638,0 51.231,23.406 83.634,90.025 		" />
              <path d="M101.038,93.243c-30.047,0-54.416,24.362-54.416,54.419c0,30.05,24.363,54.412,54.416,54.412
			c30.053,0,54.415-24.362,54.415-54.412C155.453,117.605,131.084,93.243,101.038,93.243z M139.542,123.342l0.621-2.447l1.564,1.979
			l2.509-0.164l-1.406,2.094l0.943,2.339l-2.43-0.683l-1.937,1.614l-0.104-2.515l-2.125-1.346L139.542,123.342z M121.542,104.916
			l2.338,0.935l2.095-1.397l-0.158,2.509l1.974,1.559l-2.442,0.621l-0.87,2.362l-1.34-2.125l-2.515-0.104l1.607-1.936
			L121.542,104.916z M99.92,100.026l1.117-2.256l1.117,2.256l2.496,0.362l-1.814,1.757l0.433,2.481l-2.231-1.163l-2.231,1.169
			l0.429-2.481l-1.809-1.757L99.92,100.026z M76.096,104.453l2.101,1.403l2.338-0.935l-0.679,2.43l1.614,1.937l-2.518,0.098
			l-1.346,2.131l-0.874-2.362l-2.445-0.621l1.976-1.559L76.096,104.453z M60.359,122.873l1.559-1.979l0.624,2.447l2.363,0.871
			l-2.14,1.346l-0.098,2.521l-1.927-1.62l-2.438,0.694l0.935-2.338l-1.404-2.095L60.359,122.873z M53.773,151.254l-0.362-2.484
			l-2.256-1.12l2.262-1.12l0.362-2.484l1.766,1.803l2.481-0.427l-1.179,2.229l1.172,2.235l-2.475-0.433L53.773,151.254z
			 M62.542,171.957l-0.63,2.448l-1.553-1.973l-2.521,0.171l1.403-2.107l-0.935-2.338l2.439,0.676l1.927-1.613l0.098,2.521
			l2.134,1.352L62.542,171.957z M80.529,190.39l-2.332-0.944l-2.101,1.4l0.161-2.521l-1.976-1.559l2.445-0.634l0.868-2.362
			l1.352,2.144l2.512,0.104l-1.607,1.918L80.529,190.39z M102.155,195.279l-1.117,2.253l-1.117-2.253l-2.494-0.365l1.809-1.754
			l-0.429-2.484l2.231,1.169l2.231-1.175l-0.433,2.479l1.814,1.76L102.155,195.279z M125.975,190.846l-2.095-1.4l-2.338,0.938
			l0.682-2.436l-1.613-1.93l2.515-0.104l1.34-2.131l0.877,2.362l2.448,0.621l-1.979,1.564L125.975,190.846z M101.038,186.62
			c-21.52,0-38.971-17.445-38.971-38.971c0-21.519,17.451-38.97,38.971-38.97c21.516,0,38.968,17.451,38.968,38.97
			C140.005,169.175,122.553,186.62,101.038,186.62z M141.728,172.42l-1.564,1.985l-0.621-2.441l-2.363-0.871l2.132-1.352
			l0.097-2.521l1.937,1.613l2.43-0.688l-0.932,2.351l1.4,2.095L141.728,172.42z M148.31,151.261l-1.766-1.809l-2.484,0.433
			l1.169-2.235l-1.169-2.229l2.473,0.427l1.766-1.814l0.365,2.496l2.253,1.12l-2.253,1.108L148.31,151.261z"/>
              <path d="M77.917,153.435h1.166l1.06,0.128l0.429,0.42l0.106,0.986v0.755c0,0.597-0.119,1.072-0.353,1.419
			c-0.231,0.354-0.664,0.664-1.297,0.956c-0.63,0.28-1.297,0.42-1.997,0.42c-0.996,0-1.915-0.286-2.743-0.858
			s-1.495-1.449-2.012-2.631c-0.512-1.188-0.768-2.581-0.768-4.189c0-1.467,0.229-2.721,0.697-3.75
			c0.475-1.035,1.111-1.821,1.921-2.351c0.804-0.536,1.677-0.804,2.6-0.804c0.654,0,1.327,0.146,2.012,0.45
			c0.688,0.311,1.297,0.731,1.833,1.267c0.533,0.536,1.26,1.547,2.183,3.032l2.695-0.876l-1.839-6.771h-2.058l-0.542,0.913
			c-0.63-0.384-1.397-0.694-2.29-0.919c-0.898-0.232-1.791-0.348-2.686-0.348c-1.86,0-3.581,0.463-5.169,1.376
			c-1.583,0.913-2.819,2.162-3.706,3.745c-0.886,1.59-1.327,3.379-1.327,5.383c0,2.016,0.447,3.842,1.346,5.48
			c0.892,1.638,2.104,2.904,3.635,3.806c1.534,0.913,3.236,1.37,5.097,1.37c1.065,0,2.088-0.152,3.078-0.457
			c0.986-0.305,1.939-0.755,2.855-1.363l0.773,1.461h2.999v-6.4l0.131-1.09l0.399-0.42l1.004-0.128H87.9v-2.861h-9.989v2.85H77.917z
			"/>
              <path d="M101.007,143.862h1.041l0.788,0.116l0.165,0.371l-0.062,0.316l-0.438,0.67l-2.986,4.628l-2.686-4.439l-0.469-1.139
			l0.207-0.401l1.008-0.122h0.761v-2.831H88.18v2.831c0.691,0,1.16,0.049,1.392,0.158c0.322,0.165,0.697,0.572,1.132,1.218
			l5.438,8.287v3.197c0,0.657-0.048,1.108-0.149,1.327l-0.448,0.463c-0.195,0.098-0.648,0.134-1.349,0.134h-0.542v2.838h9.986
			v-2.838h-0.73c-0.588,0-0.98-0.036-1.188-0.134l-0.423-0.427c-0.089-0.194-0.125-0.608-0.125-1.254v-3.641l5.45-7.947
			c0.401-0.59,0.749-0.968,1.035-1.126s0.791-0.243,1.504-0.256v-2.825h-8.156V143.862z"/>
              <path d="M134.105,144.203l1.139-0.341h1.011v-2.831h-9.42l-3.685,12.452l-3.544-12.452h-9.255v2.831h1.12l0.847,0.146l0.396,0.463
			l0.104,1.029v11.46l-0.14,1.114l-0.427,0.433l-1.071,0.14h-0.816v2.826h8.379v-2.826h-0.975l-0.913-0.128l-0.438-0.358
			l-0.152-0.658v-12.434l4.816,16.404h2.825l4.993-16.94v12.58l-0.14,0.999l-0.433,0.407l-1.126,0.128h-0.762v2.838h9.834v-2.838
			h-1.163l-0.853-0.17l-0.365-0.402l-0.097-0.962v-11.606C133.782,144.861,133.898,144.435,134.105,144.203z"/>
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

      <div id='trainers'>
        {filteredTrainers && filteredTrainers.length === 0 ? (
          <h1>No trainees found.</h1>
        ) : (
          filteredTrainers.map(trainer => (
            <div key={trainer.trainer_id}>
              <TrainerSmallProfileAdmin trainer={trainer} setTrainers={setAllTrainers} allTrainers={allTrainers} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TrainersAdmin;
