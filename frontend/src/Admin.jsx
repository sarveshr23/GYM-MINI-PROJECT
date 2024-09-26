import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Admin.css';

function Admin() {
    const [userCount, setUserCount] = useState(0);
    const [equipmentCount, setEquipmentCount] = useState(0);
    const [trainerCount, setTrainerCount] = useState(0);
    const [memberCount, setMemberCount] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCounts = async () => {
            try {
                const [usersResponse, equipmentResponse, trainersResponse, membersResponse] = await Promise.all([
                    axios.get('http://localhost:3001/users/count'),
                    axios.get('http://localhost:3001/equipment/count'),
                    axios.get('http://localhost:3001/trainers/count'),
                    axios.get('http://localhost:3001/members/count')
                ]);

                setUserCount(usersResponse.data.count);
                setEquipmentCount(equipmentResponse.data.count);
                setTrainerCount(trainersResponse.data.count);
                setMemberCount(membersResponse.data.count);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchCounts();
    }, []);

    const handleLogout = () => {
        navigate('/');
    };

    const handleViewTrainers = () => {
        navigate('/admin/trainers');
    };

    const handleViewPackages = () => {
        navigate('/packages');
    };

    const handleViewUsers = () => {
        navigate('/admin/users'); // Navigate to the UserAdminBox component
    };

    const handleViewMembers = () => {
        navigate('/admin/members'); // Navigate to the Members page
    };

    return (
        <div className="admin-container">
            <div className="sidebar">
                <h2>Admin Dashboard</h2>
                <ul>
                    <li><a href="/admin/equipment">Equipment Management</a></li>
                    <li><a href="/admin/users">User Management</a></li>
                    {/* <li><a href="/admin/classes">Class Scheduling</a></li> */}
                    <li><a href="/admin/queries">Queries</a></li>
                </ul>
            </div>
            <div className="main-content">
                <div className="header">
                    <button className="btn logout-btn" onClick={handleLogout}>Logout</button>
                </div>
                <h2>Dashboard</h2>
                <div className="dashboard-stats">
                    <div className="stat-box" onClick={handleViewUsers} style={{ cursor: 'pointer' }}>
                        <h3>Total Users</h3>
                        <p>{userCount}</p>
                    </div>
                    <div className="stat-box" onClick={handleViewTrainers} style={{ cursor: 'pointer' }}>
                        <h3>Total Trainers</h3>
                        <p>{trainerCount}</p>
                    </div>
                    <div className="stat-box">
                        <h3>Total Equipment</h3>
                        <p>{equipmentCount}</p>
                    </div>
                    <div className="stat-box" onClick={handleViewMembers} style={{ cursor: 'pointer' }}>
                        <h3>Total Members</h3>
                        <p>{memberCount}</p>
                    </div>
                    <div className="stat-box" onClick={handleViewPackages} style={{ cursor: 'pointer' }}>
                        <h3>Listed Packages</h3>
                        <p>6</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Admin;
