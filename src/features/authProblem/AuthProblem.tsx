
import styles from "./AuthProblem.module.css"
import padlock from "./padlock.svg"
import ellipse1 from "./ellipse1.svg"
import ellipse2 from "./ellipse2.svg"
import { Button } from "../../components/button/Button"
import { useNavigate } from "react-router-dom"
import validator from "validator"
import { useState } from "react"
import { patch} from "../../utils/api"


export function AuthProblem() {

  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [formSubmitted, setFormSubmitted] = useState(false);


  const getErrorMessage = () => {

    if (!validator.isEmail(email)) {
      return "Некорректно введен адрес эл. почты"
    }


    return null
  }

  var errorMessage = getErrorMessage()

  const [restoreError, setRestoreError] = useState("")

  const readRestoreError = (message: any) => {
    var messageParsed = JSON.parse(message);
    var content = messageParsed.message;
    if (content.includes("not exist")) {
      return "Пользователя с таким эл. адресом не существует"

    }
    return content;


  }

  const restorePassword = async () => { ////////////////////
    setFormSubmitted(true)
    if (errorMessage != null) {
      return;
    }

    const data = {
      "email": email,

    }
    try {

      const response = await patch('auth/password', data)

      navigate("link_sent", { state: { email: email } })



    }
    catch (error: any) {
      setRestoreError(readRestoreError(error.response.text))
      console.log("error:", error)
    }

  }



  return (
    <div>
      <div className={styles.container}>
        <div className={styles.ellipse1}>
          <img src={ellipse1} />

        </div>
        <div className={styles.ellipse2}>
          <img src={ellipse2} />

        </div>
        <div className={styles.padlock}>
          <img src={padlock} />

        </div>
        <div className={styles.title}>
          Возникли проблемы с входом в систему?

        </div>
        <div className={styles.text}>
          Введите ваш адрес электронной почты, и мы вышлем временный пароль для возврата в вашу учетную запись.

        </div>
        <div className={styles.inputs}>
          <input className={styles.input} placeholder="Эл. почта" value={email} onChange={(event) => { setEmail((event.target.value).replace(/\s/g, '')) }} />

        </div>
        {errorMessage && formSubmitted && (<div className={styles.errorMessage}>
          {errorMessage}

        </div>)}
        {formSubmitted && restoreError ? (
          <div className={styles.errorMessage}>
            {restoreError}
          </div>

        ) : (
          <div />
        )}
        <Button text={"Отправить"} onClick={restorePassword} className={styles.button} />
        <div className={styles.footerContainer}>

          <div className={styles.line} />
          <div className={styles.footerItem}>
            или
          </div>
          <div className={styles.line} />

        </div>
        <div className={styles.footerContainer}>

          <Button text={"Создайте новый аккаунт"} onClick={() => {
            navigate("/auth/register")
          }} className={styles.footerButton} />

        </div>
      </div>
    </div>
  )
}