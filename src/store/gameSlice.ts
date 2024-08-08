import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState} from "./store"

export enum GameScreen {
  WaitGame = "wait",
  ChooseTopics = "chooseTopics",
  StartGame = "startGame",
  ChooseTopic = "chooseTopic",
  GameError = "gameError",
  AnswerQuestion = "answerQuestion",
  RateAnswer = "rateAnswer",
  GameResults = "gameResults"
}

export interface GameState {
  name: string; // Название игры
  date: string; // Дата и время игры
  gameId: string; // ID игры
  creatorId: string; // ID создателя игры
  playerId: string; // ID игрока
  playerName: string; // Имя игрока

  gameStarted: boolean; // Булевое значение, указывающее началась ли игра
  meetingJwt: string; // Токен для подключения к аудиочату
  meetingNumber: string; 
  meetingPasscode: string;

  currentScreen: GameScreen; // Текущий экран игры

  topics: string; // Темы игры
  roundsNum: number; // Количество раундов игры
  currentRound: number; // Значение текущего раунда

  playerAnswering: string; // Имя отвечающего игрока
  playerAnsweringId: string; // ID отвечающего игрока
  question: string; // Текущий вопрос
  tags: string; // Теги текущего вопроса

  timerStarted: boolean; // Булевое значение, указывающее запущен ли таймер
  timeStart: string; // Время последнего запуска таймера

  results: string;
}


const initialState: GameState = {
  name: localStorage.getItem("name") || "",
  date: localStorage.getItem("date") || "",
  gameId: localStorage.getItem("gameId") || "",
  creatorId: localStorage.getItem("creatorId") || "",
  playerId: localStorage.getItem("playerId") || "",
  playerName: localStorage.getItem("playerName") || "",

  gameStarted: localStorage.getItem("gameStarted") == "true" || false,
  meetingJwt: localStorage.getItem("meetingJwt") || "",
  meetingNumber: localStorage.getItem("meetingNumber") || "",
  meetingPasscode: localStorage.getItem("meetingPasscode") || "",

  currentScreen: localStorage.getItem("currentScreen") as GameScreen || GameScreen.WaitGame,

  topics: localStorage.getItem("topics") || "",
  roundsNum: Number.parseInt(localStorage.getItem("roundsNum") || "") || 0,
  currentRound: Number.parseInt(localStorage.getItem("currentRound") || "") || 0,

  playerAnswering: localStorage.getItem("playerAnswering") || "",
  playerAnsweringId: localStorage.getItem("playerAnsweringId") || "",
  question: localStorage.getItem("question") || "",
  tags: localStorage.getItem("tags") || "",
  // stageStarted: localStorage.getItem("stageStarted") == "true" || false,


  timerStarted: localStorage.getItem("timerStarted") == "true" || false,
  timeStart: localStorage.getItem("timeStart") || "",

  results: localStorage.getItem("results") || ""



}

export const gameSlice = createSlice({
  name: "game",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setGame: (state, action: PayloadAction<{name: string, date: string, gameId: string, creatorId: string, playerId: string, playerName: string}>) => {
      state.name = action.payload.name
      state.date = action.payload.date
      state.gameId = action.payload.gameId
      state.creatorId = action.payload.creatorId
      state.playerId = action.payload.playerId
      state.playerName = action.payload.playerName

      localStorage.setItem("name", action.payload.name)
      localStorage.setItem("date", action.payload.date)
      localStorage.setItem("gameId", action.payload.gameId)
      localStorage.setItem("creatorId", action.payload.creatorId)
      localStorage.setItem("playerId", action.payload.playerId)
      localStorage.setItem("playerName", action.payload.playerName)
    },
    updateGame: (state, action: PayloadAction<{gameStarted: boolean, meetingJwt: string, meetingNumber: string, meetingPasscode: string;}>) => {
      state.gameStarted = action.payload.gameStarted
      state.meetingJwt = action.payload.meetingJwt
      state.meetingNumber = action.payload.meetingNumber
      state.meetingPasscode = action.payload.meetingPasscode

      localStorage.setItem("gameStarted", action.payload.gameStarted.toString())
      localStorage.setItem("meetingJwt", action.payload.meetingJwt)
      localStorage.setItem("meetingNumber", action.payload.meetingNumber)
      localStorage.setItem("meetingPasscode", action.payload.meetingPasscode)

    },

    updateCurrentScreen: (state, action: PayloadAction<{currentScreen: GameScreen}>) => {
      state.currentScreen = action.payload.currentScreen
      localStorage.setItem("currentScreen", action.payload.currentScreen)
    },
    setRounds: (state, action: PayloadAction<{topics: string, roundsNum: number}>) => {
      state.topics = action.payload.topics
      state.roundsNum = action.payload.roundsNum
      localStorage.setItem("topics", action.payload.topics)
      localStorage.setItem("roundsNum", action.payload.roundsNum.toString())
    },
    updateRounds: (state, action: PayloadAction<{currentRound: number}>) => {
      state.currentRound = action.payload.currentRound
      localStorage.setItem("currentRound", action.payload.currentRound.toString())
    },
    setStage: (state, action: PayloadAction<{playerAnswering: string, playerAnsweringId: string, question: string, tags: string}>) => {
      state.playerAnswering = action.payload.playerAnswering
      state.playerAnsweringId = action.payload.playerAnsweringId
      state.question = action.payload.question
      state.tags = action.payload.tags
      // state.stageStarted = action.payload.stageStarted

      localStorage.setItem("playerAnswering", action.payload.playerAnswering)
      localStorage.setItem("playerAnsweringId", action.payload.playerAnsweringId)
      localStorage.setItem("question", action.payload.question)
      localStorage.setItem("tags", action.payload.tags)
      // localStorage.setItem("stageStarted", action.payload.stageStarted.toString())
    },
    setTimer: (state, action: PayloadAction<{timerStarted: boolean, timeStart: string}>) => {
      state.timerStarted = action.payload.timerStarted
      state.timeStart = action.payload.timeStart
      localStorage.setItem("timerStarted", action.payload.timerStarted.toString())
      localStorage.setItem("timeStart", action.payload.timeStart)
    },

    setResults: (state, action: PayloadAction<{results: string}>) => {
      state.results = action.payload.results
      localStorage.setItem("results", action.payload.results)
    },
  },
})

export const { setGame, updateGame, updateCurrentScreen, setRounds, setStage, updateRounds, setTimer, setResults } = gameSlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectGame = (state: RootState) => state.game



export default gameSlice.reducer




