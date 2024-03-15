
import styles from "./EnterGame.module.css"
import ellipse1 from "../../../app/assets/ellipse1.svg"
import ellipse2 from "../../../app/assets/ellipse2.svg"

import { Button } from "../../../components/button/Button"


type Props = {
  name: string;
  date: string;
}

EnterGame.defaultProps = { name: "Игра", date: "19.10.2023" }

export function EnterGame(props: Props) {
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.ellipse1}>
          <img src={ellipse1} />
        </div>
        <div className={styles.ellipse2}>
          <img src={ellipse2} />
        </div>

        <div className={styles.title}>
        Перед началом игры введите Имя и <br/> Фамилию или войдите в аккаунт
        </div>
        <div className={styles.inputs}>
          <input className={styles.input} placeholder="Имя" />
          <input className={styles.input} placeholder="Фамилия" />
        </div>

        <Button text={"Продолжить"} onClick={function (): void {
          throw new Error("Function not implemented.")
        }} className={styles.continueButton} />
        <div className={styles.footerContainer}>
        <Button text={"Войти в аккаунт"} onClick={function (): void {
            throw new Error("Function not implemented.")
          }} className={styles.footerButton} />
          <Button text={"Зарегистрироваться"} onClick={function (): void {
            throw new Error("Function not implemented.")
          }} className={styles.footerButton} />

        </div>
      </div>
    </div>
  )
}