import styles from './RankingPageComponent.module.css';
import RankingItem from './RankingItem';
import DropDownIcon from '../../assets/images/i-dropdown.svg'
import type {Rankings} from '../../services/ranking';


type RankingViewProps = {
    currentStage: number,
    handlerStage: (num: number) => void,
    rankInfos: Rankings[]
}

const RankingView = ({currentStage, handlerStage, rankInfos}: RankingViewProps) => {
    const stageOnclickHandler = (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        const stage = Number(event.currentTarget.getAttribute("data-stage"));
        handlerStage(stage);
    }

    return (
        <div className={styles['ranking-view-container']}>
            <div className={styles['ranking-header']}>
                <div className={styles['ranking-view-title']}>
                    Ranking
                </div>

                <div className={styles['ranking-stage-dropdown']}>
                    <div className={styles['ranking-stage-dropdown-selector']}>
                        <div>
                            STAGE {currentStage}
                        </div>
                        <img className={styles['rank-icon']} src={DropDownIcon} alt="dropdown" />
                    </div>

                    <div className={styles['ranking-stage-dropdown-group']}>
                        <div className={styles['ranking-stage-dropdown-item']} data-stage={1} onClick={stageOnclickHandler}>
                            stage1
                        </div>
                        <div className={styles['ranking-stage-dropdown-item']} data-stage={2} onClick={stageOnclickHandler}>
                            stage2
                        </div>
                        <div className={styles['ranking-stage-dropdown-item']} data-stage={3} onClick={stageOnclickHandler}>
                            stage3
                        </div>
                    </div>
                </div>
            </div>
            
            <div className={styles['ranking-body']}>
                {
                    rankInfos.map((rankInfo)=>{
                        return <RankingItem rankInfo={rankInfo}/>
                    })
                }
            </div>
        </div>
    )
}

export default RankingView;