
import styles from "../Plan.module.css"
import tick from "../../../../app/assets/tickBig.svg"





export function BasicPlan() {


  return (
    <div>
      <div className={styles.container}>
        <div className={styles.name}>
          Простой
        </div>
        <div className={styles.textBoxes}>
          <div className={styles.textBox}>
            <div className={styles.tick}>
              <img src={tick} />
            </div>
            <div className={styles.text}>
              Возможность создания игры
            </div>

          </div>
          <div className={styles.textBox}>
            <div className={styles.tick}>
              <img src={tick} />
            </div>
            <div className={styles.text}>
              3 темы с вопросами
            </div>
          </div>
          <div className={styles.textBox}>
            <div className={styles.tick}>
              <img src={tick} />
            </div>
            <div className={styles.text}>
              Возможность приглашать в одну игру не более 4 игроков
            </div>
          </div>
        </div>
      </div>
    </div>
  )




}