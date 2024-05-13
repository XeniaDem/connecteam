import styles from "./GamePage.module.css"
import { JSXElementConstructor, ReactNode, useCallback, useEffect, useRef, useState } from "react";
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
import { Audio } from "./components/audio/Audio";
import { useParams } from "react-router-dom";



interface CommonGameScreenElementsProps {
    gameStarted: boolean;
    children: ReactNode

};



export function GamePage() {

    const token = useSelector(selectToken)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const game = useSelector(selectGame)

    let { gameId } = useParams();

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
        dispatch(setStage({ userAnswering: "", userAnsweringId: "", question: "" }))
        dispatch(setTimer({ timerStarted: false, timeStart: "" }))

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

        dispatch(setStage({ userAnswering: "", userAnsweringId: "", question: "" }))
        startStage()

    }, [])

    const onAnswerFinish = useCallback(() => {
        dispatch(setTimer({ timerStarted: false, timeStart: "" }))
        dispatch(updateCurrentScreen({ currentScreen: GameScreen.RateAnswer }))

    }, [])
    const onAnswerStart = useCallback((messageObject: any) => {

        // dispatch(setStage({ userAnswering: game.userAnswering, userAnsweringId: game.userAnsweringId, question: game.question, stageStarted: true}))
        dispatch(setTimer({ timerStarted: true, timeStart: messageObject.time }))
    }, [])

    const onStageStart = useCallback((messageObject: any) => {
        const payload = messageObject.payload
        const topics = JSON.stringify(messageObject.target.topics)
        const game = store.getState().game


        dispatch(setStage({ userAnswering: payload.user.name, userAnsweringId: payload.user.id, question: payload.question }))
        // dispatch(setRounds({ topics: topics, roundsNum: game.roundsNum })) ////
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

        // const topics = JSON.stringify(messageObject.payload.topics)

        // dispatch(setRounds({ topics: topics, roundsNum: messageObject.target.topics.length }))

        const game = store.getState().game
        const id = game.userId

        if (id == senderId) {
            dispatch(updateCurrentScreen({ currentScreen: GameScreen.StartGame }))
        }

    }, [])



    const onMyGameJoin = useCallback((messageObject: any) => {

        const sender = messageObject.sender
        const senderId = sender.id
        const payload = messageObject.payload
        const game = store.getState().game

        const currentScreen = game.currentScreen != GameScreen.WaitGame ? game.currentScreen : (sender.id == payload.creator_id ? GameScreen.ChooseTopics : GameScreen.WaitGame)

        gameId && dispatch(setGame({ name: payload.name, date: payload.date, id: gameId, creatorId: payload.creator_id, userId: senderId }))
        dispatch(updateCurrentScreen({ currentScreen: currentScreen }))


        updatePlayers(messageObject)



    }, [])


    const onUserGameJoin = useCallback((messageObject: any) => {
        updatePlayers(messageObject)

    }, [])


    const updatePlayers = (messageObject: any) => {
        const payload = messageObject.payload
        if (!payload.users) {
            setPlayers(null)
            return;
        }
        const playersNum = payload.users.length
        const playersModels = [];

        const game = store.getState().game
        const creatorId = game.creatorId
        const id = game.userId
        const userAnsweringId = game.userAnsweringId

        for (let i = 0; i < playersNum; i++) {

            const playerModel = {
                id: payload.users[i].id,
                isCreator: payload.users[i].id == creatorId,
                isYou: payload.users[i].id == id,
                isAnswering: payload.users[i].id == userAnsweringId,
                connected: true, ////////////////
                name: payload.users[i].name,
                photoUrl: "" ///////////////////
            }
            playersModels.push(playerModel)
        }
        setPlayers(playersModels)
    }

    useEffect(() => {

        if (!gameId) { /////////////////
            navigate("/user_page")
            return;
        }
        if (game.id != "" && game.id != gameId) {
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
                // alert(messageComing.split("\n")[1])
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
                onAnswerStart(messageObject)
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
                if (messageObject.payload.message.includes("max number")) {
                    setError("Превышен лимит участников игры")
                    dispatch(updateCurrentScreen({ currentScreen: GameScreen.GameError }))
                }
                if (messageObject.payload.message.includes("game in progress")) {
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
            target: gameId
        })
        webSocketRef.current?.send(message)
        console.log("sent " + message)

    }, [])

    const chooseTopics = useCallback((selected?: string[]) => {
        const currentGame = store.getState().game
        var message;
        if (selected) {
            const payload = []
            for (let i = 0; i < selected.length; i++) {
                payload.push({
                    id: selected[i],
                })
            }
            message = JSON.stringify({
                action: "select-topic",
                target: gameId,
                sender: { "id": currentGame.userId },
                payload: payload
            })
        } else {
            message = JSON.stringify({
                action: "select-topic",
                target: gameId,
                sender: { "id": currentGame.userId },
            })
        }
        webSocketRef.current?.send(message)
        console.log("sent " + message)

    }, [])

    const startGame = useCallback(() => {
        const currentGame = store.getState().game
        const message = JSON.stringify({
            action: "start-game",
            target: gameId,
            sender: { "id": currentGame.userId },
        })
        webSocketRef.current?.send(message)
        console.log("sent " + message)

    }, [])
    const startRound = useCallback((selected: string) => {
        const currentGame = store.getState().game
        const message = JSON.stringify({
            action: "start-round",
            target: gameId,
            sender: { "id": currentGame.userId },
            payload: { "id": selected }

        })
        webSocketRef.current?.send(message)
        console.log("sent " + message)

    }, [])

    const startStage = useCallback(() => {
        const currentGame = store.getState().game
        const message = JSON.stringify({
            action: "start-stage",
            target: gameId,
            sender: { "id": currentGame.userId },

        })
        webSocketRef.current?.send(message)
        console.log("sent " + message)

    }, [])

    const startAnswer = useCallback(() => {
        const currentGame = store.getState().game
        const message = JSON.stringify({
            action: "start-answer",
            target: gameId,
            sender: { "id": currentGame.userId },
        })
        webSocketRef.current?.send(message)
        console.log("sent " + message)

    }, [])
    const finishAnswer = useCallback(() => {
        const currentGame = store.getState().game
        const message = JSON.stringify({
            action: "end-answer",
            target: gameId,
            sender: { "id": currentGame.userId },
        })
        webSocketRef.current?.send(message)
        console.log("sent " + message)

    }, [])

    const rateAnswer = useCallback((rating: number) => {
        const currentGame = store.getState().game
        const message = JSON.stringify({
            action: "rate-user",
            target: gameId,
            sender: { "id": currentGame.userId },
            payload: { "user_id": currentGame.userAnsweringId, "value": rating }
        })
        webSocketRef.current?.send(message)
        console.log("sent " + message)

    }, [])

    const leaveGame = useCallback(() => {
        const currentGame = store.getState().game
        const message = JSON.stringify({
            action: "leave-game",
            target: gameId,
            sender: { "id": currentGame.userId },
        })
        webSocketRef.current?.send(message)
        console.log("sent " + message)

    }, [])




    const CommonGameScreenElements: React.FC<CommonGameScreenElementsProps> = ({
        gameStarted,
        children, // children передается автоматически через пропс children
    }) => (
        <div>
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

            {gameStarted ?
                <div>
                    <div className={styles.players}>
                        {/* {!game.gameStarted && <Player joined={false} gameId={gameId} />} */}

                        {players?.map(player =>
                            <div>
                                <Player savedPlayer={player} joined={true} />
                            </div>
                        )}
                    </div>
                    {!userLeftHidden && <div className={styles.errorMessage}>
                        Пользователь покинул игру
                    </div>}

                    {children}
                    <div className={styles.audio}>
                        <Audio />
                    </div>
                    <Rounds roundsNum={game.roundsNum} currentRound={game.currentRound} />
                </div>
                :
                <div>
                    {children}
                    <div className={styles.audio}>
                        <Audio />
                    </div>
                </div>
            }
        </div>
    );


    if (game.currentScreen == GameScreen.WaitGame) {
        return (
            <div className={styles.container}>
                <CommonGameScreenElements gameStarted={false} children={<WaitGame name={game.name} date={game.date} />} />
            </div>
        )
    }
    if (game.currentScreen == GameScreen.ChooseTopics) {
        return (
            <div className={styles.container}>
                <CommonGameScreenElements gameStarted={false} children={<ChooseTopics onButonClicked={chooseTopics} />} />
            </div>
        )
    }
    if (game.currentScreen == GameScreen.StartGame) {
        return (
            <div className={styles.container}>
                <CommonGameScreenElements gameStarted={true} children
                    ={<StartGame name={game.name} date={game.date} id ={gameId} onButtonClicked={startGame} />} />
            </div>
        )
    }
    if (game.currentScreen == GameScreen.ChooseTopic) {
        return (
            <div className={styles.container}>
                <CommonGameScreenElements gameStarted={true} children
                    ={<ChooseTopic isCreator={game.creatorId == game.userId} topics={game.topics} onButonClicked={startRound} />} />
            </div>
        )
    }
    if (game.currentScreen == GameScreen.AnswerQuestion) {
        return (
            <div className={styles.container}>
                <CommonGameScreenElements gameStarted={true} children
                    ={<AnswerQuestion isCreator={game.creatorId == game.userId} isAnswering={game.userAnsweringId == game.userId}
                        nameAnswering={game.userAnswering} question={game.question} started={game.timerStarted}
                        onStartButonClicked={startAnswer} onFinishButonClicked={finishAnswer} />} />
            </div>
        )
    }
    if (game.currentScreen == GameScreen.RateAnswer) {
        return (
            <div className={styles.container}>
                <CommonGameScreenElements gameStarted={true} children
                    ={<RateAnswer isCreator={game.creatorId == game.userId} isAnswering={game.userAnsweringId == game.userId}
                        nameAnswering={game.userAnswering} question={game.question} onButonClicked={rateAnswer} />} />
            </div>
        )
    }
    if (game.currentScreen == GameScreen.GameError) {
        return (
            <div className={styles.container}>
                <CommonGameScreenElements gameStarted={false} children={<GameError error={error} clearData={clearData} />} />
            </div>
        )
    }
    if (game.currentScreen == GameScreen.GameResults) {
        return (
            players && <GameResults gameId={game.id} onButtonClicked={() => {
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