
import styles from "./JoinGame.module.css"
import ellipse1 from "../../app/assets/ellipse1.svg"
import ellipse2 from "../../app/assets/ellipse2.svg"
import logoBig from "../../app/assets/logoBig.svg"
import logoSmall from "../../app/assets/logoSmall.svg"
import { Button } from "../../components/button/Button"
import { useEffect, useState } from "react"
import { get, post, readServerError } from "../../utils/api"
import { useLocation, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectToken } from "../../store/authSlice"
import { isMobile } from "react-device-detect"


export function JoinGame() {

  const navigate = useNavigate()
  const location = useLocation()

  const token = useSelector(selectToken)
  const code = location.hash.slice(1);
  const [gameName, setGameName] = useState("")
  const [gameDate, setGameDate] = useState("")
  const [gameStatus, setGameStatus] = useState("")
  const [gameId, setGameId] = useState("")
  const [gameCreatorId, setGameCreatorId] = useState("")

  const [formSubmitted, setFormSubmitted] = useState(false)
  const [joinError, setJoinError] = useState("");

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");



  const getErrorMessage = () => {
    if (name.trim().length < 1 || surname.trim().length < 1) {
      return "Поля имя и фамилия не могут быть пустыми"
    }
    return null
  }

  var errorMessage = getErrorMessage()

  const saveGameData = (message: any) => {
    var messageParsed = JSON.parse(message);
    setGameName(messageParsed.name)
    setGameDate((new Date(messageParsed.start_date)).toLocaleString())
    setGameId(messageParsed.id)
    setGameStatus(messageParsed.status)
    setGameCreatorId(messageParsed.creator_id)

  }



  const readJoinError = (message: any) => {
    if (message.includes("no rows")) {
      token == "" ? navigate("/") : navigate("/user_page")
    }
    if (message.includes("incorrect")) {
      setJoinError("Неверный код приглашения")
      return;
    }

    setJoinError(message)
  }

  const validatePathname = async () => {
    if (!code || code == "") {
      token == "" ? navigate("/") : navigate("/user_page")
    }
    try {
      const response = await get('validate/game/' + code)
      saveGameData(response.text)
    }
    catch (error: any) {
      readJoinError(error.response.text)
      console.log("error:", error)
    }
  }





  const readName = (message: any) => {

    var messageParsed = JSON.parse(message);
    var name = messageParsed.first_name
    var surname = messageParsed.second_name
    var id = messageParsed.id
    setId(id)
    setName(name)
    setSurname(surname)


  }


  const fetchMe = async () => {
    try {

      const response = await get('users/me', token)
      readName(response.text)

    }
    catch (error: any) {
      readServerError(error.response.text)
      console.log("error:", error)
    }
  }


  const joinGame = async () => {
    setFormSubmitted(true)
    if (errorMessage != null) {
      return;
    }
    try {
      if (gameStatus == "not_started" || gameStatus == "in_progress") {
        if (token != "") {
          const response = await post('games/' + code, undefined, token)
          setJoinError("")
        }
        navigate("/game", { state: { gameId: gameId } })
        // подключение к веб-сокет серверу
      }
      if (gameStatus == "finished") {
        //////////////////
      }

    }
    catch (error: any) {
      readJoinError(error.response.text)
      console.log("error:", error)
    }
  }




  const [isCreator, setIsCreator] = useState(false)
  useEffect(() => {
    console.log(gameStatus)
    validatePathname()
    if (token != "")
      fetchMe()
  }, []);

  useEffect(() => {
    id && gameCreatorId && setIsCreator(id == gameCreatorId)
  }, [id, gameCreatorId]);
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.ellipse1}>
          <img src={ellipse1} />
        </div>
        <div className={styles.ellipse2}>
          <img src={ellipse2} />
        </div>
        <div className={styles.body}>
          <div className={styles.connecteam}>
            {!isMobile ? <img src={logoBig} /> : <img src={logoSmall} />}
          </div>
          <div className={styles.title}>
            {!isCreator ? "Вас пригласили в игру" : "Вы являетесь организатором игры"} <span className={styles.title1}> {gameName} </span> <br /> <span className={styles.date}> Начало игры: {gameDate} </span>
          </div>

          {token == "" ?
            <div>
              <div className={styles.inputs}>
                <input className={styles.input} placeholder="Имя" value={name}
                  onChange={(event) => { setName(event.target.value) }} />
                <input className={styles.input} placeholder="Фамилия" value={surname}
                  onChange={(event) => { setSurname(event.target.value) }} />
              </div>
              <div className={styles.footerContainer}>
                <Button text={"Зарегистрироваться"} onClick={() => navigate("/auth/register", { state: { gameInvitation: code } })} className={styles.footerButton} />

                <Button text={"Войти"} onClick={() =>
                  navigate("/auth/login", { state: { gameInvitation: code } })
                } className={styles.footerButton} />
              </div>
            </div>
            :
            <div className={styles.inputs}>
              <input className={styles.input} disabled={true} value={name} />
              <input className={styles.input} disabled={true} value={surname} />
            </div>
          }
          {errorMessage && formSubmitted && (<div className={styles.errorMessage}>
            {errorMessage}

          </div>)}

          {formSubmitted && joinError ? (
            <div className={styles.errorMessage}>
              {joinError}
            </div>
          ) : (
            null
          )}
          <Button text={"Присоединиться"} onClick={joinGame} className={styles.button} />
        </div>
      </div>
    </div>
  )
}