import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = ({ userDetails, setUserDetails }) => {
    const navigate = useNavigate();
    const [editing, setEditing] = useState(false);
    const [formData, setFormData] = useState({
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
        email: userDetails.email,
        password:userDetails.password,
        mobile: userDetails.mobile,
    });

    if (!userDetails) {
        return <h2>Login failed. Please log in to see user details.</h2>;
    }

    const handleGetAllUsers = () => {
        navigate('/Users');
    };

    const handleGetAllBooks = () => {
        navigate('/books');
    };

    const handleEditClick = () => {
        setEditing(true);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSave = async () => {
        try {
            const response = await axios.put(`http://localhost:8081/send/update/${userDetails.id}`, formData);
            setUserDetails(response.data);
            setEditing(false);
        } catch (error) {
            console.error('Error updating user details:', error);
        }
    };

    const handleCancel = () => {
        setEditing(false);
        // Optionally reset formData to userDetails if canceling changes
        setFormData({
            firstName: userDetails.firstName,
            lastName: userDetails.lastName,
            email: userDetails.email,
            password:userDetails.password,
            mobile: userDetails.mobile,
        });
    };

    const handleDeleteUser = async () => {
        try {
            await axios.delete(`http://localhost:8081/send/delete/${userDetails.id}`,formData);
            setUserDetails(null);
            navigate('/login');
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2>Welcome {userDetails.firstName}</h2>
                <button onClick={handleEditClick} style={{ marginLeft: 'auto' }}>
                    {editing ? 'Cancel' : 'Edit'}
                </button>
            </div>

            {editing ? (
                <div>
                    <label>
                        First Name:
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                        />
                    </label>
                    <br />
                    <label>
                        Last Name:
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                        />
                    </label>
                    <br />
                    <label>
                        Email:
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </label>
                    <br />
                    <label>
                        Password:
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </label>
                    <br />
                    <label>
                        Mobile Number:
                        <input
                            type="text"
                            name="mobile"
                            value={formData.mobile}
                            onChange={handleChange}
                        />
                    </label>
                    <br />
                    <button onClick={handleSave}>Save</button>
                    <button onClick={handleCancel}>Cancel</button>
                </div>
            ) : (
                <div>
                    <p>Last Name: {userDetails.lastName}</p>
                    <p>Email: {userDetails.email}</p>
                    <p>Mobile Number: {userDetails.mobile}</p>
                    <button onClick={handleGetAllUsers}>Get All Users</button>
                    <button onClick={handleGetAllBooks}>Get All Books</button>
                    <button onClick={handleDeleteUser}>Delete Account</button>
                </div>
            )}
        </div>
    );
};

export default Home;
