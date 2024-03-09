
import styles from "./Plans.module.css"
import rectangle from "./rectangle.svg"
import { PlanList } from "../../planList/PlanList"


export function Plans() {
  return (
    <div id = "plans">
      <div className={styles.title}>
        Форматы участия
      </div>
      <div className={styles.subtitle}>
        Выбор из трех планов
      </div>
      <div className={styles.container}>
        {/* {!isMobile && <div className={styles.ellipse1}>
          <img src={ellipse1} />
        </div>} */}
        <div className={styles.rectangle}>
          <img src={rectangle} />
        </div>
        <PlanList isLogged = {false}/>
        
      </div>


    </div>
  )
}