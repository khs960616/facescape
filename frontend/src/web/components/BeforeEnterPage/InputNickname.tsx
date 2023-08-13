import styles from './BeforeEnter.module.css';
import { useState, ChangeEvent, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setNickName } from '../../store/nickNameSlice';
import { authInstance } from '../../services/api';
import Swal from 'sweetalert2';
import NickName from '../WaitingRoomPage/NickName';

const InputNickname: React.FC = () => {
    // 인풋창 닉네임 변화
    const [value, setValue] = useState<string>("");
    // 닉네임 기본 값
    const [defaultNickName, setDefaultNickName] = useState<string>("");
    const dispatch = useDispatch();

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        // 인풋창에 입력한 값
        const newNickName: string = event.target.value;
        setValue(newNickName);
        // 리덕스에 닉네임 저장하기
        dispatch(setNickName(newNickName));
    };
    

    const handleClick = () => {
        if (value.length < 1 || value.length > 8) {
            Swal.fire({
                title: '닉네임을 1자 이상, 8자 이하로 <br/> 입력해주세요.',
                confirmButtonColor: '#3479AD',
                confirmButtonText: '확인',
                width: '550px'
              });
        } else {
            window.location.href = "/waiting";
            setNickName("");
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleClick();
        }
    };

    const fetchData = async () => {
        // 로그인 한 경우에만 기존 닉네임 불러오기
        if (sessionStorage.getItem('accessToken')) {
            try {
                const { data } = await authInstance.get('/member')
                setDefaultNickName(data.nickname);   
            } catch(error) {
                console.log('닉네임 불러오기 오류', error);
            }
        }
    };
    
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <div className={styles['input-container']}>
                <input 
                    type="text" 
                    className={styles['nickname-input']}
                    onChange={onChange}
                    onKeyDown={handleKeyDown}
                    defaultValue={sessionStorage.getItem('accessToken') ? defaultNickName : ""}
                    placeholder={sessionStorage.getItem('accessToken') ? '' : '닉네임을 입력하세요.'}
                />
                <button className={styles['enter-btn']} onClick={handleClick}>입장</button>
            </div>
        </>
    );
}

export default InputNickname;
