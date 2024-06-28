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
            <button className="Btn1" onClick={() => setAddClass(true)}>
                <div className="sign1">+</div>
                <div className="text1">Create</div>
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
