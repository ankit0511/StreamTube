import http from 'http'
import express from "express"
import path from 'path'
import { spawn } from 'child_process';
import { Server as SocketIO } from 'socket.io';


const app = express();
const server = http.createServer(app);
const io = new SocketIO(server)

const options = [
    '-i',
    '-',
    '-c:v', 'libx264',
    '-preset', 'ultrafast',
    '-tune', 'zerolatency',
    '-r', `${25}`,
    '-g', `${25 * 2}`,
    '-keyint_min', 25,
    '-crf', '25',
    '-pix_fmt', 'yuv420p',
    '-sc_threshold', '0',
    '-profile:v', 'main',
    '-level', '3.1',
    '-c:a', 'aac',
    '-b:a', '128k',
    '-ar', 128000 / 4,
    '-f', 'flv',
    `rtmp://a.rtmp.youtube.com/live2/`,
];

const ffmpegProcess = spawn('ffmpeg',options )
// adding event listners
 ffmpegProcess.stdout.on("data",(data)=>{
    console.log(data);
 });

 ffmpegProcess.stderr.on("data",(data)=>{
    console.log(data);
 });
 ffmpegProcess.stdout.on("close",(data)=>{
    console.log(data);
 });




io.on("connection", (socket)=>{
console.log("socket Connected ", socket.id);
socket.on('binarystream' ,(stream)=>{
    // this is the data which is coming from the sockets
    console.log("binary stream is coming ");
    ffmpegProcess.stdin.write(stream,(error)=>{
   console.log(error);
})

})
})


app.use(express.static(path.resolve('./public')))

const PORT = 5000;

server.listen(PORT, ()=>{
    console.log("server is running on the port 5000");
    
})