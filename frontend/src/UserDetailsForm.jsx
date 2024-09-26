// UserDetailsForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom'; // Use `useNavigate` instead of `useHistory`
import './UserDetailsForm.css';


const UserDetailsForm = () => {
    const location = useLocation();
    const navigate = useNavigate(); // Use `useNavigate` to handle navigation
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        height: '',
        weight: '',
        gender: '',
        address: '',
        emergencyContact: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const plan = location.state?.plan; // Get the selected plan from the location state

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await axios.post('http://localhost:3001/save-user-details', { ...formData, plan });
            navigate('/payment'); // Use `navigate` to redirect
        } catch (err) {
            console.error('Error saving user details:', err);
            setError('Failed to save details. Please try again.');
        }

        setLoading(false);
    };

    return (
        <div className="user-details-container">
            <h2>Enter Your Details</h2>
            <form onSubmit={handleSubmit}>
                {/* Form fields */}
                <label>
                    Full Name:
                    <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />
                </label>
                <label>
                    Email Address:
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </label>
                <label>
                    Phone Number:
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
                </label>
                <label>
                    Date of Birth:
                    <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required />
                </label>
                <label>
                    Height (in cm):
                    <input type="number" name="height" value={formData.height} onChange={handleChange} required />
                </label>
                <label>
                    Weight (in kg):
                    <input type="number" name="weight" value={formData.weight} onChange={handleChange} required />
                </label>
                <label>
                    Gender:
                    <select name="gender" value={formData.gender} onChange={handleChange}>
                        <option value="">Select</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </label>
                <label>
                    Address:
                    <textarea name="address" value={formData.address} onChange={handleChange} required />
                </label>
                <label>
                    Emergency Contact:
                    <input type="text" name="emergencyContact" value={formData.emergencyContact} onChange={handleChange} required />
                </label>
                {error && <p className="error">{error}</p>}
                <button type="submit" disabled={loading}>
                    {loading ? 'Submitting...' : 'Proceed to payment'}
                </button>
            </form>
        </div>
    );
};

export default UserDetailsForm;




// // UserDetailsForm.js
// import React, { useState } from 'react';
// import axios from 'axios';
// import { useLocation, useNavigate } from 'react-router-dom'; 
// import './UserDetailsForm.css';

// const UserDetailsForm = () => {
//     const location = useLocation();
//     const navigate = useNavigate(); 
//     const [formData, setFormData] = useState({
//         fullName: '',
//         email: '',
//         phone: '',
//         dateOfBirth: '',
//         height: '',
//         weight: '',
//         gender: '',
//         address: '',
//         emergencyContact: ''
//     });
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState('');

//     const plan = location.state?.plan; 

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         setError('');

//         // navigate('/payment'); 
//         try {
//             // Send user details to the backend
//             await axios.post('http://localhost:3001/save-user-details', { ...formData, plan });
//             // navigate('/payment'); 
//             navigate('/payment'); 
//         } catch (err) {
//             console.error('Error saving user details:', err);
//             setError('Failed to save details. Please try again.');
//         }

//         setLoading(false);
//     };

//     return (
//         <div className="user-details-container">
//             <h2>Enter Your Details</h2>
//             <form onSubmit={handleSubmit}>
//                 <label>
//                     Full Name:
//                     <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />
//                 </label>
//                 <label>
//                     Email Address:
//                     <input type="email" name="email" value={formData.email} onChange={handleChange} required />
//                 </label>
//                 <label>
//                     Phone Number:
//                     <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
//                 </label>
//                 <label>
//                     Date of Birth:
//                     <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required />
//                 </label>
//                 <label>
//                     Height (in cm):
//                     <input type="number" name="height" value={formData.height} onChange={handleChange} required />
//                 </label>
//                 <label>
//                     Weight (in kg):
//                     <input type="number" name="weight" value={formData.weight} onChange={handleChange} required />
//                 </label>
//                 <label>
//                     Gender:
//                     <select name="gender" value={formData.gender} onChange={handleChange} required>
//                         <option value="">Select</option>
//                         <option value="Male">Male</option>
//                         <option value="Female">Female</option>
//                         <option value="Other">Other</option>
//                     </select>
//                 </label>
//                 <label>
//                     Address:
//                     <textarea name="address" value={formData.address} onChange={handleChange} required />
//                 </label>
//                 <label>
//                     Emergency Contact:
//                     <input type="text" name="emergencyContact" value={formData.emergencyContact} onChange={handleChange} required />
//                 </label>
//                 {error && <p className="error">{error}</p>}
//                 <button type="submit" disabled={loading}>
//                     {loading ? 'Submitting...' : 'Proceed to payment'}
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default UserDetailsForm;
