
import { useNavigate } from "react-router-dom"
import { Button } from "../../components/button/Button"
import styles from "./Login.module.css"
import connecteam from "./connecteam.svg"
import ellipse1 from "./ellipse1.svg"
import ellipse2 from "./ellipse2.svg"
import { useState } from "react"
import validator from "validator"
import request from "superagent"
import disableScroll from 'disable-scroll';
import { EmailConfirmationPopup } from "../registration/emailConfirmationPopup/EmailConfirmationPopup"
import { SuccessPopup } from "../registration/successPopup/SuccessPopup"
import { Header } from "../header/Header"
import { useDispatch } from "react-redux"
import { setToken } from "../auth/authSlice"


export function Login() {

  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [showPassword, setShowPassword] = useState(false);


  const handleChange = () => {
    setShowPassword(!showPassword);
  };

  //   const login = async () => {
  //   const data = {
  //     "email": email,
  //     "password": password

  //   }

  //   const rawResponse = await fetch('http://localhost:5432/auth/sign-in/email', {
  //     method: 'POST',
  //     // mode: "no-cors",

  //     headers: {
  //       'Access-Control-Allow-Origin': '*',
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(data)
  //   });

  //   const content = await rawResponse.json();

  //   console.log(content);

  // }


  const [formSubmitted, setFormSubmitted] = useState(false);
  const [verifyOpen, setVerifyOpen] = useState(false);

  const [successOpen, setSuccessOpen] = useState(false);


  const openVerifyPopup = () => {
    disableScroll.on()
    setVerifyOpen(true)

  }

  const getErrorMessage = () => {

    if (!validator.isEmail(email)) {
      return "Некорректно введен адрес эл. почты"
    }

    if (password.length < 8) {
      return "Пароль должен содержать хотя бы 8 символов"
    }
    return null
  }

  var errorMessage = getErrorMessage()

  // const [token, setToken] = useState("");

  let token = ""

  const saveToken = (message: any) => {

    var messageParsed = JSON.parse(message);
    var content = messageParsed.token

    // setToken(content)
    token = content
    dispatch(setToken(token))

  }

  const readServerError = (message: any) => {
    // alert(message)
    var messageParsed = JSON.parse(message);
    var content = messageParsed.message

    if (content.includes("User is not verified")) {
      verifyEmail()
      openVerifyPopup()
      return ("Эл. адрес не верифицирован")

    }
    if (content.includes("Invalid login data")) {
      return ("Неверный логин или пароль. Попробуйте еще раз")
    }

    return content;
  }


  const [loginError, setLoginError] = useState("")

  const dispatch = useDispatch()

  const login = async () => {
    setFormSubmitted(true)
    if (errorMessage != null) {
      return;
    }

    const data = {
      "email": email,
      "password": password

    }
    try {

      const response = await request.post('http://localhost:5432/auth/sign-in/email')
        .set('Access-Control-Allow-Origin', '*')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send(data)
        .then(

          response => saveToken(response.text)

        )
        .catch(error => {
          setLoginError(readServerError(error.response.text))
          throw new Error;

        })
      setLoginError("")
      // alert("token to send " + token)
      navigate("/user_page", { state: { token: token } })

    }
    catch (error: any) {

      // alert(error.text)
      console.log("error:", error)
    }

  }

  const [id, setId] = useState("");
  // const [code, setCode] = useState("");

  const saveId = (message: any) => {
    var messageParsed = JSON.parse(message);
    var id = messageParsed.id
    // var code = messageParsed.confirmationCode

    setId(id)
    // setCode(code)

  }
  const verifyEmail = async () => {
    const data = {
      "email": email,
    }
    try {

      const response = await request.post('http://localhost:5432/auth/verify-email')
        .set('Access-Control-Allow-Origin', '*')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send(data)
        .then(
          response => saveId(response.text)
        )
        .catch(error => {
          alert(error.response.text)
          throw new Error;
        })
      // alert("saved id: " + id)


    }
    catch (error: any) {
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

    if (content.includes("Wrong code")) {
      return ("Введенный код неверен. Пожалуйста, попробуйте еще раз.")

    }
    return content;

  }


  const verifyUser = async () => {
    // alert("saved id2: " + id)
    setVerifySubmitted(true)
    setVerifyError("")

    alert(codeValue)

    const data = {
      "id": id.toString(),
      "code": codeValue?.toString()

    }
    try {

      const response = await request.post('http://localhost:5432/auth/verify-user')
        .set('Access-Control-Allow-Origin', '*')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send(data)
        .then(

          response => alert(response.text)

        )
        .catch(error => {
          // alert(error.response.text)
          setVerifyError(readVerifyError(error.response.text))
          throw new Error;
        })

      setVerifyOpen(false)
      login()
      openSuccessPopup()

    }
    catch (error: any) {
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
          <input className={styles.input} placeholder="Эл. почта" value={email} onChange={(event) => { setEmail((event.target.value).replace(/\s/g, '')) }} />
          <div className={styles.inputContainer}>
            <input type={showPassword ? "text" : "password"}
              className={styles.input} placeholder="Пароль" value={password} onChange={(event) => { setPassword((event.target.value).replace(/\s/g, '')) }} />

            <Button text={""} onClick={handleChange} className={showPassword ? styles.eye : styles.eyeClosed}
            />
          </div>
        </div>

        {errorMessage && formSubmitted && (<div className={styles.errorMessage}>
          {errorMessage}

        </div>)}

        {formSubmitted && loginError ? (
          <div className={styles.errorMessage}>
            {loginError}
          </div>

        ) : (
          <div />
        )}

        <Button text={"Войти"} onClick={login} className={styles.button} />
        <div className={styles.footerContainer}>

          <Button text={"Забыли пароль?"} onClick={() => {
            navigate("/forgot_password")
          }} className={styles.footerButton} />

        </div>
        <div className={styles.footerContainer}>
          <div className={styles.footerItem}>
            Нет аккаунта?

          </div>
          <Button text={"Зарегистрироваться"} onClick={() => {
            navigate("/register")
          }} className={styles.footerButton} />

        </div>

      </div>
      {verifyOpen ? <EmailConfirmationPopup onClick={verifyUser}
        value={codeValue} onValueChange={setCodeValue}
        formSubmitted={verifySubmitted} errorMessage={verifyError} /> : null}

      {successOpen ? <SuccessPopup isLogin={true} /> : null}
    </div>
  )
}