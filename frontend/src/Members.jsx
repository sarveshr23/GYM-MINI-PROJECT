import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Members.css';

function Members() {
    const [members, setMembers] = useState([]);
    const [editingMember, setEditingMember] = useState(null); // State to store the member being edited
    const [editFormData, setEditFormData] = useState({}); // State to store the form data for editing

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const response = await axios.get('http://localhost:3001/members');
                setMembers(response.data);
            } catch (error) {
                console.error('Error fetching members:', error);
                toast.error('Failed to fetch members!');
            }
        };

        fetchMembers();
    }, []);

    const handleEdit = (member) => {
        setEditingMember(member); // Set the member to be edited
        setEditFormData(member); // Initialize the form data with the selected member's details
    };

    const handleDelete = async (memberId) => {
        try {
            await axios.delete(`http://localhost:3001/members/${memberId}`);
            toast.success('Member deleted successfully!');
            setMembers(members.filter(member => member._id !== memberId));
        } catch (error) {
            console.error('Error deleting member:', error);
            toast.error('Failed to delete member!');
        }
    };

    const handleSaveEdit = async () => {
        try {
            const response = await axios.put(`http://localhost:3001/members/${editingMember._id}`, editFormData);
            toast.success('Member updated successfully!');
            setMembers(members.map(member => (member._id === editingMember._id ? response.data : member)));
            setEditingMember(null); // Clear editing state
        } catch (error) {
            console.error('Error editing member:', error);
            toast.error('Failed to edit member!');
        }
    };

    const handleInputChange = (e) => {
        setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
    };

    return (
        <div className="members-container">
            <h2>Members List</h2>
            <table className="members-table">
                <thead>
                    <tr>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Height</th>
                        <th>Weight</th>
                        <th>Gender</th>
                        <th>Address</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {members.map(member => (
                        <tr key={member._id}>
                            <td>{member.fullName}</td>
                            <td>{member.email}</td>
                            <td>{member.phone}</td>
                            <td>{member.height} cm</td>
                            <td>{member.weight} kg</td>
                            <td>{member.gender}</td>
                            <td>{member.address}</td>
                            <td>
                                <button className="btn-edit" onClick={() => handleEdit(member)}>Edit</button>
                                <button className="btn-delete" onClick={() => handleDelete(member._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Render the edit form if a member is being edited */}
            {editingMember && (
                <div className="edit-form">
                    <h3>Edit Member</h3>
                    <form>
                        <input type="text" name="fullName" value={editFormData.fullName} onChange={handleInputChange} placeholder="Full Name" />
                        <input type="email" name="email" value={editFormData.email} onChange={handleInputChange} placeholder="Email" />
                        <input type="text" name="phone" value={editFormData.phone} onChange={handleInputChange} placeholder="Phone" />
                        <input type="number" name="height" value={editFormData.height} onChange={handleInputChange} placeholder="Height" />
                        <input type="number" name="weight" value={editFormData.weight} onChange={handleInputChange} placeholder="Weight" />
                        <input type="text" name="gender" value={editFormData.gender} onChange={handleInputChange} placeholder="Gender" />
                        <input type="text" name="address" value={editFormData.address} onChange={handleInputChange} placeholder="Address" />
                        <button type="button" onClick={handleSaveEdit}>Save</button>
                        <button type="button" onClick={() => setEditingMember(null)}>Cancel</button>
                    </form>
                </div>
            )}

            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
        </div>
    );
}

export default Members;
