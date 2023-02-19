const CryptoJS = require("crypto-js");
const User = require("../models/User");

class UserController {

    static updateUser = async (req, res) => {

        if (req.body.password) {
            req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.JWT_SEC).toString()
        }

        try {
            const updateUser = await User.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body
                },
                { new: true }
            );
            return res.status(200).json({ isSucess: true, state: "Success", statusCode: 200, "message": "User has been updated successfully", data: updateUser });
        } catch (error) {
            return res.status(500).json({ isSucess: false, state: "Internal Server Error", statusCode: 501, "message": "Server Error" });
        }
    }

    static deleteUser = async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            if (!user) {
                return res.status(404).json({ isSuccess: false, state: "Not Found", statusCode: 404, "message": "User Not Found" });
            }
            await User.findByIdAndDelete(req.params.id);
            return res.status(200).json({ isSucess: true, state: "Success", statusCode: 200, "message": "User has been deleted successfully" });
        } catch (error) {
            return res.status(500).json({ isSucess: false, state: "Internal Server Error", statusCode: 501, "message": "Server Error" });
        }
    }

    static getUser = async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            if (!user) {
                return res.status(404).json({ isSuccess: false, state: "Not Found", statusCode: 404, "message": "User Not Found" });
            }

            const { password, ...others } = user._doc;
            return res.status(200).json({ isSuccess: true, state: "Success", statusCode: 200, "message": "User Details", user: others });
        } catch (error) {
            return res.status(500).json({ isSucess: false, state: "Internal Server Error", statusCode: 501, "message": "Server Error" });
        }
    }

    static getAllUsers = async (req, res) => {
        try {
            const query = req.query.new;
            const users = query ? await User.find().limit(5) : await User.find();
            if (!users) {
                return res.status(404).json({ isSuccess: false, state: "Not Found", statusCode: 404, "message": "User Not Found" });
            }
            return res.status(200).json({ isSuccess: true, state: "Success", statusCode: 200, "message": "Users List", data: users });
        } catch (error) {
            return res.status(500).json({ isSucess: false, state: "Internal Server Error", statusCode: 501, "message": "Server Error" });
        }
    }

    static userStats = async (req, res) => {
        const date = new Date();
        const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
        try {
            const data = await User.aggregate([
                { $match: { createdAt: { $gte: lastYear } } },
                {
                    $project: {
                        month: { $month: "$createdAt" }
                    }
                },
                {
                    $group: {
                        _id: "$month",
                        total: { $sum: 1 }
                    }
                }
            ]);

            return res.status(200).json({ isSuccess: true, state: "Success", statusCode: 200, "message": "User Stats", data: data  });
        } catch (error) {
            return res.status(500).json({ isSucess: false, state: "Internal Server Error", statusCode: 501, "message": "Server Error" });
        }
    }
}

module.exports = UserController;