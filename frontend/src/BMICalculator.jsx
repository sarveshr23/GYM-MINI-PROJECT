import React, { useState } from 'react';
import './BMICalculator.css'; // Ensure this CSS file is styled properly

const BMICalculator = () => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [bmi, setBmi] = useState(null);
  const [message, setMessage] = useState('');

  const calculateBMI = () => {
    if (weight && height && age && gender) {
      const heightInMeters = height / 100; // Convert height to meters
      const calculatedBmi = (weight / (heightInMeters * heightInMeters)).toFixed(2);
      setBmi(calculatedBmi);

      // Determine BMI category based on gender and age
      let bmiCategory = '';
      if (age >= 18) {
        if (calculatedBmi < 18.5) {
          bmiCategory = 'Underweight';
        } else if (calculatedBmi >= 18.5 && calculatedBmi < 24.9) {
          bmiCategory = 'Normal weight';
        } else if (calculatedBmi >= 25 && calculatedBmi < 29.9) {
          bmiCategory = 'Overweight';
        } else {
          bmiCategory = 'Obesity';
        }
      } else {
        // For children and teenagers, different BMI-for-age percentiles are used
        // This is a basic representation; actual implementation would require more complex calculations.
        if (calculatedBmi < 5) {
          bmiCategory = 'Underweight';
        } else if (calculatedBmi >= 5 && calculatedBmi < 85) {
          bmiCategory = 'Normal weight';
        } else if (calculatedBmi >= 85 && calculatedBmi < 95) {
          bmiCategory = 'Overweight';
        } else {
          bmiCategory = 'Obesity';
        }
      }

      setMessage(`${bmiCategory} (${gender}, Age: ${age})`);
    } else {
      setMessage('Please fill out all fields.');
    }
  };

  return (
    <div className="bmi-calculator">
      <h2>BMI Calculator</h2>
      <input
        type="number"
        placeholder="Weight (kg)"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
      />
      <input
        type="number"
        placeholder="Height (cm)"
        value={height}
        onChange={(e) => setHeight(e.target.value)}
      />
      <input
        type="number"
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />
      <select
        value={gender}
        onChange={(e) => setGender(e.target.value)}
      >
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>
      <button onClick={calculateBMI}>Calculate BMI</button>
      {bmi && (
        <div>
          <h3>Your BMI: {bmi}</h3>
          <p>{message}</p>
        </div>
      )}
    </div>
  );
};

export default BMICalculator;
