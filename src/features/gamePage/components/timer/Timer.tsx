import styles from "./Timer.module.css"
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from "@mui/material";
import { useTimer } from "use-timer";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectGame } from "../../../../store/gameSlice";

type Props = {
  isCreator: boolean;
  onTimeOver: () => void;


}


export function Timer(props: Props) {


  const game = useSelector(selectGame)

  const [initialTime, setInitialTime] = useState<number>(game.timerStarted ? (180 - Math.trunc((new Date().getTime() - new Date(game.timeStart).getTime()) / 1000))  : 180)
  const { time, start, pause, reset, status } = useTimer({
    initialTime: initialTime,
    timerType: 'DECREMENTAL',
    endTime: 0,
    onTimeOver: () => {
      props.onTimeOver()
      reset();
    },
  });

  // const seconds = (sec: number) => {
  //   if (sec % 10 == 1 && sec % 100 != 11) {
  //     return "секунда"
  //   }
  //   if ((sec % 10 == 2 || sec % 10 == 3 || sec % 10 == 4) && sec % 100 != 12 && sec % 100 != 13 && sec % 100 != 14) {
  //     return "секунды"
  //   }
  //   return "секунд"
  // }

  useEffect(() => {
    if (game.timerStarted == true) {
      start()

    }
    if (game.timerStarted == false) {
      pause()
    }
  }, [game.timerStarted]);



  return (
    <div>
      <div className={styles.container}>
        <div className={styles.timerContainer}>
          <div className={styles.decor1} />
          <div className={styles.decor2} />
          {time} <br /> {"сек."}
        </div>

        {/* {props.isCreator ? (
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
          null
        )} */}
      </div>
    </div>
  )
}