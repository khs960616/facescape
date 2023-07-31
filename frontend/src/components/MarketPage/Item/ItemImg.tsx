import styles from './Item.module.css';

interface imgProps {
    itemImg: string;
}

const ItemImg :React.FC<imgProps> = ({ itemImg }) => {
    const img: string = itemImg ;
    console.log(img);
    return (
        <div>
            <div className={styles['img-box']}>
                {/* <img 
                    src={require(img)} 
                    alt="wing" 
                    className={styles['item-img']}
                /> */}
                <img 
                    src={`${img}`} 
                    alt="wing" 
                    className={styles['item-img']}
                />
                
            </div>
        </div>
    )
}
export default ItemImg;