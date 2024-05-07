import { mongoose } from "mongoose";

const userSchema = new  mongoose.Schema({
    name: String,
    email: {
        type:String,
        required : true,
        unique  : true
    },
    password: {
        type : String,
        required:true
    },
    profilePic : {
        type  : String,
    },
    role : String
},{
    timestamps:true //It adds createdAt and updatedAt as fields in the db for each document
});

const  User = mongoose.model("User",userSchema);
export default User;
// this method is used to create a hash of the given password and then store it into the database
