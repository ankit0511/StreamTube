const userVideo = document.getElementById("user-video");

window.addEventListener('load', async e =>{
  const media = await navigator
  .mediaDevices
  .getUserMedia({audio:true, video:true})
//  with this line we are showing the users media to the user  
  userVideo.srcObject= media 

})