import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Trainer.css'; // Ensure you have your CSS file for styling

function Trainer() {
    const [trainers, setTrainers] = useState([]);
    const [selectedTrainerId, setSelectedTrainerId] = useState(null);
    const [assignedMembers, setAssignedMembers] = useState([]);
    const [selectedMember, setSelectedMember] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchTrainers = async () => {
            try {
                const response = await axios.get('http://localhost:3001/trainers');
                setTrainers(response.data);
            } catch (error) {
                console.error('Error fetching trainers:', error);
            }
        };

        fetchTrainers();
    }, []);

    useEffect(() => {
        const fetchAssignedMembers = async () => {
            if (selectedTrainerId) {
                try {
                    const response = await axios.get(`http://localhost:3001/trainers/${selectedTrainerId}/assignments`);
                    console.log(response.data); // Log the response for debugging
                    setAssignedMembers(response.data);
                } catch (error) {
                    console.error('Error fetching assigned members:', error);
                }
            }
        };

        fetchAssignedMembers();
    }, [selectedTrainerId]);

    const openModal = async (memberId) => {
        if (!memberId) return; // Check if memberId is valid
        try {
            const response = await axios.get(`http://localhost:3001/members/${memberId}`);
            if (response.data) {
                setSelectedMember(response.data);
                setIsModalOpen(true);
            } else {
                console.error('No member found with the provided ID');
            }
        } catch (error) {
            console.error('Error fetching member details:', error);
        }
    };

    const closeModal = () => {
        setSelectedMember(null);
        setIsModalOpen(false);
    };

    return (
        <div>
            <h2>Trainer Details</h2>
            <div>
                <label>Select Trainer:</label>
                <select onChange={(e) => setSelectedTrainerId(e.target.value)} value={selectedTrainerId || ''}>
                    <option value="">Select a trainer</option>
                    {trainers.map((trainer) => (
                        <option key={trainer._id} value={trainer._id}>
                            {trainer.name}
                        </option>
                    ))}
                </select>
            </div>
            {selectedTrainerId && (
                <div>
                    <h3>Assigned Members</h3>
                    {assignedMembers.length === 0 ? (
                        <p>No members assigned.</p>
                    ) : (
                        <ul className="trainer-member-list">
                            {assignedMembers.map((assignment) => {
                                const memberId = assignment.memberId;
                                return memberId ? (
                                    <li
                                        key={memberId._id}
                                        className="trainer-member-item"
                                        onClick={() => openModal(memberId._id)}
                                    >
                                        {memberId.fullName}
                                    </li>
                                ) : null; // Handle case where memberId is null
                            })}
                        </ul>
                    )}
                </div>
            )}
            {isModalOpen && selectedMember && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeModal}>&times;</span>
                        <h2>{selectedMember.fullName}</h2>
                        <p><strong>Email:</strong> {selectedMember.email}</p>
                        <p><strong>Phone:</strong> {selectedMember.phone}</p>
                        <p><strong>Date of Birth:</strong> {new Date(selectedMember.dateOfBirth).toLocaleDateString()}</p>
                        <p><strong>Height:</strong> {selectedMember.height} cm</p>
                        <p><strong>Weight:</strong> {selectedMember.weight} kg</p>
                        <p><strong>Gender:</strong> {selectedMember.gender}</p>
                        <p><strong>Address:</strong> {selectedMember.address}</p>
                        <p><strong>Emergency Contact:</strong> {selectedMember.emergencyContact}</p>
                        <p><strong>Membership Plan:</strong> {selectedMember.plan.title}</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Trainer;
  