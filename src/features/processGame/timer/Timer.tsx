import { PlayArrow } from "@mui/icons-material";
import styles from "./Timer.module.css"
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

type Props = {
  isCreator: boolean;


}

Timer.defaultProps = { isCreator: true }

export function Timer(props: Props) {
  /*const players = [];

  for (let i = 0; i < props.playersNum; i++) {
    players.push(<Player />)
  }*/


  return (
    <div>
      <div className={styles.container}>
        <div className={styles.timerContainer}>
          <div className={styles.decor1} />
          <div className={styles.decor2} />





          180 секунд
        </div>

        {props.isCreator ? (
          <div className={styles.controlButtons}>
            {">"} || x
          
      
          </div>
        ) : (
          <div />
        )}



      </div>

    </div>
  )
}