import { useEffect, useRef, useState } from "react";
import styles from "./NewQuestionPage.module.css"
import { Topic } from "../../../topics/topic/Topic";
import { TopicModel } from "../topic/Topic";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectToken } from "../../../auth/authSlice";
import { Button } from "../../../../components/button/Button";
import { FilePicker } from "./filePicker/FilePicker";
import { post, readServerError } from "../../../../utils/api";
import useAutosizeTextArea from "../../../../app/hooks/useAutoResizeTextArea";



export function NewQuestionPage() {



  const navigate = useNavigate()

  const token = useSelector(selectToken)


  const [questionsText, setQuestionsText] = useState("");


  const [formSubmitted, setFormSubmitted] = useState(false);


  const getErrorMessage = () => {
    if (questionsText.trim() == "") {
      return ("Введите текст вопроса.")

    }
  }
  var errorMessage = getErrorMessage()




  const addQuestions = async () => {
    setFormSubmitted(true)
    if (errorMessage != null) {
      return;
    }
    const questions = questionsText.split("\n")

    for (let i = 0; i < questions.length; i++) {
      const data = {
        content: questions[i]
      }

      try {
        const response = await post('topics/' + topic?.id + "/questions/", data, token)

        setFormSubmitted(false)
        setQuestionsText("")
        navigate(-1);

      }
      catch (error: any) {
        readServerError(error.response.text)
        console.log("error:", error)
      }
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

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useAutosizeTextArea(textAreaRef.current, questionsText);

  const showSelectedFile = (files: File[]) => {
    let reader = new FileReader();

    const file = files[0];
    reader.onload = (e: any) => {
      const fileContent = e.target.result;
      // console.log(file);
      setQuestionsText(fileContent)

    };

    // reader.onerror = (e) => alert(e.target.error.name);
    reader.readAsText(file);


  }
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
            value={questionsText} onChange={(event) => setQuestionsText(event.target.value)} ref={textAreaRef} />
          <div className={styles.filePicker}>
            <FilePicker onFilesSelected={showSelectedFile} />
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