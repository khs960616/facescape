import styles from './SearchItem.module.css';
import { BiSearchAlt } from "react-icons/bi";
import { useState } from "react";

// redux
import { useDispatch } from 'react-redux';
import { setKeyword } from '../../../store/searchSlice';

const SearchItem: React.FC = () => {
    /*  Argument of type 'void' is not assignable to parameter of type 'AnyAction'
    오류 해결을 위해서는 ThunkDispatch<any, any, any> 타입 지정 필요
    */
    const dispatch = useDispatch();
    const [value, setValue] = useState<string>("");

    const handleSearch = () => {
        setValue("");
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' ) {
            handleSearch();
        }
    };

    const handleClick = () => {
        handleSearch();
    }

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // sekKeyword 리덕스로 보내기
        const newKeyword: string = event.target.value;
        setValue(newKeyword);
        dispatch(setKeyword(newKeyword));
    };

    return (
        <div className={styles['search-container']}>
            <BiSearchAlt 
                className={styles['search-icon']} 
                onClick={handleClick}
            />
            <input 
                type="text"
                placeholder='검색창'
                className={styles['search-input']}
                value={value}
                onChange={onChange}
                onKeyDown={handleKeyDown} 
            />

        </div>
    )
}

export default SearchItem;