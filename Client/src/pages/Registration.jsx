import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { serverRequests } from '../Api';
import '../css/registration.css'

const Registration = ({ setUserData }) => {
    const navigate = useNavigate();
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVerify, setPasswordVerify] = useState('');
    const [signUpError, setSignUpError] = useState('');



    const handleRegistration = () => {
        if (!userId || !password || !passwordVerify) {
            setSignUpError('Please fill in all fields');
            return;
        }
        if (password != passwordVerify) {
            setSignUpError('The passwords are not the same');
            return;
        }
        if(!CheckPassword(password))
            return;

        const signupUser = {
            user_id: userId,
            password: password
        };

        const url = "signup"
        serverRequests('POST', url, signupUser)
            .then(response => {

                return response.json();
            }).then((data) => {
                if (data.ok == false) {
                    setSignUpError("user is already exist");
                    return;
                }
                setUserData(data.user);
                setUserData((prev) => ({
                    ...prev,
                    heart_disease: 0,
                    chest_pain_at_rest: 0,
                    chest_pain_daily_activity: 0,
                    chest_pain_exercise: 0,
                    dizziness_balance_loss: 0,
                    fainting: 0,
                    asthma_medication: 0,
                    asthma_symptoms: 0,
                    family_heart_disease: 0,
                    family_sudden_death: 0,
                    exercise_supervision: 0,
                    chronic_disease: 0,
                    pregnancy_risk: 0
                }))
                navigate('/user-details');
            }).catch(error => {
                setSignUpError(error.massege);
            });

    }



    const CheckPassword = (password) => {
        let psw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,16}$/;
        if (password.match(psw)) {
            return true;
        } else {
            setSignUpError('passsword is too weak.');
            return false;
        }
    }

    return (
        <div className="form-container">
            <p className="title">Create account</p>
            <p className="sub-title">Let's get started!</p>
            <form className="form">
                <input
                    type="text"
                    className="input"
                    placeholder="Id number"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                />
                <input
                    type="password"
                    className="input"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    type="password"
                    className="input"
                    placeholder="Confirm Password"
                    value={passwordVerify}
                    onChange={(e) => setPasswordVerify(e.target.value)}
                />
                {signUpError && <p className="error" style={{ color: "red" }}>{signUpError}</p>}
                <button
                    type="button"
                    className="form-btn"
                    onClick={handleRegistration}
                >
                    Create account
                </button>
            </form>
            <p className="sign-up-label">
                Already have an account?<NavLink to="/login" className="sign-up-link">Log in</NavLink>
            </p>
        </div>




    )
};

export default Registration;
