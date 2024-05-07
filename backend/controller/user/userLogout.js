
const userLout=async(req,res)=>{
    try{
        res.cookie("token", "", { expires: new Date(0), path: '/' });

        res.json({
            message: "Logout Successful",
            error: false,
            success: true,
            data : []
        })
    }
    catch(err){
        console.error(err);
        res.status(500).json({
            message: err.message || "Internal Server Error",
            error: true,
            success: false
        })
    }
}

export default userLout;