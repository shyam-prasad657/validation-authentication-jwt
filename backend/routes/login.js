const express = require('express');
require("dotenv").config(); // Load secret key from .env
const jwt = require("jsonwebtoken"); // Import JWT
const bcrypt = require("bcryptjs");
const db = require('../config/db');
const router = express.Router();

router.post('/login', async (req, res) => {
    const { email, pwd } = req.body;
    console.log(email);
    console.log(pwd);

    if( !email || !pwd) {
        return res.status(400).json({errors : 'Fill the login credentials'});
    }

    db.query(`SELECT * from user_master WHERE email = ?`,[email], async(err, result) => {
        if(err) {
            return res.status(500).json({errors : 'Error while checking email'});
        }
        if(result.length === 0) {
            return res.status(401).json({errors : 'Invalid Login credentials'});
        }
        const user = result[0];
        const isMatch = await bcrypt.compare(pwd, user.password);
        if(!isMatch) {
            return res.status(401).json({errors : "Invalid Password"});
        }

        //Generate JWT
        const token = jwt.sign(
            { userId: user.id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );
        console.log(token)
        return res.status(200).json({message : 'Logged in Sucessfully',
            username : user.username,
            roles : user.role,
            email : user.email,
            accessToken : token
        })
    })
})

module.exports = { LoginRoutes : router }