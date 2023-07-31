import useFetchItemList from '../../../hook/useFetchItemList';
import Item from './Item';
import styles from './Item.module.css';
import { ItemType } from '../../../services/market/utils';

const ItemList: React.FC = () => {
    const itemData: ItemType[] | null = useFetchItemList();

  return (
    <div className={styles.container}>
        {itemData && itemData.length > 0 ? (
            itemData.map((item) => (
                <div key={item.ItemId} className={styles['main-item']}>
                    <Item 
                        itemName={item.name} 
                        itemImg={item.image} 
                        itemPrice={item.price} 
                        itemId={item.ItemId}
                    />
                </div>
            ))
        ) : (
            <p>Loading...</p>
        )}
    </div>
  );
};

export default ItemList;
