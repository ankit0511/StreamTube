import http from 'http';
import express from 'express';
import path from 'path';
import cors from 'cors';
import { spawn } from 'child_process';
import { Server as SocketIO } from 'socket.io';

// Create the express app
const app = express();

// Enable CORS for HTTP requests
app.use(cors({
  origin: "http://localhost:5173",  // Allow frontend at localhost:5173 to access the backend
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));

// Create the HTTP server
const server = http.createServer(app);

// Set up CORS for WebSocket connections (via Socket.io)
const io = new SocketIO(server, {
  cors: {
    origin: "http://localhost:5173",  // Allow WebSocket connections from this origin
    methods: ['GET', 'POST'],
  },
});

// FFmpeg options for streaming to Facebook
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
  'rtmps://live-api-s.facebook.com:443/rtmp/FB-627535606385447-0-Ab10b1sHiHjVlCs5_B5GGuKo'
];

// Spawn the FFmpeg process
const ffmpegProcess = spawn('ffmpeg', options);

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

// Socket.IO connection handling
io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);

  // Listen for the 'binarystream' event and write data to FFmpeg stdin
  socket.on('binarystream', (stream) => {
    console.log("Received binary stream from client");
    ffmpegProcess.stdin.write(stream, (error) => {
      if (error) {
        console.error("Error writing to FFmpeg stdin:", error);
      }
    });
  });
});

// Serve static files
app.use(express.static(path.resolve('./public')));

// Start the server
const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
