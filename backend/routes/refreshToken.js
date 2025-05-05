const express = require('express');
require("dotenv").config(); // Load secret key from .env
const jwt = require("jsonwebtoken"); // Import JWT
const bcrypt = require("bcryptjs");
const db = require('../config/db');
const ms = require('ms');
const router = express.Router();

router.get('/refresh-token', (req, res) => {
    const token = req.cookies.refreshToken;
    if(!token) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
        if(err) {
            return res.sendStatus(403); //invalid refresh token
        }
        console.log('reload error',err)
        const REFRESH_TOKEN_EXPIRY_MS = ms(process.env.REFRESH_EXPIRE_IN);
        const newAccessToken = jwt.sign(
            { userId: decoded.userId, username: decoded.username, roles: decoded.roles },
            process.env.JWT_SECRET,
            { expiresIn: process.env.ACCESS_EXPIRES_IN } //short-lived
        )
        return res.status(200).json({
            message : 'New Access Token',
            accessToken : newAccessToken,
            user : {
                username : decoded.username,
                roles : decoded.roles
            },
            refresh_expiry : REFRESH_TOKEN_EXPIRY_MS
        });
    })
})

module.exports = { refreshTokenRoutes : router }
