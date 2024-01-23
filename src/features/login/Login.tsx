
import { useNavigate } from "react-router-dom"
import { Button } from "../../components/button/Button"
import styles from "./Login.module.css"
import connecteam from "./connecteam.svg"
import ellipse1 from "./ellipse1.svg"
import ellipse2 from "./ellipse2.svg"


export function Login() {

  const navigate = useNavigate()




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
          <input className={styles.input} placeholder="Эл. почта/номер телефона" />
          <input type="password" className={styles.input} placeholder="Пароль" />

        </div>
        <Button text={"Войти"} onClick={function (): void {
          throw new Error("Function not implemented.")
        }} className={styles.button} />
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