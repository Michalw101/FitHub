import { useContext } from 'react';
import { UserContext } from '../App';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../css/step1.css'

const RegistrationStep1 = ({ handleChanged }) => {
  const userData = useContext(UserContext);

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
                value={userData.first_name || ''}
                onChange={handleChanged} />
              <label htmlFor='name'>First name</label>
            </div>

            <div className='inputGroup'>
              <input
                type="text"
                required=""
                autoComplete="off"
                name="last_name"
                value={userData.last_name || ''}
                onChange={handleChanged}
              />
              <label htmlFor='name'>Last name</label>
            </div>

            <div className='inputGroup'>
              <input
                type="email"
                name="email"
                required=""
                autoComplete="off"
                value={userData.email || ''}
                onChange={handleChanged}
              />
              <label htmlFor='name'>Email</label>
            </div>

            <div className='inputGroup'>
              <div className="date-picker-container">
                <DatePicker
                  selected={userData.birth_date ? new Date(userData.birth_date) : null}
                  onChange={handleDateChange}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Your Birthday DD/MM/YYYY"
                  className="date-picker-input"
                />
              </div>
            </div>

            <div className='inputGroup'>
              <input
                type="phone"
                name="phone"
                required=""
                autoComplete="off"
                value={userData.phone || ''}
                onChange={handleChanged}
              />
              <label htmlFor='name'>Phone</label>
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
                  checked={userData.gender === 'male'}
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
                  checked={userData.gender === 'female'}
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
            </div>
            <br />
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegistrationStep1;
