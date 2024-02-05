
import styles from "./Introduction.module.css"
import connecteam from "./connecteam.svg"
import autor from "./autor.svg"
import ellipse1 from "./ellipse1.svg"
import ellipse2 from "./ellipse2.svg"
import element from "./element.svg"
import star from "./star.svg"
import line from "./line.svg"
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { useNavigate } from "react-router-dom"

export function Introduction() {
  const navigate = useNavigate()


  return (
    <div className={styles.container}>
      <div className={styles.ellipse1}>
        <img src={ellipse1} />
      </div>
      <div className={styles.ellipse2}>
        <img src={ellipse2} />
      </div>

      <div className={styles.left}>
        <div className={styles.connecteam}>
          <div className={styles.connecteam1}>
            Connec
            <span className={styles.connecteam2}>
              t
            </span>
            eam
          </div>
        </div>
        <div className={styles.title}>
          <div className={styles.title1}>
            Онлайн-игра <br />
            <span className={styles.title2}>
              Для вашей <br /> команды
            </span>
          </div>
        </div>

        <div className={styles.subtitle1}>
          Авторская методика профессора психологии <br />
          <span className={styles.subtitle2}>
            Светланы Ивановой
          </span>

        </div>
        <div className={styles.start} onClick={() => navigate("#packages")}>
          Начать
          <ArrowOutwardIcon htmlColor="FFF" />

        </div>
      </div>

      <div className={styles.right}>
        <div className={styles.element}>
          <img src={element} />
          <div className={styles.star}>
            <img src={star} />

          </div>
          <div className={styles.line}>
            <img src={line} />

          </div>

        </div>




      </div>




    </div>
  )
}