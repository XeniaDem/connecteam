import styles from "./StartGame.module.css"
import crown from "../crown.svg"
import photo from "./photo.svg"
import { Button } from "../../../../components/button/Button"
import { IconButton } from "@mui/material"
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import DoneIcon from '@mui/icons-material/Done';
import { useSelector } from "react-redux"
import { selectToken } from "../../../../store/authSlice"
import { post, readServerError } from "../../../../utils/api"
import { useState } from "react"
import { PlayerModel } from "../../components/player/Player"

type Props = {

  name: string;
  date: string;
  photo?: string;
  id?: string;
  players: PlayerModel[] | null;
  onButtonClicked: () => void;
}



export function StartGame(props: Props) {
  const token = useSelector(selectToken)

  const [notified, setNotified] = useState(false)

  const notifyPlayers = async () => {
    try {
      const response = await post('notifications/games/' + props.id + '/start', undefined, token)
      setNotified(true)
    }
    catch (error: any) {
      readServerError(error.response.text)
      console.log("error:", error)
    }
  }

  const [formSubmitted, setFormSubmitted] = useState(false);

  const getStartError = () => {
    if (props.players && props.players?.length < 2)
      return "Недостаточно игроков для начала игры";
  }

  const startError = getStartError();


  return (
    <div>
      <div className={styles.container}>
        <div className={styles.crown}>
          <img src={crown} />
        </div>
        <div className={styles.photo}>
          <img src={photo} />
        </div>

        <div className={styles.title}>
          {props.name}
        </div>
        <div className={styles.date}>
          {props.date}
        </div>
        <IconButton onClick={!notified ? notifyPlayers : () => null}>
          <svg width={0} height={0}>
            <linearGradient id="linearColors" x1={1} y1={0} x2={1} y2={1}>
              <stop offset={0} stopColor="#55C6F7" />
              <stop offset={1} stopColor="#2AF8BA" />
            </linearGradient>
          </svg>
          {!notified ?
            <div className={styles.buttonContainer}>
              <NotificationsActiveIcon fontSize="large" sx={{ fill: "url(#linearColors)" }} />
              Уведомить о начале игры
            </div>
            :
            <div className={styles.buttonContainer}>
              <DoneIcon fontSize="large" sx={{ fill: "url(#linearColors)" }} />
              Уведомление отправлено
            </div>
          }
        </IconButton>

        {startError && formSubmitted && (<div className={styles.errorMessage}>
          {startError}
        </div>)}

        <Button text={"Начать игру"} onClick={() => {
          setFormSubmitted(true);
          if (startError)
            return;
          props.onButtonClicked()
        }} className={styles.startButton} />
      </div>
    </div>
  )
}