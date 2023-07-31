import styles from './Item.module.css';
import { useState } from 'react';
import PurchaseCheckModal from '../../Modal/PurchaseCheckModal';

interface priceProps {
    itemPrice: number;
    itemId: number;
    itemImg: string;
    itemName: string;
}


const ItemPurchase :React.FC<priceProps> = ({ itemPrice, itemId, itemImg, itemName }) => {
    const [openPurchaseModal, setOpenPurchaseModal] = useState<boolean>(false);
    const onPurchase = () => {
        setOpenPurchaseModal(true);
    }
    return (
        <div>
            <div className={styles['price-back']}>
                <div className={styles.mileage}>M</div>
                <button 
                    className={styles['item-price']}
                    onClick={onPurchase}
                >
                    {itemPrice}
                </button>
            </div>
            {openPurchaseModal ? 
            <PurchaseCheckModal 
                itemPrice={itemPrice}
                itemId={itemId}
                itemImg={itemImg}
                itemName={itemName}
                setOpenPurchaseModal={setOpenPurchaseModal}
            /> : null}
        </div>
    )
};

export default ItemPurchase;