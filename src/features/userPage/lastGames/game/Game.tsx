
import { useNavigate } from "react-router-dom";
import styles from "./Game.module.css"


export type GameModel = {
  name: string;
  date: string;
  status: string;

}

type Props = {
  game: GameModel;

}



export function Game({ game }: Props) {
  const navigate = useNavigate()


  return (
    <div>

      <div className={styles.container}>

        <div className={styles.group}>
          <div className={styles.name} onClick={() => navigate("game_results")}>
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



