const express = require('express');
const cors = require('cors'); // Used for Cross Origin Requests

//Routes
const authRoutes = require("./routes/auth.js");

const app = express(); 
const PORT = process.env.PORT || 5000;

require('dotenv').config(); // Allows for calling environment variables in node app

app.use(cors());
app.use(express.json());  // Allows for passing of JSON payloads from fronend to backend
app.use(express.urlencoded()); 

app.get('/', (req, res) =>{
    res.send('Hello, World!');
});

app.use('/auth', authRoutes)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); // NOTE: backticks instead of single quotes
