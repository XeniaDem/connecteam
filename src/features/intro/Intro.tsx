import { Button } from "../../components/button/Button"
import styles from "./Intro.module.css"
import connecteam from "./connecteam.svg"
import autor from "./autor.svg"

export function Intro() {


  return (
    <div className={styles.container}>
      <div className={styles.textItem}>
        Онлайн-игра
      </div>
      <div className={styles.textItem}>
        <img src={connecteam}/> 
      </div>
      <div className={styles.textItem}>
        <img src={autor}/> 
      </div>
      <div className={styles.freeAccess}>
        <div className={styles.textItem2}>
          Попробуйте бесплатный доступ на 14 дней!
        </div>
      </div>

    </div>
  )
}
