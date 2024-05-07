import userModel from "../../models/userModel.js"

const userDetailsController = async (req, res) => {
    try {
        // Log the user ID received in the request
        // console.log("userId", req.userId);

        // Find the user in the database by their ID
        const user = await userModel.findById(req.userId).select("-password");

        // Send a success response with the user details
        res.status(200).json({
            message: "Login user details",
            data: {
                user
            },
            error: false,
            success: true
        });
    } catch (err) {
        // Send an error response if there's an issue with fetching user details
        res.status(400).json({
            status: 'fail',
            message: err.message || err,
            error: true,
            success: false
        });
    }
}

export default userDetailsController;
