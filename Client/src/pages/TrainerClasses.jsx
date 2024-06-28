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
        gender: '',
        heart_disease: '',
        chest_pain: '',
        fainted_or_dizziness: '',
        asthma: '',
        family_heart_disease_or_sudden_death: '',
        exercise_supervision: '',
        chronic_disease: '',
        pregnancy_risk: ''
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
            <button onClick={() => setAddClass(true)}>add class</button>
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
                        gender: '',
                        heart_disease: '',
                        chest_pain: '',
                        fainted_or_dizziness: '',
                        asthma: '',
                        family_heart_disease_or_sudden_death: '',
                        exercise_supervision: '',
                        chronic_disease: '',
                        pregnancy_risk: ''
                    })
                }} newClass={newClass} handleChanged={handleChanged} setClasses={setClasses} classes={classes} />
            )}
            <Classes setClasses={setClasses} classes={classes} userData={userData} />
        </div>
    );
}
