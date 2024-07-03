import React, { useState, useEffect } from 'react';
import { serverRequests } from '../Api';
import TraineeSmallProfile from '../components/TraineeSmallProfile';
import '../css/trainers.css';


const Trainees = () => {
  const [allTrainees, setAllTrainees] = useState(null);
  const [filteredTrainees, setFilteredTrainees] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [gender, setGender] = useState('');

  useEffect(() => {
    const url = 'trainees';

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
        <div className="filters">

          {/* <div className="input-container">
            <input
              type="text"
              name="text"
              className="input1"
              placeholder="Search by trainer name..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)} />
            <svg xmlns="http://www.w3.org/2000/svg" fill="" viewBox="0 0 24 24" className="icon1">
              <g strokeWidth="0" id="SVGRepo_bgCarrier"></g>
              <g strokeLinejoin="round" strokeLinecap="round" id="SVGRepo_tracerCarrier"></g>
              <g id="SVGRepo_iconCarrier">
                <rect fill="white" height="24" width="24"></rect>
                <path fill="" d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM9 11.5C9 10.1193 10.1193 9 11.5 9C12.8807 9 14 10.1193 14 11.5C14 12.8807 12.8807 14 11.5 14C10.1193 14 9 12.8807 9 11.5ZM11.5 7C9.01472 7 7 9.01472 7 11.5C7 13.9853 9.01472 16 11.5 16C12.3805 16 13.202 15.7471 13.8957 15.31L15.2929 16.7071C15.6834 17.0976 16.3166 17.0976 16.7071 16.7071C17.0976 16.3166 17.0976 15.6834 16.7071 15.2929L15.31 13.8957C15.7471 13.202 16 12.3805 16 11.5C16 9.01472 13.9853 7 11.5 7Z" clipRule="evenodd" fillRule="evenodd"></path>
              </g>
            </svg>
          </div> */}
          <input
            type="text"
            placeholder="Search by name"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
         
          <select
            value={gender}
            onChange={e => setGender(e.target.value)}
          >
            <option value="">All Genders</option>
            <option value="male">Boys only</option>
            <option value="female">Girls only</option>
          </select>
        </div>
        <div id='trainers'>

        {filteredTrainees && filteredTrainees.length === 0 ? (
          <h1>No trainees found.</h1>
        ) : (
          filteredTrainees.map(trainee => (
            <div key={trainee.trainee_id}>
              <TraineeSmallProfile trainee={trainee} setTrainees={setAllTrainees} allTrainees={allTrainees}/>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Trainees;
