import NavBar from "../components/NavBar/NavBar";
import styles from "./MainPage.module.css";
import CodeInput from "../components/MainPage/CodeInput";
import NewGame from "../components/MainPage/NewGame";
// components
import GameName from "../components/MainPage/GameName";

const MainPage = () => {
    return (
        <div className={styles['wrap-container']}>
            <NavBar />
            <div className={styles['main-container']}>
                <GameName />
                <CodeInput />
                <NewGame />
            </div>
        </div>
    )
}

export default MainPage;