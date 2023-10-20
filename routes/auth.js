const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { User } = require('../models/user');

/*
* Log in a previously registered user
* Request body should contain username and password
*/
router.post('/login', async (req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;
        if (!username || !password) {
            return res.status(400).send("Username and Password are necessary fields");
        }

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).send("User not found");
        }

        // matching the password provided with the registered account
        if (bcrypt.compareSync(password, user.password))
            res.status(200).send(user);
        else
            res.status(400).send('username or password incorrect');
    } catch (error) {
        console.log("Failed to login user", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

/*
* Register a new user 
* Request body should contain username, password, and type of user - buyer/seller
*/
router.post('/register', async (req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;
        const type = req.body.type;
        if (!username || !password || !type) {
            return res.status(500).send("Username, Password, Type are necessary fields");
        }
        if (type !== "buyer" && type !== "seller") {
            return res.status(500).send("Only buyers or sellers are allowed currently");
        }
        let user = new User({
            username,
            password: bcrypt.hashSync(password, 10),
            type,
        })
        user = await user.save();
        if (!user) {
            return res.status(500).send("The user was not creted");
        }
        res.send(user);
    } catch (error) {
        console.log("Failed to register a new user", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})


module.exports = router;