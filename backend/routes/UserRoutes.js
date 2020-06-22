const express = require('express')
const router = express.Router()
const bcrypt = require("bcryptjs");
const Users = require("../models/UserModel");
const config = require('../config/key')
const { authChecker } = require('../middleware/Auth');
const { request } = require('express');


router.post("/register", (req, res) => {

    const { name, email, password, cpassword } = req.body;


    // Check required fields
    if (!name || !email || !password || !cpassword) {
        return res.status(400).json({ error: "Please enter all fields" });
    }
    //Check password length
    if (password.length < 8) {
        return res.status(400).json({ error: "Password should be atleast 8 characters long" });
    }

    if (password !== cpassword) {
        return res.status(400).json({ error: "Confirm Password Does Not Match" });
    }

    const findUser = Users.findOne({ email: email })
    findUser.exec((err, user) => {
        if (user) return res.status(400).json({ error: "User already exists" });

        const newUser = new Users({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })


        bcrypt.genSalt(12, function (err, salt) {
            bcrypt.hash(newUser.password, salt, function (err, hash) {
                if (err) throw err
                newUser.password = hash;

                newUser.save((err, user) => {
                    if (!err) res.json({ msg: "Successfully Registered" })

                })
            });
        })

    })
})


router.post('/login', (req, res) => {

    const { email, password } = req.body;


    if (!email || !password) {
        return res.status(400).json({ error: "Please Enter All Fields" })
    }

    const findUser = Users.findOne({ email: email })


    findUser.exec((err, user) => {

        if (!user) return res.status(400).json({ error: "User Does Not Exit" })


        bcrypt.compare(password, user.password).then((isMatch) => {
            if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

            const sessUser = { _id: user._id, name: user.name, email: user.email }


            req.session.user = sessUser;

            res.json({ msg: "LoggedIn SuccessFully", sessUser, auth: true })   // sends cookie with sessionID automatically in response
            console.log("LogIN successfully");

        })

    })

})

router.delete("/logout", authChecker, (req, res) => {
  
    req.session.destroy((err) => {
        //delete session data from store, using sessionID in cookie
        if (err) throw err;
        res.clearCookie(config.COOKIE_NAME); // clears cookie containing expired sessionID
        res.json({ msg: "Logged out successfully", auth: false });
        console.log("Logged out successfully")
    });
});


router.get("/authchecker", authChecker, (req, res) => {
    const sessUser = req.session.user;
    console.log("Already logged In")
    return res.json({ msg: " Authenticated Successfully", sessUser, auth: true });

});
//get all users
router.get('/', authChecker, (req, res) => {
    id = req.session.user._id
    Users.find({ _id: { $not: { $eq: id } } })
        .exec((err, users) => {
            if (err) return res.status(400).json({ message: 'Failure' })
            res.json({ users })
        })
})



module.exports = router
