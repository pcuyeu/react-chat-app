// This file receives data from frontend and logs in the user

const { connect } = require('getstream');
const bcryptjs = require('bcryptjs');
const StreamChat = require('stream-chat').StreamChat; //.StreamChat creates a needed instance of StreamChat
const crypto = require('crypto');

require('dotenv').config();

const api_key = process.env.STREAM_API_KEY;
const api_secret = process.env.STREAM_API_SECRET;
const app_id = process.env.STREAM_APP_ID;

// For signing up
const signup = async(req, res) => {
    try{
        const { fullName, username, password, phoneNumber } = req.body;

        // sequence of 16 random hex bytes for each userId
        const userId = crypto.randomBytes(16).toString('hex');

        // populated from env variables
        const serverClient = connect(api_key, api_secret, app_id);

        // Turns plain text password into a hash
        const hashedPassword = await bcryptjs.hash(password, 10);

        const token = serverClient.createUserToken(userId);
        
        // Send data back to the frontend
        res.status(200).json({ token, fullName, username, userId, hashedPassword, phoneNumber });


    } catch (error) {
        console.log(error);

        res.status(500).json({ message: error });
    }
};

// This function is for logged in users
const login = async (req, res) => {
    try{
        // body gets info from the form at the frontend
        const { username, password } = req.body;

        const serverClient = connect(api_key, api_secret, app_id);
        const client = StreamChat.getInstance(api_key, api_secret);

        // query the database for a matching username
        const { users } = await client.queryUsers({ name: username});

        // Error message if the user enters '' for the username
        if(!users.length) return res.status(400).json({ message: 'User not found'});

        // decrypt and compare password from database
        const success = await bcryptjs.compare(password, users[0].hashedPassword);

        const token = serverClient.createUserToken(users[0].id);

        if(success){
            res.status(200).json({ token, fullName: users[0].fullName, username, userId: users[0].id});
        } 
        else{
            res.status(500).json({ message: 'Incorrect password'})
        }

    } catch (error) {ads
        console.log(error);

        res.status(500).json({ message: error});
    }
};


// exporting functionality to each route
module.exports = { signup, login }