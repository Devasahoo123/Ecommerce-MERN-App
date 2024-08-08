import userModel from "../../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSigninController = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            throw new Error("Please provide email and password");
        }

        const user = await userModel.findOne({ email });
        // console.log(user);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                error: true,
                success: false
            });
        }

        const checkPassword = await bcrypt.compare(password, user.password);

        if (!checkPassword) {
            return res.status(401).json({
                message: "Invalid password",
                error: true,
                success: false
            });
        }

        const tokenData = {
            id: user._id,
            email: user.email
        };
        // console.log(process.env.TOKEN_SECRET_KEY);
        const token = jwt.sign(tokenData, process.env.TOCKEN_SECRET_KEY, {
            expiresIn: "8h"
        });

        const tokenOptions = {
            httpOnly: true,
            secure: true
        };
        res.cookie("token", token, tokenOptions).json({
            message: "User login successful",
            error: false,
            success: true,
            data: token
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: err.message || "Internal Server Error",
            error: true,
            success: false
        });
    }
};

export default userSigninController;
