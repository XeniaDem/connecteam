import { Button } from "../../../components/button/Button"
import styles from "./WhoPlay.module.css"
import logo1 from "./logo1.svg"
import logo2 from "./logo2.svg"
import logo3 from "./logo3.svg"
import logo4 from "./logo4.svg"
import logo5 from "./logo5.svg"
import vector from "./vector.svg"
import ellipse from "./ellipse.svg"
import pentagon from "./pentagon.svg"

export function WhoPlay() {


  return (
    <div>
      <div className={styles.title}>
        В нашу игру играют
      </div>
      <div className={styles.line}>
      <div className={styles.vector}>
          <img src={vector} />
          </div>
        <div className={styles.card}>
          <div className={styles.logo}>
          <img src={logo1} />
          </div>
          <div className={styles.who}>
          Собственники бизнеса
          </div>
          <div className={styles.text}>
          Чтобы понимать, кто работает в их компании и дает результат
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.logo}>
          <img src={logo2} />
          </div>
          <div className={styles.who}>
          Руководители
          </div>
          <div className={styles.text}>
          Чтобы понимать, как выстраивать взаимодействие внутри отдела
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.logo}>
          <img src={logo3} />
          </div>
          <div className={styles.who}>
          Новые сотрудники
          </div>
          <div className={styles.text}>
          Чтобы быстрее влиться в коллектив и адаптироваться в нем
          </div>
        </div>

      </div>
      <div className={styles.line}>
      <div className={styles.ellipse}>
          <img src={ellipse} />
          </div>
          <div className={styles.pentagon}>
          <img src={pentagon} />
          </div>
      <div className={styles.card}>
          <div className={styles.logo}>
          <img src={logo4} />
          </div>
          <div className={styles.who}>
          Между отделами
          </div>
          <div className={styles.text}>
          Чтобы улучшить понимание и взаимодействие
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.logo}>
          <img src={logo5} />
          </div>
          <div className={styles.who}>
          Сотрудники отдела
          </div>
          <div className={styles.text}>
            Чтобы получить больше информации друг о друге и укрепить связи
          </div>
        </div>
      </div>
      
    </div>
  )
}