
import { ReactNode, useEffect, useState } from "react"
import cn from 'classnames';
import styles from "./Tabs.module.css"
import { useSelector } from "react-redux";
import { selectToken } from "../../../../store/authSlice";
import { get, readServerError } from "../../../../utils/api";
import { Game, GameModel } from "../game/Game";
import { useBottomScrollListener } from 'react-bottom-scroll-listener';


export type Tab = {
    tabName: string;


}
type Props = {
    tabs: Tab[];

}


export function Tabs(props: Props) {

    const [activeTab, setActiveTab] = useState(props.tabs[0].tabName);
    // const tab = props.tabs.find(tab => tab.tabName == activeTab)

    const [pageNum, setPageNum] = useState(0)


    useBottomScrollListener(() => setPageNum(pageNum + 1));


    const token = useSelector(selectToken)


    const [games, setGames] = useState<GameModel[] | null>(null)


    const readGames = (message: any) => {
        const messageParsed = JSON.parse(message);
        if (messageParsed.data == null) {
            const newGames = games == null ? null : games
            setGames(newGames)
            return;
        }


        const gamesNum = (messageParsed.data.length);

        const gamesModels = [];
        for (let i = 0; i < gamesNum; i++) {

            const gameModel = {
                id: messageParsed.data[i].id,
                name: messageParsed.data[i].name,
                date: (new Date(messageParsed.data[i].start_date)).toLocaleString(),
                status: messageParsed.data[i].status,
                invitationCode: messageParsed.data[i].invitation_code

            }
            gamesModels.push(gameModel)

        }

        const newGames = games == null ? gamesModels : games.concat(gamesModels)
        setGames(newGames)
    }

    const getCreatedGames = async () => { //////////////////////////
        try {
            const response = await get('games/created/' + pageNum, token)
            readGames(response.text)

        }
        catch (error: any) {
            readServerError(error.response.text)
            console.log("error:", error)
        }



    }
    const getAllGames = async () => { //////////////////////////
        try {
            const response = await get('games/all/' + pageNum, token)
            readGames(response.text)

        }
        catch (error: any) {
            readServerError(error.response.text)
            console.log("error:", error)
        }



    }

    const [gamesFetched, setGamesFetched] = useState(false)

    const onGamesChange = () => {
      setGamesFetched(!gamesFetched)
    }

    useEffect(() => {

        console.log(pageNum)
        if (activeTab == "Мои")
            getCreatedGames()
        if (activeTab == "Участвую")
            getAllGames()

    }, [activeTab, gamesFetched, pageNum]);

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.tabs}>
                    {props.tabs.map(tab => {
                        const classname = cn(styles.tab, { [styles.activeTab]: (activeTab == tab.tabName) })
                        return (
                            <div className={classname} onClick={() => {setActiveTab(tab.tabName); setGames(null); setPageNum(0)}}>

                                {tab.tabName}

                            </div>
                        )
                    })}
                </div>
                <div className={styles.rectangle} />
            </div>
            <div className={styles.content}>
                {/* {tab?.tabContent || null} */}
                <div>
                    {games == null || games.length == 0 ? (
                        <div className={styles.empty}>
                            Пока нет игр
                        </div>

                    ) : (

                        (games?.map(game =>
                            <div>
                                <Game savedGame={game} onChange={onGamesChange} />
                            </div>

                        ))

                    )}

                </div>

            </div>

        </div >
    )
}