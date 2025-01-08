import http from 'http'
import express from "express"
import path from 'path'
import { Server as SocketIO } from 'socket.io';


const app = express();
const server = http.createServer(app);
const io = new SocketIO(server)
io.on("connection", (socket)=>{
console.log("socket Connected ", socket.id);
socket.on('binarystream' ,(stream)=>{
    // this is the data which is coming from the sockets
    console.log("binary stream is coming ", stream.data);
    
})
})


app.use(express.static(path.resolve('./public')))

const PORT = 5000;

server.listen(PORT, ()=>{
    console.log("server is running on the port 5000");
    
})