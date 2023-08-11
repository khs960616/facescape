import { useState, useEffect } from 'react';
import styles from './Category.module.css';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { setItemType } from '../../../store/categorySlice'; 

const Category: React.FC = () => {
    const dispatch = useDispatch();
    const selectedLastCategory = useSelector((state: RootState) => state.setItemType.itemType);
    // 아이템 데이터 받고 다시 확인해보기
    const [selectedOption, setSelectedOption] = useState<string>("전체보기");
    
    const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // 변수를 새로 지정해야 함수가 동기적으로 처리된다
        // 상태 변경 시점과 함수 호출은 동기적으로 실행되어야 상태가 업데이트 된다.
        const newItemType: string = event.target.value;
        setSelectedOption(newItemType);
        dispatch(setItemType(newItemType));
      };

    return (
        <div className={styles['category-container']}>
            <div className={styles['radio-buttons']}>
                <label className={styles["radio-button"]}>
                        <input 
                            value="전체보기" 
                            name="option" 
                            type="radio" 
                            checked={selectedOption === '전체보기'}
                            onChange={handleOptionChange}
                        />
                        <div className={styles['radio-circle']}></div>
                        <span className={styles['radio-label']}>전체보기</span>
                    </label>
                <label className={styles["radio-button"]}>
                    <input 
                        value="말풍선" 
                        name="option" 
                        type="radio" 
                        checked={selectedOption === '말풍선'}
                        onChange={handleOptionChange}
                    />
                    <div className={styles['radio-circle']}></div>
                    <span className={styles['radio-label']}>말풍선</span>
                </label>
                <label className={styles["radio-button"]}>
                    <input 
                        value="아이콘" 
                        name="option" 
                        type="radio" 
                        checked={selectedOption === '아이콘'}
                        onChange={handleOptionChange}
                    />
                    <div className={styles['radio-circle']}></div>
                    <span className={styles['radio-label']}>아이콘</span>
                </label>
                <label className={styles["radio-button"]}>
                    <input 
                        value="화면효과" 
                        name="option" 
                        type="radio" 
                        checked={selectedOption === '화면효과'}
                        onChange={handleOptionChange}
                    />
                    <div className={styles['radio-circle']}></div>
                    <span className={styles['radio-label']}>화면효과</span>
                </label>
                <label className={styles["radio-button"]}>
                    <input 
                        value="음성효과" 
                        name="option" 
                        type="radio" 
                        checked={selectedOption === '음성효과'}
                        onChange={handleOptionChange}
                    />
                    <div className={styles['radio-circle']}></div>
                    <span className={styles['radio-label']}>음성효과</span>
                </label>
            </div>
        </div>
    )
}

export default Category;