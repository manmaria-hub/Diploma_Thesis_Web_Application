import React from "react";

// CSS Styles
import '../../styles/components/LOADER/loader.scss'; 

const PageLoader = () => {
    return (
        <div className="loader_container"> 
            <div className="ring"></div>
            <div className="ring"></div>
            <div className="ring"></div> 
            <img src={process.env.PUBLIC_URL+'/Icons/LOGOS/transparentLogo.jpg'}  alt='logo'></img>
        </div>
    )
}

export default PageLoader;