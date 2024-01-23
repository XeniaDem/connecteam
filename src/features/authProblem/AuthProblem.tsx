
import styles from "./AuthProblem.module.css"
import padlock from "./padlock.svg"
import ellipse1 from "./ellipse1.svg"
import ellipse2 from "./ellipse2.svg"
import { Button } from "../../components/button/Button"
import { useNavigate } from "react-router-dom"


export function AuthProblem() {

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
        <div className={styles.padlock}>
          <img src={padlock} />

        </div>
        <div className={styles.title}>
          Возникли проблемы с входом в систему?

        </div>
        <div className={styles.text}>
          Введите свой адрес электронной почты, и мы вышлем вам ссылку для возврата в вашу учетную запись.

        </div>
        <div className={styles.inputs}>
          <input className={styles.input} placeholder="Эл. почта" />

        </div>
        <Button text={"Отправить"} onClick={function (): void {
          throw new Error("Function not implemented.")
        }} className={styles.button} />
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
          }}  className={styles.footerButton} />

        </div>
      </div>
    </div>
  )
}