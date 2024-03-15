import styles from "./DetailedResult.module.css"
import { useState } from "react"
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { IconButton } from "@mui/material";
import { Score, ScoreModel } from "./score/Score";

export type DetailedResultModel = {
  id: string;
  name: string;
  scores?: ScoreModel[];
  result: number;
  isYou: boolean;



}

type Props = {
  savedDetailedResult: DetailedResultModel;

}



export function DetailedResult({ savedDetailedResult }: Props) {

  const [scoresOpen, setScoresOpen] = useState(savedDetailedResult.isYou);


  return (
    <div className={styles.background}>

      <div className={styles.container}>


        <div className={styles.group}>
          <div className={styles.name}>
            {savedDetailedResult.isYou ? "Вы" : savedDetailedResult.name}
          </div>
        </div>
        <div className={styles.group}>
          <div className={styles.result}>
            {savedDetailedResult.result} баллов
          </div>


          <IconButton onClick={() => setScoresOpen(!scoresOpen)}>

            {!scoresOpen ? (
              <KeyboardArrowLeftIcon fontSize="large" htmlColor="#55C6F7" />
            ) : (
              <KeyboardArrowDownIcon fontSize="large" htmlColor="#55C6F7" />

            )}

          </IconButton>

        </div>



      </div>

      {scoresOpen ? (
        <div>
          <div className={styles.questions}>
            {savedDetailedResult.scores?.map(score =>
              <div>
                <Score savedScore={score} />
              </div>
            )
            }
          </div>


        </div>
      ) : (
        null
      )}


      <div className={styles.divider} />

    </div>

  )
}



