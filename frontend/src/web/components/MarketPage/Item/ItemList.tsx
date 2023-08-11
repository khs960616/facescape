import Item from './Item';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';

import { defaultInstance } from '../../../services/api';

import styles from './Item.module.css';
import { useNavigate } from 'react-router-dom';

export interface ItemType {
    itemId: number;
    name: string;
    image: string;
    price: number;
    items: ItemType[]
}
 
const ItemList: React.FC = () => {

    const [itemData, setItemData] = useState<ItemType[] | null>([]);

    // 카테고리
    const itemType = useSelector((state: RootState) => state.setItemType);
    // 검색
    const keyword = useSelector((state: RootState) => state.setKeyword);

    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const params: { itemType?: string; keyword?: string } = {};
    
                if (itemType.itemType && itemType.itemType !== '전체보기') {
                    params.itemType = itemType.itemType;
                }
                if (keyword.keyword) {
                    params.keyword = keyword.keyword;
                }
    
    
                const response = await defaultInstance.get('/items', { params });
                setItemData(response.data.items || []);
                console.log(response)
            } catch (error: any) {
                console.error('아이템 조회 에러났음', error);
            }
        };
     
    }, [itemType, keyword]);

  

    return (
        <div className={styles.container}>
            {itemData && itemData.length > 0 ? (
                itemData.map((item) => (
                    <div key={item.itemId} className={styles['main-item']}>
                        <Item 
                            itemName={item.name} 
                            itemImg={item.image} 
                            itemPrice={item.price} 
                            itemId={item.itemId}
                        />
                    </div>
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
    );
};

export default ItemList;
