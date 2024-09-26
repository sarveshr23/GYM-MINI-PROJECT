import React from 'react';
import ScrollArrow from './ScrollArrow';
import instagramLogo from './download (1).jpeg'; // Adjust the path as needed
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import styles from './Homed.module.css'; // Correct import statement for CSS module
import img from './assets/mat-removebg-preview.png';
import BMICalculator from './BMICalculator'; // Make sure to import the BMICalculator component
import ImageCarousel from './ImageCarousel'; // Ensure this is the correct path

const Homed = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login'); // Replace with the actual route for your Login page
  };

  const handleSignup = () => {
    navigate('/Register'); // Replace with the actual route for your Signup page
  };

  const handleMembership = () => {
    navigate('/membership'); // Replace with the actual route for your Membership page
  };

  return (
    <div className={styles.homeContainer}>
      {/* Navigation Bar */}
      <nav className={styles.navbar}>
        <img src={img} width={80} height={80} alt="Gym Logo" />
        <div className={styles.logo}>Matrix Gym</div>
        <div className={styles.navAuthContainer}>
          <ul className={styles.navLinks}>
            <li><a href="#about">About Us</a></li>
            <li><a href="/contactpage">Contact</a></li>
            <li><a href="#bmi">BMI Calculator</a></li>
            <li><a href="#" onClick={handleMembership}>Membership</a></li> {/* Membership link added */}
          </ul>
          <button className={styles.authBtn} onClick={handleLogin}>Login</button>
          <button className={styles.authBtn} onClick={handleSignup}>Signup</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Welcome to Matrix Gym</h1>
          <p>Your journey to fitness starts here.</p>
        </div>
      </section>

      {/* Image Carousel Section */}
      <section className={styles.carouselSection}>
        <ImageCarousel />
      </section>

      {/* Services Section */}
      <section className={styles.services}>
        <h2>Our Services</h2>
        <div className={styles.servicesGrid}>
          <div className={styles.service}>
            <h3>Personal Training</h3>
            <p>Get one-on-one guidance from our expert trainers.</p>
          </div>
          <div className={styles.service}>
            <h3>Group Classes</h3>
            <p>Join our group classes and stay motivated with others.</p>
          </div>
          <div className={styles.service}>
            <h3>Nutrition Plans</h3>
            <p>Customized nutrition plans to help you achieve your goals.</p>
          </div>
        </div>
      </section>

      {/* Our Facilities Section */}
      <section className={styles.facilities}>
        <h2>Our Facilities</h2>
        <div className={styles.facilitiesGrid}>
          <div className={styles.facility}>
            <h3>State-of-the-Art Gym Equipment</h3>
            <p>Experience the latest in gym technology with our modern equipment.</p>
          </div>
          <div className={styles.facility}>
            <h3>Specialised Trainers</h3>
            <p>Specialised trainers to help you achieve your goals.</p>
          </div>
          <div className={styles.facility}>
            <h3>Yoga Studio</h3>
            <p>Join our yoga classes in a serene and peaceful environment.</p>
          </div>
          <div className={styles.facility}>
            <h3>Cardio</h3>
            <p>Engage yourself in a cardio session to challenge yourself.</p>
          </div>
        </div>
      </section>

      {/* BMI Calculator Section */}
      <section className={styles.bmiSection} id="bmi">
        <BMICalculator />
      </section>

      {/* About Us Section */}
      <section className={styles.about} id="about">
        <h2>About Us</h2>
        <p>Matrix Gym is dedicated to helping you achieve your fitness goals with personalized training plans, a variety of group classes, and state-of-the-art facilities. Our mission is to provide a welcoming and motivating environment for all fitness levels.</p>
      </section>

  {/* Footer */}
<footer className={styles.footer}>
  <div className={styles.footerContainer}>
    {/* First Column: Email and Working Hours */}
    <div className={styles.footerSection}>
      <h3>Email</h3>
      <p>vijaymatrix@matrixgym.com</p>
      <h3>Working Hours</h3>
      <p>Mon-Sat: 5am - 10pm</p>
      <p>Sun: 5am - 10pm</p>
    </div>
    
    {/* Second Column: Location */}
    <div className={styles.footerSection}>
      <h3>Location</h3>
      {/* Clickable Embedded Map */}
      <div className={styles.mapContainer}>
        <a 
          href="https://maps.app.goo.gl/1FZfkCJhhsPoZSub7" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3912.383512492984!2d77.72283527509634!3d11.306653888876175!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba96fba8ed33a4b%3A0xa070afdb0b4d9492!2sMatrix%20Fitness%20centre!5e0!3m2!1sen!2sin!4v1725995138749!5m2!1sen!2sin"
            width="600"
            height="450"
            style={{ border: "0" }} // Correct style format
            allowFullScreen="" // Correct prop format
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade" // Correct prop format
          ></iframe>
        </a>
      </div>
    </div>

    {/* Third Column: Quick Links */}
    <div className={styles.footerSection}>
      <h3>Quick Links</h3>
      <ul>
        <li><a href="#about">About Us</a></li>
        <li><a href="#contact">Contact</a></li>
        <li><a href="#bmi">BMI Calculator</a></li>
        <li><a href="/login">Login</a></li>
        <li><a href="https://maps.app.goo.gl/1FZfkCJhhsPoZSub7" target="_blank" rel="noopener noreferrer">Location</a></li>
      </ul>
    </div>
  </div>
</footer>


      {/* Instagram Logo at the End of the Page */}
      <div className={styles.instagramLogoContainer}>
        <a href="https://www.instagram.com/your_instagram_page" target="_blank" rel="noopener noreferrer">
          <img src={instagramLogo} alt="Instagram Logo" className={styles.instagramLogo} />
        </a>
      </div>

      <ScrollArrow />
    </div>
  );
};

export default Homed;
