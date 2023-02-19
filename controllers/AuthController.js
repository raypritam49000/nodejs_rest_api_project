const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

class AuthController {

    static register = async (req, res) => {
        try {

            const user = await User.findOne({ username: req.body.username });

            if (user) {
                return res.status(404).json({ isSuccess: false, state: "User Already Register", statusCode: 409, "message": "User Already Register with "+req.body.username});
            }

            const newUser = new User({
                username: req.body.username,
                email: req.body.email,
                password: CryptoJS.AES.encrypt(req.body.password, process.env.JWT_SEC).toString(),
                "isAdmin": req.body.isAdmin ? req.body.isAdmin : false
            });
            const savedUser = await newUser.save();
            return res.status(201).json({ isSuccess: true, state: "Success", statusCode: 201, "message": "User has been register", data: savedUser });
        } catch (err) {
            return res.status(500).json({ isSuccess: false, state: "Internal Server Error", statusCode: 501, "message": "Server Error" });
        }
    }

    static login = async (req, res) => {
        try {
            const user = await User.findOne({ username: req.body.username });

            if (!user) {
                return res.status(404).json({ isSuccess: false, state: "Not Found", statusCode: 404, "message": "User Not Found with " + req.body.username });
            }


            const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.JWT_SEC);
            const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
            const inputPassword = req.body.password;

            if (originalPassword != inputPassword) {
                return res.status(401).json({ isSuccess: false, state: "ForBidden", statusCode: 401, "message": "Wrong Password" });
            }


            const accessToken = jwt.sign(
                {
                    id: user._id,
                    isAdmin: user.isAdmin,
                },
                process.env.JWT_SEC,
                { expiresIn: "3d" }
            );

            const { password, ...others } = user._doc;
            return res.status(200).json({ isSuccess: true, state: "Success", statusCode: 200, "message": "User has been login successfully ", user: { ...others, accessToken } });

        } catch (err) {
            return res.status(500).json({ isSuccess: false, state: "Internal Server Error", statusCode: 501, "message": "Server Error" });
        }
    }


}

module.exports = AuthController;