
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
import DoneIcon from '@mui/icons-material/Done';


export type TopicModel = {
  name: string;
  questions: QuestionModel[];

}

type Props = {
  token: string;
  savedTopic: TopicModel;
  onChange: () => void;

}



export function Topic({ savedTopic: savedTopic, token, onChange }: Props) {

  // useEffect(() => {

  //   readAccess()

  // }, []);

  const [questionsOpen, setQuestionsOpen] = useState(false);

  const [topicEditing, setTopicEditing] = useState(false);



  const [topicName, setTopicName] = useState("");


  const handleTopicEdit = () => {
    if (!topicEditing) {
      setTopicEditing(!topicEditing);
    }

    if (topicEditing) {

      if (savedTopic.name != topicName) {
        if (topicName == "") {
          return;
        }
        alert("topicchange")
        setTopicEditing(!topicEditing);
       // changeCompanyInfo()
          /// onChange() потом включить
      }
      else {
        setTopicEditing(!topicEditing);
        alert("Ничего не сохраняем")
      }
    }



  }


  useEffect(() => {

    setTopicName(savedTopic.name)

  }, [savedTopic]);



  return (
    <div className={styles.background}>


      <div className={styles.container}>


        <div className={styles.group}>
          <IconButton onClick={handleTopicEdit}>
            {!topicEditing ? (<EditIcon fontSize="medium" sx={{ fill: "url(#linearColors)" }} />
            ) : (
              <DoneIcon fontSize="medium" sx={{ fill: "url(#linearColors)" }} />
            )}



          </IconButton>

          <div >
            {/* {topic.name} */}
            <input className={!topicEditing ? styles.name : styles.nameActive} placeholder={"Название темы"} disabled={!topicEditing}
              value={topicName} onChange={(event) => { setTopicName(event.target.value) }} />
          </div>
   



        </div>
        <div className={styles.group}>
        <div className={styles.count}>
            (вопросов: {savedTopic.questions.length})
          </div>
          <IconButton onClick={() => setQuestionsOpen(!questionsOpen)}>

            {!questionsOpen ? (
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
          {savedTopic.questions?.map(question =>
            <div>
              <Question savedQuestion={question} onChange={onChange} />

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


