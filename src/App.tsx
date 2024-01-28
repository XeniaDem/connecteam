import logo from "./logo.svg"
import { Counter } from "./features/counter/Counter"
import "./App.css"
import { Header } from "./features/header/Header"
import '@fontsource-variable/work-sans';
import { Intro } from "./features/information/intro/Intro";
import { Information } from "./features/information/Information";
import { Registration } from "./features/registration/Registration";
import { Login } from "./features/login/Login";
import { AuthProblem } from "./features/authProblem/AuthProblem";
import { UserPage } from "./features/userPage/UserPage";
import { CreateGame } from "./features/createGame/CreateGame";
import { Profile } from "./features/profile/Profile";
import { StartPage } from "./features/startGame/startPage/StartPage";
import { ChooseTopics } from "./features/startGame/chooseTopics/ChooseTopics";
import { ChooseTopic } from "./features/processGame/chooseTopic/ChooseTopic";
import { WaitGame } from "./features/joinGame/waitGame/WaitGame";
import { EnterGame } from "./features/joinGame/enterGame/EnterGame";
import { LinkSent } from "./features/authProblem/linkSent/LinkSent";
import { GameResults } from "./features/gameResults/GameResults";
import { AnswerQuestion } from "./features/processGame/answerQuestion/AnswerQuestion";
import { RateAnswer } from "./features/processGame/rateAnswer/RateAnswer";
import { InputGradient } from "./components/inputGradient/InputGradient";




function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header />
        <Information />
        {/* <Registration />
        <Login /> */}


        <AuthProblem />
        <LinkSent/>
        {/* <UserPage />
        <CreateGame /> */}

        <Profile/>

        <StartPage/>

        <ChooseTopics/>
        <ChooseTopic/>
        <AnswerQuestion/>
        <RateAnswer/>

  

        <WaitGame/>
        <EnterGame/>
        <GameResults/>




    
       
      


        {/* <img src={logo} className="App-logo" alt="logo" />

        <Counter />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p> */}
        {/* <span>
          <span>Learn </span>
          <a
            className="App-link"
            href="https://reactjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux-toolkit.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux Toolkit
          </a>
          ,<span> and </span>
          <a
            className="App-link"
            href="https://react-redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React Redux
          </a>
        </span> */}
      </header>
    </div>
  )
}

export default App
