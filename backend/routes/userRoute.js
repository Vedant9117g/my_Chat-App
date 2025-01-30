import express from "express";
import { register,login,logout,getOtherUsers,getUserProfile,updateProfile} from "../controllers/user.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";
import upload from "../utils/multer.js";
import { deleteMediaFromCloudinary, uploadMedia } from "../utils/cloudinary.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/").get(isAuthenticated,getOtherUsers);
router.route("/profile").get(isAuthenticated, getUserProfile);
router.route("/profile/update").put(isAuthenticated, upload.single("profilePhoto"), updateProfile);

export default router;