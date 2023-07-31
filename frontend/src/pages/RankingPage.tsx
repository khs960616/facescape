import NavBar from "../components/NavBar/NavBar";
import styles from "./RankingPage.module.css";
import { useState } from 'react';
import RankingView from "../components/RankingPage/RankingView";
import type {Rankings} from '../services/ranking';

const RankingPage :React.FC = () => {
    const [currentStage, setCurrentStage] = useState<number>(1);
    const [gameRankings, setGameRankings] = useState<Rankings[]>([
        {
            "rank": 1,
            "clearTime": "mm:ss",
            "clearDate": "yyyy-MM-dd",
            participants: [
                {
                    memberId: 1,
                    nickname: "사람1",
                    icon: "/iconPath"
                },
                {
                    memberId: 2,
                    nickname: "사람2",
                    icon: "/iconPath"
                },
                {
                    memberId: 3,
                    nickname: "사람3",
                    icon: "/iconPath"
                },
                {
                    memberId: 4,
                    nickname: "사람4",
                    icon: "/iconPath"
                },
                {
                    memberId: 5,
                    nickname: "사람5",
                    icon: "/iconPath"
                },
                {
                    memberId: 6,
                    nickname: "사람6",
                    icon: "/iconPath"
                },
            ],
            currentPage: 1,
            isLastPage: true
        },
        {
            "rank": 1,
            "clearTime": "mm:ss",
            "clearDate": "yyyy-MM-dd",
            participants: [
                {
                    memberId: 1,
                    nickname: "사람1",
                    icon: "/iconPath"
                },
                {
                    memberId: 2,
                    nickname: "사람2",
                    icon: "/iconPath"
                },
                {
                    memberId: 3,
                    nickname: "사람3",
                    icon: "/iconPath"
                },
                {
                    memberId: 4,
                    nickname: "사람4",
                    icon: "/iconPath"
                },
                {
                    memberId: 5,
                    nickname: "사람5",
                    icon: "/iconPath"
                },
                {
                    memberId: 6,
                    nickname: "사람6",
                    icon: "/iconPath"
                },
            ],
            currentPage: 1,
            isLastPage: true
        },
        {
            "rank": 1,
            "clearTime": "mm:ss",
            "clearDate": "yyyy-MM-dd",
            participants: [
                {
                    memberId: 1,
                    nickname: "사람1",
                    icon: "/iconPath"
                },
                {
                    memberId: 2,
                    nickname: "사람2",
                    icon: "/iconPath"
                },
                {
                    memberId: 3,
                    nickname: "사람3",
                    icon: "/iconPath"
                },
                {
                    memberId: 4,
                    nickname: "사람4",
                    icon: "/iconPath"
                },
                {
                    memberId: 5,
                    nickname: "사람5",
                    icon: "/iconPath"
                },
                {
                    memberId: 6,
                    nickname: "사람6",
                    icon: "/iconPath"
                },
            ],
            currentPage: 1,
            isLastPage: true
        },
        {
            "rank": 1,
            "clearTime": "mm:ss",
            "clearDate": "yyyy-MM-dd",
            participants: [
                {
                    memberId: 1,
                    nickname: "사람1",
                    icon: "/iconPath"
                },
                {
                    memberId: 2,
                    nickname: "사람2",
                    icon: "/iconPath"
                },
                {
                    memberId: 3,
                    nickname: "사람3",
                    icon: "/iconPath"
                },
                {
                    memberId: 4,
                    nickname: "사람4",
                    icon: "/iconPath"
                },
                {
                    memberId: 5,
                    nickname: "사람5",
                    icon: "/iconPath"
                },
                {
                    memberId: 6,
                    nickname: "사람6",
                    icon: "/iconPath"
                },
            ],
            currentPage: 1,
            isLastPage: true
        },
        {
            "rank": 1,
            "clearTime": "mm:ss",
            "clearDate": "yyyy-MM-dd",
            participants: [
                {
                    memberId: 1,
                    nickname: "사람1",
                    icon: "/iconPath"
                },
                {
                    memberId: 2,
                    nickname: "사람2",
                    icon: "/iconPath"
                },
                {
                    memberId: 3,
                    nickname: "사람3",
                    icon: "/iconPath"
                },
                {
                    memberId: 4,
                    nickname: "사람4",
                    icon: "/iconPath"
                },
                {
                    memberId: 5,
                    nickname: "사람5",
                    icon: "/iconPath"
                },
                {
                    memberId: 6,
                    nickname: "사람6",
                    icon: "/iconPath"
                },
            ],
            currentPage: 1,
            isLastPage: true
        },
        {
            "rank": 1,
            "clearTime": "mm:ss",
            "clearDate": "yyyy-MM-dd",
            participants: [
                {
                    memberId: 1,
                    nickname: "사람1",
                    icon: "/iconPath"
                },
                {
                    memberId: 2,
                    nickname: "사람2",
                    icon: "/iconPath"
                },
                {
                    memberId: 3,
                    nickname: "사람3",
                    icon: "/iconPath"
                },
                {
                    memberId: 4,
                    nickname: "사람4",
                    icon: "/iconPath"
                },
                {
                    memberId: 5,
                    nickname: "사람5",
                    icon: "/iconPath"
                },
                {
                    memberId: 6,
                    nickname: "사람6",
                    icon: "/iconPath"
                },
            ],
            currentPage: 1,
            isLastPage: true
        },
        {
            "rank": 1,
            "clearTime": "mm:ss",
            "clearDate": "yyyy-MM-dd",
            participants: [
                {
                    memberId: 1,
                    nickname: "사람1",
                    icon: "/iconPath"
                },
                {
                    memberId: 2,
                    nickname: "사람2",
                    icon: "/iconPath"
                },
                {
                    memberId: 3,
                    nickname: "사람3",
                    icon: "/iconPath"
                },
                {
                    memberId: 4,
                    nickname: "사람4",
                    icon: "/iconPath"
                },
                {
                    memberId: 5,
                    nickname: "사람5",
                    icon: "/iconPath"
                },
                {
                    memberId: 6,
                    nickname: "사람6",
                    icon: "/iconPath"
                },
            ],
            currentPage: 1,
            isLastPage: true
        }
    ]);

    return (
        <div className={styles['wrap-container']}>
            <NavBar />
            <div className={styles['main-container']}>
                <RankingView rankInfos={gameRankings} currentStage={currentStage} handlerStage={setCurrentStage}/>
            </div>
        </div>
    )
}

export default RankingPage;