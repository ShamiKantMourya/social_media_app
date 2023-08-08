import React from 'react';
import Lottie from 'react-lottie';
import { Link } from "react-router-dom";

import "./NotFound.css";
import PageNotFound from "../../Animations/PageNotFound.json";

const NotFound = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: PageNotFound,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };
    return (
        <div className='notfound-page'>
            <div className='"container'>
                <div className='animation'>
                <Lottie 
                options={defaultOptions}
                height={400}
                width={400}
                />
                </div>
                <h3 className='pnf-txt'>Page Not Found</h3>
                <Link to="/" className="pnf-link"><h4 className='error-text'>Go To Home</h4></Link>
            </div>
        </div>
    )
}

export default NotFound;