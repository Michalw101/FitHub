import React from 'react';
import TraineeClasses from './TraineeClasses';

const TraineeHome = ( {userData}) => {

  return (
    <div>
      <TraineeClasses userData={userData}/>
    </div>
  );
};

export default TraineeHome;
