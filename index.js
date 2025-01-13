import http from 'http';
import express from 'express';
import path from 'path';
import cors from 'cors';
import { spawn } from 'child_process';
import { Server as SocketIO } from 'socket.io';

// Create the express app
const app = express();

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.resolve('./views')); // Ensure 'views' points to the correct directory

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
  'rtmp://a.rtmp.youtube.com/live2/jmgp-5fbp-79gb-sjk6-0dpa'
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

// Routes to render EJS templates
app.get('/', (req, res) => {
  res.render('index'); // Render the 'index.ejs' file
});

app.get('/stream', (req, res) => {
  res.render('stream', { title: 'Streaming App' }); // Render the 'stream.ejs' file
});

// Start the server
const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
