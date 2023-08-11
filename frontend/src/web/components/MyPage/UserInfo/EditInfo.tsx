import styles from './UserInfo.module.css';
import { useState } from 'react';
import EditModal from './EditModal';

interface UserNickNameProps {
    nickName: string | null,
    setNickName: any;
}

const EditInfo: React.FC<UserNickNameProps> = ({ nickName, setNickName }) => {
    const [openEditModal, setOpenEditModal] = useState<boolean>(false);

    const onEditModal = async () => {
        setOpenEditModal(!openEditModal);
    
    };
  return (
    <div>
        <div 
            className={styles['edit-user']}
            onClick={onEditModal}
        >
            회원정보수정
        </div>
        <div className={styles['edit-modal']}>
            {openEditModal ? <EditModal nickName={nickName} onEditModal={onEditModal} setNickName={setNickName} /> : null }
        </div>
    </div>
  );
};

export default EditInfo;
