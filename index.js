import http from 'http'
import express from "express"
import path from 'path'
import { Server as SocketIO } from 'socket.io';

const app = express();
const server = http.createServer(app);
app.use(express.static(path.resolve('./public')))

const PORT = 5000;

server.listen(PORT, ()=>{
    console.log("server is running on the port 5000");
    
})