
import styles from "./Intro.module.css"
import connecteam from "./connecteam.svg"
import autor from "./autor.svg"
import ellipse1 from "./ellipse1.svg"
import ellipse2 from "./ellipse2.svg"
import { FreeAccess } from "./freeAccess/FreeAccess"

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
        <div className={styles.title}>
          Онлайн-игра
        </div>
        <div className={styles.connecteam1}>
          Connec
          <span className={styles.connecteam2}>
            t
          </span>
          eam
        </div>
        <div className={styles.subtitle1}>
        Авторская методика профессора <br/>  психологии {" "}
          <span className={styles.subtitle2}>
          Светланы Ивановой
          </span>

        </div>
      </div>
      <FreeAccess />



    </div>
  )
}
