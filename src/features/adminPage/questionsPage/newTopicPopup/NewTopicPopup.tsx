import { useState } from "react";
import { Button } from "../../../../components/button/Button"
import styles from "./NewTopicPopup.module.css"
import ellipse1 from "../../../../app/assets/ellipse1.svg"
import ellipse2 from "../../../../app/assets/ellipse2.svg"
import { post, readServerError } from "../../../../utils/api";



type Props = {
  closePopup: () => void;
  token: string;


}

export function NewTopicPopup(props: Props) {

  const [topicName, setTopicName] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);


  const getErrorMessage = () => {
    if (topicName.trim().length < 3) {
      return ("Название темы должно содержать хотя бы 3 символа")

    }
  }
  var errorMessage = getErrorMessage()



  const addTopic = async () => {
    setFormSubmitted(true)
    if (errorMessage != null) {
      return;
    }
    const data = {
      title: topicName
    }

    try {
      const response = await post('topics/', data, props.token)
      props.closePopup()

    }
    catch (error: any) {
      readServerError(error.response.text)
      console.log("error:", error)
    }


  }


  return (

    <div>

      <div className={styles.background}>
        <div className={styles.container}>

          <div className={styles.close}>
            <Button text={""} onClick={props.closePopup} className={styles.closeButton} />
          </div>

          <div className={styles.body}>
            <div className={styles.ellipse1}>
              <img src={ellipse1} />
            </div>
            <div className={styles.ellipse2}>
              <img src={ellipse2} />
            </div>
            <div className={styles.title}>
              Добавить тему
            </div>
            <div className={styles.subtitle}>
              Задайте тему
            </div>

            <input className={styles.input} placeholder={"Название темы"}
              value={topicName} onChange={(event) => { setTopicName(event.target.value) }} />

            {errorMessage && formSubmitted && (<div className={styles.errorMessage}>
              {errorMessage}

            </div>)}
          </div>

          <Button text={"Добавить тему"} onClick={addTopic} className={styles.addButton} />

        </div>
      </div>
    </div>
  )
}