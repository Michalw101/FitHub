import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Trainers from '../components/Trainers';
import '../css/trainersInHome.css'

const TrainersInHome = ({ userData, setUserData }) => {

  const navigate = useNavigate();
  const handleAddTrainer = () => {

    setUserData(
      {
        user_id: "",
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        birth_date: "",
        gender: "",
        degree_link: "",
        experience: "",
        last_work_place: "",
        diploma: "",
        specialization: "",
        instegram_link: "",
        facebook_link: "",
        twitter_link: ""
      }
    )
    navigate('/trainer-registeration')
  }

  return (

    <div>

      <Trainers userData={userData} setUserData={setUserData} />
      <br/>
      <div className="container">
        <h1>Join FitHub's Trainers Team now!</h1>
        <div tabIndex="0" className="plusButton" onClick={handleAddTrainer}>
          <svg className="plusIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
            <g mask="url(#mask0_21_345)">
              <path d="M13.75 23.75V16.25H6.25V13.75H13.75V6.25H16.25V13.75H23.75V16.25H16.25V23.75H13.75Z"></path>
            </g>
          </svg>
        </div>
      </div>

    </div>

  );
};

export default TrainersInHome;
