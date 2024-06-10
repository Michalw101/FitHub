import { useContext } from 'react';
import { UserContext } from '../App';
import { useNavigate } from 'react-router-dom';
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
                <div className="icon-container">
                  <svg
                    width="50px"
                    height="50px"
                    viewBox="-26 0 50 30"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="birthday">
                      <path
                        d="M22.5,3H21V2a1,1,0,0,0-1-1H19a1,1,0,0,0-1,1V3H14V2a1,1,0,0,0-1-1H12a1,1,0,0,0-1,1V3H7V2A1,1,0,0,0,6,1H5A1,1,0,0,0,4,2V3H2.5A1.5,1.5,0,0,0,1,4.5v18A1.5,1.5,0,0,0,2.5,24h20A1.5,1.5,0,0,0,24,22.5V4.5A1.5,1.5,0,0,0,22.5,3ZM19,2l1,0,0,3L19,5ZM12,2l1,0V3.44s0,0,0,.06,0,0,0,.07L13,5,12,5ZM5,2,6,2,6,5,5,5ZM2.5,4H4V5A1,1,0,0,0,5,6H6A1,1,0,0,0,7,5V4h4V5a1,1,0,0,0,1,1H13a1,1,0,0,0,1-1V4h4V5a1,1,0,0,0,1,1H20a1,1,0,0,0,1-1V4h1.5a.5.5,0,0,1,.5.5V8H2V4.5A.5.5,0,0,1,2.5,4Zm20,19H2.5a.5.5,0,0,1-.5-.5V9H23V22.5A.5.5,0,0,1,22.5,23Z"
                        fill="#000000"
                      />
                      <path
                        d="M17.5,15H16V13.91a1.51,1.51,0,0,0,1-1.41c0-.58-.47-2.5-1.5-2.5S14,11.92,14,12.5a1.51,1.51,0,0,0,1,1.41V15H13V13.91a1.51,1.51,0,0,0,1-1.41c0-.58-.47-2.5-1.5-2.5S11,11.92,11,12.5a1.51,1.51,0,0,0,1,1.41V15H10V13.91a1.51,1.51,0,0,0,1-1.41c0-.58-.47-2.5-1.5-2.5S8,11.92,8,12.5a1.51,1.51,0,0,0,1,1.41V15H7.5a.5.5,0,0,0-.5.5v6a.5.5,0,0,0,.5.5h10a.5.5,0,0,0,.5-.5v-6A.5.5,0,0,0,17.5,15Zm-2-4A3.21,3.21,0,0,1,16,12.5a.5.5,0,0,1-1,0A3.21,3.21,0,0,1,15.5,11Zm-3,0A3.21,3.21,0,0,1,13,12.5a.5.5,0,0,1-1,0A3.21,3.21,0,0,1,12.5,11Zm-3,0A3.21,3.21,0,0,1,10,12.5a.5.5,0,0,1-1,0A3.21,3.21,0,0,1,9.5,11ZM17,16v1.27a2.53,2.53,0,0,1-1.52.73,2.11,2.11,0,0,1-1.23-.41A3.08,3.08,0,0,0,12.5,17a3.08,3.08,0,0,0-1.75.59A2.09,2.09,0,0,1,9.52,18,2.53,2.53,0,0,1,8,17.27V16ZM8,21V18.51A3.21,3.21,0,0,0,9.48,19a2.85,2.85,0,0,0,1.79-.56A2.16,2.16,0,0,1,12.5,18a2.16,2.16,0,0,1,1.23.44,3,3,0,0,0,1.66.56h.13A3.21,3.21,0,0,0,17,18.51V21Z"
                        fill="#000000"
                      />
                    </g>
                  </svg>
                </div>
                <DatePicker
                  selected={userData.birth_date ? new Date(userData.birth_date) : null}
                  onChange={handleDateChange}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Your Birthday DD/MM/YYYY"
                  className="date-picker-input"
                />

              </div>
            </div>


            <div className="ui-wrapper">
              <input id="Austria" name="flag" type="radio" />
              <input id="Belgium" name="flag" type="radio" />
              <input id="Bulgaria" name="flag" type="radio" />
              <input id="Croatia" name="flag" type="radio" />
              <input id="Cyprus" name="flag" type="radio" />
              <input id="Czech" name="flag" type="radio" />
              <input id="Denmark" name="flag" type="radio" />
              <input id="Estonia" name="flag" type="radio" />
              <input id="Finland" name="flag" type="radio" />
              <input id="France" name="flag" type="radio" />
              <input id="Germany" name="flag" type="radio" />
              <input id="Greece" name="flag" type="radio" />
              <input id="Hungary" name="flag" type="radio" />
              <input id="Iceland" name="flag" type="radio" />
              <input id="Ireland" name="flag" type="radio" />
              <input id="Israel" name="flag" type="radio" defaultChecked />
              <input id="Italy" name="flag" type="radio" />
              <input id="Latvia" name="flag" type="radio" />
              <input id="Liechtenstein" name="flag" type="radio" />
              <input id="Lithuania" name="flag" type="radio" />
              <input id="Luxembourg" name="flag" type="radio" />
              <input id="Malta" name="flag" type="radio" />
              <input id="Netherlands" name="flag" type="radio" />
              <input id="Norway" name="flag" type="radio" />
              <input id="Poland" name="flag" type="radio" />
              <input id="Portugal" name="flag" type="radio" />
              <input id="Romania" name="flag" type="radio" />
              <input id="Slovakia" name="flag" type="radio" />
              <input id="Slovenia" name="flag" type="radio" />
              <input id="Spain" name="flag" type="radio" />
              <input id="Sweden" name="flag" type="radio" />
              <input className="dropdown-checkbox" name="dropdown" id="dropdown" type="checkbox" />
              <label className="dropdown-container" htmlFor="dropdown"></label>
              <div className="input-wrapper">
                <legend>
                  <label htmlFor="phonenumber">Phone number*</label>
                </legend>
                <div className="textfield">
                  <input
                    pattern="\d+"
                    maxLength="11"
                    id="phonenumber"
                    name="phone"
                    type="text"
                    value={userData.phone || ''}
                    onChange={handleChanged}
                  />
                  <span className="invalid-msg">This is not a valid phone number</span>
                </div>
              </div>
              <div className="select-wrapper">
                <ul>
                  <li className="Austria"><label htmlFor="Austria"><span role="img" aria-label="Austria">🇦🇹</span>Austria (+43)</label></li>
                  <li className="Belgium"><label htmlFor="Belgium"><span role="img" aria-label="Belgium">🇧🇪</span>Belgium (+32)</label></li>
                  <li className="Bulgaria"><label htmlFor="Bulgaria"><span role="img" aria-label="Bulgaria">🇧🇬</span>Bulgaria (+359)</label></li>
                  <li className="Croatia"><label htmlFor="Croatia"><span role="img" aria-label="Croatia">🇭🇷</span>Croatia (+385)</label></li>
                  <li className="Cyprus"><label htmlFor="Cyprus"><span role="img" aria-label="Cyprus">🇨🇾</span>Cyprus (+357)</label></li>
                  <li className="Czech"><label htmlFor="Czech"><span role="img" aria-label="Czech Republic">🇨🇿</span>Czech Republic (+420)</label></li>
                  <li className="Denmark"><label htmlFor="Denmark"><span role="img" aria-label="Denmark">🇩🇰</span>Denmark (+45)</label></li>
                  <li className="Estonia"><label htmlFor="Estonia"><span role="img" aria-label="Estonia">🇪🇪</span>Estonia (+372)</label></li>
                  <li className="Finland"><label htmlFor="Finland"><span role="img" aria-label="Finland">🇫🇮</span>Finland (+358)</label></li>
                  <li className="France"><label htmlFor="France"><span role="img" aria-label="France">🇫🇷</span>France (+33)</label></li>
                  <li className="Germany"><label htmlFor="Germany"><span role="img" aria-label="Germany">🇩🇪</span>Germany (+49)</label></li>
                  <li className="Greece"><label htmlFor="Greece"><span role="img" aria-label="Greece">🇬🇷</span>Greece (+30)</label></li>
                  <li className="Hungary"><label htmlFor="Hungary"><span role="img" aria-label="Hungary">🇭🇺</span>Hungary (+36)</label></li>
                  <li className="Iceland"><label htmlFor="Iceland"><span role="img" aria-label="Iceland">🇮🇸</span>Iceland (+354)</label></li>
                  <li className="Ireland"><label htmlFor="Ireland"><span role="img" aria-label="Ireland">🇮🇪</span>Republic of Ireland (+353)</label></li>
                  <li className="Israel"><label htmlFor="Israel"><span role="img" aria-label="Israel">🇮🇱</span>Israel (+972)</label></li>
                  <li className="Italy"><label htmlFor="Italy"><span role="img" aria-label="Italy">🇮🇹</span>Italy (+39)</label></li>
                  <li className="Latvia"><label htmlFor="Latvia"><span role="img" aria-label="Latvia">🇱🇻</span>Latvia (+371)</label></li>
                  <li className="Liechtenstein"><label htmlFor="Liechtenstein"><span role="img" aria-label="Liechtenstein">🇱🇮</span>Liechtenstein (+423)</label></li>
                  <li className="Lithuania"><label htmlFor="Lithuania"><span role="img" aria-label="Lithuania">🇱🇹</span>Lithuania (+370)</label></li>
                  <li className="Luxembourg"><label htmlFor="Luxembourg"><span role="img" aria-label="Luxembourg">🇱🇺</span>Luxembourg (+352)</label></li>
                  <li className="Malta"><label htmlFor="Malta"><span role="img" aria-label="Malta">🇲🇹</span>Malta (+356)</label></li>
                  <li className="Netherlands"><label htmlFor="Netherlands"><span role="img" aria-label="Netherlands">🇳🇱</span>Netherlands (+31)</label></li>
                  <li className="Norway"><label htmlFor="Norway"><span role="img" aria-label="Norway">🇳🇴</span>Norway (+47)</label></li>
                  <li className="Poland"><label htmlFor="Poland"><span role="img" aria-label="Poland">🇵🇱</span>Poland (+48)</label></li>
                  <li className="Portugal"><label htmlFor="Portugal"><span role="img" aria-label="Portugal">🇵🇹</span>Portugal (+351)</label></li>
                  <li className="Romania"><label htmlFor="Romania"><span role="img" aria-label="Romania">🇷🇴</span>Romania (+40)</label></li>
                  <li className="Slovakia"><label htmlFor="Slovakia"><span role="img" aria-label="Slovakia">🇸🇰</span>Slovakia (+421)</label></li>
                  <li className="Slovenia"><label htmlFor="Slovenia"><span role="img" aria-label="Slovenia">🇸🇮</span>Slovenia (+386)</label></li>
                  <li className="Spain"><label htmlFor="Spain"><span role="img" aria-label="Spain">🇪🇸</span>Spain (+34)</label></li>
                  <li className="Sweden"><label htmlFor="Sweden"><span role="img" aria-label="Sweden">🇸🇪</span>Sweden (+46)</label></li>
                </ul>
              </div>
            </div>
            <br />
            <br />
            {/* <div className='inputGroup'>
              <DatePicker
                selected={userData.birth_date}
                onChange={handleDateChange}
                dateFormat="dd/MM/yyyy"
              />
            </div> */}
            {/* <div>
              <input
                type="radio"
                id="male"
                name="gender"
                value="male"
                checked={userData.gender === 'male'}
                onChange={handleGenderChange}
              />
              <label htmlFor="male">Male</label>
            </div>
            <div>
              <input
                type="radio"
                id="female"
                name="gender"
                value="female"
                checked={userData.gender === 'female'}
                onChange={handleGenderChange}
              />
              <label htmlFor="female">Female</label>
            </div> */}


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

                {/* <label class="genderlabel otherbutton" for="other">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 78 75"
                      class="smallsvg other-gender"
                    >
                      <path
                        strokeLinecap="round"
                        strokeWidth="6"
                        stroke="#9B4AED"
                        d="M73.4657 16.6983L48.2159 16.6984L19.9816 58.0001L2.99911 58"
                      ></path>
                      <path
                        strokeLinecap="round"
                        strokeWidth="6"
                        stroke="#9B4AED"
                        d="M73.1641 16.698L59.4705 2.99992"
                      ></path>
                      <path
                        strokeLinecap="round"
                        strokeWidth="6"
                        stroke="#9B4AED"
                        d="M59.4648 30.696L73.1629 17.0024"
                      ></path>
                      <path
                        strokeLinecap="round"
                        strokeWidth="6"
                        stroke="#9B4AED"
                        d="M74.022 57.8121L51.1697 57.8121L19.9997 16.9999L3 17"
                      ></path>
                      <path
                        strokeLinecap="round"
                        strokeWidth="6"
                        stroke="#9B4AED"
                        d="M73.748 57.8123L61.3547 71.51"
                      ></path>
                      <path
                        strokeLinecap="round"
                        strokeWidth="6"
                        stroke="#9B4AED"
                        d="M61.3496 43.8147L73.747 57.5079"
                      ></path>
                    </svg>

                    Other
                  </label> */}
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
