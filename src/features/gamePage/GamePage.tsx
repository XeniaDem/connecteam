import styles from "./GamePage.module.css"
import { useCallback, useEffect, useRef, useState } from "react";
import ellipse1 from "../../app/assets/ellipse1.svg"
import ellipse2 from "../../app/assets/ellipse2.svg"
import { selectToken } from "../../utils/authSlice";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { ChooseTopics } from "./screens/chooseTopics/ChooseTopics";
import { Player, PlayerModel } from "./components/player/Player";
import { WaitGame } from "./screens/waitGame/WaitGame";
import { StartGame } from "./screens/startGame/StartGame";
import { Rounds } from "./components/rounds/Rounds";
import { ChooseTopic } from "./screens/chooseTopic/ChooseTopic";

enum GameScreen {
    WaitGame = "wait",
    ChooseTopics = "chooseTopics",
    StartGame = "startGame",
    ChooseTopic = "chooseTopic"



}

export function GamePage() {
    const token = useSelector(selectToken)
    const [id, setId] = useState("")
    const [isCreator, setIsCreator] = useState(false)

    const { state } = useLocation();

    const [gameName, setGameName] = useState("")
    const [gameDate, setGameDate] = useState("")
    const [creatorId, setCreatorId] = useState("")

    const [players, setPlayers] = useState<PlayerModel[] | null>(null)

    const [roundsNum, setRoundsNum] = useState(5)
    const [currentRound, setCurrentRound] = useState(0)

    const [topicsIds, setTopicsIds] = useState<string[]>([])


    const [currentScreen, setCurrentScreen] = useState<GameScreen | null>(GameScreen.ChooseTopics)
    const webSocketRef = useRef<WebSocket | null>(null)



    const onGameStart = useCallback(() => {
        setCurrentScreen(GameScreen.ChooseTopic)




    }, [])

    const onTopicChoose = useCallback((messageObject: any) => {
        setRoundsNum(messageObject.target.rounds.length)
        const topicsIds = []
        for (let i = 0; i < messageObject.payload.length; i++) {
            topicsIds.push(messageObject.payload[i].id)
            
        }
        setTopicsIds(topicsIds)
        isCreator ? setCurrentScreen(GameScreen.StartGame) : null;

    }, [])

    const onGameJoin = useCallback((messageObject: any) => {
        const sender = messageObject.sender
        setId(sender.id)

        const targetGame = messageObject.target
        setGameName(targetGame.name)
        setGameDate(targetGame.date)
        setCreatorId(targetGame.creator_id)
        setIsCreator(id == creatorId)

        const playersNum = targetGame.users.length

        const playersModels = [];
        for (let i = 0; i < playersNum; i++) {

            const playerModel = {
                isCreator: targetGame.users[i].id == creatorId,
                isYou: targetGame.users[i].id == id,
                isAnswering: false,
                connected: true, ////////////////
                name: targetGame.users[i].name,
                photoUrl: "" ///////////////////

            }
            playersModels.push(playerModel)

        }
        setPlayers(playersModels)

        isCreator ? setCurrentScreen(GameScreen.ChooseTopics) : setCurrentScreen(GameScreen.WaitGame)


    }, [])

    useEffect(() => {
        const ws: WebSocket = new WebSocket('ws://localhost:8080/ws?token=' + token);
        webSocketRef.current = ws;

        ws.onopen = () => {
            console.log('Connected to server');
            joinGame()
        };

        ws.onmessage = (event: MessageEvent<any>) => {
            const message = event.data
            const messageObject = JSON.parse(message)
            if (messageObject.action == "join-game") {
                onGameJoin(messageObject)
            }
            if (messageObject.action == "select-topic") {
                onTopicChoose(messageObject)
            }
            if (messageObject.action == "start-game") {

            }
            if (messageObject.action == "error") {

            }
            console.log(`Received message from server: ${event.data}`);
        };

        ws.onclose = () => {
            console.log('Disconnected from server');
        };



    }, []);

    const joinGame = useCallback(() => {
        const message = JSON.stringify({
            action: "join-game",
            target: { "id": state.gameId },
            // sender: { "id": id }
        })
        webSocketRef.current?.send(message)

    }, [])

    const chooseTopics = useCallback((selected: string[]) => {
        const payload = []
        for (let i = 0; i < selected.length; i++) {
            payload.push({
                id: selected[i],
            })
        }
        const message = JSON.stringify({
            action: "select-topic",
            target: { "id": state.gameId },
            sender: { "id": id },
            payload: payload
        })
        alert(message)
        webSocketRef.current?.send(message)

    }, [])

    const startGame = useCallback(() => {

        const message = JSON.stringify({
            action: "start-game",
            target: { "id": state.gameId },
            // sender: { "id": id }
        })
        webSocketRef.current?.send(message)

    }, [])




    if (currentScreen == GameScreen.WaitGame) {
        return (
            <div className={styles.container}>
                <div className={styles.ellipse1}>
                    <img src={ellipse1} />
                </div>
                <div className={styles.ellipse2}>
                    <img src={ellipse2} />
                </div>
                {/* {gameName} && {gameDate} && <WaitGame /> */}
                <WaitGame />
            </div>
        )
    }
    if (currentScreen == GameScreen.ChooseTopics) {
        return (
            <div className={styles.container}>
                <div className={styles.ellipse1}>
                    <img src={ellipse1} />
                </div>
                <div className={styles.ellipse2}>
                    <img src={ellipse2} />
                </div>
                <ChooseTopics onButonClicked={chooseTopics} />
            </div>
        )
    }
    if (currentScreen == GameScreen.StartGame) {
        return (
            <div className={styles.container}>
                <div className={styles.ellipse1}>
                    <img src={ellipse1} />
                </div>
                <div className={styles.ellipse2}>
                    <img src={ellipse2} />
                </div>
                <div className={styles.players}>
                    <Player joined={false} />
                    {players?.map(player =>
                        <div>
                            <Player savedPlayer={player} />
                        </div>

                    )}

                </div>
                <StartGame name={gameName} date={gameDate} onButtonClicked={startGame} />
                <Rounds roundsNum={roundsNum} currentRound={currentRound} />
            </div>
        )
    }
    if (currentScreen == GameScreen.ChooseTopic) {
        return (
            <div className={styles.container}>
                <div className={styles.ellipse1}>
                    <img src={ellipse1} />
                </div>
                <div className={styles.ellipse2}>
                    <img src={ellipse2} />
                </div>
                <div className={styles.players}>
                    <Player joined={false} />
                    {players?.map(player =>
                        <div>
                            <Player savedPlayer={player} />
                        </div>

                    )}

                </div>
                <ChooseTopic isCreator = {isCreator}/>
                <Rounds roundsNum={roundsNum} currentRound={currentRound} />
            </div>
        )
    }
    return (
        null
    )

}