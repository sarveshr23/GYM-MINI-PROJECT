import React from 'react';
import './hp.css';
import ScrollArrow from './ScrollArrow';
import instagramLogo from './download (1).jpeg'; // Adjust the path as needed
import Membership from './Membership'; // Import the Membership component
import { useNavigate } from 'react-router-dom';
import img from './assets/mat-removebg-preview.png';
const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any session data (like auth tokens)
    // localStorage.removeItem('authToken'); // Example of removing an auth token
    // Redirect to Homed page
    navigate('/homed');
  };

  return (
    <div className="home-container">
      {/* Navigation Bar */}
      <nav className="navbar">
      <img src={img} width={80} height={80} />
        <div className="logo">Matrix Gym</div>
        <div className="nav-auth-container">
          <ul className="nav-links">
            <li><a href="#about">About Us</a></li>
            <li><a href="/contactpage">Contact</a></li>
            {/* <li><a href="/schedule">View Schedule</a></li> */}
            <li><a href="/membership">Membership</a></li>
          </ul>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to Matrix Gym</h1>
          <p>Your journey to fitness starts here.</p>
        </div>
      </section>

      {/* Services Section */}
      <section className="services">
        <h2>Our Services</h2>
        <div className="services-grid">
          <div className="service">
            <h3>Personal Training</h3>
            <p>Get one-on-one guidance from our expert trainers.</p>
          </div>
          <div className="service">
            <h3>Group Classes</h3>
            <p>Join our group classes and stay motivated with others.</p>
          </div>
          <div className="service">
            <h3>Nutrition Plans</h3>
            <p>Customized nutrition plans to help you achieve your goals.</p>
          </div>
        </div>
      </section>

      {/* Our Facilities Section */}
      <section className="facilities">
        <h2>Our Facilities</h2>
        <div className="facilities-grid">
          <div className="facility">
            <h3>State-of-the-Art Gym Equipment</h3>
            <p>Experience the latest in gym technology with our modern equipment.</p>
          </div>
          <div className="facility">
            <h3>Specialised Trainers</h3>
            <p>Specialised trainers to help you achieve your goals.</p>
          </div>
          <div className="facility">
            <h3>Yoga Studio</h3>
            <p>Join our yoga classes in a serene and peaceful environment.</p>
          </div>
          <div className="facility">
            <h3>Cardio</h3>
            <p>Engage yourself in a cardio session to challenge yourself.</p>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="about" id="about">
        <h2>About Us</h2>
        <p>Matrix Gym is dedicated to helping you achieve your fitness goals with personalized training plans, a variety of group classes, and state-of-the-art facilities. Our mission is to provide a welcoming and motivating environment for all fitness levels.</p>
      </section>

      {/* Instagram Logo Link */}
      <div className="instagram-logo-container">
        <a href="https://www.instagram.com/your_instagram_page" target="_blank" rel="noopener noreferrer">
          <img src={instagramLogo} alt="Instagram Logo" className="instagram-logo" />
        </a>
      </div>

      <ScrollArrow />
    </div>
  );
};

export default Home;
