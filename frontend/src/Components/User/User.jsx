import React from 'react'
import { Link } from 'react-router-dom';

import "./User.css";
import { Avatar } from '@mui/material';

const User = ({ userId, name, location, avatar }) => {
    return (
        <div className='userProfile'>
            <Link to={`/user/${userId}`} className='user-card'>
                <div className='user-box'>
                    <div className='user-img'>
                        <Avatar src={avatar} alt={name} sx={{ height: "3.5vmax", width: "3.5vmax" }}/>
                    </div>
                    <div className='name-loc'>
                        <p className='name'>{name}</p>
                        <p className='loc'>{location}</p>
                    </div>
                </div>
            </Link>
        </div>

    )
}

export default User;