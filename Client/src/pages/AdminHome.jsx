import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { serverRequests } from '../Api';
import HomeLayout from '../components/HomeLayout'
import Classes from './Classes';

const AdminHome = () => {

  const navigate = useNavigate();


  return (
    <div>
        Admin Home!
    </div>
  );
};

export default AdminHome;
