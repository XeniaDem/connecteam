
import { useEffect, useState } from "react"
import { Button } from "../../components/button/Button"
import styles from "./CreateGame.module.css"
import { CopyPopup } from "./copyPopup/CopyPopup"
import ellipse1 from "./ellipse1.svg"
import ellipse2 from "./ellipse2.svg"
import icon from "./icon.svg"
import { InvitePopup } from "./invitePopup/InvitePopup"
import disableScroll from 'disable-scroll';
import { Header } from "../header/Header"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectToken } from "../auth/authSlice"
import { get } from "../../utils/api"
import DateTimePicker from 'react-datetime-picker'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
// import 'react-datetime-picker/dist/DateTimePicker.css';
// import 'react-calendar/dist/Calendar.css';
// import 'react-clock/dist/Clock.css';


type Props = {
}

export function CreateGame(props: Props) {
  const navigate = useNavigate();


  const [gameCreated, setGameCreated] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)

  const token = useSelector(selectToken)

  const [gameName, setGameName] = useState("");
  const [gameDate, setGameDate] = useState("");


  const getCreateErrorMessage = () => {

    if (gameName == "") {
      return "Поле Название игры не может быть пустым"
    }

    return null
  }
  var createErrorMessage = getCreateErrorMessage()



  const createGame = () => {
    setFormSubmitted(true);
    if (createErrorMessage != null) {
      return;


    }
    else {
    setGameCreated(true);
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
    navigator.clipboard.writeText("link")
    setCopyOpen(true)
    setTimeout(() => {
      setCopyOpen(false);
    }, 3000);

  }



  const [name, setName] = useState("");
  const [access, setAccess] = useState("");


  const readAnswer = (message: any) => {

    var messageParsed = JSON.parse(message);
    // alert(JSON.stringify(messageParsed));
    console.log(JSON.stringify(messageParsed));


    var name = messageParsed.first_name
    setName(name)
    var access = messageParsed.access
    setAccess(access)

  }

  const readServerError = (message: any) => {
    var messageParsed = JSON.parse(message);
    var content = messageParsed.message

    if (content.includes("token is expired")) {
      navigate("/login")
      return ("Срок действия токена вышел.")

    }
    // alert(content);

  }

  const fetchUserPage = async () => {
    try {

      const response = await get('users/me', token)
      readAnswer(response.text)

    }
    catch (error: any) {
      readServerError(error.response.text)
      console.log("error:", error)
    }


  }



  useEffect(() => {
    disableScroll.off()
    if (token == "") {
      navigate("/")
    }
    fetchUserPage();
  }, []);



  return (
    <div>
      <div className={styles.header}>
        <Header loggedHeader={true} withPackage={true} />
      </div>
      <div className={!inviteOpen ? styles.container : styles.containerDisabled}>
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
            <input className={styles.input} placeholder="Дата и время игры" disabled={gameCreated} />

          </div>


          {/* <Button text={"Создать игру"} onClick={createGame} className={styles.createButton} disabled = {gameCreated} /> */}
          {formSubmitted && (createErrorMessage) ? (
            <div className={styles.errorMessage}>
              {createErrorMessage}

            </div>

          ) : (
            <div />
          )}

          {!gameCreated ?
            <div className={styles.items} >
              <Button text={"Создать игру"} onClick={createGame} className={styles.createButton} />
            </div> :
            <div className={styles.items} >
              <div className={styles.text} >
                Игра успешно создана!
              </div>
            </div>
          }





          {!gameCreated ? null :
            <div className={styles.items} >
              <Button text={"Добавить участника"} onClick={openInvitePopup} className={styles.inviteButton} />

              <Button text={"Скопировать сслыку на игру"} onClick={openCopyPopup} className={styles.inviteButton} />
            </div>
          }
        </div>





      </div>
      {inviteOpen ? <InvitePopup closePopup={closeInvitePopup} /> : null}
      {copyOpen ? <CopyPopup /> : null}
      <div className={styles.calenarContainer}>
        {/* <DateTimePicker onChange={onChange} value={value} calendarClassName={styles.calendar} tileClassName={styles.tile}
         nextLabel = {<NavigateNextIcon htmlColor="FFF"/>}
          nextAriaLabel = {"knj"} /> */}
      </div>


    </div>
  )
}