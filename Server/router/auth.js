const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('../db/conn');
const User = require('../models/userSchema');
const authenticate = require('../middleware/authenticate');

router.get("/", (req, res) => {
    res.send("Hello To the Router page")
})

router.post("/register", async (req, res) => {
    const { name, email, phone, work, password, cpassword } = req.body;

    if (!name || !email || !phone || !work || !password || !cpassword) {
        return res.status(422).json({ Error: "Plz filled the field property..." });
    }
    try {
        const userExit = await User.findOne({ email: email })
        if (userExit) {
            return res.status(402).json({ Error: "User already Exit" })
        } else if (password != cpassword) {
            return res.status(402).json({ Error: "Password not matching" })
        }
        else {
            const user = new User({ name, email, phone, work, password, cpassword })
            await user.save()
            res.status(201).json({ message: "User registered successfully" })
        }
    } catch (error) { console.log(error); }

    // console.log(name);
    // console.log(email);
    // res.json({Message:req.body});
    // res.send("Hello to the registration page")
})

// signIn
router.post("/signin", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "Plz filled the required field" })
        }
        const userLogin = await User.findOne({ email: email });
        if (userLogin) {
            // comparing the user password
            const isMatch = await bcrypt.compare(password, userLogin.password);
                // jwt Token
                const token = await userLogin.generateAuthToken();
                console.log(token);
                res.cookie("jwtoken",token);
                // res.cookie("jwtoken",token,{
                //     expires:new Date(Date.now()+25892000000)
                // })
            if (!isMatch) {
                res.status(400).json({ error: "Invalid Credientials" });
            }
            else {
                res.json({ message: "User login successfully" });
            }
        }
        else {
            res.status(400).json({ error: "Invalid Credientials" });
        }
    } catch (error) {
        console.log(Error);
    }
    // console.log(req.body);
    // res.json({Message:req.body})
})

// ---This is About authenticate page---
router.get('/about', authenticate, (req, res) => {
    console.log(`hello i am about page`);
    res.send(req.rootUser);
});
// ---This is contact page Data---
router.get('/getData', authenticate, (req, res) => {
    console.log(`hello i am contact page`);
    res.send(req.rootUser);  //Data send to the Fontend application
});

module.exports = router;