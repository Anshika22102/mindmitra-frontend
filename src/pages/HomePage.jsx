// src/pages/HomePage.jsx
import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="text-center mt-5">
      <h1>Welcome to MindMitra</h1>
      <p className="lead">Your safe space to talk, reflect, and feel better.</p>
      <Link to="/chat">
        <Button variant="success">Start Talking</Button>
      </Link>
    </div>
  );
};

export default HomePage;
