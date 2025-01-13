import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import './Home.css';

const Home  = () => {
  const navigate = useNavigate();

  return (
    <div className="homeContainer">
      <Navbar />
      <div className="homeContent">
        <h1 className="homeTitle">Welcome to Stream Tube</h1>
        <p className="homeDescription">
          Stream Tube is your ultimate solution for live streaming to multiple platforms. Start streaming in just a few clicks!
        </p>
        <button className="streamButton" onClick={() => navigate('/stream')}>
          Start Streaming
        </button>
      </div>
    </div>
  );
};

export default Home ;