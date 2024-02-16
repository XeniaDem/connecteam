
import { Header } from "../../header/Header"
import styles from "./QuestionsPage.module.css"
import icon from "./icon.svg"
import questions from "./questions.svg"
import { JSXElementConstructor, ReactElement, ReactNode, useEffect, useState } from "react"
import { get } from "../../../utils/api"
import { useSelector } from "react-redux"
import { selectToken } from "../../auth/authSlice"
import { useNavigate } from "react-router-dom"
import { JSX } from "react/jsx-runtime"
import disableScroll from 'disable-scroll';
import { Topic, TopicModel } from "./topic/Topic"
import { QuestionModel } from "./question/Question"
import { Button } from "../../../components/button/Button"


type Props = {


}



export function QuestionsPage() {

  const navigate = useNavigate()

  const token = useSelector(selectToken)

  const [fetched, setFetched] = useState(false)

  const [topics, setTopics] = useState<TopicModel[] | null>(null)


  const readTopics = (message: any) => {
    const messageParsed = JSON.parse(message);

    const topicsNum = messageParsed.data.length;

    const topicModels = [];
    for (let i = 0; i < topicsNum; i++) {


      const questionsNum = 5 // (messageParsed.data[i].length);
      const questionModels = [];
      for (let j = 0; j < questionsNum; j++) {
        const questionModel = {
          number: j + 1,
          text: "Как составлять расписание?", //messageParsed.data[i].questions[j].text

        }
        questionModels.push(questionModel)
      }

      const topicModel = {
        id: messageParsed.data[i].id,
        name: messageParsed.data[i].title,
        questions: questionModels,


      }
      topicModels.push(topicModel)

    }
    setTopics(topicModels)
    setFetched(true)

  }


  const readServerError = (message: any) => {
    var messageParsed = JSON.parse(message);
    var content = messageParsed.message

    if (content.includes("token is expired")) {
      navigate("/login")
      return ("Срок действия токена вышел.")

    }
    alert(content);

  }

  const fetchTopics = async () => {

    try {
      const response = await get('topics/', token)
      readTopics(response.text)
      return;

    }
    catch (error: any) {
      readServerError(error.response.text)
      console.log("error:", error)
    }


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
      {/* <div className={styles.header}>
        <Header adminHeader={true} />
      </div> */}
      <div className={styles.up}>
        <div className={styles.title}>
          Список тем и вопросов
        </div>
        <Button text={"Загрузить вопрос"} onClick={() => navigate("add_question")} className={styles.addButton} />
      </div>


      <div className={styles.topics}>


        {topics?.map(topic =>
          <div>
            <Topic savedTopic={topic} token={token} onChange={onChange} />

          </div>

        )

        }

      </div>


    </div>
  )
}



