const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');


const authenticate = async (req, res, next) => {
    try {

        const token = req.cookies.jwtoken;
        console.log("check token", token);
        
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
        console.log("verified token");

        const rootUser = await User.findOne({ _id: verifyToken._id, "tokens.token": token });
        console.log("verified user");

        if (!rootUser) { throw new Error('User not Found') }

        req.token = token;
        req.rootUser = rootUser;
        req.userID = rootUser._id;

        next();

    } catch (error) {
        res.status(401).send("Unathorized: No token provided")
        console.log(error);
    }
}

module.exports = authenticate;