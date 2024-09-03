 import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = ({setUserDetails}) => {
  const [registerUser, setRegisterUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    mobile: ''
  });
  const [message, setMessage] = useState('');  // To show success or error messages
  const navigate=useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
  
    // Log the payload to verify its contents 
    console.log('Register user payload:', registerUser);
  
    try {
      const response = await axios.post("http://localhost:8081/send", registerUser, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      console.log('Response data:', response.data);
      setUserDetails(response.data)
      setMessage('Registration successful!');  // Success message
      navigate('/home')
    } catch (err) {
      if (err.response) {
        // The request was made and the server responded with a status code
        const status = err.response.status;
        const data = err.response.data;
        const message = data?.message || err.response.statusText;
        console.error(`Error occurred: ${status} - ${message}`);
        setMessage(`Registration failed. Status: ${status}. Message: ${message}`);
      } else if (err.request) {
        // The request was made but no response was received
        console.error('Error occurred: No response received', err.request);
        setMessage('Registration failed. No response from the server.');
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error occurred:', err.message);
        setMessage(`Registration failed. Error: ${err.message}`);
      }
    }
  };
  
  

  return (
    <div>
      <form onSubmit={handleRegister}>
        <label>
          firstName:
          <input
            type="text"
            value={registerUser.firstName}
            onChange={(e) => setRegisterUser({ ...registerUser, firstName: e.target.value })}
            placeholder="Enter first name"
            required
          />
        </label>
        <label>
          lastName:
          <input
            type="text"
            value={registerUser.lastName}
            onChange={(e) => setRegisterUser({ ...registerUser, lastName: e.target.value })}
            placeholder="Enter LastName"
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            value={registerUser.email}
            onChange={(e) => setRegisterUser({ ...registerUser, email: e.target.value })}
            placeholder="Enter email"
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={registerUser.password}
            onChange={(e) => setRegisterUser({ ...registerUser, password: e.target.value })}
            placeholder="Enter password"
            required
          />
        </label>
        <label>
          Mobile:
          <input
            type="text"
            value={registerUser.mobile}
            onChange={(e) => setRegisterUser({ ...registerUser, mobile: e.target.value })}
            placeholder="Enter Mobile"
            required
          />
        </label>
        <button type="submit">Register</button>
      </form>
      {message && <p style={{ color: message.includes('failed') ? 'red' : 'green' }}>{message}</p>}
    </div>
  );
};

export default Register;


