const express = require("express");
const multer = require("multer");

const app = express();
const PORT = 3000;
app.get('/', (req, res)=>{
    res.send("hii");
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
