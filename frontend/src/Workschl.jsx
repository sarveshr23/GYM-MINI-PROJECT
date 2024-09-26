import React, { useState } from 'react';
// import AddWorkoutForm from './A  ddWorkoutForm';
import './workschl.css';

const WorkoutSchedule = () => {
  const [workouts, setWorkouts] = useState([
    { id: 1, name: 'Morning Yoga', time: '7:00 AM', instructor: 'John Doe' },
    { id: 2, name: 'Cardio Blast', time: '9:00 AM', instructor: 'Jane Smith' },
  ]);

  const addWorkout = (workout) => {
    setWorkouts([...workouts, { ...workout, id: workouts.length + 1 }]);
  };

  return (
    <div className="workout-schedule">
      <h2>Workout Schedule</h2>
      <ul>
        {workouts.map((workout) => (
          <li key={workout.id}>
            <strong>{workout.name}</strong> at {workout.time} by {workout.instructor}
          </li>
        ))}
      </ul>
      <AddWorkoutForm addWorkout={addWorkout} />
    </div>
  );
};

export default WorkoutSchedule;
