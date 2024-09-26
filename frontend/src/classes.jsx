import React from 'react';
import './classes.css'; // Import CSS for Classes page

const classesData = [
  {
    name: 'Yoga',
    description: 'A calming class that focuses on flexibility, balance, and breathing.',
    schedule: 'Mon, Wed, Fri - 6:00 PM to 7:00 PM'
  },
  {
    name: 'HIIT',
    description: 'High-Intensity Interval Training that improves strength and cardio endurance.',
    schedule: 'Tue, Thu - 7:00 AM to 8:00 AM'
  },
  {
    name: 'Spin',
    description: 'Indoor cycling class designed to improve cardiovascular fitness and burn calories.',
    schedule: 'Mon, Wed - 7:00 AM to 8:00 AM'
  },
  {
    name: 'Zumba',
    description: 'Dance-based fitness class that combines Latin and international music with dance.',
    schedule: 'Fri - 7:00 PM to 8:00 PM'
  }
];

const Classes = () => (
  <div className="classes">
    <header className="header">
      <h1>Our Classes</h1>
    </header>

    <main className="main-content">
      <div className="classes-list">
        {classesData.map((classItem, index) => (
          <div key={index} className="class-item">
            <h2>{classItem.name}</h2>
            <p><strong>Description:</strong> {classItem.description}</p>
            <p><strong>Schedule:</strong> {classItem.schedule}</p>
          </div>
        ))}
      </div>
    </main>

    <footer className="footer">
      <p>&copy; 2024 Gym Management System. All rights reserved.</p>
    </footer>
  </div>
);

export default Classes;
