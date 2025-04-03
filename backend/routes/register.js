const express = require('express');
const bcrypt = require("bcryptjs");
const db = require('../config/db');
const router = express.Router();

router.post('/register', async(req, res) => {
    const { user, pwd, email } = req.body;
    
    if(!user || !pwd || !email) {
        return res.status(400).json({errors : "Fill all the details"})
    }
    db.query('SELECT email from user_master WHERE email = ?', [email], async (err, emailResult) => {
        if(err) {
            console.error('Error checking email', err);
            return res.status(500).json({errors : 'Database error.'});
        }
        if(emailResult.length > 0) {
            console.log(emailResult);
            return res.status(401).json({errors : 'Mail ID already exist'})
        } else {
            try {
                //Hash Password
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(pwd, salt);

                //Insert into DB
                const query = 'INSERT INTO user_master (username, password, email, created_at) VALUES (?,?,?,?)';
                await db.query(query, [user, hashedPassword, email, new Date()]);
                return res.status(201).json({ message : 'User registered sucessfully'});
            } catch (error) {
                console.error(error)
                return res.status(500).json({errors : 'Error while registering user'})
            }
        }
    })
})
module.exports = { RegisterRoutes : router }