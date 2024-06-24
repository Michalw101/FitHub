import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import TraineeClasses from './TraineeClasses';

const TraineeHome = ( {userData}) => {

  const navigate = useNavigate();


  return (
    <div>
      <TraineeClasses userData={userData}/>
    </div>
  );
};

export default TraineeHome;
