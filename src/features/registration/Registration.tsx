
import { Button } from "../../components/button/Button"
import styles from "./Registration.module.css"
import connecteam from "./connecteam.svg"
import ellipse1 from "./ellipse1.svg"
import ellipse2 from "./ellipse2.svg"


export function Registration() {
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
          <input className={styles.input} placeholder="Имя" />
          <input className={styles.input} placeholder="Фамилия" />
          <input className={styles.input} placeholder="Придумайте пароль" />
          <input className={styles.input} placeholder="Повторите пароль" />
        </div>
        <Button text={"Зарегистрироваться"} onClick={function (): void {
          throw new Error("Function not implemented.")
        }} className={styles.button} />
        <div className={styles.footerContainer}>
          <div className={styles.footerItem}>
      Уже есть аккаунт?
          
          </div>
          <Button text={"Войти"} onClick={function (): void {
          throw new Error("Function not implemented.")
        }} className={styles.footerButton} />
          
        </div>

      </div>
    </div>
  )
}