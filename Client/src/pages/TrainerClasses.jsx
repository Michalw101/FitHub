import React, { useState } from "react";
import '../css/trainerClasses.css';
import Classes from "../components/Classes";
import AddClass from "../components/AddClass";

export default function TrainerClasses({ userData }) {

    const [classes, setClasses] = useState([]);
    const [addClass, setAddClass] = useState(false);
    const [newClass, setNewClass] = useState({
        class_id: "",
        trainer_id: userData.user_id,
        description: "",
        date: "",
        hour: "",
        price: "",
        link: "",
        class_type: '',
        gender_limit: '',
        heart_disease: 0,
        chest_pain: 0,
        fainted_or_dizziness: 0,
        asthma: 0,
        family_heart_disease_or_sudden_death: 0,
        exercise_supervision: 0,
        chronic_disease: 0,
        pregnancy_risk: 0
    })

    const handleChanged = (e) => {
        const { name, value } = e.target;
        setNewClass((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    return (
        <div>
            
            <button className="createBtn" onClick={() => setAddClass(true)}>
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"></path><path fill="currentColor" d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z"></path></svg> Create Class
                </span>
            </button>
            {addClass && (
                <AddClass onClose={() => {
                    setAddClass(false), setNewClass({
                        class_id: "",
                        trainer_id: userData.user_id,
                        description: "",
                        date: "",
                        hour: "",
                        price: "",
                        link: "",
                        class_type: '',
                        gender_limit: '',
                        heart_disease: 0,
                        chest_pain: 0,
                        fainted_or_dizziness: 0,
                        asthma: 0,
                        family_heart_disease_or_sudden_death: 0,
                        exercise_supervision: 0,
                        chronic_disease: 0,
                        pregnancy_risk: 0
                    })
                }} newClass={newClass} handleChanged={handleChanged} setClasses={setClasses} classes={classes} />
            )}
            <Classes setClasses={setClasses} classes={classes} userData={userData} />
        </div>
    );
}
