
import { useNavigate } from "react-router-dom"
import { Button } from "../../components/button/Button"
import styles from "./Login.module.css"
import connecteam from "./connecteam.svg"
import ellipse1 from "./ellipse1.svg"
import ellipse2 from "./ellipse2.svg"
import { useState } from "react"


export function Login() {

  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [showPassword, setShowPassword] = useState(false);

  var error = ""


  const handleChange = () => {
    setShowPassword(!showPassword);
  };



  const login = async () => {
  const data = {
    "email": email,
    "password": password

  }

  const rawResponse = await fetch('http://localhost:5432/auth/sign-in/email', {
    method: 'POST',
    mode: "no-cors",

    headers: {
      'Access-Control-Allow-Origin': '*',
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  const content = await rawResponse.json();

  console.log(content);

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
          <input className={styles.input} placeholder="Эл. почта/номер телефона"  value={email} onChange={(event) => { setEmail(event.target.value) }}/>
          <div className={styles.inputContainer}>
            <input type={showPassword ? "text" : "password"}
              className={styles.input} placeholder="Пароль" value={password} onChange={(event) => { setPassword(event.target.value) }} />

            <Button text={""} onClick={handleChange} className = {showPassword ? styles.eye : styles.eyeClosed}
            />
          </div>
        </div>

        <div className={styles.errorMessage}>
          {error}

        </div>

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
    </div>
  )
}