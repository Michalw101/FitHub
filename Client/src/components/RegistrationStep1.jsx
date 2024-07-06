import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../css/step1.css';

const RegistrationStep1 = ({ handleChanged, signupUser, errors }) => {

  const formatDateToSQL = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = (`0${d.getMonth() + 1}`).slice(-2);
    const day = (`0${d.getDate()}`).slice(-2);
    return `${year}-${month}-${day}`;
  };
  const handleDateChange = (date) => {
    handleChanged({ target: { name: 'birth_date', value: formatDateToSQL(date) } });
  };

  const handleGenderChange = (event) => {
    const { name, value } = event.target;
    handleChanged({ target: { name, value } });
  };

  return (

    <div>
      <form>
        <br />
        <div className='endOfRegisterForm'>
          <div className='details'>

            <p className='headerP'>Let`s get to know you...</p><br />

            <div className='inputGroup'>
              <input
                type="text"
                required=""
                autoComplete="off"
                name="first_name"
                value={signupUser.first_name || ''}
                onChange={handleChanged} />
              <label htmlFor='name'>First name</label>
              {errors.first_name && <p className="error">{errors.first_name}</p>}

            </div>

            <div className='inputGroup'>
              <input
                type="text"
                required=""
                autoComplete="off"
                name="last_name"
                value={signupUser.last_name || ''}
                onChange={handleChanged}
              />
              <label htmlFor='name'>Last name</label>
              {errors.last_name && <p className="error">{errors.last_name}</p>}

            </div>

            <div className='inputGroup'>
              <input
                type="text"
                name="email"
                required=""
                autoComplete="off"
                value={signupUser.email || ''}
                onChange={handleChanged}
              />
              <label htmlFor='name'>Email</label>
              {errors.email && <p className="error">{errors.email}</p>}

            </div>

            <div className='inputGroup'>
              <div className="date-picker-container">
                <DatePicker
                  selected={signupUser.birth_date ? new Date(signupUser.birth_date) : null}
                  onChange={handleDateChange}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Your Birthday DD/MM/YYYY"
                  className="date-picker-input"
                />
              </div>
              {errors.birth_date && <p className="error">{errors.birth_date}</p>}

            </div>

            <div className='inputGroup'>
              <input
                type="phone"
                name="phone"
                required=""
                autoComplete="off"
                value={signupUser.phone || ''}
                onChange={handleChanged}
              />
              <label htmlFor='name'>Phone</label>
              {errors.phone && <p className="error">{errors.phone}</p>}

            </div>
            <br />

            <div className="gender-card">
              <p className="heading">What's your gender?</p>
              <div className="radio-wrapper">
                <input
                  className="gender-radio-buttons"
                  id="male"
                  value="male"
                  name="gender"
                  type="radio"
                  checked={signupUser.gender === 'male'}
                  onChange={handleGenderChange}
                />
                <label className="genderlabel malebutton" htmlFor="male">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 50 90" className="smallsvg malesmallsvg">
                    <circle strokeWidth="6" stroke="#76E3FE" r="22" cy="25" cx="25"></circle>
                    <path strokeLinecap="round" strokeWidth="6" stroke="#76E3FE" d="M25 47L25 87"></path>
                    <path strokeLinecap="round" strokeWidth="6" stroke="#76E3FE" d="M25 86.6958L38.6958 73"></path>
                    <path strokeLinecap="round" strokeWidth="6" stroke="#76E3FE" d="M11 73L24.6958 86.6958"></path>
                  </svg>
                  Male
                </label>
                <input
                  className="gender-radio-buttons"
                  id="female"
                  value="female"
                  name="gender"
                  type="radio"
                  checked={signupUser.gender === 'female'}
                  onChange={handleGenderChange}
                />
                <label className="genderlabel femalebutton" htmlFor="female">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 50 90" className="smallsvg">
                    <circle strokeWidth="6" stroke="#F57CB3" r="22" cy="25" cx="25"></circle>
                    <path strokeLinecap="round" strokeWidth="6" stroke="#F57CB3" d="M25 47L25 87"></path>
                    <path strokeLinecap="round" strokeWidth="6" stroke="#F57CB3" d="M12 73H38"></path>
                  </svg>
                  Female
                </label>
              </div>
              {errors.gender && <p className="error">{errors.gender}</p>}

            </div>
            <br />
          </div>
        </div>
      </form>
    </div>
  );
}

export default RegistrationStep1;



