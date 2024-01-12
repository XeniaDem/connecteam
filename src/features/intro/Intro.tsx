import { Button } from "../../components/button/Button"
import styles from "./Intro.module.css"
import connecteam from "./connecteam.svg"
import autor from "./autor.svg"
import ellipse1 from "./ellipse1.svg"
import ellipse2 from "./ellipse2.svg"
import { FreeAccess } from "./FreeAccess/FreeAccess"

export function Intro() {


  return (
    <div className={styles.container}>
      <div>
        <div className={styles.ellipse1}>
          <img src={ellipse1} />
        </div>
        <div className={styles.ellipse2}>
          <img src={ellipse2} />
        </div>
        <div className={styles.textItem}>
          Онлайн-игра
        </div>
        <div className={styles.textItem}>
          <img src={connecteam} />
        </div>
        <div className={styles.textItem}>
          <img src={autor} />
        </div>
      </div>
      <FreeAccess />



    </div>
  )
}
