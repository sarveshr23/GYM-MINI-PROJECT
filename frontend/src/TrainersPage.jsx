import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './TrainersPage.css';

function TrainersPage() {
    const [trainers, setTrainers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedTrainer, setSelectedTrainer] = useState(null);
    const [members, setMembers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [assignedUsers, setAssignedUsers] = useState(new Set()); // Track assigned users

    useEffect(() => {
        const fetchTrainers = async () => {
            try {
                const response = await axios.get('http://localhost:3001/trainers');
                setTrainers(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching trainers:', error);
                setLoading(false);
            }
        };

        const fetchMembers = async () => {
            try {
                const response = await axios.get('http://localhost:3001/members');
                setMembers(response.data);
            } catch (error) {
                console.error('Error fetching members:', error);
            }
        };

        fetchTrainers();
        fetchMembers();
    }, []);

    const handleTrainerClick = async (trainer) => {
        setSelectedTrainer(trainer);
        setSelectedUsers([]); // Reset selected users on new trainer selection

        // Fetch assigned users for the selected trainer
        try {
            const response = await axios.get(`http://localhost:3001/trainers/${trainer._id}/assignments`);
            const assignedUserIds = response.data.map(assignment => assignment.memberId._id);
            setAssignedUsers(new Set(assignedUserIds)); // Set of assigned user IDs
        } catch (error) {
            console.error('Error fetching assigned users:', error);
        }
    };

    const handleUserSelection = (userId) => {
        if (assignedUsers.has(userId)) return; // Prevent selecting already assigned users

        setSelectedUsers((prev) =>
            prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]
        );
    };

    const handleAssignUsers = async () => {
        if (!selectedTrainer || selectedUsers.length === 0) return;

        try {
            await axios.post('http://localhost:3001/assignments', {
                trainerId: selectedTrainer._id,
                memberIds: selectedUsers,
            });
            alert('Users assigned to trainer successfully!');
            setSelectedTrainer(null);
            setSelectedUsers([]); // Clear selected users after assignment
        } catch (error) {
            console.error('Error assigning users to trainer:', error);
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="trainers-container">
            <h2>Trainers List</h2>
            <div className="trainers-list">
                {trainers.length === 0 ? (
                    <p>No trainers found.</p>
                ) : (
                    trainers.map((trainer) => (
                        <div key={trainer._id} className="trainer-box">
                            <h4>{trainer.name}</h4>
                            <p>Email: {trainer.email}</p>
                            <p>Phone: {trainer.phone}</p>
                            <p>Specialization: {trainer.specialization}</p>
                            <button onClick={() => handleTrainerClick(trainer)}>Assign Members</button>
                        </div>
                    ))
                )}
            </div>

            {selectedTrainer && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Assign Users to {selectedTrainer.name}</h3>
                        <div className="user-list">
                            {members.length === 0 ? (
                                <p>No members available.</p>
                            ) : (
                                members.map((member) => (
                                    <div key={member._id} className="user-item">
                                        <input
                                            type="checkbox"
                                            checked={selectedUsers.includes(member._id)}
                                            disabled={assignedUsers.has(member._id)} // Disable if already assigned
                                            onChange={() => handleUserSelection(member._id)}
                                        />
                                        {member.fullName} {assignedUsers.has(member._id) && '(Assigned)'}
                                    </div>
                                ))
                            )}
                        </div>
                        {selectedUsers.length === 0 && (
                            <p style={{ color: 'red' }}>Please select members to assign.</p>
                        )}
                        <button onClick={handleAssignUsers} disabled={selectedUsers.length === 0}>
                            Assign Selected Users
                        </button>
                        <button onClick={() => setSelectedTrainer(null)}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default TrainersPage;
