const userVideo = document.getElementById("user-video");
const startButton = document.getElementById("start-btn");

const state = { media : null}
startButton.addEventListener("click",()=>{
// here we have to record the media steam of the user and  the conver this to binary so that we can transfer this for TCP protocol
const mediaRecorder = new MediaRecorder(state.media,{
    // here we are providing th ebit rate of the recording 
    audioBitsPerSecond: 128000,
    videoBitsPerSecond: 2500000,
    framerate:25
    // if we increase the bit rate then there will be extra load on cpu 
    // but if we reduce the bit rate then the streaming will be laggy 
})
// the media recorder is alrady inbuilt in the browser 
mediaRecorder.ondataavailable = (e)=>{

    // this is the recorded data and we have to push this data to our backend usign WEB SOCKETS
 console.log("Data Availabe",e.data);
}
mediaRecorder.start(25)

})
window.addEventListener('load', async e =>{
  const media = await navigator
  .mediaDevices
  .getUserMedia({audio:true, video:true})
//   we are recording the media and then making it fit for the straming 
   state.media = media
//  with this line we are showing the users media to the user  
  userVideo.srcObject= media 

})