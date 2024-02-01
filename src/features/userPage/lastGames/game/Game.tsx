
import styles from "./Game.module.css"
import photo from "./photo.svg"
import users from "./users.svg"
import questions from "./questions.svg"
import { useEffect, useState } from "react"
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';


export type GameModel = {
  name: string;
  date: string;
  status: string;

}

type Props = {
  game: GameModel;

}



export function Game({ game }: Props) {

  // useEffect(() => {

  //   readAccess()

  // }, []);


  return (
    <div>

      <div className={styles.container}>

        <div className={styles.group}>
          <div className={styles.name}>
            {game.name}
          </div>
          <div className={styles.date}>
            {game.date}
          </div>

        </div>
        <div className={styles.group}>
          <div className={styles.status}>
            {game.status}
          </div>

        </div>



      </div>
      <div className={styles.divider} />
    </div>
  )
}



