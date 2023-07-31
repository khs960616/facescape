import styles from './NavBar.module.css';
import { useState } from 'react';
import LogInModal from '../Modal/LogInModal';

// 모달을 노출시키는 컴포넌트
const LogIn :React.FC = () => {
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    const showModal = () => {
        setModalOpen(true);
    }

    return (
        <div 
            className={styles['login']}
            onClick={showModal}
        >
            로그인
            {modalOpen && <LogInModal setModalOpen={setModalOpen} />}
        </div>
    )
}

export default LogIn;