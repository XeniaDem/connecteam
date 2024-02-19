import { useEffect, useState } from "react";
import styles from "./NewQuestionPage.module.css"
import { Topic } from "../../../topics/topic/Topic";
import { TopicModel } from "../topic/Topic";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectToken } from "../../../auth/authSlice";
import { Button } from "../../../../components/button/Button";
import { FilePicker } from "./filePicker/FilePicker";



export function NewQuestionPage() {



  const navigate = useNavigate()

  const token = useSelector(selectToken)



  const readServerError = (message: any) => {
    var messageParsed = JSON.parse(message);
    var content = messageParsed.message

    if (content.includes("token is expired")) {
      navigate("/login")
      return ("Срок действия токена вышел.")

    }
    alert(content);

  }





  const [questionText, setQuestionText] = useState("");



  const [formSubmitted, setFormSubmitted] = useState(false);


  const getErrorMessage = () => {
    if (questionText.trim() == "") {
      return ("Введите текст вопроса.")

    }
  }
  var errorMessage = getErrorMessage()




  const addQuestions = async () => {
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



  const [topic, setTopic] = useState<TopicModel>()

  const { state } = useLocation();

  useEffect(() => {
    if (state == null) {
      navigate("/admin/questions_page")
    }
    setTopic(state.topic)
    

  }, []);



  return (
    <div>
      <div className={styles.container}>
        <svg width={0} height={0}>
          <linearGradient id="linearColors" x1={1} y1={0} x2={1} y2={1}>
            <stop offset={0} stopColor="#55C6F7" />
            <stop offset={1} stopColor="#2AF8BA" />
          </linearGradient>
        </svg>

        <div className={styles.back}>
          <Button text={""} onClick={() => { navigate(-1) }} className={styles.backButton} />
        </div>
        <div className={styles.title}>
          Добавить вопросы
        </div>
        <div className={styles.subtitle}>
          Выбранная тема
        </div>



        <div className={styles.topic}>
          {topic && <Topic name={topic.name} withCheckBox={false}
            selected={true} onTopicClicked={() => null} />}
        </div>



        <div className={styles.subtitle}>
          Задайте вопрос
        </div>
        <div className={styles.addQuestions}>
          <textarea className={styles.textarea} placeholder={"Текст вопроса"}
            value={questionText} onChange={(event) => { setQuestionText(event.target.value) }} />
          <div className={styles.filePicker}>
            <FilePicker />
          </div>

        </div>
        {errorMessage && formSubmitted && (<div className={styles.errorMessage}>
          {errorMessage}

        </div>)}


        <div className={styles.buttonContainer}>
          <Button text={"Добавить вопросы"} onClick={addQuestions} className={styles.addButton} />
        </div>

      </div>
     


    </div>
  )
}