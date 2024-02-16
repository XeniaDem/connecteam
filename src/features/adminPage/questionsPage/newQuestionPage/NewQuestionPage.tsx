
import React, { useEffect, useState } from "react";
import styles from "./NewQuestionPage.module.css"
import { Topic } from "../../../topics/topic/Topic";
import { TopicModel } from "../topic/Topic";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectToken } from "../../../auth/authSlice";
import { get } from "../../../../utils/api";
import { Header } from "../../../header/Header";
import { Button } from "../../../../components/button/Button";
import ellipse from "./ellipse.svg"
import disableScroll from 'disable-scroll';
import { NewTopicPopup } from "./newTopicPopup/NewTopicPopup";



export function NewQuestionsPage() {


  const navigate = useNavigate()

  const token = useSelector(selectToken)

  const [fetched, setFetched] = useState(false)

  const [topics, setTopics] = useState<TopicModel[] | null>(null)


  const readTopics = (message: any) => {
    const messageParsed = JSON.parse(message);

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



  const [questionText, setQuestionText] = useState("");

  const [selectedTopicId, setSelectedTopicId] = useState("");

  const [newTopicOpen, setNewTopicOpen] = useState(false)

  const [formSubmitted, setFormSubmitted] = useState(false);


  const getErrorMessage = () => {
    if (questionText.trim() == "") {
      return ("Введите текст вопроса.")

    }
    if (selectedTopicId == "") {
      return ("Выберите тему для загрузки вопроса.")

    }
  }
  var errorMessage = getErrorMessage()







  const addQuestion = async () => {
    setFormSubmitted(true)
    if (errorMessage != null) {
      return;
    }
    // const data = {
    //   text: ///
    // }

    try {
      // const response = await post('topics/', data, props.token)
      // alert(response.text)

    }
    catch (error: any) {
      readServerError(error.response.text)
      console.log("error:", error)
    }


  }


  const openNewTopicPopup = () => {
    disableScroll.on()
    setNewTopicOpen(true)
  }

  const closeNewTopicPopup = () => {
    disableScroll.off()
    setNewTopicOpen(false)
    setFetched(!fetched)
  }




  useEffect(() => {
    fetchTopics();

  }, [fetched]);




  return (
    <div>
      <div className={styles.container}>
        <svg width={0} height={0}>
          <linearGradient id="linearColors" x1={1} y1={0} x2={1} y2={1}>
            <stop offset={0} stopColor="#55C6F7" />
            <stop offset={1} stopColor="#2AF8BA" />
          </linearGradient>
        </svg>

        <div className={styles.header}>
          <Header adminHeader={true} />
        </div>
        <div className={styles.back}>
          <Button text={""} onClick={() => { navigate(-1) }} className={styles.backButton} />
        </div>
        <div className={styles.title}>
          Загрузить вопрос
        </div>
        <div className={styles.subtitle}>
          Выберите тему для вопроса
        </div>



        <div className={styles.topics}>


          {topics?.map(topic => {
            const onTopicClicked = (newValue: boolean) => {
              if (!newValue) {
                setSelectedTopicId("");
              } else {
                setSelectedTopicId(topic.id)
              }

            }

            return (
              <div>
                <Topic name={topic.name} withCheckBox={false}
                  selected={topic.id == selectedTopicId} onTopicClicked={onTopicClicked} />

              </div>
            )
          }

          )

          }
          <div className={styles.newTopic} onClick={openNewTopicPopup}>
            <div className={styles.plus}>
              <div className={styles.ellipse}>
                <img src={ellipse} />
              </div>

              +
            </div>
          </div>

        </div>
        <div className={styles.subtitle}>
          Задайте вопрос
        </div>
        <input className={styles.input} placeholder={"Текст вопроса"}
          value={questionText} onChange={(event) => { setQuestionText(event.target.value) }} />
        {errorMessage && formSubmitted && (<div className={styles.errorMessage}>
          {errorMessage}

        </div>)}


        <div className={styles.buttonContainer}>
          <Button text={"Загрузить вопрос"} onClick={addQuestion} className={styles.addButton} />
        </div>

      </div>
      {newTopicOpen ? <NewTopicPopup closePopup={closeNewTopicPopup} token={token} onChange={() => null} /> : null}


    </div>
  )
}