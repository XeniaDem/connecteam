
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

  const readServerError = (message: any) => {

    if (message.includes("duplicate key value violates")) {
      return ("Пользователь с таким эл. адресом уже существует")

    }
    return message;
  }
  const openVerifyPopup = () => {
    disableScroll.on()
    setVerifyOpen(true)

  }


  const [registrationError, setRegistrationError] = useState("")



  const [id, setId] = useState("");
  const saveId = (message: any) => {
    var id = message.match(/\d+/)

    setId(id)
    // alert("saved id: " + id)
  }



  const register = async () => {
    setFormSubmitted(true)
    if (errorMessage != null) {
      return;
    }

    const data = {
      "email": email,
      "phone_number": "89912818155",
      "first_name": name,
      "second_name": surname,
      "password": password

    }
    try {

      const response = await request.post('http://localhost:5432/auth/sign-up')
        .set('Access-Control-Allow-Origin', '*')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send(data)
        .then(

          response => saveId(response.text)

        )
        .catch(error => {
          setRegistrationError(readServerError(error.response.text))
          // alert(registrationError)
          throw new Error;

        })

      setRegistrationError("")
      verifyEmail()
      openVerifyPopup()

      // if (response.ok) {
      //   const jsonContent = await response.body;
      //   console.log(jsonContent);
      // } else {
      //   alert("ndnbdnd")

      //   const textContent = response.text;
      //   alert(textContent)
      //   console.log("textContent", textContent);

      // }


    }
    catch (error: any) {

      // alert(error.text)
      console.log("error:", error)
    }

  }

  const [code, setCode] = useState("");
  const saveCode = (message: any) => {
    setCode(message.match(/\d+/))
  }
  const verifyEmail = async () => {
    const data = {
      "email": email,
    }
    try {

      const response = await request.post('http://localhost:5432/auth/verify/email')
        .set('Access-Control-Allow-Origin', '*')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send(data)
        .then(


          response => saveCode(response.text)

        )
        .catch(error => {
          // alert(error.response.text)
          throw new Error;
        })


    }
    catch (error: any) {

      // alert(error.text)
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



  const verifyUser = async () => {
    setVerifySubmitted(true)
    setVerifyError("")
    if (codeValue != code) {
      setVerifyError("Введенный код неверен. Пожалуйста, попробуйте еще раз.")
      // alert("Коды не совпадают. " + " saved: " + code + " typed: " + codeValue)

      return;
    }


    const data = {
      "id": "" + id + "",

    }
    try {

      const response = await request.post('http://localhost:5432/auth/verify/user')
        .set('Access-Control-Allow-Origin', '*')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send(data)
        .then(

          // response => alert(response.text)

        )
        .catch(error => {
          // alert(error.response.text)
          setVerifyError(error.response.text)
          throw new Error;
        })

      setVerifyOpen(false)
      openSuccessPopup()

      // if (response.ok) {
      //   const jsonContent = await response.body;
      //   console.log(jsonContent);
      // } else {
      //   alert("ndnbdnd")

      //   const textContent = response.text;
      //   alert(textContent)
      //   console.log("textContent", textContent);

      // }


    }
    catch (error: any) {

      // alert(error.text)
      console.log("error:", error)

      // errorMessage = error
    }

  }




  return (
    <div>
      <div className={(!verifyOpen) ? styles.container : styles.containerDisabled}>
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
          <input className={styles.input} placeholder="Эл. почта/номер телефона" value={email}
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

      {/* <SuccessPopup /> */}
    </div>
  )
}

function validate(email: string) {
  throw new Error("Function not implemented.")
}
