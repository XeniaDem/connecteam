
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
import { Delete } from "../../../../utils/api";
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from "react-router-dom";

export type TopicModel = {
  name: string;
  questions?: QuestionModel[];
  id: string;


}

type Props = {
  token: string;
  savedTopic: TopicModel;
  onChange: () => void;

}



export function Topic({ savedTopic, token, onChange }: Props) {
  const navigate = useNavigate();

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


  const readServerError = (message: any) => {
    var messageParsed = JSON.parse(message);
    var content = messageParsed.message

    alert(content);

  }

  const deleteTopic = async () => {

    try {
      const response = await Delete('topics/' + savedTopic.id, token)
      onChange()

      return;

    }
    catch (error: any) {
      readServerError(error.response.text)
      console.log("error:", error)
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
            (вопросов: {savedTopic.questions?.length})
          </div>
          <IconButton onClick={() => setQuestionsOpen(!questionsOpen)}>

            {!questionsOpen ? (
              <KeyboardArrowLeftIcon fontSize="large" sx={{ fill: "url(#linearColors)" }} />
            ) : (
              <KeyboardArrowDownIcon fontSize="large" sx={{ fill: "url(#linearColors)" }} />

            )}

          </IconButton>
          <Button text={"Удалить"} onClick={deleteTopic} className={styles.deleteButton} />


        </div>



      </div>

      {questionsOpen ? (
        <div>
          <div className={styles.questions}>
            {savedTopic.questions?.map(question =>
              <div>
                <Question savedQuestion={question} onChange={onChange} />
              </div>
            )
            }
          </div>
          <div className={styles.addButton}>
          <IconButton onClick={() => navigate("add_question", { state: { topic: savedTopic} })}>
            <AddIcon fontSize="large" sx={{ fill: "url(#linearColors)" }} />

          </IconButton>
          </div>

        </div>
      ) : (
        null
      )}





      <div className={styles.divider} />




    </div>

  )
}



