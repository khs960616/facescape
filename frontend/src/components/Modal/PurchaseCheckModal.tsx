import styles from './Modal.module.css';
import axios, { AxiosResponse } from 'axios';
import { useSelector } from 'react-redux';
import  { UserState } from '../../store/store';

interface purchaseProps {
    itemPrice: number;
    itemId: number;
    itemImg: string;
    itemName: string;
    setOpenPurchaseModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const PurchaseCheckModal: React.FC<purchaseProps> = ({ itemPrice, itemId, itemImg, itemName, setOpenPurchaseModal }) => {
    const closeModal = (event: React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => {
        event?.stopPropagation();
        setOpenPurchaseModal(false);
    };

    const stopPropagation = (event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
    };

    const token = useSelector((state: UserState) => state.token);
    console.log('토큰:', token);

    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    
    const purchaseItem = () => {
        axios.post('/member/item', {
            params: {
                itemId: {itemId}
            }
        })
            .then((response: AxiosResponse) => {
                console.log(response);
            })
            .catch(error => console.error('Error: ', error));
        
        setOpenPurchaseModal(false);
    };

    return (
        <div className={styles.overlay} onClick={closeModal}>
            <div className={styles.container} style={{ width: '402px', height: '350px' }} onClick={stopPropagation}>
                <button className={styles.close} onClick={closeModal}>
                    X
                </button>
                <p className={styles['item-name']}>{itemName}</p>
                <img 
                    src={`${itemImg}`} 
                    alt="wing" 
                    className={styles['item-img']}
                />
                <p className={styles['item-price']}>{itemPrice}</p>
                <div className={styles['btn-container']}>
                    <button 
                        className={styles['purchase-btn']}
                        onClick={purchaseItem}
                    >
                        구입하기
                    </button>
                    <button 
                        className={styles['cancel-btn']}
                        onClick={closeModal}
                    >
                        취소
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PurchaseCheckModal;