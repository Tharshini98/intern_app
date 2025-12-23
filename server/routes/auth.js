const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const {connectMongo} = require('../db/mongo');
const { error } = require('console');

const router = express.Router();



router.post('/register', async(req,res) => {
const {name, email, password} = req.body;
const usersCollection = await connectMongo();

const existing = await usersCollection.findOne({email});
if(existing) return res.status(409).json({error:'Email already registered'});

const hash = await bcrypt.hash(password, 10);
const userId = crypto.randomUUID();

await usersCollection.insertOne({userId, name, email, passwordHash: hash});
res.json({message: 'Registered successfully', userId});
});

router.post('/login', async(req,res) => {
    const {email, password} = req.body;
    const usersCollection = await connectMongo();

    const user = await usersCollection.findOne({email});
    if(!user || !(await bcrypt.compare(password, user.passwordHash))){
        return res.status(401).json({error:'Invalid credentials'});
    }

    const token = jwt.sign({userId: user.userId, email}, process.env.JWT_SECRET,{ expiresIn: '2h' });
    res.json({token, userId:user.userId});
});


module.exports = router;