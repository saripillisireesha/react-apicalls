import React, { useEffect, useState } from "react";
import axios from "axios";

const Users = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:9093/users');
                console.log(response.data);
                setUsers(response.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchUsers();
    }, []); // Dependency array is empty, so it runs only once after the component mounts

    return (
        <>
            <h1>All Users</h1>
            <ol>
                {users.map(user => (
                    <li key={user.id}>
                        <strong>First Name:</strong> {user.firstName}<br/>
                        <strong>Last Name:</strong> {user.lastName}<br/>
                        <strong>Email:</strong> {user.email}<br/>
                        <strong>Mobile:</strong> {user.mobile ? user.mobile : 'N/A'}<br/> {/* Use user.mobile if available */}
                    </li>
                ))}
            </ol>
        </>
    );
};

export default Users;
