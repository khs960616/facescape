import ItemPurchase from "./ItemPurchase";
import ItemImg from "./ItemImg";
import styles from './Item.module.css';

interface ChildProps {
    itemImg: string;
    itemName: string;
    itemPrice: number;
    itemId: number;
}

const Item :React.FC<ChildProps> = ({ itemImg, itemName, itemPrice, itemId }) => {
      
    return (
        <div className={styles.item}>
            <div>
                <ItemImg itemImg={itemImg}/>
                <ItemPurchase 
                    itemPrice={itemPrice} 
                    itemId={itemId} 
                    itemImg={itemImg}
                    itemName={itemName}
                />
            </div>
        </div>
    );
};
export default Item;