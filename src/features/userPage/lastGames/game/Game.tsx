
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
          <div className={styles.name} onClick={() => navigate("game_results")}>
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



