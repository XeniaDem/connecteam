
import styles from "./Timer.module.css"
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from "@mui/material";

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


            <svg width={0} height={0}>
              <linearGradient id="linearColors" x1={1} y1={0} x2={1} y2={1}>
                <stop offset={0} stopColor="#55C6F7" />
                <stop offset={1} stopColor="#2AF8BA" />
              </linearGradient>
            </svg>
            





            <IconButton onClick={() => { throw new Error("Function not implemented.") }}>
              <PlayArrowIcon fontSize="large" sx={{ fill: "url(#linearColors)" }} />

            </IconButton>
            <IconButton onClick={() => { throw new Error("Function not implemented.") }}>
              <PauseIcon fontSize="large" sx={{ fill: "url(#linearColors)" }} />

            </IconButton>
            <IconButton onClick={() => { throw new Error("Function not implemented.") }}>
              <CloseIcon fontSize="large" sx={{ fill: "url(#linearColors)" }} />

            </IconButton>




          </div>
        ) : (
          <div />
        )}



      </div>

    </div>
  )
}