import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { serverRequests } from '../Api';
import axios from 'axios';
axios.defaults.withCredentials = true;
import '../css/login.css';

const Login = ({ setUserData }) => {

  const navigate = useNavigate();
  const [loginError, setLoginError] = useState('');
  const [salt, setSalt] = useState('');
  const [email, setEmail] = useState('');

  function setToken(token, expiresIn) {
    const expirationTime = new Date().getTime() + expiresIn * 60000;
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('expirationTime', expirationTime);
  }

  const [formData, setFormData] = useState({
    user_id: "",
    password: "",
    salt: ""
  });
  const URL = `login`;

  const handleLogin = () => {
    serverRequests('GET', `${URL}/${formData.user_id}`, null)
      .then(response => {
        if (!response.ok) {
          return;
        }
        return response.json();
      })
      .then(data => {
        if (data) {
          setSalt(data.salt);
        }
        else
          setLoginError("Incorrect password or ID");
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  useEffect(() => {
    if (salt) {
      setFormData(prev => ({ ...prev, salt }));
      serverRequests('POST', URL, { ...formData, salt })
        .then(response => {
          if (!response.ok) {
            setLoginError("Incorrect password or ID");
            setSalt('');
            setFormData(prev => ({
              ...prev,
              password: ""
            }));
            return;
          }
          return response.json();
        })
        .then(data => {
          if (data) {
            const { user, token } = data;
            setToken(token, 60);
            setUserData(user);
            setLoginError("");
            switch (data.user.role_id) {
              case 1:
                navigate('/admin-home');
                break;
              case 2:
                navigate('/trainer-home');
                break;
              case 3:
                navigate('/trainee-home');
                break;
              default:
                navigate('/');
            }
          }
        })
        .catch(error => {
          setLoginError('Error', error);
        });
    }
  }, [salt]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const forgotPasswordHandle = () => {
    serverRequests('GET', `users/email/${formData.user_id}`, null)
      .then(response => {
        return response.json();
      })
      .then(data => {
        if (data) {
          setEmail(data.email);
        } else {
          setLoginError('')
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  useEffect(() => {
    if (!email)
      return;
    serverRequests('PUT', `users/forgot-password`, { email: email })
      .then(response => {
        return response.json()
      })
      .then(data => {
        if (data) {
          setLoginError(data.message);
          setFormData({
            user_id: "",
            password: "",
            salt: ""
          })
        }
      })
      .catch(error => {
        console.error('Error:', error);
        setLoginError(error.message);
        setFormData(prev => ({
          ...prev,
          password: ""
        }));
      });
  }, [email])

  return (
    <div className='loginDiv'>
      <div className="form-container">
        <p className="title">Welcome back</p>
        <p className="sub-title">Let's jump in!</p>
        <form className="form" onSubmit={e => { e.preventDefault(); handleLogin(); }}>
          <input
            type="text"
            className="input"
            placeholder="Id"
            name="user_id"
            value={formData.user_id}
            onChange={handleChange}
          />
          <input
            type="password"
            className="input"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {loginError &&
            <p className='error' style={{ color: "red" }}>{loginError}</p>}
          <p className="page-link">
            <span className="page-link-label" onClick={forgotPasswordHandle}>Forgot Password?</span>
          </p>
          <button className="form-btn" type="submit">Log in</button>
        </form>
        <p className="sign-up-label">
          Don't have an account? <NavLink to="/register" className="sign-up-link">Sign up</NavLink>
        </p>

      </div>
    </div>
  );
};

export default Login;
