import { useContext } from 'react';
import { UserContext } from '../App';
import '../css/step2.css'

const RegistrationStep2 = ({ handleChanged }) => {
  const userData = useContext(UserContext);

  const handleClicked = (event) => {
    const { name, value } = event.target;
    handleChanged({ target: { name, value: +value } });
  };

  return (
    <div>
      <form>
        <br />
        <div className='medicalInfoForm'>
          <div className='details'>
            <p>Let`s build your medical profile...</p><br />
            <br />
            <label htmlFor="heart_disease">Do you have heart disease?</label>
            <div className='radio-inputs'>
              <label className='radio'>
                <input
                  type="radio"
                  id="heart_disease_yes"
                  name="heart_disease"
                  value={1}
                  checked={userData.heart_disease === 1}
                  onChange={handleClicked}
                />
                <span htmlFor="heart_disease_yes" className='name'>Yes</span>
              </label>
              <label className='radio'>
                <input
                  type="radio"
                  id="heart_disease_no"
                  name="heart_disease"
                  value={0}
                  checked={userData.heart_disease === 0}
                  onChange={handleClicked}
                />
                <span htmlFor="heart_disease_no" className='name'>No</span>
              </label>
            </div>
            <br /><br />

            <label htmlFor="chest_pain_at_rest">Do you experience chest pain at rest?</label>
            <div className='radio-inputs'>
              <label className='radio'>
                <input
                  type="radio"
                  id="chest_pain_at_rest_yes"
                  name="chest_pain_at_rest"
                  value={1}
                  checked={userData.chest_pain_at_rest === 1}
                  onChange={handleClicked}
                />
                <span htmlFor="chest_pain_at_rest_yes" className='name'>Yes</span>
              </label>
              <label className='radio'>
                <input
                  type="radio"
                  id="chest_pain_at_rest_no"
                  name="chest_pain_at_rest"
                  value={0}
                  checked={userData.chest_pain_at_rest === 0}
                  onChange={handleClicked}
                />
                <span htmlFor="chest_pain_at_rest_no" className='name'>No</span>
              </label>
            </div>
            <br /><br />

            <label htmlFor="chest_pain_daily_activity">Do you experience chest pain during daily activity?</label>
            <div className='radio-inputs'>
              <label className="radio">
                <input
                  type="radio"
                  id="chest_pain_daily_activity_yes"
                  name="chest_pain_daily_activity"
                  value={1}
                  checked={userData.chest_pain_daily_activity === 1}
                  onChange={handleClicked}
                />
                <span htmlFor="chest_pain_daily_activity_yes" className='name'>Yes</span>
              </label>
              <label className="radio">
                <input
                  type="radio"
                  id="chest_pain_daily_activity_no"
                  name="chest_pain_daily_activity"
                  value={0}
                  checked={userData.chest_pain_daily_activity === 0}
                  onChange={handleClicked}
                />
                <span htmlFor="chest_pain_daily_activity_no" className='name'>No</span>
              </label>
            </div>
            <br /><br />


            <label htmlFor="chest_pain_exercise">Do you experience chest pain during exercise?</label>
            <div className='radio-inputs'>
              <label className="radio">
                <input
                  type="radio"
                  id="chest_pain_exercise_yes"
                  name="chest_pain_exercise"
                  value={1}
                  checked={userData.chest_pain_exercise === 1}
                  onChange={handleClicked}
                />
                <span htmlFor="chest_pain_exercise_yes" className='name'>Yes</span>
              </label>
              <label className="radio">
                <input
                  type="radio"
                  id="chest_pain_exercise_no"
                  name="chest_pain_exercise"
                  value={0}
                  checked={userData.chest_pain_exercise === 0}
                  onChange={handleClicked}
                />
                <span htmlFor="chest_pain_exercise_no" className='name'>No</span>
              </label>
            </div>
            <br /><br />

            <label htmlFor="dizziness_balance_loss">Do you experience dizziness or balance loss?</label>
            <div className='radio-inputs'>
              <label className="radio">
                <input
                  type="radio"
                  id="dizziness_balance_loss_yes"
                  name="dizziness_balance_loss"
                  value={1}
                  checked={userData.dizziness_balance_loss === 1}
                  onChange={handleClicked}
                />
                <span htmlFor="dizziness_balance_loss_yes" className='name'>Yes</span>
              </label>
              <label className="radio">
                <input
                  type="radio"
                  id="dizziness_balance_loss_no"
                  name="dizziness_balance_loss"
                  value={0}
                  checked={userData.dizziness_balance_loss === 0}
                  onChange={handleClicked}
                />
                <span htmlFor="dizziness_balance_loss_no" className='name'>No</span>
              </label>
            </div>
            <br /><br />

            <label htmlFor="fainting">Have you fainted before?</label>
            <div className='radio-inputs'>
              <label className="radio">
                <input
                  type="radio"
                  id="fainting_yes"
                  name="fainting"
                  value={1}
                  checked={userData.fainting === 1}
                  onChange={handleClicked}
                />
                <span htmlFor="fainting_yes" className='name'>Yes</span>
              </label>
              <label className="radio">
                <input
                  type="radio"
                  id="fainting_no"
                  name="fainting"
                  value={0}
                  checked={userData.fainting === 0}
                  onChange={handleClicked}
                />
                <span htmlFor="fainting_no" className='name'>No</span>
              </label>
            </div>
            <br /><br />

            <label htmlFor="asthma_medication">Do you take medication for asthma?</label>
            <div className='radio-inputs'>
              <label className="radio">
                <input
                  type="radio"
                  id="asthma_medication_yes"
                  name="asthma_medication"
                  value={1}
                  checked={userData.asthma_medication === 1}
                  onChange={handleClicked}
                />
                <span htmlFor="asthma_medication_yes" className='name'>Yes</span>
              </label>
              <label className="radio">
                <input
                  type="radio"
                  id="asthma_medication_no"
                  name="asthma_medication"
                  value={0}
                  checked={userData.asthma_medication === 0}
                  onChange={handleClicked}
                />
                <span htmlFor="asthma_medication_no" className='name'>No</span>
              </label>
            </div>
            <br /><br />

            <label htmlFor="asthma_symptoms">Do you experience asthma symptoms?</label>
            <div className='radio-inputs'>
              <label className="radio">
                <input
                  type="radio"
                  id="asthma_symptoms_yes"
                  name="asthma_symptoms"
                  value={1}
                  checked={userData.asthma_symptoms === 1}
                  onChange={handleClicked}
                />
                <span htmlFor="asthma_symptoms_yes" className='name'>Yes</span>
              </label>
              <label className="radio">
                <input
                  type="radio"
                  id="asthma_symptoms_no"
                  name="asthma_symptoms"
                  value={0}
                  checked={userData.asthma_symptoms === 0}
                  onChange={handleClicked}
                />
                <span htmlFor="asthma_symptoms_no" className='name'>No</span>
              </label>
            </div>
            <br /><br />

            <label htmlFor="family_heart_disease">Is there a family history of heart disease?</label>
            <div className='radio-inputs'>
              <label className="radio">
                <input
                  type="radio"
                  id="family_heart_disease_yes"
                  name="family_heart_disease"
                  value={1}
                  checked={userData.family_heart_disease === 1}
                  onChange={handleClicked}
                />
                <span htmlFor="family_heart_disease_yes" className='name'>Yes</span>
              </label>
              <label className="radio">
                <input
                  type="radio"
                  id="family_heart_disease_no"
                  name="family_heart_disease"
                  value={0}
                  checked={userData.family_heart_disease === 0}
                  onChange={handleClicked}
                />
                <span htmlFor="family_heart_disease_no" className='name'>No</span>
              </label>
            </div>
            <br /><br />

            <label htmlFor="family_sudden_death">Is there a family history of sudden death?</label>
            <div className='radio-inputs'>
              <label className="radio">
                <input
                  type="radio"
                  id="family_sudden_death_yes"
                  name="family_sudden_death"
                  value={1}
                  checked={userData.family_sudden_death === 1}
                  onChange={handleClicked}
                />
                <span htmlFor="family_sudden_death_yes" className='name'>Yes</span>
              </label>
              <label className="radio">
                <input
                  type="radio"
                  id="family_sudden_death_no"
                  name="family_sudden_death"
                  value={0}
                  checked={userData.family_sudden_death === 0}
                  onChange={handleClicked}
                />
                <span htmlFor="family_sudden_death_no" className='name'>No</span>
              </label>
            </div>
            <br /><br />

            <label htmlFor="exercise_supervision">Do you require supervision during exercise?</label>
            <div className='radio-inputs'>
              <label className="radio">
                <input
                  type="radio"
                  id="exercise_supervision_yes"
                  name="exercise_supervision"
                  value={1}
                  checked={userData.exercise_supervision === 1}
                  onChange={handleClicked}
                />
                <span htmlFor="exercise_supervision_yes" className='name'>Yes</span>
              </label>
              <label className="radio">
                <input
                  type="radio"
                  id="exercise_supervision_no"
                  name="exercise_supervision"
                  value={0}
                  checked={userData.exercise_supervision === 0}
                  onChange={handleClicked}
                />
                <span htmlFor="exercise_supervision_no" className='name'>No</span>
              </label>
            </div>
            <br /><br />

            <label htmlFor="chronic_disease">Do you have any chronic diseases?</label>
            <div className='radio-inputs'>
              <label className="radio">
                <input
                  type="radio"
                  id="chronic_disease_yes"
                  name="chronic_disease"
                  value={1}
                  checked={userData.chronic_disease === 1}
                  onChange={handleClicked}
                />
                <span htmlFor="chronic_disease_yes" className='name'>Yes</span>
              </label>
              <label className="radio">
                <input
                  type="radio"
                  id="chronic_disease_no"
                  name="chronic_disease"
                  value={0}
                  checked={userData.chronic_disease === 0}
                  onChange={handleClicked}
                />
                <span htmlFor="chronic_disease_no" className='name'>No</span>
              </label>
            </div>
            <br /><br />

            <label htmlFor="pregnancy_risk">Are you at risk of pregnancy complications?</label>
            <div className='radio-inputs'>
              <label className="radio">
                <input
                  type="radio"
                  id="pregnancy_risk_yes"
                  name="pregnancy_risk"
                  value={1}
                  checked={userData.pregnancy_risk === 1}
                  onChange={handleClicked}
                />
                <span htmlFor="pregnancy_risk_yes" className='name'>Yes</span>
              </label>
              <label className="radio">
                <input
                  type="radio"
                  id="pregnancy_risk_no"
                  name="pregnancy_risk"
                  value={0}
                  checked={userData.pregnancy_risk === 0}
                  onChange={handleClicked}
                />
                <span htmlFor="pregnancy_risk_no" className='name'>No</span>
              </label>
            </div>
            <br /><br />

          </div>
        </div>
      </form>
    </div>
  );
};

export default RegistrationStep2;


