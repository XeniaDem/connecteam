import styles from "./Score.module.css"
import { useEffect, useState } from "react"
import { Button } from "../../../../components/button/Button";
import { IconButton } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';



export type ScoreModel = {
  question: string;
  score: number;

}

type Props = {
  savedScore: ScoreModel;

}



export function Score({ savedScore }: Props) {


  const [questionEditing, setQuestionEditing] = useState(false);

  const [questionText, setQuestionText] = useState("");





  return (

    <div>
      <div className={styles.container}>



        <div className={styles.text}>
          {savedScore.question}
        </div>

        <div className={styles.result}>
          Общая сумма баллов - {savedScore.score}
        </div>







      </div>
    </div>


  )
}



