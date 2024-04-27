import styles from "./Topic.module.css"
import { useEffect, useState } from "react"
import { Question, QuestionModel } from "../question/Question";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { IconButton } from "@mui/material";
import { Button } from "../../../../components/button/Button";
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import { Delete, get, patch, readServerError } from "../../../../utils/api";
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from "react-router-dom";
import { TopicModel } from "../../../gamePage/components/topic/Topic";


type Props = {
  token: string;
  savedTopic: TopicModel;
  onChange: () => void;

}



export function Topic({ savedTopic, token, onChange }: Props) {
  const navigate = useNavigate();

  const [questionsOpen, setQuestionsOpen] = useState(false);

  const [topicEditing, setTopicEditing] = useState(false);


  const [topicName, setTopicName] = useState("");


  const handleTopicEdit = () => {
    if (!topicEditing) {
      setTopicEditing(!topicEditing);
    }

    if (topicEditing) {

      if (savedTopic.name != topicName) {
        if (topicName.trim().length < 3) {
          return;
        }
        // alert("topicchange")
        setTopicEditing(!topicEditing);
        editTopic()

      }
      else {
        setTopicEditing(!topicEditing);
        // alert("Ничего не сохраняем")
      }
    }

  }


  const deleteTopic = async () => {


    try {
      const response = await Delete('topics/' + savedTopic.id, token)
      onChange()
    }
    catch (error: any) {
      readServerError(error.response.text)
      console.log("error:", error)
    }


  }

  const editTopic = async () => {
    const data = {
      title: topicName
    }

    try {
      const response = await patch('topics/' + savedTopic.id, data, token)
      onChange()



    }
    catch (error: any) {
      readServerError(error.response.text)
      console.log("error:", error)
    }


  }
  const [questions, setQuestions] = useState<QuestionModel[] | null>(null)
  const readQuestions = (message: any) => {

    const messageParsed = JSON.parse(message);

    if (messageParsed.data == null) {
      setQuestions(null);
      return;
    }
    const questionsNum = messageParsed.data.length;
    const questionsModels = [];
    for (let i = 0; i < questionsNum; i++) {
      const tagsModels = [];

      const tagsNum = messageParsed.data[i].tags ? messageParsed.data[i].tags.length : 0;

      for (let j = 0; j < tagsNum; j++) {
        const tagModel = {
          id: messageParsed.data[i].tags[j].id,
          key: messageParsed.data[i].tags[j].name
        }
        tagsModels.push(tagModel)
      }


      const questionModel = {
        number: i + 1,
        id: messageParsed.data[i].id,
        text: messageParsed.data[i].content,
        tags: tagsModels

      }
      questionsModels.push(questionModel)
    }
    setQuestions(questionsModels);


  }

  const fetchQuestions = async () => {

    try {
      const response = await get('topics/' + savedTopic.id + "/questions/", token)
      readQuestions(response.text)
      setQuestionsOpen(true)

    }
    catch (error: any) {
      // readServerError(error.response.text)
      console.log("error:", error)
    }



  }
  const changeQuestionsOpen = async () => {
    if (!questionsOpen) {
      fetchQuestions()

    }
    else {

      setQuestionsOpen(false)
    }


  }

  const onQuestionsChange = async () => {
    fetchQuestions()

  }

  useEffect(() => {

    setTopicName(savedTopic.name)

  }, [savedTopic]);



  return (
    <div>


      <div className={styles.container}>


        <div className={styles.group}>
          <IconButton onClick={handleTopicEdit}>
            {!topicEditing ? (<EditIcon fontSize="medium" sx={{ fill: "url(#linearColors)" }} />
            ) : (
              <DoneIcon fontSize="medium" sx={{ fill: "url(#linearColors)" }} />
            )}
          </IconButton>

          <div >
            <input className={!topicEditing ? styles.name : styles.nameActive} placeholder={"Название темы"} disabled={!topicEditing}
              value={topicName} onChange={(event) => { setTopicName(event.target.value) }} />
          </div>
        </div>
        <div className={styles.group}>
          <IconButton onClick={() => changeQuestionsOpen()}>

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
            {questions ? questions.map(question =>
              <div>
                <Question savedQuestion={question} onChange={onQuestionsChange} />
              </div>
            ) : <div className={styles.empty}> Пока не было добавлено вопросов</div>
            }
          </div>
          <div className={styles.addButton}>
            <IconButton onClick={() => navigate("add_question", { state: { topic: savedTopic } })}>
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



