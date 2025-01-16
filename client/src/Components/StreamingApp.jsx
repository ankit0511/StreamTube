import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import './StreamingApp.css';

const socket = io('http://localhost:5000'); // Connect to the backend server

const StreamingApp = () => {
  const userVideoRef = useRef(null); // Reference to the <video> element
  const [mediaStream, setMediaStream] = useState(null); // State to store the media stream
  const [mediaRecorder, setMediaRecorder] = useState(null); // State to store the media recorder
  const [platform, setPlatform] = useState(''); // State for selected platform
  const [streamKey, setStreamKey] = useState(''); // State for stream key
  const navigate = useNavigate();

  // Function to start recording and streaming
  const startStreaming = () => {
    if (!mediaStream || !platform || !streamKey) {
      alert('Please select a platform and enter your stream key.');
      return;
    }

    const recorder = new MediaRecorder(mediaStream, {
      audioBitsPerSecond: 128000,
      videoBitsPerSecond: 2500000,
      framerate: 25,
    });

    recorder.ondataavailable = (e) => {
      console.log('Data Available', e.data);
      // Send binary data, platform, and stream key to the backend
      socket.emit('binarystream', { stream: e.data, platform, streamKey });
    };

    recorder.start(25); // Start recording with a 25ms interval
    setMediaRecorder(recorder);

    // Redirect to the streaming details page
    navigate('/streaming-details');
  };

  // Initialize media stream when the component mounts
  useEffect(() => {
    const initializeMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
        setMediaStream(stream);
        if (userVideoRef.current) {
          userVideoRef.current.srcObject = stream; // Display the user's media stream
        }
      } catch (error) {
        console.error('Error accessing media devices:', error);
      }
    };

    initializeMedia();

    // Clean up media stream when the component unmounts
    return () => {
      if (mediaStream) {
        mediaStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div className="streamingContainer">
      {/* Video Container on the Left */}
      <div className="videoContainer">
        <video ref={userVideoRef} autoPlay muted />
      </div>

      {/* Form on the Right */}
      <div className="formContainer">
        <h2>Stream Setup</h2>
        <div className="formGroup">
          <label htmlFor="platform">Select Platform</label>
          <select
            id="platform"
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
          >
            <option value="">Select Platform</option>
            <option value="youtube">YouTube</option>
            <option value="facebook">Facebook</option>
            <option value="twitch">Twitch</option>
          </select>
        </div>
        <div className="formGroup">
          <label htmlFor="streamKey">Stream Key</label>
          <input
            id="streamKey"
            type="text"
            placeholder="Enter your stream key"
            value={streamKey}
            onChange={(e) => setStreamKey(e.target.value)}
          />
        </div>
        <button className="startButton" onClick={startStreaming}>
          Start Streaming
        </button>
      </div>
    </div>
  );
};

export default StreamingApp;