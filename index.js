import http from 'http';
import express from 'express';
import path from 'path';
import cors from 'cors';
import { spawn } from 'child_process';
import { Server as SocketIO } from 'socket.io';

// Create the express app
const app = express();

// Serve static files (e.g., CSS, JS) from the 'public' folder
app.use(express.static(path.resolve('./public')));

// Enable CORS for HTTP requests
app.use(cors({
  origin: "http://localhost:5173", // Allow frontend at localhost:5173 to access the backend
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));

// Create the HTTP server
const server = http.createServer(app);

// Set up CORS for WebSocket connections (via Socket.io)
const io = new SocketIO(server, {
  cors: {
    origin: "http://localhost:5173", // Allow WebSocket connections from this origin
    methods: ['GET', 'POST'],
  },
});

// RTMP URLs for different platforms
const RTMP_URLS = {
  youtube: 'rtmp://a.rtmp.youtube.com/live2', // YouTube RTMP URL
  facebook: 'rtmps://live-api-s.facebook.com:443/rtmp', // Facebook RTMP URL
  twitch: 'rtmp://live.twitch.tv/app', // Twitch RTMP URL
};

// Socket.IO connection handling
io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);

  let ffmpegProcess;

  // Listen for the 'binarystream' event and write data to FFmpeg stdin
  socket.on('binarystream', ({ stream, platform, streamKey }) => {
    console.log("Received binary stream from client");

    // Construct the RTMP URL based on the platform and stream key
    const rtmpUrl = `${RTMP_URLS[platform]}/${streamKey}`;
    console.log("Streaming to:", rtmpUrl);

    // FFmpeg options for streaming to the constructed RTMP URL
    const options = [
      '-i',
      '-',
      '-c:v', 'libx264',
      '-preset', 'ultrafast',
      '-tune', 'zerolatency',
      '-r', '25',
      '-g', '50',
      '-keyint_min', '25',
      '-crf', '25',
      '-pix_fmt', 'yuv420p',
      '-sc_threshold', '0',
      '-profile:v', 'main',
      '-level', '3.1',
      '-c:a', 'aac',
      '-b:a', '128k',
      '-ar', '44100',
      '-f', 'flv',
      rtmpUrl, 
    ];

    // Spawn the FFmpeg process
    ffmpegProcess = spawn('ffmpeg', options);

    // Handle FFmpeg stdout, stderr, and close events
    ffmpegProcess.stdout.on("data", (data) => {
      console.log("FFmpeg stdout:", data.toString());
    });

    ffmpegProcess.stderr.on("data", (data) => {
      console.error("FFmpeg stderr:", data.toString());
    });

    ffmpegProcess.on("close", (code) => {
      console.log(`FFmpeg process closed with code ${code}`);
    });

    // Write the binary stream to FFmpeg stdin
    ffmpegProcess.stdin.write(stream, (error) => {
      if (error) {
        console.error("Error writing to FFmpeg stdin:", error);
      }
    });
  });

  // Clean up FFmpeg process on socket disconnect
  socket.on('disconnect', () => {
    if (ffmpegProcess) {
      ffmpegProcess.kill(); // Kill the FFmpeg process
    }
    console.log("Socket disconnected:", socket.id);
  });
});

// Start the server
const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});