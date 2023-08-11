import UserNickName from './UserNickName';
import UserEmail from './UserEmail';
import UserMilage from './UserMileage';
import EditInfo from './EditInfo';

import { authInstance } from '../../../services/api';

import { useEffect, useState } from 'react';

import styles from './UserInfo.module.css';

const UserInfo: React.FC = () =>{

    const [nickName, setNickName] = useState(null);
    const [email, setEmail] = useState(null);
    const [mileage, setMileage] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await authInstance.get('/member');
            setNickName(response.data.nickname);
            setEmail(response.data.email);
            setMileage(response.data.mileage);
            console.log('마이페이지 불러오는 횟수', response);
        } catch (error) {
            console.log(error);
        }
        };
        // 무한루프
    fetchData();
  }, [mileage]);

    return (
        <div className={styles['userinfo-container']}>
            <UserNickName  nickName={nickName} />
            <UserEmail email={email} />
            <UserMilage mileage={mileage} />
            <EditInfo nickName={nickName} setNickName={setNickName} />
        </div>
    )
};

export default UserInfo;
