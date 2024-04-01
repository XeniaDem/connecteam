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
import { GameScreen, selectGame, setGame, setRounds, setStage, setTimer, updateCurrentScreen, updateGame, updateRounds } from "../../store/gameSlice";
import { store } from "../../store/store";
import { Button } from "../../components/button/Button";
import { GameError } from "./screens/gameError/GameError";
import { AnswerQuestion } from "./screens/answerQuestion/AnswerQuestion";
import { RateAnswer } from "./screens/rateAnswer/RateAnswer";
import { GameResults } from "../gameResults/GameResults";



export function GamePage() {

    const token = useSelector(selectToken)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const game = useSelector(selectGame)

    const { state } = useLocation();

    const [error, setError] = useState("")


    const [players, setPlayers] = useState<PlayerModel[] | null>(null)

    const [userLeftHidden, setUserLeftHidden] = useState(true);
    const showUserLeft = () => {
      setUserLeftHidden(false)
      setTimeout(() => {
        setUserLeftHidden(true);
      }, 3000);
  
    }


    const clearData = () => {
        dispatch(setGame({ name: "", date: "", id: "", creatorId: "", userId: "" }))
        dispatch(updateGame({ gameStarted: false }))
        dispatch(updateCurrentScreen({ currentScreen: GameScreen.WaitGame }))
        dispatch(setRounds({ topics: "", roundsNum: 0 }))
        dispatch(updateRounds({ currentRound: 0 }))
        dispatch(setStage({ userAnswering: "", userAnsweringId: "", question: "", stageStarted: false }))
        dispatch(setTimer({ timerStarted: false }))

    }

    const webSocketRef = useRef<WebSocket | null>(null)



    const onUserLeft = useCallback((messageObject: any) => {
        showUserLeft()
        updatePlayers(messageObject)
    }, [])

    const onGameFinish = useCallback(() => {
        dispatch(updateCurrentScreen({ currentScreen: GameScreen.GameResults }))
    }, [])

    const onRoundFinish = useCallback(() => {
        dispatch(updateCurrentScreen({ currentScreen: GameScreen.ChooseTopic }))
    }, [])

    const onRatingFinish = useCallback(() => {

        dispatch(setStage({ userAnswering: "", userAnsweringId: "", question: "", stageStarted: false }))
        startStage()

    }, [])

    const onAnswerFinish = useCallback(() => {
        dispatch(updateCurrentScreen({ currentScreen: GameScreen.RateAnswer }))

    }, [])
    const onAnswerStart = useCallback(() => {

        const game = store.getState().game

        dispatch(setStage({ userAnswering: game.userAnswering, userAnsweringId: game.userAnsweringId, question: game.question, stageStarted: true }))
    }, [])

    const onStageStart = useCallback((messageObject: any) => {
        const payload = messageObject.payload
        const topics = JSON.stringify(messageObject.target.topics)
        const game = store.getState().game


        dispatch(setStage({ userAnswering: payload.user.name, userAnsweringId: payload.user.id, question: payload.question, stageStarted: false }))
        dispatch(setRounds({ topics: topics, roundsNum: game.roundsNum }))
        updatePlayers(messageObject)
        dispatch(updateCurrentScreen({ currentScreen: GameScreen.AnswerQuestion }))
    }, [])

    const onRoundStart = useCallback(() => {
        const game = store.getState().game
        dispatch(updateRounds({ currentRound: game.currentRound + 1 })) ///////////
        startStage()

    }, [])

    const onGameStart = useCallback(() => {
        dispatch(updateCurrentScreen({ currentScreen: GameScreen.ChooseTopic }))
        dispatch(updateGame({ gameStarted: true }))
    }, [])

    const onTopicsChoose = useCallback((messageObject: any) => {
        const sender = messageObject.sender
        const senderId = sender.id

        const topics = JSON.stringify(messageObject.target.topics)

        dispatch(setRounds({ topics: topics, roundsNum: messageObject.target.topics.length }))

        const game = store.getState().game
        const id = game.userId

        if (id == senderId) {
            dispatch(updateCurrentScreen({ currentScreen: GameScreen.StartGame }))
        }

    }, [])



    const onMyGameJoin = useCallback((messageObject: any) => {
        console.log("my join")

        const sender = messageObject.sender
        const senderId = sender.id
        const targetGame = messageObject.target
        const game = store.getState().game

        const currentScreen = game.currentScreen != GameScreen.WaitGame ? game.currentScreen : (sender.id == targetGame.creator_id ? GameScreen.ChooseTopics : GameScreen.WaitGame)

        dispatch(setGame({ name: targetGame.name, date: targetGame.date, id: state.gameId, creatorId: targetGame.creator_id, userId: senderId }))
        dispatch(updateCurrentScreen({ currentScreen: currentScreen }))


        updatePlayers(messageObject)



    }, [])


    const onUserGameJoin = useCallback((messageObject: any) => {
        console.log("user join")
        updatePlayers(messageObject)

    }, [])


    const updatePlayers = (messageObject: any) => {
        const targetGame = messageObject.target
        const playersNum = targetGame.users.length
        const playersModels = [];

        const game = store.getState().game
        const creatorId = game.creatorId
        const id = game.userId
        const userAnsweringId = game.userAnsweringId

        for (let i = 0; i < playersNum; i++) {

            const playerModel = {
                id: targetGame.users[i].id,
                isCreator: targetGame.users[i].id == creatorId,
                isYou: targetGame.users[i].id == id,
                isAnswering: targetGame.users[i].id == userAnsweringId,
                connected: true, ////////////////
                name: targetGame.users[i].name,
                photoUrl: "" ///////////////////
            }
            playersModels.push(playerModel)
        }
        setPlayers(playersModels)
    }

    useEffect(() => {
        if (state == null) { /////////////////
            navigate("/user_page")
            return;
        }
        if (game.id != "" && game.id != state.gameId) {
            console.log("clear")
            clearData()
        }


        const ws: WebSocket = new WebSocket('ws://localhost:8080/ws?token=' + token);
        webSocketRef.current = ws;

        ws.onopen = () => {
            console.log('Connected to server');
            ws.OPEN && joinGame()
        };

        ws.onmessage = (event: MessageEvent<any>) => {
            const messageComing = event.data
            const message = messageComing.split("\n")[0]; //////////////
            if (messageComing.split("\n")[1] != undefined) {
                alert(messageComing.split("\n")[1])
            }
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
                onGameStart()
            }
            if (messageObject.action == "start-round") {
                onRoundStart()
            }
            if (messageObject.action == "start-stage") {
                onStageStart(messageObject)
            }
            if (messageObject.action == "start-answer") {
                onAnswerStart()
            }
            if (messageObject.action == "end-answer") {
                onAnswerFinish()
            }
            if (messageObject.action == "rate-end") {
                onRatingFinish()
            }
            if (messageObject.action == "round-end") {
                onRoundFinish()
            }
            if (messageObject.action == "game-end") {
                onGameFinish()
            }
            if (messageObject.action == "user-left") {
                onUserLeft(messageObject)
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
        })
        webSocketRef.current?.send(message)
        console.log("sent " + message)

    }, [])

    const chooseTopics = useCallback((selected: string[]) => {
        const currentGame = store.getState().game
        const payload = []
        for (let i = 0; i < selected.length; i++) {
            payload.push({
                id: selected[i],
            })
        }
        const message = JSON.stringify({
            action: "select-topic",
            target: { "id": state.gameId },
            sender: { "id": Number.parseInt(currentGame.userId) },
            payload: payload
        })
        webSocketRef.current?.send(message)
        console.log("sent " + message)

    }, [])

    const startGame = useCallback(() => {
        const currentGame = store.getState().game
        const message = JSON.stringify({
            action: "start-game",
            target: { "id": state.gameId },
            sender: { "id": Number.parseInt(currentGame.userId) },
        })
        webSocketRef.current?.send(message)
        console.log("sent " + message)

    }, [])
    const startRound = useCallback((selected: string) => {
        const currentGame = store.getState().game
        const message = JSON.stringify({
            action: "start-round",
            target: { "id": state.gameId },
            sender: { "id": Number.parseInt(currentGame.userId) },
            payload: { "id": selected }

        })
        webSocketRef.current?.send(message)
        console.log("sent " + message)

    }, [])

    const startStage = useCallback(() => {
        const currentGame = store.getState().game
        const message = JSON.stringify({
            action: "start-stage",
            target: { "id": state.gameId },
            sender: { "id": Number.parseInt(currentGame.userId) },

        })
        webSocketRef.current?.send(message)
        console.log("sent " + message)

    }, [])

    const startAnswer = useCallback(() => {
        const currentGame = store.getState().game
        const message = JSON.stringify({
            action: "start-answer",
            target: { "id": state.gameId },
            sender: { "id": Number.parseInt(currentGame.userId) },
        })
        webSocketRef.current?.send(message)
        console.log("sent " + message)

    }, [])
    const finishAnswer = useCallback(() => {
        const currentGame = store.getState().game
        const message = JSON.stringify({
            action: "end-answer",
            target: { "id": state.gameId },
            sender: { "id": Number.parseInt(currentGame.userId) },
        })
        webSocketRef.current?.send(message)
        console.log("sent " + message)

    }, [])

    const rateAnswer = useCallback((rating: number) => {
        const currentGame = store.getState().game
        const message = JSON.stringify({
            action: "rate-user",
            target: { "id": state.gameId },
            sender: { "id": Number.parseInt(currentGame.userId) },
            payload: { "user_id": Number.parseInt(currentGame.userAnsweringId), "value": rating }
        })
        webSocketRef.current?.send(message)
        console.log("sent " + message)

    }, [])

    const leaveGame = useCallback(() => {
        const currentGame = store.getState().game
        const message = JSON.stringify({
            action: "leave-game",
            target: { "id": state.gameId },
            sender: { "id": Number.parseInt(currentGame.userId) },
        })
        webSocketRef.current?.send(message)
        console.log("sent " + message)

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
                        leaveGame()
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
                        leaveGame()
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
                        leaveGame()
                        clearData()
                        navigate("/user_page")
                    }} className={styles.exitButton} />
                </div>
                <div className={styles.players}>
                    {!game.gameStarted && <Player joined={false} gameId={state.gameId} />}
                    {players?.map(player =>
                        <div>
                            <Player savedPlayer={player} joined={true} />
                        </div>
                    )}
                </div>
                {!userLeftHidden && <div className={styles.errorMessage}>
                    Пользователь покинул игру
                </div>}
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
                        leaveGame()
                        clearData()
                        navigate("/user_page")
                    }} className={styles.exitButton} />
                </div>
                <div className={styles.players}>
                    {!game.gameStarted && <Player joined={false} gameId={state.gameId} />}
                    {players?.map(player =>
                        <div>
                            <Player savedPlayer={player} joined={true} />
                        </div>
                    )}
                </div>
                {!userLeftHidden && <div className={styles.errorMessage}>
                    Пользователь покинул игру
                </div>}
                <ChooseTopic isCreator={game.creatorId == game.userId} topics={game.topics} onButonClicked={startRound} />
                <Rounds roundsNum={game.roundsNum} currentRound={game.currentRound} />
            </div>
        )
    }
    if (game.currentScreen == GameScreen.AnswerQuestion) {
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
                        leaveGame()
                        clearData()
                        navigate("/user_page")
                    }} className={styles.exitButton} />
                </div>
                <div className={styles.players}>
                    {!game.gameStarted && <Player joined={false} gameId={state.gameId} />}
                    {players?.map(player =>
                        <div>
                            <Player savedPlayer={player} joined={true} />
                        </div>
                    )}
                </div>
                {!userLeftHidden && <div className={styles.errorMessage}>
                    Пользователь покинул игру
                </div>}
                <AnswerQuestion isCreator={game.creatorId == game.userId} isAnswering={game.userAnsweringId == game.userId}
                    nameAnswering={game.userAnswering} question={game.question} started={game.stageStarted} onStartButonClicked={startAnswer} onFinishButonClicked={finishAnswer} />
                <Rounds roundsNum={game.roundsNum} currentRound={game.currentRound} />
            </div>
        )
    }
    if (game.currentScreen == GameScreen.RateAnswer) {
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
                        leaveGame()
                        clearData()
                        navigate("/user_page")
                    }} className={styles.exitButton} />
                </div>
                <div className={styles.players}>
                    {!game.gameStarted && <Player joined={false} gameId={state.gameId} />}
                    {players?.map(player =>
                        <div>
                            <Player savedPlayer={player} joined={true} />
                        </div>
                    )}
                </div>
                {!userLeftHidden && <div className={styles.errorMessage}>
                    Пользователь покинул игру
                </div>}
                <RateAnswer isCreator={game.creatorId == game.userId} isAnswering={game.userAnsweringId == game.userId}
                    nameAnswering={game.userAnswering} question={game.question} onButonClicked={rateAnswer} />
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
                        leaveGame()
                        clearData()
                        navigate("/user_page")
                    }} className={styles.exitButton} />
                </div>
                <GameError error={error} clearData={clearData} />
            </div>
        )
    }
    if (game.currentScreen == GameScreen.GameResults) {
        return (
            players && <GameResults name={game.name} date={game.date} isCreator={game.creatorId == game.userId} players={players} onButtonClicked={() => {
                leaveGame()
                clearData()
                navigate("/user_page")
            }} />

        )
    }
    return (
        null
    )

}