import userModel from "../../models/userModel.js";
import bcrypt from "bcrypt";

// Controller for user sign-up
async function userSignUpController(req, res) {
    try {
        // Destructuring name, email, and password from the request body
        const { name, email, password, profilePic } = req.body;

        // Checking if a user with the same email already exists
        const user = await userModel.findOne({ email });
        if (user) throw new Error("User already exists");

        // Checking for missing fields
        if (!name || !email || !password) throw new Error("Missing fields");

        // Generating a salt and hashing the password synchronously
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = await bcrypt.hashSync(password, salt);

        // Checking for errors in password hashing
        if (!hashPassword) {
            throw new Error("Error in hashing password");
        }

        // Creating a payload with user data and hashed password
        const payload = {
            ...req.body,
            role: "GENERAL",
            password: hashPassword
        }


        // Creating a new user using the userModel and saving it to the database
        const userData = new userModel(payload);
        const saveUser = await userData.save();

        // Sending a success response with the saved user data
        res.status(201).json({
            message: 'User created',
            data: saveUser,
            success: true,
            error: false
        });
    } catch (err) {
        // Logging the error and sending an error response
        console.error(err.message || err);
        res.json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
}

export default userSignUpController;
