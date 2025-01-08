import { useState, useEffect } from "react";
import { io } from "socket.io-client";

const Stream = () => {
  const [mediaStream, setMediaStream] = useState(null);
  const [socket, setSocket] = useState(null);
  
  useEffect(() => {
    // Establish connection to the backend server
    const socketConnection = io("http://localhost:5000"); // Connect to your backend WebSocket server

    // Save socket connection in the state
    setSocket(socketConnection);

    // Cleanup when component is unmounted
    return () => {
      socketConnection.disconnect();
    };
  }, []);

  const startStreaming = async () => {
    try {
      const media = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });

      setMediaStream(media);
      
      const mediaRecorder = new MediaRecorder(media, {
        audioBitsPerSecond: 128000,
        videoBitsPerSecond: 2500000,
        framerate: 25,
      });

      mediaRecorder.ondataavailable = (e) => {
        if (socket) {
          console.log("Sending binary stream to backend...");
          socket.emit('binarystream', e.data);
        }
      };

      mediaRecorder.start(25); // Send data every 25 milliseconds

      // Show the user's video stream on the page
      const userVideo = document.getElementById("user-video");
      userVideo.srcObject = media;
      
    } catch (err) {
      console.error("Error accessing media devices:", err);
    }
  };

  return (
    <div>
      <h1>Stream Yard</h1>
      <video id="user-video" autoPlay muted></video>
      <button id="start-btn" onClick={startStreaming}>Start Streaming</button>
    </div>
  );
};

export default Stream;
