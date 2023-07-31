import styles from './MainPageComponent.module.css'

const NewGame :React.FC = () => {
    const handleClick = () => {
        // code
    }
    return (
        <div className={styles.conatiner}>
            <button
                className={styles['new-game-btn']}
                onClick={handleClick}
            >
                새 게임 만들기
            </button>
        </div>
    )
}

export default NewGame;