// components
import Logo from "./Logo";
import Ranking from "./Ranking";
import Market from "./Market";
import SignUp from "./SignUp";
import LogIn from "./LogIn"; 

// css
import styles from './NavBar.module.css';

const NavBar = () => {
    return (
        <>
        <div className={styles['nav-bar']}>
            <div className={styles['nav-bar-left']}>
                <Logo />   
                <Ranking />  
                <Market />
            </div>
            <div className={styles['nav-bar-right']}>
                <SignUp />
                <LogIn />
            </div>
        </div>
            
        </>
        
    )
}

export default NavBar;