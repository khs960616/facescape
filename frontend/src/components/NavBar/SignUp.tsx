import styles from './NavBar.module.css';
import { useState } from 'react';
import SignUpModal from '../Modal/SignUpModal';

// 모달을 노출시키는 컴포넌트
const SignUp :React.FC = () => {
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    const showModal = () => {
        setModalOpen(true);
    }
    return (
        <div 
            className={styles['sign-up']}
            onClick={showModal}
        >
            회원가입
            {modalOpen && <SignUpModal setModalOpen={setModalOpen}/>} 
        </div>
    )
}

export default SignUp;