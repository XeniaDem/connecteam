import { useLocation, useNavigate } from "react-router-dom"
import { Button } from "../../../components/button/Button"
import styles from "./Login.module.css"
import ellipse1 from "../../../app/assets/ellipse1.svg"
import ellipse2 from "../../../app/assets/ellipse2.svg"
import logoBig from "../../../app/assets/logoBig.svg"
import logoSmall from "../../../app/assets/logoSmall.svg"
import { useState } from "react"
import validator from "validator"
import { useDispatch } from "react-redux"
import { Access, signIn } from "../../../store/authSlice"
import { post } from "../../../utils/api"
import { isMobile } from 'react-device-detect';


export function Login() {

  const { state } = useLocation();

  const navigate = useNavigate()


  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [showPassword, setShowPassword] = useState(false);


  const handleChange = () => {
    setShowPassword(!showPassword);
  };


  const [formSubmitted, setFormSubmitted] = useState(false);



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



  const readLoginError = (message: any) => {
    var messageParsed = JSON.parse(message);
    var content = messageParsed.message

    if (content.includes("invalid login data")) {
      return ("Неверный логин или пароль. Попробуйте еще раз")
    }

    return content;
  }


  const [loginError, setLoginError] = useState("")

  const dispatch = useDispatch()

  let access = ""

  const saveAccessAndToken = (message: any) => {
    var messageParsed = JSON.parse(message);
    access = messageParsed.access;
    const token = messageParsed.access_token;
    const id = messageParsed.user_id

    dispatch(signIn({ token: token, access: access as Access, userId: id }));

  }


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
      // alert(`${process.env.REACT_APP_API_URL}`)
      const response = await post('auth/sign-in/email', data)
      saveAccessAndToken(response.text)
      setLoginError("")
      if (access == "admin" || access == "super_admin") {
        navigate("/admin")
      }
      else {
        if (state && state.planInvitation) {
          navigate("/invite/plan/" + state.planInvitation)
        }
        else if (state && state.gameInvitation) {
          navigate("/invite/game/" + state.gameInvitation)
        }
        else {
          navigate("/user_page")
        }
      }

    }
    catch (error: any) {
      console.log("error:", error)
      setLoginError(readLoginError(error.response.text))

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
        <div className={styles.connecteam}>
          {!isMobile ? <img src={logoBig} /> : <img src={logoSmall} />}
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
          null
        )}

        <Button text={"Войти"} onClick={login} className={styles.button} />

        <div className={styles.footerContainer}>
          <Button text={"Забыли пароль?"} onClick={() => {
            navigate("/auth/forgot_password")
          }} className={styles.footerButton} />
        </div>
        <div className={styles.footerContainer}>
          <div className={styles.footerItem}>
            Нет аккаунта?
          </div>
          <Button text={"Зарегистрироваться"} onClick={() => {
            navigate("/auth/register", { state: { planInvitation: state && state.planInvitation, gameInvitation: state && state.gameInvitation } })
          }} className={styles.footerButton} />
        </div>
      </div>
    </div>
  )
}