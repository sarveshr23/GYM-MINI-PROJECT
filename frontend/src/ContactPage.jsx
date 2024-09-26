import React, { useState } from 'react';
import axios from 'axios';
import './ContactPage.css';

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [phoneError, setPhoneError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Phone number validation
    if (name === 'phone') {
      const phoneRegex = /^[0-9]{10}$/; // Assuming valid phone number has 10 digits
      if (!phoneRegex.test(value)) {
        setPhoneError('Phone number must be 10 digits.');
      } else {
        setPhoneError('');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (phoneError) {
      alert('Please correct the errors in the form.');
      return;
    }
    try {
      await axios.post('http://localhost:3001/queries', formData);
      alert('Message sent successfully!');
      setFormData({ name: '', email: '', phone: '', message: '' }); // Reset form
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Please try again.');
    }
  };

  return (
    <main className="main">
      <section className="contact">
        <h2>Contact Us</h2>
        <p>Have any questions? Feel free to reach out to us!</p>
        <form className="contactForm" onSubmit={handleSubmit}>
          <label>
            Name:
            <input type="text" name="name" value={formData.name} onChange={handleChange} />
          </label>
          <label>
            Email:
            <input type="email" name="email" value={formData.email} onChange={handleChange} />
          </label>
          <label>
            Phone:
            <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
            {phoneError && <p className="error">{phoneError}</p>}
          </label>
          <label>
            Message:
            <textarea name="message" value={formData.message} onChange={handleChange}></textarea>
          </label>
          <button type="submit">Send</button>
        </form>
      </section>
    </main>
  );
};

export default ContactPage;
