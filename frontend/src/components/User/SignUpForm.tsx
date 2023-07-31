import { useForm, Controller } from 'react-hook-form';
import styles from './User.module.css';
import axios from 'axios';

type FormData = {
    email: string;
    password: string;
    nickname: string;
    confirmPassword: string;
}

const SignUpForm: React.FC = () => {
    const { control, handleSubmit, formState: { errors }, watch } = useForm<FormData>();
    
    // 비밀번호 추적
    const watchPassword :string = watch('password', '');

    const onSubmit = (data: FormData) => {
        const { confirmPassword, ...dataWithoutConfirmPassword } = data;
        console.log(dataWithoutConfirmPassword);

        // 이메일 중복 확인
        axios.get('/check-email', {
            params: {
                email: data.email
            }
        })
            .then((response) => {
                console.log(response.data.inUniqueEmail);
                // 성공하면 회원가입 로직을 실행 할 것
            })
            .catch((error) => console.error('이메일 중복 체크 에러 Error occured:', error));
        

        // 회원가입 로직
        axios.post('/member', dataWithoutConfirmPassword)
            // 성공
            .then((response) => {
                console.log(response);

            })
            // 실패
            .catch((error) => {
                console.error('Error occurred:', error);
                alert('회원가입 실패');
            })
    };

    return (
        <div className={styles.container}>
                <div className={styles.labels}>
                    <p className={styles.label}>닉네임</p>
                    <p className={styles.label}>이메일</p>
                    <p className={styles.label}>비밀번호</p>
                    <p className={styles.label}>비밀번호<br/>확인</p>
                </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    name="nickname"
                    control={control}
                    rules={{ 
                        required: '닉네임을 입력해주세요.',
                        pattern: {
                            value: /^[ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z0-9]+$/,
                            message: '닉네임에는 특수문자를 포함할 수 없습니다.'
                        },
                        maxLength: {
                            value: 8,
                            message: '1자 이상, 8자 이하의 닉네임을 입력해주세요.'
                          },
                        minLength: {
                            value: 1,
                            message: '1자 이상, 8자 이하의 닉네임을 입력해주세요.',
                        }
                        }}
                    render={({ field }) => 
                            <input 
                                {...field} 
                                type="text" 
                                className={styles.logininput}
                            />  
                    }
                />
                {errors.nickname ? ( 
                    <p className={styles.error}>{errors.nickname.message}</p>) : (
                        <p className={styles.error}>&nbsp;</p>
                    )
                }

                <Controller
                    name="email"
                    control={control}
                    rules={{ 
                        required: '이메일을 입력해주세요.',
                        pattern: {
                            value: /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                            message: '정확한 이메일 주소를 입력하세요.'
                        },
                        maxLength: {
                            value: 320,
                            message: '이메일 글자수를 확인해주세요.'
                          },
                        minLength: {
                            value: 8,
                            message: '이메일 글자수를 확인해주세요.',
                        }
                    }}
                    // 회원가입된 유저인지 확인 여부 code ...
                    render={({ field }) => 
                        <input 
                            {...field} 
                            type="text" 
                            className={styles.logininput}
                        />}
                    />
                {errors.email ? ( 
                    <p className={styles.error}>{errors.email.message}</p>) : (
                        <p className={styles.error}>&nbsp;</p>
                    )
                }                
                <Controller
                    name="password"
                    control={control}
                    rules={{ required: '비밀번호를 입력해주세요.' }}
                    render={({ field }) => 
                        <input 
                            {...field} 
                            type="password" 
                            className={styles.logininput}
                        />}
                    />
                {errors.password ? ( 
                    <p className={styles.error}>{errors.password.message}</p>) : (
                        <p className={styles.error}>&nbsp;</p>
                    )
                }                  
                <Controller
                    name="confirmPassword"
                    control={control}
                    rules={{ 
                        required: '비밀번호를 입력해주세요.',
                        validate: (value) => (
                            value === watchPassword || '비밀번호가 일치하지 않습니다.'
                        )
                    }}
                    render={({ field }) => 
                        <input 
                            {...field} 
                            type="password" 
                            className={styles.logininput}
                        />}
                    />
                {errors.confirmPassword ? ( 
                    <p className={styles.error}>{errors.confirmPassword.message}</p>) : (
                        <p className={styles.error}>&nbsp;</p>
                    )
                }                   
                    <button 
                        type="submit"
                        className={styles.submit}
                        >
                            회원가입
                    </button>
            </form>  
        </div>
 
    )

};

export default SignUpForm;