
import styles from "./Question.module.css"
import { useEffect, useState } from "react"
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import disableScroll from 'disable-scroll';
import { Button } from "../../../../components/button/Button";
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { IconButton } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';



export type QuestionModel = {
  text: string;
  number: number;

}

type Props = {
  question: QuestionModel;
  onChange: () => void;

}



export function Question({ question, onChange }: Props) {

  // useEffect(() => {

  //   readAccess()

  // }, []);






  return (
    <div className={styles.background}>


      <div className={styles.container}>


        <div className={styles.group}>
          <div className={styles.text}>
            Вопрос {" "} {question.number}
          </div>

          <div className={styles.text}>
            {question.text}
          </div>




        </div>
        <div className={styles.group}>
          <Button text={"Удалить"} onClick={() => null} className={styles.deleteButton} />
          {/* <DeleteOutlineIcon fontSize="large" sx={{ fill: "url(#linearColors)" }} /> */}
          <IconButton onClick={() => null}>
            <EditIcon fontSize="medium" htmlColor="#5C5C5C"/>


          </IconButton>


        </div>



      </div>

    </div>

  )
}



