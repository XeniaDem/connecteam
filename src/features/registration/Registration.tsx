
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


export function Registration() {
  const navigate = useNavigate()


  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [surname, setSurname] = useState("")
  const [password, setPassword] = useState("")
  const [passwordRepeated, setPasswordRepeated] = useState("")

  const [showPassword, setShowPassword] = useState(false);


  const [formSubmitted, setFormSubmitted] = useState(false);




  const handleChange = () => {
    setShowPassword(!showPassword);
  };

  const getErrorMessage = () => {

    if (email.length < 3 || !email.includes("@")) {
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

  const errorMessage = getErrorMessage()



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
      .set ('Accept', 'application/json')
      .set('Content-Type','application/json')
    



      if (response.ok) {
        const jsonContent = await response.body();
        console.log(jsonContent);
      } else {

        const textContent = response.text;
        console.log("textContent", textContent);

      }


    }
    catch (error: any) {
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
        <div className={styles.connecteam}>
          <img src={connecteam} />

        </div>

        <div className={styles.inputs}>
          <input className={styles.input} placeholder="Эл. почта/номер телефона" value={email} onChange={(event) => { setEmail(event.target.value) }} />
          <input className={styles.input} placeholder="Имя" value={name} onChange={(event) => { setName(event.target.value) }} />
          <input className={styles.input} placeholder="Фамилия" value={surname} onChange={(event) => { setSurname(event.target.value) }} />
          <div className={styles.inputContainer}>
            <input type={showPassword ? "text" : "password"}
              className={styles.input} placeholder="Придумайте пароль" value={password} onChange={(event) => { setPassword(event.target.value) }} />

            <Button text={""} onClick={handleChange} className={showPassword ? styles.eye : styles.eyeClosed}
            />
          </div>
          <input type={showPassword ? "text" : "password"}
            className={styles.input} placeholder="Повторите пароль" value={passwordRepeated} onChange={(event) => { setPasswordRepeated(event.target.value) }} />
        </div>


        {errorMessage && formSubmitted && (<div className={styles.errorMessage}>
          {errorMessage}

        </div>)}




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
      <EmailConfirmationPopup />
      <SuccessPopup />
    </div>
  )
}