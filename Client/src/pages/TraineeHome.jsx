import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { serverRequests } from '../Api';
import HomeLayout from '../components/HomeLayout'
import TrainerClasses from './TrainerClasses';

const TraineeHome = () => {

  const navigate = useNavigate();


  return (
    <div>
      <TrainerClasses />
    </div>
  );
};

export default TraineeHome;
