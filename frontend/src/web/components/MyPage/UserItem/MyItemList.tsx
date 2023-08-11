import MyItem from './MyItem';
import { useState, useEffect } from 'react';
import styles from './UserItem.module.css';
import { authInstance } from '../../../services/api';
import { useNavigate } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';

const MyItemList: React.FC = () => {
    const [itemList, setItemList] = useState<any[]>([]);
    const [checkedItemId, setCheckedItemId] = useState<{ [key: string]: string | null }>({});
    const navigate = useNavigate();
    const myCategory = useSelector((state: RootState ) => state.setMyItemType.itemType);
    

    // 카테고리별로 선택하기
    const handleEquipItem = (itemId: string) => {
        setCheckedItemId(prevState => ({
            ...prevState,
            [myCategory]: itemId === prevState[myCategory] ? null : itemId
        }));
    };


    // 상점으로 이동하기
    const goMarket = () => {
        navigate('/market');
    }

    // 내가 구매한 아이템 카테고리별로 불러오기
    useEffect(() => {
        const fetchItemList = async () => {
            try {
                const { data } = await authInstance.get('/member/item/purchased', 
                    {
                        params: {
                            itemType: myCategory,
                        }
                    }
                ); 
                if (data && data.items.length >= 0) {
                    setItemList(data.items);
                } 
                // console.log('내가 구매한 아이템', data.items)
            }  
            catch (error) {
                console.log('내가 구매한 아이템 불러오기 실패', error);
            }
        };

        fetchItemList();
    }, [myCategory,checkedItemId ]);
    
    return (
        <div className={styles['myitem-wrap']}>
            <div>
                {itemList.length === 0 ? (
                    <div className={styles['go-market']}>
                        <button onClick={goMarket}>아이템 구매하러 가기</button>
                    </div>
                    ) : (
                        null
                    )
                }
            </div>
            {itemList ? (
                itemList.map(item => (
                    <MyItem
                        key={item.itemId}
                        itemId={item.itemId}
                        itemName={item.name}
                        itemImg={item.image}
                        checked={checkedItemId[myCategory] === item.itemId}
                        onEquip={handleEquipItem}
                    />
                
                ))
            ) : (
                <div className={styles['loader']}>
                <div className={styles['loader']}></div>
                <div className={styles['loader']}></div>
                <div className={styles['loader']}></div>
                <div className={styles['loader']}></div> 
                <div className={styles['loader']}></div> 
                <div className={styles['loader']}></div>
                <div className={styles['loader']}></div>
                </div>
            )}
          
        </div>
    )
};

export default MyItemList;