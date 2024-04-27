import styles from "./Question.module.css"
import { useEffect, useState } from "react"
import { Button } from "../../../../components/button/Button";
import { IconButton } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import { Delete, patch, readServerError } from "../../../../utils/api";
import { useSelector } from "react-redux";
import { selectToken } from "../../../../store/authSlice";
import { useGetDimensions } from "../../../../app/hooks/useGetDimensions";
import { TagsPopup } from "./tagsPopup/TagsPopup";
import disableScroll from 'disable-scroll';
import { TagModel } from "./tagsPopup/tag/Tag";



export type QuestionModel = {
  text: string;
  number: number;
  id: string;
  tags: TagModel[];

}

type Props = {
  savedQuestion: QuestionModel;
  onChange: () => void;

}



export function Question({ savedQuestion, onChange }: Props) {

  const token = useSelector(selectToken)
  const width = useGetDimensions()[0]

  const [questionEditing, setQuestionEditing] = useState(false);

  const [questionText, setQuestionText] = useState("");

  const [tagsOpen, setTagsOpen] = useState(false);

  const openTagsPopup = () => {
    disableScroll.on()
    setTagsOpen(true)
  }

  const closeTagsPopup = () => {
    disableScroll.off()
    setTagsOpen(false)
    onChange()
  }


  const handleQuestionEdit = () => {
    if (!questionEditing) {
      setQuestionEditing(!questionEditing);
    }

    if (questionEditing) {

      if (savedQuestion.text != questionText) {
        if (questionText == "") {
          return;
        }
        // alert("questionchange")
        setQuestionEditing(!questionEditing);
        editQuestion()
        onChange()
      }
      else {
        setQuestionEditing(!questionEditing);
        // alert("Ничего не сохраняем")
      }
    }



  }


  const deleteQuestion = async () => {
    try {
      const response = await Delete('questions/' + savedQuestion.id, token)
      onChange()

    }
    catch (error: any) {
      readServerError(error.response.text)
      console.log("error:", error)
    }

  }

  const editQuestion = async () => {
    const data = {
      new_content: questionText
    }
    try {
      const response = await patch('questions/' + savedQuestion.id, data, token)
      onChange()

    }
    catch (error: any) {
      readServerError(error.response.text)
      console.log("error:", error)
    }

  }


  useEffect(() => {

    setQuestionText(savedQuestion.text)

  }, [savedQuestion]);


  useEffect(() => {

    document.onkeypress = function (event) {

      const e = event || window.event;

      if (e.keyCode == 13) {

        e.preventDefault();
      }



    }

  }, []);





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
          <textarea className={!questionEditing ? styles.text : styles.textActive} placeholder={"Текст вопроса"} disabled={!questionEditing}
            value={questionText} onChange={(event) => { setQuestionText(event.target.value) }} style={width > 748 ? { width: 0.7 * width } : { width: 350 }} />


        </div>

      </div>
      <div className={styles.group}>
        <Button text={"Теги"} onClick={openTagsPopup} className={styles.tagsButton} />
        <Button text={"Удалить"} onClick={deleteQuestion} className={styles.deleteButton} />



      </div>
      {tagsOpen ? <TagsPopup closePopup={closeTagsPopup} savedQuestion={savedQuestion}/> : null}




    </div>


  )
}



