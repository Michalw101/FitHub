import React, { useState, useEffect, useSyncExternalStore } from "react";
import '../css/trainerClasses.css';
import { serverRequests } from '../Api';
import Classes from "../components/Classes";
import AddClass from "../components/AddClass";

export default function TrainerClasses( {userData} ) {

    const [classes, setClasses] = useState([]);
    const [addClass, setAddClass] = useState(false);
    const [newClass, setNewClass]= useState({
        class_id: "",
        trainer_id: userData.user_id,
        description:"",
        date:"",
        hour:"",
        price:""
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
                <AddClass onClose={() => setAddClass(false)} newClass={newClass} handleChanged={handleChanged} setClasses={setClasses}/>
            )}
            <Classes setClasses={setClasses} classes={classes}/>
        </div>
    );
}
