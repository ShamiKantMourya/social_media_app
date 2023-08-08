const crypto = require("crypto");
const cloudinary = require("cloudinary").v2;

const User = require("../models/User");
const Post = require("../models/Post");
const { sendMail } = require("../middlewares/sendMail");


//Update Profile

exports.updateProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        const { name, location, email, avatar } = req.body;
        if (name) {
            user.name = name;
        }
        if (email) {
            user.email = email;
        }
        if (location) {
            user.location = location;
        }

        //Avatar
        if (avatar) {

            await cloudinary.uploader.destroy(user.avatar.public_id);
            const myCloud = await cloudinary.uploader.upload(avatar, {
                folder: "avatar",
            })
            user.avatar.public_id = myCloud.public_id;
            user.avatar.url = myCloud.secure_url;
        }

        await user.save();

        res.status(200).json({
            success: true,
            message: "Profile updated",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
};

//Update Pasword

exports.updatePassword = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("+password");

        const { oldPassword, newPassword } = req.body;

        if (!oldPassword || !newPassword) {
            return res.status(400).json({
                success: false,
                message: "Please provide old and new password",
            })
        }

        const isMatch = await user.matchPassword(oldPassword);

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Incorrect old password",
            });
        }

        user.password = newPassword;

        await user.save();

        res.status(200).json({
            success: true,
            message: "Password updated",
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
};


exports.myProfile = async (req, res) => {

    try {

        const user = await User.findById(req.user._id).populate("posts followers following");

        await user.save();

        res.status(200).json({
            success: true,
            user,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
};

//Delete Profile

exports.deleteProfile = async (req, res) => {

    try {

        const user = await User.findById(req.user._id);
        const posts = user.posts;
        const followers = user.followers;
        const following = user.following;
        const userId = user._id;

        await cloudinary.uploader.destroy(user.avatar.public_id);

        await user.remove();

        res.cookie("token", null, { expires: new Date(Date.now()), httpOnly: true });

        for (let i = 0; i < posts.length; i++) {
            const post = await Post.findById(posts[i]);
            await cloudinary.uploader.destroy(post.image.public_id);
            await post.remove();
        };

        // Removing User from followers following

        for (let i = 0; i < followers.length; i++) {
            const follower = await User.findById(followers[i]);

            const index = follower.following.indexOf(userId)

            follower.following.splice(index, 1);
            await follower.save();

        }

        //Removing Users from following's follower

        for (let i = 0; i < following.length; i++) {
            const userFollow = await User.findById(following[i]);

            const index = userFollow.followers.indexOf(userId)

            userFollow.followers.splice(index, 1);
            await userFollow.save();
        }

        // removing all comments of the user from all posts

        const allPosts = await Post.find();

        for (let i = 0; i < allPosts.length; i++) {
            const post = await Post.findById(allPosts[i]._id);

            for (let j = 0; j < post.comments.length; j++) {
                if (post.comments[j].user === userId) {
                    post.comments.splice(j, 1);
                }
            }
            await post.save();
        }
        // removing all likes of the user from all posts

        for (let i = 0; i < allPosts.length; i++) {
            const post = await Post.findById(allPosts[i]._id);

            for (let j = 0; j < post.likes.length; j++) {
                if (post.likes[j] === userId) {
                    post.likes.splice(j, 1);
                }
            }
            await post.save();
        }

        res.status(200).json({
            success: true,
            message: "Profile Deleted",
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
};

exports.getUserProfile = async (req, res) => {

    try {
        const user = await User.findById(req.params.id).populate("posts followers following");

        if (!user) {
            res.status(404).json({
                success: false,
                message: "User not found",
            })
        }

        res.status(200).json({
            success: true,
            user,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
};

exports.getAllUserData = async (req, res) => {

    try {
        const users = await User.find({
            name: {$regex: req.query.name, $options: 'i'},
        });

        res.status(200).json({
            success: true,
            users,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
};

exports.forgetPassword = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            res.status(404).json({
                success: false,
                message: "User not found",
            })
        }

        const resetPasswordToken = user.getResetPasswordToken();

        await user.save();

        const resetURL = `${req.protocol}://${req.get("host")}/password/reset/${resetPasswordToken}`;

        const resetPasswordUrlMessage = `Reset your password by clicking on the below link : \n\n ${resetURL}`;

        try {
            await sendMail({
                email: user.email,
                subject: "Reset Password",
                resetPasswordUrlMessage,
            });

            res.status(200).json({
                success: true,
                message: "Reset Password mail send to your emailId",
            })
        } catch (error) {
            user.resetPasswordToken = undefined;
            user.resetPasswordTokenExpire = undefined;

            await user.save();
            res.status(500).json({
                success: false,
                message: error.message,
            })
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
};

exports.resetPassword = async (req, res) => {
    try {
        const resetToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

        const user = await User.findOne({
            resetToken,
            resetPasswordTokenExpire: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid Token or has expired",
            })
        }

        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordTokenExpire = undefined;

        await user.save();

        res.status(200).json({
            success: true,
            message: "Password Updated successfully",
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
};

exports.getMyPosts = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        const posts = [];

        for (let i = 0; i < user.posts.length; i++) {
            const post = await Post.findById(user.posts[i]).populate("owner likes comments.user");
            posts.push(post);

        };

        res.status(200).json({
            success: true,
            posts,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
};

