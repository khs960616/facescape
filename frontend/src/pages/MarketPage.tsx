import NavBar from "../components/NavBar/NavBar";
import MyMilage from "../components/MarketPage/Mileage/MyMilage";
import ItemList from "../components/MarketPage/Item/ItemList";
import SearchItem from "../components/MarketPage/Search/SearchItem";
import Category from "../components/MarketPage/Category/Category";
import styles from "./MarketPage.module.css";
// import PurchaseCheckModal from "../components/Modal/PurchaseCheckModal";

const MarketPage = () => {
    return (
        <div className={styles['wrap-container']}>
            <NavBar />
            <div className={styles['market-container']}>
                <div className={styles['left-container']}>
                    <SearchItem />
                    <Category />
                </div>
                <div>
                    <MyMilage />
                    <ItemList />
                </div>
            </div>
        </div>
    )
}

export default MarketPage;