const cloudinary = require("cloudinary").v2;

const User = require("../models/User");

exports.registerUser = async (req, res) => {
    try {
        const { avatar, name, location, email, password } = req.body;
        let user = await User.findOne({ email });
        if (user) return res.status(400).json(
            {
                success: false,
                message: "User already exists",
            });

            const myCloud = await cloudinary.uploader.upload(avatar, {
                folder: "avatar",
            });
        user = await User.create({
            name,location, email, password,
            avatar: {
                public_id: myCloud.public_id,
                url: myCloud.secure_url
            },
        });

        // res.status(201).json({ success: true, user });
        const token = await user.generateToken();

        const option = {
            expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
            httpOnly: true,
        }
        res.status(201).cookie("token", token, option).
            json({
                success: true,
                user,
                token,
            });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
};

//Login

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select("+password").populate("posts followers following");

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User doesn't exist"
            });
        }

        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Incorrect Password"
            });
        }
        const token = await user.generateToken();

        const option = {
            expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
            httpOnly: true,
        }
        res.status(200).cookie("token", token, option).
            json({
                success: true,
                user,
                token,
            });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
};

//LogOut 

exports.logoutUser = async(req,res) => {
    try {
        res.status(200).cookie("token", null,{expires: new Date(Date.now()), httpOnly: true}).json({
            success: true,
            message: "Logout Successfully"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

exports.followUser = async (req, res) => {
    try {

        const followUser = await User.findById(req.params.id);
        const loggedUser = await User.findById(req.user._id);

        if (!followUser) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        if (loggedUser.following.includes(followUser._id)) {

            const followingIndex = loggedUser.following.indexOf(followUser._id);

            loggedUser.following.splice(followingIndex, 1);

            const followerIndex = followUser.followers.indexOf(loggedUser._id);

            followUser.followers.splice(followerIndex, 1);

            await loggedUser.save();
            await followUser.save();

            res.status(200).json({
                success: true,
                message: "User Unfollowed",
            });

        } else {
            loggedUser.following.push(followUser._id);
            followUser.followers.push(loggedUser._id);

            await loggedUser.save();
            await followUser.save();

            res.status(200).json({
                success: true,
                message: "User followed",
            });
        }


    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}