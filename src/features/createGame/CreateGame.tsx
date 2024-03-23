import { useEffect, useState } from "react"
import { Button } from "../../components/button/Button"
import styles from "./CreateGame.module.css"
import { CopyPopup } from "./copyPopup/CopyPopup"
import ellipse1 from "../../app/assets/ellipse1.svg"
import ellipse2 from "../../app/assets/ellipse2.svg"
import icon from "./icon.svg"
import { InvitePopup } from "./invitePopup/InvitePopup"
import disableScroll from 'disable-scroll';
import { useSelector } from "react-redux"
import { selectToken } from "../../store/authSlice"
import { get, post, readServerError } from "../../utils/api"


export function CreateGame() {

  const [gameCreated, setGameCreated] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)

  const token = useSelector(selectToken)

  const [gameName, setGameName] = useState("");
  const [gameDate, setGameDate] = useState("");

  const [createError, setCreateError] = useState(""); 
  // const [gameTime, setGameTime] = useState("");

  const getCreateErrorMessage = () => {
    if (gameName.trim() == "") {
      return "Введите название игры"
    }
    if (gameDate == "") {
      return "Выберите дату и время игры"
    }
    return null
  }
  var errorMessage = getCreateErrorMessage()



  const [invitationCode, setInvitationCode] = useState("")
  const readInvitationCode = (message: any) => {
    var messageParsed = JSON.parse(message);
  
    setInvitationCode(messageParsed.invitation_code)


  }
  const readCreateError = (message: any) => {
    var messageParsed = JSON.parse(message);
    var content = messageParsed.message

    if (content.includes("incorrect start date")) {
       setCreateError("Некорректная дата начала игры")
       return;
    }
    setCreateError(content);

  }


  const createGame = async () => { //////////////////////////
    setFormSubmitted(true);
    if (errorMessage != null) {
      return;

    }
    const data = {
      name: gameName,
      start_date: gameDate && new Date(gameDate).toISOString()
    }
    try {
      const response = await post('games/', data, token)
      setCreateError("")
      setGameCreated(true);
      readInvitationCode(response.text)
     
     

    }
    catch (error: any) {
      readCreateError(error.response.text)
      console.log("error:", error)
    }



  }

  const [inviteOpen, setInviteOpen] = useState(false);
  const [copyOpen, setCopyOpen] = useState(false);


  const openInvitePopup = () => {
    disableScroll.on()
    setInviteOpen(true)

  }
  const closeInvitePopup = () => {
    disableScroll.off()
    setInviteOpen(false)

  }
  const openCopyPopup = () => {
    navigator.clipboard.writeText("localhost:5173/invite/game#" + invitationCode)
    setCopyOpen(true)
    setTimeout(() => {
      setCopyOpen(false);
    }, 3000);

  }



  const [name, setName] = useState("");


  const readName = (message: any) => {

    var messageParsed = JSON.parse(message);
    var name = messageParsed.first_name
    setName(name)


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


  useEffect(() => {

    fetchMe();
  }, []);



  return (
    <div>
      <div className={styles.container}>
        <div className={styles.ellipse1}>
          <img src={ellipse1} />
        </div>
        <div className={styles.ellipse2}>
          <img src={ellipse2} />
        </div>

        <div className={styles.icon}>
          <img src={icon} />
        </div>

        <div className={styles.title}>
          Создание игры
        </div>
        <div className={styles.subtitle}>
          Имя создателя: {name}
        </div>

        <div className={styles.creation}>
          <div className={styles.items}>
            <input className={styles.input} placeholder="Название игры" disabled={gameCreated} value={gameName} onChange={(event) => { setGameName(event.target.value) }} />

            <input type="datetime-local" min={new Date().toISOString().slice(0, new Date().toISOString().lastIndexOf(":"))}
              className={styles.input} placeholder="Дата игры" disabled={gameCreated} value={gameDate} onChange={(event) => { setGameDate(event.target.value) }} />

            {/* <input type="time" className={styles.input} placeholder="Время игры" disabled={gameCreated}
              value={gameTime} onChange={(event) => { setGameTime(event.target.value) }} /> */}

          </div>

          {formSubmitted && (errorMessage) ? (
            <div className={styles.errorMessage}>
              {errorMessage}
            </div>
          ) : (
            null
          )}
          {formSubmitted && createError ? (
            <div className={styles.errorMessage}>
              {createError}
            </div>
          ) : (
            null
          )}

          {!gameCreated ?
            <div className={styles.items} >
              <Button text={"Создать игру"} onClick={createGame} className={styles.createButton} />
            </div> :
            <div className={styles.items} >
              <div className={styles.text} >
                Игра успешно создана!
              </div>
              <Button text={"Добавить участника"} onClick={openInvitePopup} className={styles.inviteButton} />
              <Button text={"Скопировать ссылку на игру"} onClick={openCopyPopup} className={styles.inviteButton} />
            </div>
          }
        </div>
      </div>
      {inviteOpen ? <InvitePopup closePopup={closeInvitePopup} /> : null}
      {copyOpen ? <CopyPopup /> : null}
    </div>
  )
}