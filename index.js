const express = require("express");
const multer = require("multer");

const app = express();
const PORT = 3000;

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      
      cb(null, file.originalname);
    }
  })

const upload = multer({ storage: storage },{ dest: 'uploads/' })

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.post('/upload', upload.single("file"), (req, res) => {
    try {
        console.log("File received:", req.file);
        console.log("Body received:", req.body);

        if (!req.file) {
            return res.status(400).send("No file uploaded or field name mismatch.");
        }

        res.send("File uploaded successfully.");
    } catch (error) {
        console.error("Error uploading file:", error);
        res.status(500).send("Internal server error.");
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
