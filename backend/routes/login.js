const express = require('express');
require("dotenv").config(); // Load secret key from .env
const jwt = require("jsonwebtoken"); // Import JWT
const bcrypt = require("bcryptjs");
const db = require('../config/db');
const ms = require('ms');
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
        const REFRESH_TOKEN_EXPIRY_MS = ms(process.env.REFRESH_EXPIRE_IN);
        //Generate JWT
        const accessToken = jwt.sign(
            { userId: user.id, username: user.username, roles : user.role },
            process.env.JWT_SECRET,
            { expiresIn: process.env.ACCESS_EXPIRES_IN } //short-lived
        );

        const refreshToken = jwt.sign(
            { userId : user.id, username:user.username, roles : user.role },
            process.env.JWT_REFRESH_SECRET,
            { expiresIn: REFRESH_TOKEN_EXPIRY_MS } //long-lived
        )

        res.cookie("refreshToken", refreshToken, {
            httpOnly : true,
            secure : false, //use true if using https
            sameSite : 'strict',
            maxAge : REFRESH_TOKEN_EXPIRY_MS, // 7 days
        })
        console.log("Refresh Token",refreshToken);
        
        return res.status(200).json({
            message : 'Logged in Sucessfully',
            accessToken : accessToken,
            user : {
            username : user.username,
            roles : user.role
            },
            refresh_expiry : REFRESH_TOKEN_EXPIRY_MS
        })
    })
});

//Logout Route
router.post('/logout', (req, res) => {
    res.clearCookie("refreshToken", {
        httpOnly : true,
        secure : false,
        sameSite : 'strict'
    });
    res.sendStatus(200);
})

module.exports = { LoginRoutes : router }