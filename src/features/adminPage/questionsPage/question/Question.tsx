import styles from "./Question.module.css"
import { useEffect, useState } from "react"
import { Button } from "../../../../components/button/Button";
import { IconButton } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';



export type QuestionModel = {
  text: string;
  number: number;

}

type Props = {
  savedQuestion: QuestionModel;
  onChange: () => void;

}



export function Question({ savedQuestion, onChange }: Props) {


  const [questionEditing, setQuestionEditing] = useState(false);

  const [questionText, setQuestionText] = useState("");


  const handleQuestionEdit = () => {
    if (!questionEditing) {
      setQuestionEditing(!questionEditing);
    }

    if (questionEditing) {

      if (savedQuestion.text != questionText) {
        if (questionText == "") {
          return;
        }
        alert("questionchange")
        setQuestionEditing(!questionEditing);
        // changeQuestion()
        /// onChange() потом включить
      }
      else {
        setQuestionEditing(!questionEditing);
        alert("Ничего не сохраняем")
      }
    }



  }


  useEffect(() => {

    setQuestionText(savedQuestion.text)

  }, [savedQuestion]);


  return (


    <div className={styles.container}>


      <div className={styles.group}>
        <div className={styles.counter}>
          Вопрос {" "} {savedQuestion.number}
        </div>

        <div className={styles.smallGroup}>
          <IconButton onClick={handleQuestionEdit}>
            {!questionEditing ? (<EditIcon fontSize="medium" htmlColor="#5C5C5C" />
            ) : (
              <DoneIcon fontSize="medium" htmlColor="#5C5C5C" />
            )}



          </IconButton>
          <input className={!questionEditing ? styles.text : styles.textActive} placeholder={"Текст вопроса"} disabled={!questionEditing}
            value={questionText} onChange={(event) => { setQuestionText(event.target.value) }} />


        </div>

      </div>
      <div className={styles.group}>
        <Button text={"Удалить"} onClick={() => null} className={styles.deleteButton} />



      </div>



    </div>


  )
}



