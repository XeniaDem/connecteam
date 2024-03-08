
import styles from "./Introduction.module.css"
import ellipse1 from "../../../app/assets/ellipse1.svg"
import ellipse3 from "../../../app/assets/ellipse3.svg"
import element from "./element.svg"
import star from "./star.svg"
import line from "./line.svg"
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';

import {isMobile} from 'react-device-detect';


export function Introduction() {


  const start = () => {
    const element = document.getElementById("plans");
    element?.scrollIntoView();

  }


  return (
    <div className={styles.container}>
      {!isMobile && <div className={styles.ellipse1}>
        <img src={ellipse1} />
      </div>}
      <div className={styles.ellipse2}>
        <img src={ellipse3} />
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
        <div className={styles.start} onClick={start}>
          Начать
          <ArrowOutwardIcon htmlColor="FFF" />

        </div>
      </div>

      {!isMobile && (<div className={styles.element}>
        <img src={element} />
        <div className={styles.star}>
          <img src={star} />

        </div>
        <div className={styles.line}>
          <img src={line} />

        </div>

      </div>)}




    </div>
  )
}
