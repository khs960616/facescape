import { defaultInstance } from "../../services/api";
import { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { setIsLogIn } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";

import styles from './User.module.css';

const LogInLoading: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    let params = new URL(document.URL).searchParams;
    let code = params.get("code");
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await defaultInstance.get('/login/oauth2/google', {
                    params: {
                        code: code
                    }
                })
                // 토큰 저장
                sessionStorage.setItem('accessToken', data.accessToken);
                // 로그인 상태 변경
                dispatch(setIsLogIn(true));
                // 메인페이지로 이동
                navigate('/');
            } catch (error) {
                console.log('구글 로그인 토큰 받기 실패', error);
            }
        }
        fetchData();
    }, []);


    return (
        <div>
            <p className={styles['loading-text']}>로딩중</p> 
            <div className={styles["loader-wrapper"]}>
                <div className={styles["packman"]}></div>
                <div className={styles["dots"]}>
                    <div className={styles["dot"]}></div>
                    <div className={styles["dot"]}></div>
                    <div className={styles["dot"]}></div>
                    <div className={styles["dot"]}></div>
                </div>
            </div>
        </div>
    )
};

export default LogInLoading;