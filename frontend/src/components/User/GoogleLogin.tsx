import styles from './User.module.css'

const GoogleLogin :React.FC = () => {
    const googleLogin = () => {
        // 구글 로그인 코드
    }
    return (
        <div>
            <button 
                type='button'
                className={styles.google}
                onClick={googleLogin}
            >Google Login</button>
        </div>
    )
}

export default GoogleLogin;