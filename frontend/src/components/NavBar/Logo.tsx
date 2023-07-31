import { Link } from 'react-router-dom';
import React from 'react';
import styles from './NavBar.module.css';


const Logo :React.FC = () => {
    return (
        <div>
            <Link to="/">
                {/* <img 
                    src={require("../../assets/images/logo.png")} 
                    alt="logo"
                    className={styles['logo-img']} 
                /> */}
                <p className={styles['logo-img']}>로고</p>
            </Link>
            
        </div>
    )
}

export default Logo;