import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './UserManagement.css';

function UserManagement() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);
    const [userDetails, setUserDetails] = useState({
        name: '',
        email: '',
        role: ''
    });

    useEffect(() => {
        axios.get('http://localhost:3001/users')
            .then(response => {
                setUsers(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError('Error fetching users');
                setLoading(false);
            });
    }, []);

    const handleEdit = (id) => {
        const userToEdit = users.find(user => user._id === id);
        setUserDetails(userToEdit);
        setIsEditing(true);
        setEditId(id);
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            axios.delete(`http://localhost:3001/users/${id}`)
                .then(() => {
                    setUsers(users.filter(user => user._id !== id));
                    toast.success('User deleted successfully!');
                })
                .catch(error => console.error('Error deleting user:', error));
        }
    };

    const handleUpdateUser = () => {
        axios.put(`http://localhost:3001/users/${editId}`, userDetails)
            .then(response => {
                setUsers(users.map(user => user._id === editId ? response.data : user));
                setIsEditing(false);
                setEditId(null);
                setUserDetails({ name: '', email: '', role: '' });
                toast.success('User updated successfully!');
            })
            .catch(error => console.error('Error updating user:', error));
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="user-management">
            <h2>User Management</h2>
            <ToastContainer />
            {isEditing && (
                <div className="edit-user-form">
                    <h3>Edit User</h3>
                    <input
                        type="text"
                        value={userDetails.name}
                        onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })}
                        placeholder="Name"
                    />
                    <input
                        type="email"
                        value={userDetails.email}
                        onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
                        placeholder="Email"
                    />
                    <input
                        type="text"
                        value={userDetails.role}
                        onChange={(e) => setUserDetails({ ...userDetails, role: e.target.value })}
                        placeholder="Role"
                    />
                    <button onClick={handleUpdateUser}>Update User</button>
                </div>
            )}
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user._id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>
                                <button onClick={() => handleEdit(user._id)}>Edit</button>
                                <button onClick={() => handleDelete(user._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default UserManagement;
