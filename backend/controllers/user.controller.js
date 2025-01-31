import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";


export const register = async (req, res) => {
    try {
        const { name, email, password, gender } = req.body;

        if (!name || !email || !password || !gender) {
            return res.status(400)
                .json({
                    success: false,
                    message: "All fields are required."
                })
        }

        const isUserAlready = await User.findOne({ email });
        if (isUserAlready) {
            return res.status(400)
                .json({
                    success: false,
                    message: "User already exist with this email."
                })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        //profilePhoto
        const maleProfilePhoto = `https://avatar.iran.liara.run/public/boy?username=${name}`;
        const femaleProfilePhoto = `https://avatar.iran.liara.run/public/girl?username=${name}`;

        //create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            profilePhoto: gender === "male" ? maleProfilePhoto : femaleProfilePhoto,
            gender
        });

        generateToken(res, user, ` ${user.name} has successfully registered`);


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed to register",
        })
    }
}


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400)
                .json({
                    success: false,
                    message: "All fields are required."
                })
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400)
                .json({
                    success: false,
                    message: "Incorrect email or password"
                })
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if(!isPasswordMatch){
            return res.status(400).json({
                success:false,
                message:"Incorrect email or password"
            });
        }
        generateToken(res, user, `Welcome back ${user.name}`);


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed to login",
        })
    }
}

export const logout = async (_,res) => {
    try {
        return res.status(200).cookie("token", "", {maxAge:0}).json({
            message:"Logged out successfully.",
            success:true
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Failed to logout"
        }) 
    }
}

export const getOtherUsers = async (req, res) => {
    try {
        const loggedInUserId = req.id;
        const otherUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");
        return res.status(200).json(otherUsers);
    } catch (error) {
        console.log(error);
    }
}

export const getUserProfile = async (req,res) => {
    try {
        const userId = req.id;
        const user = await User.findById(userId).select("-password");
        if(!user){
            return res.status(404).json({
                message:"Profile not found",
                success:false
            })
        }
        return res.status(200).json({
            success:true,
            user
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Failed to load user"
        })
    }
}
export const updateProfile = async (req,res) => {
    try {
        const userId = req.id;
        const {name} = req.body;
        const profilePhoto = req.file;

        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({
                message:"User not found",
                success:false
            }) 
        }
        // extract public id of the old image from the url is it exists;
        if(user.photoUrl){
            const publicId = user.photoUrl.split("/").pop().split(".")[0]; // extract public id
            deleteMediaFromCloudinary(publicId);
        }

        // upload new photo
        const cloudResponse = await uploadMedia(profilePhoto.path);
        const photoUrl = cloudResponse.secure_url;

        const updatedData = {name, photoUrl};
        const updatedUser = await User.findByIdAndUpdate(userId, updatedData, {new:true}).select("-password");

        return res.status(200).json({
            success:true,
            user:updatedUser,
            message:"Profile updated successfully."
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Failed to update profile"
        })
    }
}










