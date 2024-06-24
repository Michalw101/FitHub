import React, { useState, useEffect, useContext } from 'react';
import Classes from '../components/Classes';

const TraineeClasses = ( {userData} ) => {

    const [classes, setClasses] = useState([]);

    return (
        <div>
            <Classes setClasses={setClasses} classes={classes}  userData={userData}/>
            </div>
    );
};

export default TraineeClasses;
