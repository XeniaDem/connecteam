
import styles from "./Timer.module.css"
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from "@mui/material";
import { useTimer } from "use-timer";

type Props = {
  isCreator: boolean;




}

Timer.defaultProps = { isCreator: true }

export function Timer(props: Props) {


  const { time, start, pause, reset, status } = useTimer({
    initialTime: 180,
    timerType: 'DECREMENTAL',
    endTime: 0,
    onTimeOver: () => {
      alert('Time is over');
      reset();
    },
  });

  const seconds = (sec: number) => {
    if (sec % 10 == 1) {
      return "Cекунда"
    }
    if (sec % 10 == 2 || sec % 10 == 3 || sec % 10 == 4) {
      return "Cекунды"
    }
    if (sec % 10 == 5 || sec % 10 == 6 || sec % 10 == 7 || sec % 10 == 8 || sec % 10 == 9 || sec % 10 == 0) {
      return "Cекунд"
    }
  }

  





  return (
    <div>
      <div className={styles.container}>
        <div className={styles.timerContainer}>
          <div className={styles.decor1} />
          <div className={styles.decor2} />
          {time} <br/> {seconds(time)}





        </div>

        {props.isCreator ? (
          <div className={styles.controlButtons}>


            <svg width={0} height={0}>
              <linearGradient id="linearColors" x1={1} y1={0} x2={1} y2={1}>
                <stop offset={0} stopColor="#55C6F7" />
                <stop offset={1} stopColor="#2AF8BA" />
              </linearGradient>
            </svg>



            <IconButton onClick={start}>
              <PlayArrowIcon fontSize="large" sx={{ fill: "url(#linearColors)" }} />

            </IconButton>

            <IconButton onClick={pause}>
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