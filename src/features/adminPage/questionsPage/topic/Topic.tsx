
import styles from "./Topic.module.css"
import { useEffect, useState } from "react"
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import disableScroll from 'disable-scroll';
import { Question, QuestionModel } from "../question/Question";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { IconButton } from "@mui/material";
import { Button } from "../../../../components/button/Button";
import EditIcon from '@mui/icons-material/Edit';


export type TopicModel = {
  name: string;
  questions: QuestionModel[];

}

type Props = {
  token: string;
  topic: TopicModel;
  onChange: () => void;

}



export function Topic({ topic, token, onChange }: Props) {

  // useEffect(() => {

  //   readAccess()

  // }, []);

  const [questionsOpen, setQuestionsOpen] = useState(false);






  return (
    <div className={styles.background}>


      <div className={styles.container}>


        <div className={styles.group}>
        <IconButton onClick={() => null}>
          <EditIcon fontSize="medium" sx={{ fill: "url(#linearColors)" }} />

          
          </IconButton>

          <div className={!questionsOpen ? styles.name : styles.nameActive} onClick={() => setQuestionsOpen(!questionsOpen)}>
            {topic.name}
          </div>


        </div>
        <div className={styles.group}>
          <IconButton onClick={() => setQuestionsOpen(!questionsOpen)}>

            {!questionsOpen  ? (
            <KeyboardArrowLeftIcon fontSize="large" sx={{ fill: "url(#linearColors)" }} />
            ) : (
              <KeyboardArrowDownIcon fontSize="large" sx={{ fill: "url(#linearColors)" }} />

            )}
          
          </IconButton>
          <Button text={"Удалить"} onClick={() => null} className={styles.deleteButton} />


        </div>



      </div>

      {questionsOpen ? (
        <div>
          {topic.questions?.map(question =>
            <div>
              <Question question={question} onChange={onChange} />

            </div>

          )

          }
        </div>
      ) : (
        null

      )}

      <div className={styles.divider} />


    </div>

  )
}



