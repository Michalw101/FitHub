import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { serverRequests } from '../Api';
import HomeLayout from '../components/HomeLayout'
import Classes from './Classes';

const TraineeHome = () => {

  const navigate = useNavigate();


  return (
    <div>
      <Classes />
    </div>
  );
};

export default TraineeHome;
