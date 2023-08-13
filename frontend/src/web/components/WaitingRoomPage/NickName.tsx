import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import styles from './WaitingRoom.module.css';

const NickName = () => {
    const name = useSelector((state: RootState) => state.nickName.name);
    console.log('닉네임을 잘 부르는지 확인', name);
    return (
        <div className={styles['nickname-container']}>
            <div className={styles.nickname}>
                {name}
            </div>
            <div className={styles.waitroom}>님의 대기실</div>
        </div>
    )
};

export default NickName;
