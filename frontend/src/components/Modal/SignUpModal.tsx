import styles from './Modal.module.css';
import SignUpForm from '../User/SignUpForm';

interface SignUpModalPageProps {
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
// 모달창 컴포넌트
const SignUpModal :React.FC<SignUpModalPageProps> = ({ setModalOpen }) => {
    
    const closeModal = (event: React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => {
        event?.stopPropagation();
        setModalOpen(false);
    };
    const stopPropagation = (event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
    }
    

    return (
        <div className={styles.overlay} onClick={closeModal}>
            <div className={styles.container} style={{ width: '815px' }} onClick={stopPropagation}>
                <button className={styles.close} onClick={closeModal}>
                    X
                </button>
                <p className={styles.title}>회원 가입</p>
                <div className={styles.modal}>
                    <SignUpForm />
                </div>
            </div>
        </div>
    )
}

export default SignUpModal;