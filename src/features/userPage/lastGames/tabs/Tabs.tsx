import { useEffect, useState } from "react"
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
    userId: string;
}


export function Tabs(props: Props) {

    const token = useSelector(selectToken)

    const [activeTab, setActiveTab] = useState(props.tabs[0].tabName);

    const [pageNum, setPageNum] = useState(0)

    useBottomScrollListener(() => setPageNum(pageNum + 1));

    const [games, setGames] = useState<GameModel[] | null>(null)

    const readGames = (message: any) => {
        const messageParsed = JSON.parse(message);
        if (messageParsed.data == null) {
            return;
        }

        const gamesNum = (messageParsed.data.length);

        const gamesModels = [];
        for (let i = 0; i < gamesNum; i++) {

            const gameModel = {
                id: messageParsed.data[i].id,
                name: messageParsed.data[i].name,
                date: messageParsed.data[i].start_date,
                status: messageParsed.data[i].status,
                invitationCode: messageParsed.data[i].invitation_code,
                creatorId: messageParsed.data[i].creator_id
            }
            gamesModels.push(gameModel)
        }

        const newGames = games == null ? gamesModels : games.concat(gamesModels)

        function compare(a: GameModel, b: GameModel) {
            if (a.status && b.status && a.status > b.status) {
                return -1;
            }
            if (a.status && b.status && a.status < b.status) {
                return 1;
            }
            return 0;
        }
        newGames.sort(compare)
        setGames(newGames)
    }

    const getGames = async (type: string) => {
        try {
            var response;
            if (type == "created")
                response = await get('games/created/' + pageNum, token)
            else if (type == "all")
                response = await get('games/all/' + pageNum, token)
            response && readGames(response.text)
        }
        catch (error: any) {
            readServerError(error.response.text)
            console.log("error:", error)
        }
    }


    useEffect(() => {
        if (activeTab == "Мои")
            getGames("created")
        if (activeTab == "Участвую")
            getGames("all")

    }, [activeTab, pageNum]);



    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.tabs}>
                    {props.tabs.map(tab => {
                        const classname = cn(styles.tab, { [styles.activeTab]: (activeTab == tab.tabName) })
                        return (
                            <div className={classname} onClick={() => { setActiveTab(tab.tabName); setGames(null); setPageNum(0) }}>
                                {tab.tabName}
                            </div>
                        )
                    })}
                </div>
                <div className={styles.rectangle} />
            </div>
            <div className={styles.content}>
                <div>
                    {games == null || games.length == 0 ? (
                        <div className={styles.empty}>
                            Пока нет игр
                        </div>

                    ) : (
                        (games?.map(game =>
                            <div>
                                <Game savedGame={game} isCreator={props.userId == game.creatorId} />
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}