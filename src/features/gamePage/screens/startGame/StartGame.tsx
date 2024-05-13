
import styles from "./StartGame.module.css"
import crown from "../crown.svg"
import photo from "./photo.svg"
import { Button } from "../../../../components/button/Button"
import { IconButton } from "@mui/material"
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { useSelector } from "react-redux"
import { selectToken } from "../../../../store/authSlice"
import { patch, post, readServerError } from "../../../../utils/api"

type Props = {
  name: string;
  date: string;
  photo?: string;
  id?: string;
  onButtonClicked: () => void;
}



export function StartGame(props: Props) {
  const token = useSelector(selectToken)


  const notifyPlayers = async () => {
    try {

      const response = await post('notifications/games/' + props.id + '/start', undefined, token)
    }
    catch (error: any) {
      readServerError(error.response.text)
      console.log("error:", error)
    }


  }


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
        <IconButton onClick={notifyPlayers}>
          <svg width={0} height={0}>
            <linearGradient id="linearColors" x1={1} y1={0} x2={1} y2={1}>
              <stop offset={0} stopColor="#55C6F7" />
              <stop offset={1} stopColor="#2AF8BA" />
            </linearGradient>
          </svg>
          <NotificationsActiveIcon fontSize="large" sx={{ fill: "url(#linearColors)" }} />
        </IconButton>

        <Button text={"Начать игру"} onClick={props.onButtonClicked} className={styles.startButton} />
      </div>
    </div>
  )
}