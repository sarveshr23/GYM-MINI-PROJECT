import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminMembershipPage.css';

const AdminMembershipPage = () => {
    const [plans, setPlans] = useState([]);
    const [newPlan, setNewPlan] = useState({ title: '', price: '', benefits: '' });
    const [editingPlan, setEditingPlan] = useState(null);

    useEffect(() => {
        fetchPlans();
    }, []);

    const fetchPlans = async () => {
        try {
            const response = await axios.get('/api/membership-plans');
            if (Array.isArray(response.data)) {
                setPlans(response.data);
            } else {
                console.error('Expected an array of plans but received:', response.data);
            }
        } catch (error) {
            console.error('Error fetching plans:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewPlan((prev) => ({ ...prev, [name]: value }));
    };

    const addPlan = async (planData) => {
        try {
          const response = await axios.post('http://localhost:3001/api/membership-plans', planData);
          console.log('Plan added successfully:', response.data);
        } catch (error) {
          console.error('Failed to add plan:', error);
        }
      };
      
      // Example usage
      const handleAddPlan = () => {
        const planData = {
          name: 'New Plan',
          price: 29.99,
          description: 'Description of the new plan'
        };
        addPlan(planData);
      };
      

    const handleEditPlan = (plan) => {
        setEditingPlan({ ...plan, benefits: plan.benefits.join(', ') });
    };

    const handleUpdatePlan = async () => {
        try {
            if (!editingPlan.title || !editingPlan.price || !editingPlan.benefits) {
                alert('Please fill in all fields');
                return;
            }

            await axios.put(`/api/membership-plans/${editingPlan._id}`, {
                ...editingPlan,
                benefits: editingPlan.benefits.split(',').map((b) => b.trim()),
            });
            setEditingPlan(null);
            fetchPlans();
        } catch (error) {
            console.error('Error updating plan:', error);
        }
    };

    const handleDeletePlan = async (id) => {
        try {
            await axios.delete(`/api/membership-plans/${id}`);
            fetchPlans();
        } catch (error) {
            console.error('Error deleting plan:', error);
        }
    };

    return (
        <div className="admin-membership-page">
            <h2>Manage Membership Plans</h2>
            <div className="plan-form">
                <input
                    type="text"
                    name="title"
                    value={newPlan.title}
                    onChange={handleInputChange}
                    placeholder="Plan Title"
                />
                <input
                    type="number"
                    name="price"
                    value={newPlan.price}
                    onChange={handleInputChange}
                    placeholder="Price (in smallest currency unit)"
                />
                <input
                    type="text"
                    name="benefits"
                    value={newPlan.benefits}
                    onChange={handleInputChange}
                    placeholder="Benefits (comma-separated)"
                />
                <button onClick={editingPlan ? handleUpdatePlan : handleAddPlan}>
                    {editingPlan ? 'Update Plan' : 'Add Plan'}
                </button>
                {editingPlan && <button onClick={() => setEditingPlan(null)}>Cancel Edit</button>}
            </div>
            <div className="plans-list">
                {Array.isArray(plans) && plans.length > 0 ? (
                    plans.map((plan) => (
                        <div key={plan._id} className="plan-item">
                            <h3>{plan.title}</h3>
                            <p>Price: {plan.price / 100} RS</p>
                            <ul>
                                {plan.benefits.map((benefit, idx) => (
                                    <li key={idx}>{benefit}</li>
                                ))}
                            </ul>
                            <button onClick={() => handleEditPlan(plan)}>Edit</button>
                            <button onClick={() => handleDeletePlan(plan._id)}>Delete</button>
                        </div>
                    ))
                ) : (
                    <p>No membership plans available.</p>
                )}
            </div>
        </div>
    );
};

export default AdminMembershipPage;
