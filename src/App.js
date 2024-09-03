import React from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './Registers';
import BookList from './BookList';
import Home from './Home';
import Login from './Login'
import Users from './users';




function App() {
  const [userDetails, setUserDetails]=useState(null)

  return (
    <Router>
        <Routes>
          <Route path="/" element={<Register setUserDetails={setUserDetails}/>}/>
          <Route path="/home" element={<Home userDetails={userDetails} setUserDetails={setUserDetails}/>}/>
          <Route path="/books" element={<BookList />}/>
          <Route path="/login" element={<Login setUserDetails={setUserDetails}/>}/>
          <Route path="/Users" element={<Users />}/>
        </Routes>
    </Router>
  );
};

export default App;
