import UserResignation from './UserResignation';
import styles from './UserInfo.module.css';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { authInstance } from '../../../services/api';

interface UserProps {
    nickName: string | null,
    onEditModal: () => void,
    setNickName: any;

}

const EditModal: React.FC<UserProps> = ({ nickName, onEditModal, setNickName }) => {
    const [nickname, setNewNickName] = useState<string>(nickName || '');
    const [password, setNewPassword] = useState<string>("");
  
     
    
    const handleNickNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewNickName(event.target.value);
    };
    
    const handlePasswordChange = ((event: React.ChangeEvent<HTMLInputElement>) => {
        setNewPassword(event.target.value);
    });
    
    
    const onEditInfo = async () => {
        // 닉네임 검사
        if (nickname && nickname.length > 8) {
            Swal.fire({
              title: '닉네임은 8자 이하로 입력해주세요.',
              confirmButtonColor: '#3479AD',
              confirmButtonText: '확인',
              width: 600,
            });
            return;
        }
        // 비밀번호 검사
        if (password && password.length < 8) {
            Swal.fire({
                title: '비밀번호는 8자 이상 입력해주세요.',
    
                confirmButtonColor: '#3479AD',
                confirmButtonText: '확인',
                width: 600,
            });
            return;
        }
        try {
            await authInstance.patch(
                '/member', {
                    ...(nickname ? {nickname} : {}),
                    ...(password ? { password } : {})
                }
                ).then(() => {
                    setNickName(nickname);
                })
                
            Swal.fire({
                title: '회원정보수정이 완료되었습니다.',
                confirmButtonColor: '#3479AD',
                confirmButtonText: '확인',
            }).then(result => {
                onEditModal();
            })

         
        } catch (error: any) {
            console.log('회원 정보 수정 실패', error);
        }
    };
    const beforeEditNickName = nickName ?? '';


    return (
        <div>
            <div className={styles['open-modal']}>  
                <div className={styles['edit-title']}>닉네임</div>                 
                <div className={styles['edit-input']}>
                    <input 
                        type="text" 
                        defaultValue={beforeEditNickName}
                        onChange={handleNickNameChange}
                        />  
                    <button 
                        className={styles['edit-btn']}
                        onClick={onEditInfo}
                        >
                        수정
                    </button>      
                </div>      
                <div  className={styles['edit-title']}>비밀번호</div>                 
                <div className={styles['edit-input']}>
                    <input 
                        type="password" 
                        defaultValue={''}
                        onChange={handlePasswordChange}
                    />
                    <button 
                        className={styles['edit-btn']}
                        onClick={onEditInfo}
                    >
                        수정
                    </button>
                </div>
                <div className={styles['resign-container']}>
                    <UserResignation />
                </div>
            </div> 
        </div>
    ) ;
};

export default EditModal;
