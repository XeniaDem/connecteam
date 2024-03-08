import styles from "./QuestionsPage.module.css"
import { useEffect, useState } from "react"
import { get, readServerError } from "../../../utils/api"
import { useSelector } from "react-redux"
import { selectToken } from "../../../utils/authSlice"
import { useNavigate } from "react-router-dom"
import { Topic, TopicModel } from "./topic/Topic"
import { QuestionModel } from "./question/Question"
import { Button } from "../../../components/button/Button"
import disableScroll from 'disable-scroll';
import { NewTopicPopup } from "./newTopicPopup/NewTopicPopup"




export function QuestionsPage() {

  const navigate = useNavigate()

  const token = useSelector(selectToken)

  const [fetched, setFetched] = useState(false)

  const [topics, setTopics] = useState<TopicModel[] | null>(null)
  function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


  const readTopics = async (message: any) => {
    const messageParsed = JSON.parse(message);

    if (messageParsed.data == null) {
      setTopics(null)
      return;
    }

    const topicsNum = messageParsed.data.length;


    const topicModels = [];
    for (let i = 0; i < topicsNum; i++) {

      const topicModel = {
        id: messageParsed.data[i].id,
        name: messageParsed.data[i].title,
      }
      topicModels.push(topicModel)

    }
    setTopics(topicModels)

  }



  const fetchTopics = async () => {


    try {
      const response = await get('topics/', token)
      readTopics(response.text)

    }
    catch (error: any) {
      readServerError(error.response.text)
      console.log("error:", error)
    }


  }

  const [newTopicOpen, setNewTopicOpen] = useState(false)

  const openNewTopicPopup = () => {
    disableScroll.on()
    setNewTopicOpen(true)
  }

  const closeNewTopicPopup = () => {
    disableScroll.off()
    setNewTopicOpen(false)
    setFetched(!fetched)
  }




  const onChange = () => {
    setFetched(!fetched)

  }




  useEffect(() => {
    fetchTopics()


  }, [fetched]);

  return (
    <div className={styles.container}>
      <svg width={0} height={0}>
        <linearGradient id="linearColors" x1={1} y1={0} x2={1} y2={1}>
          <stop offset={0} stopColor="#55C6F7" />
          <stop offset={1} stopColor="#2AF8BA" />
        </linearGradient>
      </svg>
      <div className={styles.up}>
        <div className={styles.title}>
          Список тем и вопросов
        </div>
        <Button text={"Добавить тему"} onClick={openNewTopicPopup} className={styles.addButton} />
      </div>


      <div className={styles.topics}>

        {topics == null ? (
          <div className={styles.empty}>
            Пока не было загружено ни одной темы
          </div>

        ) : (

          (topics?.map(topic =>
            <div>
              <Topic savedTopic={topic} token={token} onChange={onChange} />

            </div>

          ))
        )}




      </div>
      {newTopicOpen ? <NewTopicPopup closePopup={closeNewTopicPopup} token={token} /> : null}


    </div>
  )
}



