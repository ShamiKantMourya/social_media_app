import React, { useEffect, useState } from 'react';
import { Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";

import "./createPost.css";
import { createPost } from '../../Services/postService';
import { loadUser } from '../../Services/userService';

const CreatePost = () => {

    const [image, setImage] = useState(null);
    const [caption, setCaption] = useState("");
    const [location, setLocation] = useState("");

    const { loading, error, message } = useSelector((state) => state.createPost);
    const dispatch = useDispatch();
    const alert = useAlert();

    const handlePostImage = (event) => {
        const file = event.target.files[0];

        const Reader = new FileReader();
        Reader.readAsDataURL(file);

        Reader.onload = () => {
            if (Reader.readyState === 2) {
                setImage(Reader.result);
            }
        }

    };

    const postSubmitHandler = async (event) => {
        event.preventDefault();
        await dispatch(createPost(caption, image, location));
        dispatch(loadUser());
    };

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch({ type: "clearErrors" });
        }

        if (message) {
            alert.success(message);
            dispatch({ type: "clearMessage" });
        }
    }, [dispatch, error, message, alert]);

    return (
        <div className='create-post'>
            <div className='create-post-container'>
            <Typography variant='h5' className='create-post-text'>
                        Create Post
                    </Typography>
                <form className='create-post-form' onSubmit={postSubmitHandler}>
                    <div className='image-box'>
                    {image && <img src={image} alt='Post' />}
                    </div>
                    <input type='file' accept='image/*' onChange={handlePostImage} className='image-input-box' />
                    <input type='text' className='text-input-box' placeholder='Caption....' value={caption} onChange={(event) => setCaption(event.target.value)} />
                    <input type='text' className='text-input-box'  placeholder='location' value={location} onChange={(event) => setLocation(event.target.value)} />
                    <button disabled={loading} type='submit' className='create-post-button'>Post</button>
                </form>
            </div>
        </div>
    )
}

export default CreatePost;