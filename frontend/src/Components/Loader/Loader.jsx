import React from 'react';
import Lottie from 'react-lottie';

import LoaderAnimate from "../../Animations/Loader.json";
import "./Loader.css";

const Loader = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: LoaderAnimate,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    }
  };
  return (
    <div className='loader'>
        <Lottie 
                options={defaultOptions}
                height={400}
                width={400}
                />
    </div>
  )
}

export default Loader;