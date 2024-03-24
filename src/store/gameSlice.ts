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
  name: string;
  date: string;
  creatorId: string;
  userId: string;

  gameStarted: boolean;

  currentScreen: GameScreen;

  topics: string;
  roundsNum: number;
  currentRound: number;

  userAnswering: string;
  userAnsweringId: string;
  question: string;
  stageStarted: boolean;

  timerStarted: boolean;
  
}


const initialState: GameState = {
  name: localStorage.getItem("name") || "",
  date: localStorage.getItem("date") || "",
  creatorId: localStorage.getItem("creatorId") || "",
  userId: localStorage.getItem("userId") || "",

  gameStarted: localStorage.getItem("gameStarted") == "true" || false,

  currentScreen: localStorage.getItem("currentScreen") as GameScreen|| GameScreen.WaitGame,

  topics: localStorage.getItem("topics") || "",
  roundsNum: Number.parseInt(localStorage.getItem("roundsNum") || "") || 0,
  currentRound: Number.parseInt(localStorage.getItem("currentRound") || "") || 0,

  userAnswering: localStorage.getItem("userAnswering") || "",
  userAnsweringId: localStorage.getItem("userAnsweringId") || "",
  question: localStorage.getItem("question") || "",
  stageStarted: localStorage.getItem("stageStarted") == "true" || false,

  timerStarted: localStorage.getItem("timerStarted") == "true" || false

}

export const gameSlice = createSlice({
  name: "game",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setGame: (state, action: PayloadAction<{name: string, date: string, creatorId: string,id: string}>) => {
      state.name = action.payload.name
      state.date = action.payload.date
      state.creatorId = action.payload.creatorId
      state.userId = action.payload.id
      localStorage.setItem("name", action.payload.name)
      localStorage.setItem("date", action.payload.date)
      localStorage.setItem("creatorId", action.payload.creatorId)
      localStorage.setItem("userId", action.payload.id)
    },
    updateGame: (state, action: PayloadAction<{gameStarted: boolean}>) => {
      state.gameStarted = action.payload.gameStarted
      localStorage.setItem("gameStarted", action.payload.gameStarted.toString())
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
    setStage: (state, action: PayloadAction<{userAnswering: string, userAnsweringId: string, question: string, stageStarted: boolean}>) => {
      state.userAnswering = action.payload.userAnswering
      state.userAnsweringId = action.payload.userAnsweringId
      state.question = action.payload.question
      state.stageStarted = action.payload.stageStarted

      localStorage.setItem("userAnswering", action.payload.userAnswering)
      localStorage.setItem("userAnsweringId", action.payload.userAnsweringId)
      localStorage.setItem("question", action.payload.question)
      localStorage.setItem("stageStarted", action.payload.stageStarted.toString())
    },
    setTimer: (state, action: PayloadAction<{timerStarted: boolean}>) => {
      state.timerStarted = action.payload.timerStarted
      localStorage.setItem("timerStarted", action.payload.timerStarted.toString())
    },

    

    






  },


})

export const { setGame, updateGame, updateCurrentScreen, setRounds, setStage, updateRounds, setTimer } = gameSlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectGame = (state: RootState) => state.game



export default gameSlice.reducer
