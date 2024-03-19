
import { useNavigate } from "react-router-dom";
import styles from "./Game.module.css"
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from "@mui/material";
import { Delete, readServerError } from "../../../../utils/api";
import { useSelector } from "react-redux";
import { selectToken } from "../../../../utils/authSlice";


export type GameModel = {
  id: string;
  name: string;
  date: string;
  status: string;
  invitationCode: string;

}

type Props = {
  savedGame: GameModel;
  onChange: () => void;

}



export function Game({ savedGame, onChange }: Props) {
  const navigate = useNavigate()
  const token = useSelector(selectToken)


  const getStatus = () => {
    if (savedGame.status == "not_started")
      return "Не начата"
  }

  const deleteGame = async () => {
    try {
      const response = await Delete('games/' + savedGame.id, token)
      onChange()


    }
    catch (error: any) {
      readServerError(error.response.text)
      console.log("error:", error)
    }

  }



  return (
    <div>

      <div className={styles.container}>

        <div className={styles.group}>
          <div className={styles.name} onClick={() => {
            if (savedGame.status == "not_started")
              navigate("/invite/game#" + savedGame.invitationCode)
            // if (savedGame.status == "in_process")
            //   navigate("")
            // if (savedGame.status == "finished")
            //   navigate("")
          }}>
            {savedGame.name}
          </div>
          <div className={styles.date}>
            {savedGame.date}
          </div>

        </div>
        <div className={styles.group}>
          <div className={styles.status}>
            {getStatus()}
          </div>
          {savedGame.status == "not_started" ?

            <IconButton onClick={deleteGame}>
              <svg width={0} height={0}>
                <linearGradient id="linearColors" x1={1} y1={0} x2={1} y2={1}>
                  <stop offset={0} stopColor="#55C6F7" />
                  <stop offset={1} stopColor="#2AF8BA" />
                </linearGradient>
              </svg>
              <DeleteIcon fontSize="large" sx={{ fill: "url(#linearColors)" }} />
            </IconButton>
            :
            null
          }


        </div>



      </div>
      <div className={styles.divider} />
    </div>
  )
}



