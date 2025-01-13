import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import './StreamingApp.css';

const socket = io('http://localhost:5000'); // Connect to the backend server

const StreamingApp = () => {
  const userVideoRef = useRef(null); // Reference to the <video> element
  const [mediaStream, setMediaStream] = useState(null); // State to store the media stream
  const [mediaRecorder, setMediaRecorder] = useState(null); // State to store the media recorder
  const navigate = useNavigate();

  // Function to start recording and streaming
  const startStreaming = () => {
    if (!mediaStream) return;

    const recorder = new MediaRecorder(mediaStream, {
      audioBitsPerSecond: 128000,
      videoBitsPerSecond: 2500000,
      framerate: 25,
    });

    recorder.ondataavailable = (e) => {
      console.log('Data Available', e.data);
      socket.emit('binarystream', e.data); // Send binary data to the backend
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
      <h1>Stream Yard</h1>
      <div className="videoContainer">
        <video ref={userVideoRef} autoPlay muted />
      </div>
      <button
        className="startButton"
        onClick={startStreaming}
      >
        Start Streaming
      </button>
    </div>
  );
};

export default StreamingApp;