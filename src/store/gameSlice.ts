import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState} from "./store"
import { TopicModel } from "../features/adminPage/questionsPage/topic/Topic";
export enum GameScreen {
  WaitGame = "wait",
  ChooseTopics = "chooseTopics",
  StartGame = "startGame",
  ChooseTopic = "chooseTopic",
  GameError = "gameError"



}

export interface GameState {
  name: string;
  date: string;
  creatorId: string;
  userId: string;
  currentScreen: GameScreen;
  topics: string;
  roundsNum: number;
  currentRound: number;
  
}


const initialState: GameState = {
  name: localStorage.getItem("name") || "",
  date: localStorage.getItem("date") || "",
  creatorId: localStorage.getItem("creatorId") || "",
  userId: localStorage.getItem("userId") || "",
  currentScreen: localStorage.getItem("currentScreen") as GameScreen|| GameScreen.WaitGame,
  topics: localStorage.getItem("topics") || "",
  roundsNum: Number.parseInt(localStorage.getItem("roundsNum") || "") || 0,
  currentRound: Number.parseInt(localStorage.getItem("currentRound") || "") || 0,
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
    updateCurrentScreen: (state, action: PayloadAction<{currentScreen: GameScreen}>) => {
      state.currentScreen = action.payload.currentScreen
      localStorage.setItem("currentScreen", action.payload.currentScreen)
    },
    setRounds: (state, action: PayloadAction<{topics: string, roundsNum: number}>) => {
      state.topics = action.payload.topics
      state.roundsNum = action.payload.roundsNum
      localStorage.setItem("topics", JSON.stringify(action.payload.topics))
    },
    updateRounds: (state, action: PayloadAction<{currentRound: number}>) => {
      state.currentRound = action.payload.currentRound
      localStorage.setItem("currentRound", JSON.stringify(action.payload.currentRound))
    },
    






  },


})

export const { setGame, updateCurrentScreen, setRounds, updateRounds } = gameSlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectGame = (state: RootState) => state.game



export default gameSlice.reducer
