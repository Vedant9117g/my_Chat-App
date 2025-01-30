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













// export const register = async (req, res) => {
//     try {
//         const { fullName, username, password, confirmPassword, gender } = req.body;
//         if (!fullName || !username || !password || !confirmPassword || !gender) {
//             return res.status(400).json({ message: "All fields are required" });
//         }
//         if (password !== confirmPassword) {
//             return res.status(400).json({ message: "Password do not match" });
//         }

//         const user = await User.findOne({ username });
//         if (user) {
//             return res.status(400).json({ message: "Username already exit try different" });
//         }
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // profilePhoto
//         const maleProfilePhoto = `https://avatar.iran.liara.run/public/boy?username=${username}`;
//         const femaleProfilePhoto = `https://avatar.iran.liara.run/public/girl?username=${username}`;

//         await User.create({
//             fullName,
//             username,
//             password: hashedPassword,
//             profilePhoto: gender === "male" ? maleProfilePhoto : femaleProfilePhoto,
//             gender
//         });
//         return res.status(201).json({
//             message: "Account created successfully.",
//             success: true
//         })
//     } catch (error) {
//         console.log(error);
//     }
// // };
// export const login = async (req, res) => {
//     try {
//         const { username, password } = req.body;
//         if (!username || !password) {
//             return res.status(400).json({ message: "All fields are required" });
//         };
//         const user = await User.findOne({ username });
//         if (!user) {
//             return res.status(400).json({
//                 message: "Incorrect username or password",
//                 success: false
//             })
//         };
//         const isPasswordMatch = await bcrypt.compare(password, user.password);
//         if (!isPasswordMatch) {
//             return res.status(400).json({
//                 message: "Incorrect username or password",
//                 success: false
//             })
//         };
//         const tokenData = {
//             userId: user._id
//         };

//         const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });

//         return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'strict' }).json({
//             _id: user._id,
//             username: user.username,
//             fullName: user.fullName,
//             profilePhoto: user.profilePhoto
//         });

//     } catch (error) {
//         console.log(error);
//     }
// }
// export const logout = (req, res) => {
//     try {
//         return res.status(200).cookie("token", "", { maxAge: 0 }).json({
//             message: "logged out successfully."
//         })
//     } catch (error) {
//         console.log(error);
//     }
// }
// export const getOtherUsers = async (req, res) => {
//     try {
//         const loggedInUserId = req.id;
//         const otherUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");
//         return res.status(200).json(otherUsers);
//     } catch (error) {
//         console.log(error);
//     }
// }