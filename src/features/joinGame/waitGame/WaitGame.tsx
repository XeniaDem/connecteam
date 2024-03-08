
import styles from "./WaitGame.module.css"
import ellipse1 from "../../app/assets/ellipse1.svg"
import ellipse2 from "../../app/assets/ellipse2.svg"

import { Button } from "../../../components/button/Button"


type Props = {
  name: string;
  date: string;
}

WaitGame.defaultProps = { name: "Игра", date: "19.10.2023" }

export function WaitGame(props: Props) {
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
          Ожидайте начала игры <br /> "{props.name}"
        </div>
        <div className={styles.date}>
          {props.date}
        </div>

        <Button text={"Зарегистрироваться"} onClick={function (): void {
          throw new Error("Function not implemented.")
        }} className={styles.registerButton} />
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