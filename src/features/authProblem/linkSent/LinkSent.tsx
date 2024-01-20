
import styles from "./LinkSent.module.css"
import padlock from "../padlock.svg"
import ellipse1 from "../ellipse1.svg"
import ellipse2 from "../ellipse2.svg"
import { Button } from "../../../components/button/Button"
import finalPropsSelectorFactory from "react-redux/es/connect/selectorFactory"



type Props = {
  email: string;

}

LinkSent.defaultProps = { email: "s*******2@y*****.ru"}

export function LinkSent(props: Props) {
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
          Ссылка отправлена

        </div>
        <div className={styles.text}>
        Мы отправили электронное письмо на адрес {" "}
        <span className={styles.email}>
        {props.email} 
        </span>
        {" "} со ссылкой для возврата в ваш аккаунт.

        </div>

        <Button text={"Хорошо"} onClick={function (): void {
          throw new Error("Function not implemented.")
        }} className={styles.button} />
      </div>
    </div>
  )
}