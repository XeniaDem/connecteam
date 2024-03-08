import logo from "./logo.svg"
import "./App.css"
import { Header } from "./features/header/Header"
import '@fontsource-variable/work-sans';
import { Information } from "./features/information/Information";




function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header />
        <Information />
      </header>
    </div>
  )
}

export default App
