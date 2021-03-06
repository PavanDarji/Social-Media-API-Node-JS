const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

//Register User

router.post("/register", async (req, res) => {

    try {
        //genrate new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // create new user
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        });

        //save user 
        const user = await newUser.save();
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json(error)

    }
})


// login user

router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        !user && res.status(404).json("Email and Password Does not Match");

        const validPassword = await bcrypt.compare(req.body.password, user.password)
        !validPassword && res.status(400).json("Email and Password Does not Match");

        res.status(200).json("login successfully....");
    } catch (error) {
        res.status(500).json(error)
    }

})

module.exports = router
