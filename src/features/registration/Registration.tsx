
import { useState } from "react"
import { Button } from "../../components/button/Button"
import styles from "./Registration.module.css"
import connecteam from "./connecteam.svg"
import ellipse1 from "./ellipse1.svg"
import ellipse2 from "./ellipse2.svg"
import { EmailConfirmationPopup } from "./emailConfirmationPopup/EmailConfirmationPopup"
import { SuccessPopup } from "./successPopup/SuccessPopup"
import { useNavigate } from "react-router-dom"
import * as request from "superagent";
import disableScroll from 'disable-scroll';
import validator from 'validator'
import { Header } from "../header/Header"
import { post } from "../../utils/api"


export function Registration() {
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [surname, setSurname] = useState("")
  const [password, setPassword] = useState("")
  const [passwordRepeated, setPasswordRepeated] = useState("")

  const [showPassword, setShowPassword] = useState(false);

  const [formSubmitted, setFormSubmitted] = useState(false);

  const [verifyOpen, setVerifyOpen] = useState(false);

  const [successOpen, setSuccessOpen] = useState(false);


  const handleChange = () => {
    setShowPassword(!showPassword);
  };

  const getErrorMessage = () => {

    if (!validator.isEmail(email)) {
      return "Некорректно введен адрес эл. почты"
    }

    if (name.length < 1 || surname.length < 1) {
      return "Поля имя и фамилия не могут быть пустыми"
    }

    if (password.length < 8) {
      return "Пароль должен содержать хотя бы 8 символов"
    }

    if (password != passwordRepeated) {
      return "Пароли не совпадают"
    }
    return null
  }


  var errorMessage = getErrorMessage()



  const openVerifyPopup = () => {
    disableScroll.on()
    setVerifyOpen(true)

  }
  const closeVerifyPopup = () => {
    disableScroll.off()
    setVerifyOpen(false)

  }


  const [registrationError, setRegistrationError] = useState("")


  const [id, setId] = useState("");
  const saveId = (message: any) => {
    var messageParsed = JSON.parse(message);
    var content = messageParsed.id
    var id = content

    setId(id)
  }
  const readServerError = (message: any) => {
    // alert(message)
    var messageParsed = JSON.parse(message);
    var content = messageParsed.message

    if (content.includes("duplicate key value violates")) {
      return ("Пользователь с таким эл. адресом уже существует")

    }
    return content;
  }


  const register = async () => {
    setFormSubmitted(true)
    if (errorMessage != null) {
      return;
    }

    const data = {
      "email": email,
      "first_name": name,
      "second_name": surname,
      "password": password

    }
    try {
      const response = await post('auth/sign-up', data)
      saveId(response.text)
      setRegistrationError("")
      verifyEmail()
      openVerifyPopup()

    }
    catch (error: any) {
      setRegistrationError(readServerError(error.response.text))
      console.log("error:", error)
    }

  }

  const verifyEmail = async () => {
    const data = {
      "email": email,
    }
    try {

      const response = await post('auth/verify-email', data)

    }
    catch (error: any) {
      alert(error.response.text)
      console.log("error:", error)
    }

  }
  const [codeValue, setCodeValue] = useState<undefined | string>('');


  const [verifySubmitted, setVerifySubmitted] = useState(false)
  const [verifyError, setVerifyError] = useState("")


  const openSuccessPopup = () => {
    disableScroll.on()
    setSuccessOpen(true)

  }

  const readVerifyError = (message: any) => {
    var messageParsed = JSON.parse(message);
    var content = messageParsed.message

    if (content.includes("Wrong verification code")) {
      return ("Введенный код неверен. Пожалуйста, попробуйте еще раз.")

    }
    return content;

  }

  const verifyUser = async () => {
    setVerifySubmitted(true)
    setVerifyError("")
    const data = {
      "id": id.toString(),
      "code": codeValue

    }
    try {

      const response = await post('auth/verify-user', data)
      alert(response.text)
      closeVerifyPopup()
      openSuccessPopup()

    }
    catch (error: any) {
      setVerifyError(readVerifyError(error.response.text))
      console.log("error:", error)
    }

  }

  return (
    <div>

      <div className={(!verifyOpen && !successOpen) ? styles.container : styles.containerDisabled}>
        <div className={styles.header}>
          <Header authHeader={true} />
        </div>

        <div className={styles.ellipse1}>
          <img src={ellipse1} />

        </div>
        <div className={styles.ellipse2}>
          <img src={ellipse2} />

        </div>
        <div className={styles.connecteam}>
          <img src={connecteam} />

        </div>

        <div className={styles.inputs}>
          <input className={styles.input} placeholder="Эл. почта" value={email}
            onChange={(event) => { setEmail((event.target.value).replace(/\s/g, '')) }} />
          <input className={styles.input} placeholder="Имя" value={name}
            onChange={(event) => { setName(event.target.value) }} />
          <input className={styles.input} placeholder="Фамилия" value={surname}
            onChange={(event) => { setSurname(event.target.value) }} />
          <div className={styles.inputContainer}>
            <input type={showPassword ? "text" : "password"}
              className={styles.input} placeholder="Придумайте пароль" value={password}
              onChange={(event) => { setPassword((event.target.value).replace(/\s/g, '')) }} />

            <Button text={""} onClick={handleChange} className={showPassword ? styles.eye : styles.eyeClosed}
            />
          </div>
          <input type={showPassword ? "text" : "password"}
            className={styles.input} placeholder="Повторите пароль" value={passwordRepeated}
            onChange={(event) => { setPasswordRepeated((event.target.value).replace(/\s/g, '')) }} />
        </div>


        {errorMessage && formSubmitted && (<div className={styles.errorMessage}>
          {errorMessage}

        </div>)}

        {formSubmitted && registrationError ? (
          <div className={styles.errorMessage}>
            {registrationError}

          </div>

        ) : (
          <div />
        )}

        <Button text={"Зарегистрироваться"} onClick={register} className={styles.button} />
        <div className={styles.footerContainer}>
          <div className={styles.footerItem}>
            Уже есть аккаунт?

          </div>
          <Button text={"Войти"} onClick={() => {
            navigate("/login")
          }} className={styles.footerButton} />

        </div>

      </div>
      {verifyOpen ? <EmailConfirmationPopup onClick={verifyUser}
        value={codeValue} onValueChange={setCodeValue}
        formSubmitted={verifySubmitted} errorMessage={verifyError} /> : null}
      {successOpen ? <SuccessPopup /> : null}
    </div>
  )
}

