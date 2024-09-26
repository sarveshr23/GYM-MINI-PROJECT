import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';

function Dashboard() {
    const [userCount, setUserCount] = useState(0);
    const [equipmentCount, setEquipmentCount] = useState(0);

    useEffect(() => {
        // Fetch the number of users
        axios.get('http://localhost:3001/users')
            .then(response => setUserCount(response.data.length))
            .catch(error => console.error('Error fetching users:', error));

        // Fetch the number of equipment
        axios.get('http://localhost:3001/equipment')
            .then(response => setEquipmentCount(response.data.length))
            .catch(error => console.error('Error fetching equipment:', error));
    }, []);

    const data = {
        labels: ['Users', 'Equipment'],
        datasets: [
            {
                label: 'Count',
                data: [userCount, equipmentCount],
                backgroundColor: ['#3498db', '#2ecc71'],
                borderColor: ['#2980b9', '#27ae60'],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div>
            <h2>Admin Dashboard</h2>
            <Bar data={data} options={options} />
        </div>
    );
}

export default Dashboard;
