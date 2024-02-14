
import styles from "./AuthProblem.module.css"
import padlock from "./padlock.svg"
import ellipse1 from "./ellipse1.svg"
import ellipse2 from "./ellipse2.svg"
import { Button } from "../../components/button/Button"
import { useNavigate } from "react-router-dom"
import { Header } from "../header/Header"
import validator from "validator"
import { useState } from "react"
import { post } from "../../utils/api"


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

  const readRestoreError = (message: any) => {
    // alert(message)

    var messageParsed = JSON.parse(message);
    var content = messageParsed.message

    if (content.includes("User is not verified")) {

    }
    if (content.includes("Invalid login data")) {
      return ("Неверный логин или пароль. Попробуйте еще раз")
    }

    return content;
  }

  const restorePassword = async () => {
    setFormSubmitted(true)
    if (errorMessage != null) {
      return;
    }

    const data = {
      "email": email,

    }
    try {

      // const response = await post('auth/verify-user', data)

      // alert(response.text)
      navigate("link_sent",{ state: { email: email } } )



    }
    catch (error: any) {
      errorMessage = readRestoreError(error.response.text)
      console.log("error:", error)
    }

  }



  return (
    <div>
      <div className={styles.container}>
        <div className={styles.header}>
          <Header authHeader={true} />
        </div>
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
          Введите ваш адрес электронной почты, и мы вышлем вам ссылку для возврата в вашу учетную запись.

        </div>
        <div className={styles.inputs}>
          <input className={styles.input} placeholder="Эл. почта" value={email} onChange={(event) => { setEmail((event.target.value).replace(/\s/g, '')) }} />

        </div>
        {errorMessage && formSubmitted && (<div className={styles.errorMessage}>
          {errorMessage}

        </div>)}
        <Button text={"Отправить"} onClick={restorePassword} className={styles.button} />
        <div className={styles.footerContainer}>

          <div className={styles.line}>


          </div>
          <div className={styles.footerItem}>

            или

          </div>
          <div className={styles.line}>
          </div>

        </div>
        <div className={styles.footerContainer}>

          <Button text={"Создайте новый аккаунт"} onClick={() => {
            navigate("/register")
          }} className={styles.footerButton} />

        </div>
      </div>
    </div>
  )
}