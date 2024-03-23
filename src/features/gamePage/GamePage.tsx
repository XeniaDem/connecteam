import styles from "./GamePage.module.css"
import { useCallback, useEffect, useRef, useState } from "react";
import ellipse1 from "../../app/assets/ellipse1.svg"
import ellipse2 from "../../app/assets/ellipse2.svg"
import { selectToken } from "../../store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { ChooseTopics } from "./screens/chooseTopics/ChooseTopics";
import { Player, PlayerModel } from "./components/player/Player";
import { WaitGame } from "./screens/waitGame/WaitGame";
import { StartGame } from "./screens/startGame/StartGame";
import { Rounds } from "./components/rounds/Rounds";
import { ChooseTopic } from "./screens/chooseTopic/ChooseTopic";
import { GameScreen, selectGame, setGame, setRounds, updateCurrentScreen, updateRounds } from "../../store/gameSlice";
import { store } from "../../store/store";
import { Button } from "../../components/button/Button";
import { GameError } from "./screens/gameError/GameError";



export function GamePage() {

    const token = useSelector(selectToken)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const game = useSelector(selectGame)

    const { state } = useLocation();

    const [error, setError] = useState("")


    const [players, setPlayers] = useState<PlayerModel[] | null>(null)


    const clearData = () => {
        dispatch(setGame({ name: "", date: "", creatorId: "", id: "" }))
        dispatch(updateCurrentScreen({ currentScreen: GameScreen.WaitGame }))
        dispatch(setRounds({ topics: "", roundsNum: 0 }))
        dispatch(updateRounds({ currentRound: 0 }))

    }

    const webSocketRef = useRef<WebSocket | null>(null)



    const onGameStart = useCallback((messageObject: any) => {
        // setCurrentScreen(GameScreen.ChooseTopic)
        // const sender = messageObject.sender
        // const senderId = sender.id
        // const game = store.getState().game
        // const id = game.userId

        dispatch(updateCurrentScreen({ currentScreen: GameScreen.ChooseTopic }))







    }, [])

    const onTopicsChoose = useCallback((messageObject: any) => {
        const sender = messageObject.sender
        const senderId = sender.id

        const topics = messageObject.target.topics

        dispatch(setRounds({ topics: topics, roundsNum: topics.length }))


        const game = store.getState().game
        const id = game.userId



        if (id == senderId) {
            dispatch(updateCurrentScreen({ currentScreen: GameScreen.StartGame }))


        }

    }, [])

    const updatePlayers = useCallback((messageObject: any) => {
        const targetGame = messageObject.target
        const playersNum = targetGame.users.length
        const playersModels = [];

        const game = store.getState().game
        const creatorId = game.creatorId
        const id = game.userId

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
    }, [])



    const onMyGameJoin = useCallback((messageObject: any) => {
        console.log("my join")

        const sender = messageObject.sender
        const senderId = sender.id
        const targetGame = messageObject.target
        const game = store.getState().game

        const currentScreen = game.currentScreen != GameScreen.WaitGame ? game.currentScreen : (sender.id == targetGame.creator_id ? GameScreen.ChooseTopics : GameScreen.WaitGame)

        dispatch(setGame({ name: targetGame.name, date: targetGame.date, creatorId: targetGame.creator_id, id: senderId }))
        dispatch(updateCurrentScreen({ currentScreen: currentScreen }))


        updatePlayers(messageObject)



    }, [])


    const onUserGameJoin = useCallback((messageObject: any) => {
        console.log("user join")
        updatePlayers(messageObject)

    }, [])

    useEffect(() => {


        const ws: WebSocket = new WebSocket('ws://localhost:8080/ws?token=' + token);
        webSocketRef.current = ws;

        ws.onopen = () => {
            console.log('Connected to server');
            ws.OPEN && joinGame()
        };

        ws.onmessage = (event: MessageEvent<any>) => {
            const message = event.data
            alert(message)
            const messageObject = message && JSON.parse(message)
            console.log(`Received message from server: ${event.data}`);
            if (messageObject.action == "join-success") {
                onMyGameJoin(messageObject)
            }
            if (messageObject.action == "join-game") {
                onUserGameJoin(messageObject)
            }
            if (messageObject.action == "select-topic") {
                onTopicsChoose(messageObject)
            }
            if (messageObject.action == "start-game") {
                onGameStart(messageObject)
            }
            if (messageObject.action == "error") {
                if (messageObject.payload.includes("maximum number")) {
                    setError("Превышен лимит участников игры")
                    dispatch(updateCurrentScreen({ currentScreen: GameScreen.GameError }))
                }
                if (messageObject.payload.includes("game in progress")) {
                    setError("Игра уже начата")
                    dispatch(updateCurrentScreen({ currentScreen: GameScreen.GameError }))
                }

            }

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
            sender: { "id": Number.parseInt(game.userId) },
            payload: payload
        })
        webSocketRef.current?.send(message)

    }, [])

    const startGame = useCallback(() => {

        const message = JSON.stringify({
            action: "start-game",
            target: { "id": state.gameId },
            sender: { "id": Number.parseInt(game.userId) },
        })
        webSocketRef.current?.send(message)

    }, [])
    const startRound = useCallback((selected: string) => {

        const message = JSON.stringify({
            action: "start-round",
            target: { "id": state.gameId },
            sender: { "id": Number.parseInt(game.userId) },
            payload: { "id": selected }

        })
        webSocketRef.current?.send(message)

    }, [])




    if (game.currentScreen == GameScreen.WaitGame) {
        return (
            <div className={styles.container}>
                <div className={styles.ellipse1}>
                    <img src={ellipse1} />
                </div>
                <div className={styles.ellipse2}>
                    <img src={ellipse2} />
                </div>
                <div className={styles.exit}>
                    <Button text={""} onClick={() => {
                        clearData()
                        navigate("/user_page")
                    }} className={styles.exitButton} />
                </div>
                <WaitGame name={game.name} date={game.date} />
            </div>
        )
    }
    if (game.currentScreen == GameScreen.ChooseTopics) {
        return (
            <div className={styles.container}>
                <div className={styles.ellipse1}>
                    <img src={ellipse1} />
                </div>
                <div className={styles.ellipse2}>
                    <img src={ellipse2} />
                </div>
                <div className={styles.exit}>
                    <Button text={""} onClick={() => {
                        clearData()
                        navigate("/user_page")

                    }} className={styles.exitButton} />
                </div>
                <ChooseTopics onButonClicked={chooseTopics} />
            </div>
        )
    }
    if (game.currentScreen == GameScreen.StartGame) {
        return (
            <div className={styles.container}>
                <div className={styles.ellipse1}>
                    <img src={ellipse1} />
                </div>
                <div className={styles.ellipse2}>
                    <img src={ellipse2} />
                </div>
                <div className={styles.exit}>
                    <Button text={""} onClick={() => {
                        clearData()
                        navigate("/user_page")
                    }} className={styles.exitButton} />
                </div>
                <div className={styles.players}>
                    <Player joined={false} gameId={state.gameId} />
                    {players?.map(player =>
                        <div>
                            <Player savedPlayer={player} joined={true} />
                        </div>

                    )}

                </div>
                <StartGame name={game.name} date={game.date} onButtonClicked={startGame} />
                <Rounds roundsNum={game.roundsNum} currentRound={game.currentRound} />
            </div>
        )
    }
    if (game.currentScreen == GameScreen.ChooseTopic) {
        return (
            <div className={styles.container}>
                <div className={styles.ellipse1}>
                    <img src={ellipse1} />
                </div>
                <div className={styles.ellipse2}>
                    <img src={ellipse2} />
                </div>
                <div className={styles.exit}>
                    <Button text={""} onClick={() => {
                        clearData()
                        navigate("/user_page")
                    }} className={styles.exitButton} />
                </div>
                <div className={styles.players}>
                    <Player joined={false} gameId={state.gameId} />
                    {players?.map(player =>
                        <div>
                            <Player savedPlayer={player} joined={true} />
                        </div>

                    )}

                </div>
                {game.topics && <ChooseTopic isCreator={game.creatorId == game.userId} topics={game.topics} onButonClicked={startRound} />}
                <Rounds roundsNum={game.roundsNum} currentRound={game.currentRound} />
            </div>
        )
    }
    if (game.currentScreen == GameScreen.GameError) {
        return (
            <div className={styles.container}>
                <div className={styles.ellipse1}>
                    <img src={ellipse1} />
                </div>
                <div className={styles.ellipse2}>
                    <img src={ellipse2} />
                </div>
                <div className={styles.exit}>
                    <Button text={""} onClick={() => {
                        clearData()
                        navigate("/user_page")
                    }} className={styles.exitButton} />
                </div>
                <GameError error={error} clearData={clearData} />
            </div>
        )
    }
    return (
        null
    )

}