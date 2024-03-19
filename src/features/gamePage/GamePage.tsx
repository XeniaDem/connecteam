import { useCallback, useEffect, useRef, useState } from "react";
import { WaitGame } from "./waitGame/WaitGame";
import { selectId, selectToken } from "../../utils/authSlice";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { ChooseTopics } from "./startGame/chooseTopics/ChooseTopics";

enum GameScreen {
    WaitGame = "wait",
    ChooseTopics = "chooseTopics"


}

export function GamePage() {
    const token = useSelector(selectToken)
    const id = useSelector(selectId)

    const { state } = useLocation();
    const { isCreator } = state.isCreator || {};

    const[gameName, setGameName] = useState("")
    const[gameDate, setGameDate] = useState("")





    const [currentScreen, setSurrentScreen] = useState(state.isCreator ? GameScreen.ChooseTopics : GameScreen.WaitGame)
    const webSocketRef = useRef<WebSocket | null>(null)


    const onGameStart = useCallback(() => {



    }, [])

    const onGameJoin = useCallback((messageObject: any) => {

        const targetGame = messageObject.target
        setGameName(targetGame.name)
        setGameDate(targetGame.date)



    }, [])

    useEffect(() => {
        const ws: WebSocket = new WebSocket('ws://localhost:8080/ws?token=' + token);
        webSocketRef.current = ws;

        ws.onopen = () => {
            console.log('Connected to server');

            ws.send('Hello, server!');
        };

        ws.onmessage = (event: MessageEvent<any>) => {
            const message = event.data
            const messageObject = JSON.parse(message)
            if (messageObject.action == "join-game") {
                onGameJoin(messageObject)
            


            }
            if (messageObject.action == "start-game") {
                
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
            target: { "id": id },
            sender: { "id": id }
        })
        webSocketRef.current?.send(message)

    }, [])




    if (currentScreen == GameScreen.WaitGame) {
        return (
            gameName && gameDate && <WaitGame />
        )
    }
    if (currentScreen == GameScreen.ChooseTopics) {
        return (
            <ChooseTopics />
        )
    }
    return (
        null
    )

}